import { contactFormSchema } from "@/lib/validation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Dados inválidos", fields: fieldErrors },
        { status: 400 },
      );
    }

    // Integração futura: CRM, e-mail (Resend/SendGrid), webhook, etc.
    if (process.env.NODE_ENV === "development") {
      console.info("[contact] Nova solicitação:", parsed.data);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar solicitação" },
      { status: 500 },
    );
  }
}
