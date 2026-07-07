import {
  DEMO_STATUS_LABELS,
  formatCreatedAt,
  formatScheduledDate,
  getSolutionsLabel,
} from "@/lib/admin/demo-labels";
import type { DemoRequest } from "@/lib/demo-requests/types";

const CSV_HEADERS = [
  "Nome",
  "E-mail",
  "Telefone",
  "Empresa",
  "Cargo",
  "Porte",
  "Soluções",
  "Agendamento",
  "Status",
  "Mensagem",
  "Observações",
  "Recebida em",
] as const;

function escapeCell(value: string): string {
  const normalized = value.replace(/\r?\n/g, " ").trim();
  if (/[",;]/.test(normalized)) {
    return `"${normalized.replace(/"/g, '""')}"`;
  }
  return normalized;
}

function toRow(request: DemoRequest): string {
  const cells = [
    request.name,
    request.email,
    request.phone,
    request.company ?? "",
    request.role ?? "",
    request.companySize ?? "",
    getSolutionsLabel(request.solutions, request.solution),
    formatScheduledDate(request.scheduledDate, request.scheduledTime),
    DEMO_STATUS_LABELS[request.status],
    request.message ?? "",
    request.notes ?? "",
    formatCreatedAt(request.createdAt),
  ];

  return cells.map((cell) => escapeCell(String(cell))).join(";");
}

/**
 * Gera CSV com separador ";" e BOM UTF-8 para abrir corretamente no Excel pt-BR.
 */
export function demoRequestsToCsv(requests: DemoRequest[]): string {
  const header = CSV_HEADERS.join(";");
  const rows = requests.map(toRow);
  const content = [header, ...rows].join("\r\n");
  return `\uFEFF${content}`;
}

export function buildCsvFilename(now: Date = new Date()): string {
  const iso = now.toISOString().slice(0, 10);
  return `solicitacoes-demo-${iso}.csv`;
}

export function downloadCsv(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
