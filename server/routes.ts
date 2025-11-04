import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConsultationRequestSchema, insertDemoCallRequestSchema } from "@shared/schema";
import { z } from "zod";

async function sendToWebhook(data: any, formType: string) {
  const webhookUrl = process.env.WEBHOOK_URL;
  const webhookApiKey = process.env.WEBHOOK_API_KEY;

  if (!webhookUrl || !webhookApiKey) {
    console.warn("Webhook URL or API key not configured");
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Key": webhookApiKey,
      },
      body: JSON.stringify({
        formType,
        data,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error(`Webhook failed: ${response.status} ${response.statusText}`);
    } else {
      console.log(`Webhook sent successfully for ${formType}`);
    }
  } catch (error) {
    console.error("Failed to send webhook:", error);
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
