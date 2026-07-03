import type { DemoRequestStatus } from "@/lib/demo-requests/types";
import { DEMO_SOLUTIONS } from "@/lib/demo-data";

export const DEMO_STATUS_LABELS: Record<DemoRequestStatus, string> = {
  pending: "Pendente",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
  completed: "Concluída",
};

export const DEMO_STATUS_STYLES: Record<DemoRequestStatus, string> = {
  pending: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  confirmed: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  cancelled: "bg-red-500/15 text-red-300 ring-red-500/30",
  completed: "bg-zinc-500/15 text-zinc-300 ring-zinc-500/30",
};

export function getSolutionLabel(solutionId: string): string {
  return DEMO_SOLUTIONS.find((solution) => solution.id === solutionId)?.label ?? solutionId;
}

export function formatScheduledDate(date: string, time: string): string {
  const [year, month, day] = date.split("-").map(Number);
  const scheduled = new Date(year, month - 1, day, ...time.split(":").map(Number));
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(scheduled);
}

export function formatCreatedAt(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
