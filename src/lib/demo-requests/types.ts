import type { DemoSolutionId } from "@/lib/demo-data";

export const DEMO_REQUEST_STATUSES = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
] as const;

export type DemoRequestStatus = (typeof DEMO_REQUEST_STATUSES)[number];

export type DemoRequest = {
  id: string;
  solution: DemoSolutionId | string;
  name: string;
  email: string;
  phone: string;
  scheduledDate: string;
  scheduledTime: string;
  status: DemoRequestStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateDemoRequestInput = {
  solution: string;
  name: string;
  email: string;
  phone: string;
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
