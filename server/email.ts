import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
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

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
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
    `,
  };

  await getTransporter().sendMail(mailOptions);
}
