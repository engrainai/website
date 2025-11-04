import { createApp } from "../server/app";

let app: any = null;

export default async function handler(req: any, res: any) {
  console.log(`[Vercel] Incoming request: ${req.method} ${req.url}`);
  
  if (!app) {
    console.log("[Vercel] Initializing Express app...");
    app = await createApp();
    console.log("[Vercel] Express app initialized");
  }
  
  // Log environment variable status (without revealing values)
  console.log("[Vercel] Environment check:", {
    hasWebhookUrl: !!process.env.WEBHOOK_URL,
    hasWebhookKey: !!process.env.WEBHOOK_API_KEY,
    nodeEnv: process.env.NODE_ENV
  });
  
  return app(req, res);
}
