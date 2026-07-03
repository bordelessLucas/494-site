import { getActiveBookedSlots } from "@/lib/demo-requests/store";
import { getAvailableDemoSlots } from "@/lib/demo-data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const bookedSlots = await getActiveBookedSlots();
    const slots = getAvailableDemoSlots(
      bookedSlots.map(({ scheduledDate, scheduledTime }) => ({
        scheduledDate,
        scheduledTime,
      })),
    );

    return NextResponse.json({ slots });
  } catch {
    return NextResponse.json(
      { error: "Erro ao carregar horários disponíveis" },
      { status: 500 },
    );
  }
}
