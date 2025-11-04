import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConsultationRequestSchema, insertDemoCallRequestSchema } from "@shared/schema";
import { z } from "zod";

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

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/consultation-requests", async (req, res) => {
    try {
      const validatedData = insertConsultationRequestSchema.parse(req.body);
      const request = await storage.createConsultationRequest(validatedData);
      
      // Send to webhook asynchronously (don't block response)
      sendToWebhook(validatedData, "consultation-request").catch(console.error);
      
      res.status(201).json(request);
    } catch (error) {
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

  app.post("/api/demo-call-requests", async (req, res) => {
    try {
      const validatedData = insertDemoCallRequestSchema.parse(req.body);
      const request = await storage.createDemoCallRequest(validatedData);
      
      // Send to webhook asynchronously (don't block response)
      sendToWebhook(validatedData, "demo-call-request").catch(console.error);
      
      res.status(201).json(request);
    } catch (error) {
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

  const httpServer = createServer(app);

  return httpServer;
}
