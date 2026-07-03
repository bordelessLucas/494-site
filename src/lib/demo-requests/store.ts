import type {
  CreateDemoRequestInput,
  DemoRequest,
  DemoRequestFilters,
  UpdateDemoRequestInput,
} from "@/lib/demo-requests/types";
import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "demo-requests.json");

async function ensureDataFile(): Promise<void> {
  try {
    await readFile(DATA_FILE, "utf-8");
  } catch {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_FILE, "[]", "utf-8");
  }
}

async function readAll(): Promise<DemoRequest[]> {
  await ensureDataFile();
  const raw = await readFile(DATA_FILE, "utf-8");
  const parsed = JSON.parse(raw) as DemoRequest[];
  return Array.isArray(parsed) ? parsed : [];
}

async function writeAll(requests: DemoRequest[]): Promise<void> {
  await ensureDataFile();
  await writeFile(DATA_FILE, JSON.stringify(requests, null, 2), "utf-8");
}

function sortByScheduledDesc(a: DemoRequest, b: DemoRequest): number {
  const dateCompare = b.scheduledDate.localeCompare(a.scheduledDate);
  if (dateCompare !== 0) return dateCompare;
  return b.scheduledTime.localeCompare(a.scheduledTime);
}

export async function listDemoRequests(
  filters: DemoRequestFilters = {},
): Promise<DemoRequest[]> {
  let requests = await readAll();

  if (filters.status && filters.status !== "all") {
    requests = requests.filter((request) => request.status === filters.status);
  }

  if (filters.search?.trim()) {
    const query = filters.search.trim().toLowerCase();
    requests = requests.filter(
      (request) =>
        request.name.toLowerCase().includes(query) ||
        request.email.toLowerCase().includes(query) ||
        request.phone.includes(query),
    );
  }

  return requests.sort(sortByScheduledDesc);
}

export async function getDemoRequest(id: string): Promise<DemoRequest | null> {
  const requests = await readAll();
  return requests.find((request) => request.id === id) ?? null;
}

export async function createDemoRequest(
  input: CreateDemoRequestInput,
): Promise<DemoRequest> {
  const requests = await readAll();
  const now = new Date().toISOString();

  const request: DemoRequest = {
    id: randomUUID(),
    ...input,
    status: "pending",
    notes: "",
    createdAt: now,
    updatedAt: now,
  };

  requests.push(request);
  await writeAll(requests);
  return request;
}

export async function updateDemoRequest(
  id: string,
  input: UpdateDemoRequestInput,
): Promise<DemoRequest | null> {
  const requests = await readAll();
  const index = requests.findIndex((request) => request.id === id);
  if (index === -1) return null;

  const updated: DemoRequest = {
    ...requests[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };

  requests[index] = updated;
  await writeAll(requests);
  return updated;
}

export async function getActiveBookedSlots(): Promise<
  Array<{ scheduledDate: string; scheduledTime: string }>
> {
  const requests = await readAll();
  return requests
    .filter((request) => request.status === "pending" || request.status === "confirmed")
    .map(({ scheduledDate, scheduledTime }) => ({ scheduledDate, scheduledTime }));
}

export async function isSlotBooked(
  scheduledDate: string,
  scheduledTime: string,
): Promise<boolean> {
  const booked = await getActiveBookedSlots();
  return booked.some(
    (slot) =>
      slot.scheduledDate === scheduledDate && slot.scheduledTime === scheduledTime,
  );
}
