// server/index.ts
import { createServer } from "http";

// server/app.ts
import express from "express";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  consultationRequests;
  demoCallRequests;
  constructor() {
    this.consultationRequests = /* @__PURE__ */ new Map();
    this.demoCallRequests = /* @__PURE__ */ new Map();
  }
  async createConsultationRequest(insertRequest) {
    const id = randomUUID();
    const request = {
      ...insertRequest,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.consultationRequests.set(id, request);
    return request;
  }
  async getConsultationRequests() {
    return Array.from(this.consultationRequests.values());
  }
  async createDemoCallRequest(insertRequest) {
    const id = randomUUID();
    const request = {
      ...insertRequest,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.demoCallRequests.set(id, request);
    return request;
  }
  async getDemoCallRequests() {
    return Array.from(this.demoCallRequests.values());
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var consultationRequests = pgTable("consultation_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  businessType: text("business_type").notNull(),
  automationNeeds: text("automation_needs").notNull(),
  preferredContactMethod: text("preferred_contact_method").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertConsultationRequestSchema = createInsertSchema(consultationRequests).omit({
  id: true,
  createdAt: true
});
var demoCallRequests = pgTable("demo_call_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  businessName: text("business_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertDemoCallRequestSchema = createInsertSchema(demoCallRequests).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
import { z } from "zod";

// server/email.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD
  }
});
async function sendContactEmail(data) {
  const { name, email, phone, message } = data;
  const mailOptions = {
    from: process.env.ZOHO_EMAIL,
    to: "logan@engrainai.com",
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <hr />
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, "<br />")}</p>
      <hr />
      <p style="color: #666; font-size: 12px;">
        Sent from Engrain AI website contact form
      </p>
    `,
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

Message:
${message}

---
Sent from Engrain AI website contact form
    `
  };
  await transporter.sendMail(mailOptions);
}

// server/routes.ts
var contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required")
});
async function sendToWebhook(data, formType) {
  const webhookUrl = process.env.WEBHOOK_URL;
  const webhookApiKey = process.env.WEBHOOK_API_KEY;
  const hasUrl = !!webhookUrl;
  const hasKey = !!webhookApiKey;
  console.log(`[Webhook] Config check - URL: ${hasUrl}, Key: ${hasKey}`);
  if (!webhookUrl || !webhookApiKey) {
    console.warn("[Webhook] SKIPPED - URL or API key not configured in environment variables");
    console.warn("[Webhook] To enable webhook: Set WEBHOOK_URL and WEBHOOK_API_KEY in Vercel environment variables");
    return;
  }
  const maskedUrl = webhookUrl.substring(0, 20) + "..." + webhookUrl.substring(webhookUrl.length - 10);
  console.log(`[Webhook] Attempting to send ${formType} to ${maskedUrl}`);
  try {
    const payload = {
      formType,
      data,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    console.log(`[Webhook] Payload prepared for ${formType}`);
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Key": webhookApiKey
      },
      body: JSON.stringify(payload)
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
async function registerRoutes(app) {
  app.post("/api/consultation-requests", async (req, res) => {
    console.log("[API] POST /api/consultation-requests received");
    try {
      const validatedData = insertConsultationRequestSchema.parse(req.body);
      const request = await storage.createConsultationRequest(validatedData);
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
  app.post("/api/demo-call-requests", async (req, res) => {
    console.log("[API] POST /api/demo-call-requests received");
    try {
      const validatedData = insertDemoCallRequestSchema.parse(req.body);
      const request = await storage.createDemoCallRequest(validatedData);
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
  app.post("/api/contact", async (req, res) => {
    console.log("[API] POST /api/contact received");
    try {
      const validatedData = contactFormSchema.parse(req.body);
      await sendContactEmail(validatedData);
      console.log("[API] Contact email sent successfully");
      res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("[API] Error in contact:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: "Validation failed",
          details: error.errors
        });
      } else {
        console.error("[API] Email send error:", error);
        res.status(500).json({ error: "Failed to send message. Please try again." });
      }
    }
  });
}

// server/app.ts
async function createApp() {
  const app = express();
  app.use(express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    }
  }));
  app.use(express.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    const start = Date.now();
    const path3 = req.path;
    let capturedJsonResponse = void 0;
    const originalResJson = res.json;
    res.json = function(bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };
    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path3.startsWith("/api")) {
        let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }
        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "\u2026";
        }
        console.log(logLine);
      }
    });
    next();
  });
  await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Error:", err);
    res.status(status).json({ message });
  });
  return app;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express2.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
(async () => {
  const app = await createApp();
  const server = createServer(app);
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
