export const DEMO_SOLUTIONS = [
  {
    id: "societaria",
    label: "Gestão Societária",
    description: "Controle de sócios, atos e documentos corporativos",
  },
  {
    id: "sgc",
    label: "SGC — Gestão de Contratos",
    description: "Contratos, aditivos, CNDs, financeiro e workflow",
  },
  {
    id: "escalas",
    label: "Unique Escalas",
    description: "Escalas médicas, plantões e app mobile",
  },
] as const;

export type DemoSolutionId = (typeof DEMO_SOLUTIONS)[number]["id"];

export type DemoTimeSlot = {
  date: string;
  dayLabel: string;
  weekday: string;
  times: string[];
};

const DEMO_TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] as const;

const WEEKDAYS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
] as const;

const MONTHS = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
] as const;

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDayLabel(date: Date): string {
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  return `${day} ${month}`;
}

function isSlotUnavailable(date: Date, time: string): boolean {
  const seed = date.getDate() * 7 + DEMO_TIMES.indexOf(time as (typeof DEMO_TIMES)[number]);
  return seed % 5 === 0;
}

export function getAvailableDemoSlots(
  bookedSlots: Array<{ scheduledDate: string; scheduledTime: string }> = [],
): DemoTimeSlot[] {
  const bookedSet = new Set(
    bookedSlots.map((slot) => `${slot.scheduledDate}:${slot.scheduledTime}`),
  );

  const slots: DemoTimeSlot[] = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);

  while (slots.length < 8) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      const dateKey = toDateKey(cursor);
      const availableTimes = DEMO_TIMES.filter((time) => {
        if (isSlotUnavailable(cursor, time)) return false;
        return !bookedSet.has(`${dateKey}:${time}`);
      });

      if (availableTimes.length > 0) {
        slots.push({
          date: dateKey,
          dayLabel: formatDayLabel(cursor),
          weekday: WEEKDAYS[day],
          times: [...availableTimes],
        });
      }
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return slots;
}
