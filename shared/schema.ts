import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Consultation Request Schema
export const consultationRequests = pgTable("consultation_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  businessType: text("business_type").notNull(),
  automationNeeds: text("automation_needs").notNull(),
  preferredContactMethod: text("preferred_contact_method").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertConsultationRequestSchema = createInsertSchema(consultationRequests).omit({
  id: true,
  createdAt: true,
});

export type InsertConsultationRequest = z.infer<typeof insertConsultationRequestSchema>;
export type ConsultationRequest = typeof consultationRequests.$inferSelect;

// Demo Call Request Schema (immediate callback)
export const demoCallRequests = pgTable("demo_call_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  businessName: text("business_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDemoCallRequestSchema = createInsertSchema(demoCallRequests).omit({
  id: true,
  createdAt: true,
});

export type InsertDemoCallRequest = z.infer<typeof insertDemoCallRequestSchema>;
export type DemoCallRequest = typeof demoCallRequests.$inferSelect;

// Voice Sample Type (no database table needed, just TypeScript interface)
export interface VoiceSample {
  id: string;
  name: string;
  description: string;
  voiceType: string;
}
