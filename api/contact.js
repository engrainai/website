// Basic in-memory rate limiter (resets on serverless cold start)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

export default async function handler(req, res) {
  // Set CORS headers - ADJUST origin for production
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Rate limiting implementation
    const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const now = Date.now();

    if (rateLimit.has(clientIP)) {
      const record = rateLimit.get(clientIP);
      if (now - record.startTime > RATE_LIMIT_WINDOW) {
        // Reset window
        rateLimit.set(clientIP, { count: 1, startTime: now });
      } else if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        res.status(429).json({ 
          error: 'Too many requests. Please try again later.' 
        });
        return;
      } else {
        record.count++;
      }
    } else {
      rateLimit.set(clientIP, { count: 1, startTime: now });
    }

    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      company, 
      automationGoal,
      'g-recaptcha-response': recaptchaToken 
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !automationGoal) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Invalid email format' });
      return;
    }

    // Verify reCAPTCHA (if enabled)
    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (!recaptchaToken) {
        res.status(400).json({ error: 'reCAPTCHA verification required' });
        return;
      }

      const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
      const recaptchaResult = await fetch(verifyURL, { method: 'POST' }).then(r => r.json());
      
      if (!recaptchaResult.success) {
        res.status(400).json({ error: 'reCAPTCHA verification failed' });
        return;
      }
    }

    // Prepare data for n8n with secret token
    const webhookData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      company: company?.trim() || null,
      automationGoal: automationGoal.trim(),
      submittedAt: new Date().toISOString(),
      source: 'website-contact-form',
      ipAddress: clientIP
    };

    // Add secret token to webhook URL if configured
    let n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (process.env.N8N_SECRET_TOKEN) {
      const url = new URL(n8nWebhookUrl);
      url.searchParams.append('secret', process.env.N8N_SECRET_TOKEN);
      n8nWebhookUrl = url.toString();
    }

    // Send to n8n webhook with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Vercel-Contact-Form-Handler'
      },
      body: JSON.stringify(webhookData),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!n8nResponse.ok) {
      throw new Error(`webhook failed: ${n8nResponse.status} ${n8nResponse.statusText}`);
    }

    res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully' 
    });

  } catch (error) {
    console.error('Form submission error:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    
    res.status(500).json({ 
      error: 'Failed to process submission. Please try again.' 
    });
  }
}
