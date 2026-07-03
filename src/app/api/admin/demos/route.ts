import { requireAdminApiSession } from "@/lib/admin/require-session";
import { listDemoRequests } from "@/lib/demo-requests/store";
import { demoRequestStatusSchema } from "@/lib/validation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");
    const search = searchParams.get("search") ?? undefined;

    const status =
      statusParam && statusParam !== "all"
        ? demoRequestStatusSchema.safeParse(statusParam).data
        : undefined;

    const requests = await listDemoRequests({
      status: status ?? "all",
      search,
    });

    return NextResponse.json({ requests });
  } catch {
    return NextResponse.json(
      { error: "Erro ao listar solicitações" },
      { status: 500 },
    );
  }
}
