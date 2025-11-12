import { 
  type ConsultationRequest, 
  type InsertConsultationRequest,
  type DemoCallRequest,
  type InsertDemoCallRequest,
  type ContactRequest,
  type InsertContactRequest
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest>;
  getConsultationRequests(): Promise<ConsultationRequest[]>;
  createDemoCallRequest(request: InsertDemoCallRequest): Promise<DemoCallRequest>;
  getDemoCallRequests(): Promise<DemoCallRequest[]>;
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  getContactRequests(): Promise<ContactRequest[]>;
}

export class MemStorage implements IStorage {
  private consultationRequests: Map<string, ConsultationRequest>;
  private demoCallRequests: Map<string, DemoCallRequest>;
  private contactRequests: Map<string, ContactRequest>;

  constructor() {
    this.consultationRequests = new Map();
    this.demoCallRequests = new Map();
    this.contactRequests = new Map();
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

  async createDemoCallRequest(insertRequest: InsertDemoCallRequest): Promise<DemoCallRequest> {
    const id = randomUUID();
    const request: DemoCallRequest = { 
      ...insertRequest, 
      id,
      createdAt: new Date()
    };
    this.demoCallRequests.set(id, request);
    return request;
  }

  async getDemoCallRequests(): Promise<DemoCallRequest[]> {
    return Array.from(this.demoCallRequests.values());
  }

  async createContactRequest(insertRequest: InsertContactRequest): Promise<ContactRequest> {
    const id = randomUUID();
    const request: ContactRequest = { 
      ...insertRequest, 
      id,
      createdAt: new Date()
    };
    this.contactRequests.set(id, request);
    return request;
  }

  async getContactRequests(): Promise<ContactRequest[]> {
    return Array.from(this.contactRequests.values());
  }
}

export const storage = new MemStorage();
