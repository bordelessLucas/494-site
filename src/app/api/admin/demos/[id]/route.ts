import { requireAdminApiSession } from "@/lib/admin/require-session";
import { getDemoRequest, updateDemoRequest } from "@/lib/demo-requests/store";
import { updateDemoRequestSchema } from "@/lib/validation";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    const request = await getDemoRequest(id);

    if (!request) {
      return NextResponse.json(
        { error: "Solicitação não encontrada" },
        { status: 404 },
      );
    }

    return NextResponse.json({ request });
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar solicitação" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    const body = await request.json();
    const parsed = updateDemoRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", fields: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const updated = await updateDemoRequest(id, parsed.data);

    if (!updated) {
      return NextResponse.json(
        { error: "Solicitação não encontrada" },
        { status: 404 },
      );
    }

    return NextResponse.json({ request: updated });
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar solicitação" },
      { status: 500 },
    );
  }
}
