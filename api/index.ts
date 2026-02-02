import express, { type Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  interestedIn: z.string().min(1, "Interested in is required"),
  aiEmployeePlan: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

// Email transporter (lazy initialization)
let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    const email = process.env.ZOHO_EMAIL;
    const password = process.env.ZOHO_PASSWORD;

    if (!email || !password) {
      throw new Error("ZOHO_EMAIL and ZOHO_PASSWORD environment variables are required");
    }

    transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: email,
        pass: password,
      },
    });
  }
  return transporter;
}

async function sendContactEmail(data: { name: string; email: string; phone?: string; interestedIn: string; aiEmployeePlan?: string; message: string }) {
  const { name, email, phone, interestedIn, aiEmployeePlan, message } = data;

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
      <p><strong>Interested In:</strong> ${interestedIn}</p>
      <p><strong>AI Employee Plan:</strong> ${aiEmployeePlan || "Not provided"}</p>
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
Interested In: ${interestedIn}
AI Employee Plan: ${aiEmployeePlan || "Not provided"}

Message:
${message}

---
Sent from Engrain AI website contact form
    `,
  };

  await getTransporter().sendMail(mailOptions);
}

// Create Express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, unknown> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      console.log(logLine);
    }
  });

  next();
});

// Contact Form endpoint
app.post("/api/contact", async (req: Request, res: Response) => {
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

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

export default app;
