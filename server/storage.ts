import { 
  type ConsultationRequest, 
  type InsertConsultationRequest,
  type DemoBooking,
  type InsertDemoBooking
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest>;
  getConsultationRequests(): Promise<ConsultationRequest[]>;
  createDemoBooking(booking: InsertDemoBooking): Promise<DemoBooking>;
  getDemoBookings(): Promise<DemoBooking[]>;
}

export class MemStorage implements IStorage {
  private consultationRequests: Map<string, ConsultationRequest>;
  private demoBookings: Map<string, DemoBooking>;

  constructor() {
    this.consultationRequests = new Map();
    this.demoBookings = new Map();
  }

  async createConsultationRequest(insertRequest: InsertConsultationRequest): Promise<ConsultationRequest> {
    const id = randomUUID();
    const request: ConsultationRequest = { 
      ...insertRequest, 
      id,
      createdAt: new Date()
    };
    this.consultationRequests.set(id, request);
    return request;
  }

  async getConsultationRequests(): Promise<ConsultationRequest[]> {
    return Array.from(this.consultationRequests.values());
  }

  async createDemoBooking(insertBooking: InsertDemoBooking): Promise<DemoBooking> {
    const id = randomUUID();
    const booking: DemoBooking = { 
      ...insertBooking, 
      id,
      createdAt: new Date()
    };
    this.demoBookings.set(id, booking);
    return booking;
  }

  async getDemoBookings(): Promise<DemoBooking[]> {
    return Array.from(this.demoBookings.values());
  }
}

export const storage = new MemStorage();
