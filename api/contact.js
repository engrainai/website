export default async function handler(req, res) {
  // Set CORS headers (adjust origin for production)
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
    const { firstName, lastName, email, phone, company, automationGoal } = req.body;

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

    // Prepare data for n8n
    const webhookData = {
      firstName,
      lastName,
      email,
      phone: phone || null,
      company: company || null,
      automationGoal,
      submittedAt: new Date().toISOString(),
      source: 'website-contact-form'
    };

    // Send to n8n webhook
    const n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData)
    });

    if (!n8nResponse.ok) {
      throw new Error(`n8n webhook failed: ${n8nResponse.status}`);
    }

    res.status(200).json({ success: true, message: 'Form submitted successfully' });

  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({ error: 'Failed to process submission' });
  }
}
