export const DEMO_REQUEST_STATUSES = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
] as const;

export type DemoRequestStatus = (typeof DEMO_REQUEST_STATUSES)[number];

export type DemoRequest = {
  id: string;
  solutions: string[];
  solution?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  role?: string;
  companySize?: string;
  message?: string;
  scheduledDate: string;
  scheduledTime: string;
  status: DemoRequestStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateDemoRequestInput = {
  solutions: string[];
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  companySize: string;
  message?: string;
  scheduledDate: string;
  scheduledTime: string;
};

export type UpdateDemoRequestInput = {
  status?: DemoRequestStatus;
  notes?: string;
};

export type DemoRequestFilters = {
  status?: DemoRequestStatus | "all";
  search?: string;
};
