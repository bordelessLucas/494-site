"use client";

import { AdminRequestDetail } from "@/components/admin/admin-request-detail";
import { Button } from "@/components/ui/button";
import {
  DEMO_STATUS_LABELS,
  DEMO_STATUS_STYLES,
  formatCreatedAt,
  formatScheduledDate,
  getSolutionsLabel,
} from "@/lib/admin/demo-labels";
import {
  DEMO_PERIOD_LABELS,
  DEMO_PERIODS,
  computeDemoMetrics,
  filterByPeriod,
  type DemoPeriod,
} from "@/lib/admin/demo-metrics";
import { buildCsvFilename, demoRequestsToCsv, downloadCsv } from "@/lib/admin/csv";
import type { DemoRequest, DemoRequestStatus } from "@/lib/demo-requests/types";
import { DEMO_REQUEST_STATUSES } from "@/lib/demo-requests/types";
import { cn } from "@/lib/utils";
import { Download, LogOut, RefreshCw, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type AdminDemosDashboardProps = {
  initialRequests: DemoRequest[];
};

type StatusFilter = DemoRequestStatus | "all";

export function AdminDemosDashboard({ initialRequests }: AdminDemosDashboardProps) {
  const router = useRouter();
  const [requests, setRequests] = useState(initialRequests);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [period, setPeriod] = useState<DemoPeriod>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const periodRequests = useMemo(
    () => filterByPeriod(requests, period),
    [requests, period],
  );

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return periodRequests.filter((request) => {
      const matchesStatus =
        statusFilter === "all" || request.status === statusFilter;
      const matchesSearch =
        !query ||
        request.name.toLowerCase().includes(query) ||
        request.email.toLowerCase().includes(query) ||
        request.phone.includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [periodRequests, search, statusFilter]);

  const metrics = useMemo(
    () => computeDemoMetrics(periodRequests),
    [periodRequests],
  );

  const handleExportCsv = () => {
    if (filteredRequests.length === 0) return;
    const csv = demoRequestsToCsv(filteredRequests);
    downloadCsv(csv, buildCsvFilename());
  };

  const selectedRequest =
    filteredRequests.find((request) => request.id === selectedId) ??
    requests.find((request) => request.id === selectedId) ??
    null;

  const refreshRequests = async () => {
    setIsRefreshing(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (search.trim()) params.set("search", search.trim());

      const res = await fetch(`/api/admin/demos?${params.toString()}`);
      if (!res.ok) return;
      const data = await res.json();
      setRequests(data.requests);
      router.refresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const handleRequestUpdated = (updated: DemoRequest) => {
    setRequests((current) =>
      current.map((request) => (request.id === updated.id ? updated : request)),
    );
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/[0.06] bg-[#050508]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-xs font-bold text-white/80">
                U
              </div>
              <div>
                <p className="font-display text-sm font-bold text-white">Unique Gestor</p>
                <p className="text-xs text-zinc-500">Admin · Demos</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              className="gap-2"
              onClick={handleExportCsv}
              disabled={filteredRequests.length === 0}
              title="Exportar solicitações filtradas em CSV"
            >
              <Download className="h-4 w-4" />
              Exportar CSV
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="gap-2"
              onClick={refreshRequests}
              disabled={isRefreshing}
            >
              <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
              Atualizar
            </Button>
            <Button type="button" variant="outline" className="gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">
              Solicitações de demonstração
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Gerencie agendamentos, confirme demos e acompanhe o status de cada lead.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {DEMO_PERIODS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setPeriod(option)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  period === option
                    ? "bg-white text-[#050508]"
                    : "bg-white/[0.04] text-zinc-400 ring-1 ring-white/[0.08] hover:text-white",
                )}
              >
                {DEMO_PERIOD_LABELS[option]}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total no período" value={metrics.total} />
          <StatCard
            label="Pendentes"
            value={metrics.byStatus.pending}
            accent="text-amber-300"
          />
          <StatCard
            label="Próximas"
            value={metrics.upcoming}
            accent="text-[#4d7cff]"
          />
          <StatCard
            label="Taxa de conversão"
            value={`${metrics.conversionRate}%`}
            accent="text-emerald-300"
            hint={`${metrics.byStatus.completed} concluída(s)`}
          />
        </div>

        {metrics.topSolutions.length > 0 && (
          <div className="mb-8 rounded-2xl border border-white/[0.08] bg-[#0c0c14] px-5 py-4">
            <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
              Soluções mais solicitadas
            </p>
            <div className="flex flex-wrap gap-2">
              {metrics.topSolutions.map((solution) => (
                <span
                  key={solution.label}
                  className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 ring-1 ring-white/[0.08]"
                >
                  {solution.label}
                  <span className="font-semibold text-white">{solution.count}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {(["all", ...DEMO_REQUEST_STATUSES] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  statusFilter === status
                    ? "bg-white text-[#050508]"
                    : "bg-white/[0.04] text-zinc-400 ring-1 ring-white/[0.08] hover:text-white",
                )}
              >
                {status === "all" ? "Todas" : DEMO_STATUS_LABELS[status]}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome, e-mail ou telefone"
              className="w-full rounded-xl bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white outline-none ring-1 ring-white/[0.08] placeholder:text-zinc-600 focus:ring-[#4d7cff]/40"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c14]">
          {filteredRequests.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm text-zinc-400">
                Nenhuma solicitação encontrada com os filtros atuais.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-white/[0.06] bg-white/[0.02] text-xs uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Agendamento</th>
                    <th className="px-4 py-3 font-medium">Cliente</th>
                    <th className="px-4 py-3 font-medium">Solução</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Recebida em</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr
                      key={request.id}
                      className={cn(
                        "cursor-pointer border-b border-white/[0.04] transition-colors hover:bg-white/[0.03]",
                        selectedId === request.id && "bg-[#4d7cff]/10",
                      )}
                      onClick={() => setSelectedId(request.id)}
                    >
                      <td className="px-4 py-4 text-white">
                        {formatScheduledDate(request.scheduledDate, request.scheduledTime)}
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-white">{request.name}</p>
                        <p className="text-xs text-zinc-500">{request.email}</p>
                      </td>
                      <td className="px-4 py-4 text-zinc-300">
                        {getSolutionsLabel(request.solutions, request.solution)}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
                            DEMO_STATUS_STYLES[request.status],
                          )}
                        >
                          {DEMO_STATUS_LABELS[request.status]}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-zinc-400">
                        {formatCreatedAt(request.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <AdminRequestDetail
        request={selectedRequest}
        onClose={() => setSelectedId(null)}
        onUpdated={handleRequestUpdated}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  accent = "text-white",
  hint,
}: {
  label: string;
  value: number | string;
  accent?: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c14] px-5 py-4">
      <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      <p className={cn("mt-2 font-display text-3xl font-bold", accent)}>{value}</p>
      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}
