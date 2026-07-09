import type { DemoRequest } from "@/lib/demo-requests/types";
import { getSolutionsLabel } from "@/lib/admin/demo-labels";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const DEMO_DURATION_MINUTES = 60;

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function toIcsDateTime(date: string, time: string): string {
  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");
  return `${year}${month}${day}T${hour}${minute}00`;
}

function addMinutes(date: string, time: string, minutes: number): string {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const scheduled = new Date(year, month - 1, day, hour, minute);
  scheduled.setMinutes(scheduled.getMinutes() + minutes);

  const nextYear = scheduled.getFullYear();
  const nextMonth = String(scheduled.getMonth() + 1).padStart(2, "0");
  const nextDay = String(scheduled.getDate()).padStart(2, "0");
  const nextHour = String(scheduled.getHours()).padStart(2, "0");
  const nextMinute = String(scheduled.getMinutes()).padStart(2, "0");

  return `${nextYear}${nextMonth}${nextDay}T${nextHour}${nextMinute}00`;
}

export function buildDemoIcs(request: DemoRequest): string {
  const solutions = getSolutionsLabel(request.solutions);
  const description = escapeIcsText(
    [
      `Demonstração da plataforma ${SITE_NAME}.`,
      `Módulos: ${solutions}.`,
      request.message ? `Mensagem: ${request.message}` : "",
      `Site: ${SITE_URL}`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  const dtStamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Unique Gestor//Demo//PT",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:demo-${request.id}@uniquegestor.com.br`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;TZID=America/Sao_Paulo:${toIcsDateTime(request.scheduledDate, request.scheduledTime)}`,
    `DTEND;TZID=America/Sao_Paulo:${addMinutes(request.scheduledDate, request.scheduledTime, DEMO_DURATION_MINUTES)}`,
    `SUMMARY:${escapeIcsText(`Demonstração ${SITE_NAME}`)}`,
    `DESCRIPTION:${description}`,
    "LOCATION:Online",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
