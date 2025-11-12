// Basic in-memory rate limiter (resets on serverless cold start)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// reCAPTCHA v3 score threshold (0.0 to 1.0, 0.5 is medium)
const RECAPTCHA_SCORE_THRESHOLD = 0.5;

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

    // Initialize score variable outside the conditional block
    let recaptchaScore = null;

    // Verify reCAPTCHA v3 token (if enabled)
    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (!recaptchaToken) {
        res.status(400).json({ error: 'reCAPTCHA verification required' });
        return;
      }

      const verifyURL = 'https://www.google.com/recaptcha/api/siteverify';
      const recaptchaData = new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
        remoteip: clientIP // Optional but recommended
      });

      const recaptchaResult = await fetch(verifyURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: recaptchaData
      }).then(r => r.json());

      // Check if verification succeeded
      if (!recaptchaResult.success) {
        console.error('reCAPTCHA verification failed:', recaptchaResult['error-codes']);
        res.status(400).json({ error: 'reCAPTCHA verification failed' });
        return;
      }

      // Check score threshold (0.0 = bot, 1.0 = human)
      recaptchaScore = recaptchaResult.score;
      const action = recaptchaResult.action;
      
      // Validate action to prevent token reuse
      if (action !== 'contact_form_submit') {
        res.status(400).json({ error: 'Invalid reCAPTCHA action' });
        return;
      }

      if (recaptchaScore < RECAPTCHA_SCORE_THRESHOLD) {
        console.warn(`Low reCAPTCHA score: ${recaptchaScore} from IP ${clientIP}`);
        res.status(400).json({ 
          error: 'Security check failed. Please try again.' 
        });
        return;
      }

      // Optional: Log successful verification details
      console.log(`reCAPTCHA v3 verification passed: score=${recaptchaScore}, action=${action}`);
    }

    // Prepare data for n8n webhook
    const webhookData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      company: company?.trim() || null,
      automationGoal: automationGoal.trim(),
      submittedAt: new Date().toISOString(),
      source: 'website-contact-form',
      ipAddress: clientIP,
      recaptchaScore: recaptchaScore
    };

    // Send to n8n webhook (if configured)
    if (process.env.N8N_WEBHOOK_URL) {
      try {
        const webhookResponse = await fetch(process.env.N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData)
        });

        if (!webhookResponse.ok) {
          console.error('n8n webhook failed:', await webhookResponse.text());
          // Don't fail the request if webhook fails - log and continue
        } else {
          console.log('Successfully sent to n8n webhook');
        }
      } catch (webhookError) {
        console.error('Error sending to n8n webhook:', webhookError);
        // Don't fail the request if webhook fails
      }
    }

    // Success response
    res.status(200).json({ 
      success: true,
      message: 'Form submitted successfully. We\'ll be in touch soon!' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      error: 'An error occurred processing your request. Please try again.' 
    });
  }
}
