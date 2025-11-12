import type { Express, Request } from "express";
import { storage } from "./storage";
import { insertConsultationRequestSchema, insertDemoCallRequestSchema, insertContactRequestSchema } from "@shared/schema";
import { z } from "zod";

// Simple in-memory rate limiter (resets on server restart)
const rateLimit = new Map<string, { count: number; startTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(req: Request): boolean {
  const clientIP = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  if (rateLimit.has(clientIP)) {
    const record = rateLimit.get(clientIP)!;
    if (now - record.startTime > RATE_LIMIT_WINDOW) {
      rateLimit.set(clientIP, { count: 1, startTime: now });
      return true;
    } else if (record.count >= MAX_REQUESTS_PER_WINDOW) {
      return false;
    } else {
      record.count++;
      return true;
    }
  } else {
    rateLimit.set(clientIP, { count: 1, startTime: now });
    return true;
  }
}

async function sendToWebhook(data: any, formType: string) {
  const webhookUrl = process.env.WEBHOOK_URL;
  const webhookApiKey = process.env.WEBHOOK_API_KEY;

  // Log configuration status (for debugging)
  const hasUrl = !!webhookUrl;
  const hasKey = !!webhookApiKey;
  console.log(`[Webhook] Config check - URL: ${hasUrl}, Key: ${hasKey}`);

  if (!webhookUrl || !webhookApiKey) {
    console.warn("[Webhook] SKIPPED - URL or API key not configured in environment variables");
    console.warn("[Webhook] To enable webhook: Set WEBHOOK_URL and WEBHOOK_API_KEY in Vercel environment variables");
    return;
  }

  // Mask the URL for security but show enough to verify it's set
  const maskedUrl = webhookUrl.substring(0, 20) + "..." + webhookUrl.substring(webhookUrl.length - 10);
  console.log(`[Webhook] Attempting to send ${formType} to ${maskedUrl}`);

  try {
    const payload = {
      formType,
      data,
      timestamp: new Date().toISOString(),
    };

    console.log(`[Webhook] Payload prepared for ${formType}`);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Key": webhookApiKey,
      },
      body: JSON.stringify(payload),
    });

    console.log(`[Webhook] Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const responseText = await response.text();
      console.error(`[Webhook] FAILED - Status: ${response.status}`);
      console.error(`[Webhook] Response: ${responseText.substring(0, 500)}`);
    } else {
      console.log(`[Webhook] SUCCESS - ${formType} sent successfully`);
      const responseText = await response.text();
      if (responseText) {
        console.log(`[Webhook] Response: ${responseText.substring(0, 200)}`);
      }
    }
  } catch (error) {
    console.error(`[Webhook] ERROR - Failed to send ${formType}:`, error);
    if (error instanceof Error) {
      console.error(`[Webhook] Error message: ${error.message}`);
      console.error(`[Webhook] Error stack: ${error.stack}`);
    }
  }
}

export async function registerRoutes(app: Express): Promise<void> {
  // Consultation Requests
  app.post("/api/consultation-requests", async (req, res) => {
    console.log("[API] POST /api/consultation-requests received");
    try {
      const validatedData = insertConsultationRequestSchema.parse(req.body);
      const request = await storage.createConsultationRequest(validatedData);
      
      // Send to webhook asynchronously (don't block response)
      sendToWebhook(validatedData, "consultation-request").catch(console.error);
      
      res.status(201).json(request);
    } catch (error) {
      console.error("[API] Error in consultation-requests:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.get("/api/consultation-requests", async (req, res) => {
    try {
      const requests = await storage.getConsultationRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Demo Call Requests
  app.post("/api/demo-call-requests", async (req, res) => {
    console.log("[API] POST /api/demo-call-requests received");
    try {
      const validatedData = insertDemoCallRequestSchema.parse(req.body);
      const request = await storage.createDemoCallRequest(validatedData);
      
      // Send to webhook asynchronously (don't block response)
      sendToWebhook(validatedData, "demo-call-request").catch(console.error);
      
      res.status(201).json(request);
    } catch (error) {
      console.error("[API] Error in demo-call-requests:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.get("/api/demo-call-requests", async (req, res) => {
    try {
      const requests = await storage.getDemoCallRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Contact Requests
  app.post("/api/contact", async (req, res) => {
    console.log("[API] POST /api/contact received");
    
    // Check rate limit
    if (!checkRateLimit(req)) {
      console.warn("[API] Rate limit exceeded for contact form");
      res.status(429).json({ error: "Too many requests. Please try again later." });
      return;
    }

    try {
      const validatedData = insertContactRequestSchema.parse(req.body);
      const request = await storage.createContactRequest(validatedData);
      
      // Send to webhook asynchronously (don't block response)
      sendToWebhook(validatedData, "contact-request").catch(console.error);
      
      res.status(201).json({ 
        success: true,
        message: "Thank you! We'll be in touch within 24 hours.",
        id: request.id
      });
    } catch (error) {
      console.error("[API] Error in contact:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const requests = await storage.getContactRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
