# Deployment Guide for Engrain AI Website

## Prerequisites
- GitHub account
- Vercel account (free tier works)
- Your webhook URL and API key ready

## Step 1: Push to GitHub

1. Create a new repository on GitHub (e.g., `engrain-ai-website`)
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/engrain-ai-website.git
git push -u origin main
```

## Step 2: Deploy to Vercel

### Connect Repository
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Click "Import"

### Configure Build Settings
Vercel should auto-detect the settings, but verify:
- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

### Add Environment Variables
**CRITICAL**: Before deploying, add these environment variables:

1. In the Vercel project configuration, find "Environment Variables"
2. Add the following variables for **ALL environments** (Production, Preview, Development):

| Variable Name | Value | Example |
|--------------|-------|---------|
| `WEBHOOK_URL` | Your webhook endpoint URL | `https://desktop-eu632pp.tail457630.ts.net/webhook/form-submit` |
| `WEBHOOK_API_KEY` | Your webhook API key | `ada89dfadusJJ87a9s8d7jk` |
| `SESSION_SECRET` | Random secure string | Generate with: `openssl rand -base64 32` |

**Important Notes:**
- ✅ Make sure to select all three environments (Production, Preview, Development)
- ✅ The webhook variables MUST be set or forms will fail
- ✅ SESSION_SECRET can be any long random string

### Deploy
1. Click "Deploy"
2. Wait 1-2 minutes for deployment to complete
3. Vercel will provide you with a URL like `https://your-project.vercel.app`

## Step 3: Verify Deployment

### Test the Website
1. Visit your Vercel URL
2. Scroll through the page - verify all sections load correctly
3. Test the theme toggle (light/dark mode)
4. Check the phone number in the header

### Test Form Submissions

#### Test Consultation Form
1. Scroll to "Request a Free Consultation" section
2. Fill out all fields:
   - Business Name (required)
   - Contact Name
   - Email
   - Phone
   - Business Type
   - Automation Needs
   - Preferred Contact Method
   - ✅ Check the consent checkbox
3. Click "Request Free Consultation"
4. You should see a success message: "Request Submitted Successfully!"
5. **Check your webhook endpoint** - you should receive the form data

#### Test Demo Call Modal
1. Click "Request Demo Call" button in the hero section
2. Fill out the form:
   - Full Name
   - Business Name (required)
   - Email
   - Phone
   - ✅ Check the consent checkbox
3. Click "Request Demo Call Now"
4. Modal should close and you should see: "Demo Request Received!"
5. **Check your webhook endpoint** - you should receive the demo request

## Step 4: Verify Webhook Integration

### Check Vercel Logs
1. Go to your Vercel project dashboard
2. Click on "Deployments" → Click your latest deployment
3. Click "Logs" or "Runtime Logs"
4. Submit a test form
5. Look for logs like:
   ```
   [Webhook] Config check - URL: true, Key: true
   [Webhook] Attempting to send consultation-request to...
   [Webhook] Response status: 200 OK
   [Webhook] SUCCESS - consultation-request sent successfully
   ```

### If Webhook is NOT Working

Look for these log messages:

**Problem: Environment variables not set**
```
[Webhook] SKIPPED - URL or API key not configured
```
**Solution**: Go back to Step 2 and add WEBHOOK_URL and WEBHOOK_API_KEY

**Problem: Webhook returns 404**
```
[Webhook] FAILED - Status: 404
```
**Solution**: 
- Verify your webhook URL is correct
- Make sure your webhook endpoint is accessible from the internet
- If using Tailscale, ensure it's configured for public access or use a different webhook service

**Problem: Webhook authentication fails**
```
[Webhook] FAILED - Status: 401 or 403
```
**Solution**: 
- Verify your WEBHOOK_API_KEY is correct
- Check that your webhook expects the `X-Key` header

## Step 5: Configure Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain (e.g., `engrainai.com`)
3. Follow Vercel's DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

## Troubleshooting

### Forms Show "Submission Failed" Error

**Possible Causes:**
1. Environment variables not set on Vercel
2. Webhook is blocking the form submission
3. CORS issues

**Solutions:**
1. Check Vercel environment variables are set for Production
2. Redeploy after adding environment variables
3. Check Vercel Runtime Logs for specific errors

### Webhook Not Receiving Data

**Checklist:**
- ✅ WEBHOOK_URL is set correctly in Vercel (no typos)
- ✅ WEBHOOK_API_KEY matches your webhook server
- ✅ Your webhook server is publicly accessible
- ✅ Check Vercel logs to see if webhook is being called
- ✅ Test your webhook URL directly with curl:

```bash
curl -X POST https://your-webhook-url.com/webhook/form-submit \
  -H "Content-Type: application/json" \
  -H "X-Key: your-api-key" \
  -d '{"formType":"test","data":{"test":"data"}}'
```

### Environment Variables Not Taking Effect

After changing environment variables:
1. Go to Deployments tab
2. Find your latest deployment
3. Click the "..." menu
4. Select "Redeploy"
5. Variables are only loaded at deployment time

## Monitoring

### View Form Submissions
Currently, form submissions are stored in-memory. To persist them:
1. The data is sent to your webhook
2. Your webhook should store the data in your system
3. Check your webhook endpoint logs/database for submissions

### Check Application Logs
- Go to Vercel Dashboard → Your Project → Logs
- Filter by "Runtime Logs" to see server-side logs
- Look for `[Webhook]` prefixed messages for webhook status

## Need Help?

If you encounter issues:
1. Check Vercel Runtime Logs first
2. Look for `[Webhook]` log messages to diagnose webhook issues
3. Test forms locally with `npm run dev` to verify they work
4. Verify environment variables are set correctly
5. Make sure to redeploy after changing environment variables

## Security Notes

- ✅ Environment variables are encrypted by Vercel
- ✅ Webhook API key is never exposed to the frontend
- ✅ All form submissions require consent checkbox
- ✅ HTTPS is enabled by default on Vercel
- ⚠️ Remember to set strong SESSION_SECRET value

## Performance

Your Vercel deployment includes:
- ✅ Automatic HTTPS
- ✅ Global CDN for fast loading
- ✅ Automatic caching
- ✅ Image optimization
- ✅ Serverless functions for API routes

Typical page load time: < 2 seconds globally
