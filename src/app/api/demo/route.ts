import {
  createDemoRequest,
  getActiveBookedSlots,
  isSlotBooked,
} from "@/lib/demo-requests/store";
import { getAvailableDemoSlots } from "@/lib/demo-data";
import { demoFormSchema } from "@/lib/validation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = demoFormSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Dados inválidos", fields: fieldErrors },
        { status: 400 },
      );
    }

    const { scheduledDate, scheduledTime } = parsed.data;
    const bookedSlots = await getActiveBookedSlots();
    const availableSlots = getAvailableDemoSlots(
      bookedSlots.map((slot) => ({
        scheduledDate: slot.scheduledDate,
        scheduledTime: slot.scheduledTime,
      })),
    );

    const slotExists = availableSlots.some(
      (slot) =>
        slot.date === scheduledDate && slot.times.includes(scheduledTime),
    );

    if (!slotExists) {
      return NextResponse.json(
        { error: "Horário indisponível. Escolha outra data ou horário." },
        { status: 409 },
      );
    }

    const alreadyBooked = await isSlotBooked(scheduledDate, scheduledTime);
    if (alreadyBooked) {
      return NextResponse.json(
        { error: "Este horário acabou de ser reservado. Escolha outro." },
        { status: 409 },
      );
    }

    const demoRequest = await createDemoRequest(parsed.data);

    if (process.env.NODE_ENV === "development") {
      console.info("[demo] Nova demonstração agendada:", demoRequest);
    }

    return NextResponse.json({ success: true, id: demoRequest.id });
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar solicitação" },
      { status: 500 },
    );
  }
}
