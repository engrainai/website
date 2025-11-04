import { 
  type ConsultationRequest, 
  type InsertConsultationRequest,
  type DemoCallRequest,
  type InsertDemoCallRequest
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest>;
  getConsultationRequests(): Promise<ConsultationRequest[]>;
  createDemoCallRequest(request: InsertDemoCallRequest): Promise<DemoCallRequest>;
  getDemoCallRequests(): Promise<DemoCallRequest[]>;
}

export class MemStorage implements IStorage {
  private consultationRequests: Map<string, ConsultationRequest>;
  private demoCallRequests: Map<string, DemoCallRequest>;

  constructor() {
    this.consultationRequests = new Map();
    this.demoCallRequests = new Map();
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
}

export const storage = new MemStorage();
