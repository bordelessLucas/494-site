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

const PERIOD_SHORT_LABELS: Record<DemoPeriod, string> = {
  "7d": "7d",
  "30d": "30d",
  "90d": "90d",
  all: "Tudo",
};

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
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#050508]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-xs font-bold text-white/80">
              U
            </div>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-bold text-white">
                Unique Gestor
              </p>
              <p className="hidden text-xs text-zinc-500 sm:block">Admin · Demos</p>
            </div>
          </Link>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Button
              type="button"
              variant="ghost"
              className="gap-2 px-2.5 sm:px-3"
              onClick={handleExportCsv}
              disabled={filteredRequests.length === 0}
              title="Exportar solicitações filtradas em CSV"
              aria-label="Exportar CSV"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Exportar CSV</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="gap-2 px-2.5 sm:px-3"
              onClick={refreshRequests}
              disabled={isRefreshing}
              aria-label="Atualizar"
            >
              <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
              <span className="hidden sm:inline">Atualizar</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="gap-2 px-2.5 sm:px-3"
              onClick={handleLogout}
              aria-label="Sair"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Solicitações de demo
            </h1>
            <p className="mt-1.5 text-sm text-zinc-400 sm:mt-2">
              Gerencie agendamentos, confirme demos e acompanhe o status de cada lead.
            </p>
          </div>

          <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {DEMO_PERIODS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setPeriod(option)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  period === option
                    ? "bg-white text-[#050508]"
                    : "bg-white/[0.04] text-zinc-400 ring-1 ring-white/[0.08] hover:text-white",
                )}
              >
                <span className="sm:hidden">{PERIOD_SHORT_LABELS[option]}</span>
                <span className="hidden sm:inline">{DEMO_PERIOD_LABELS[option]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:gap-4 lg:grid-cols-4">
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
          <div className="mb-6 rounded-2xl border border-white/[0.08] bg-[#0c0c14] px-4 py-4 sm:mb-8 sm:px-5">
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

        <div className="mb-6 flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {(["all", ...DEMO_REQUEST_STATUSES] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
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
              placeholder="Buscar nome, e-mail ou telefone"
              className="w-full rounded-xl bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white outline-none ring-1 ring-white/[0.08] placeholder:text-zinc-600 focus:ring-[#4d7cff]/40"
            />
          </div>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c14] px-6 py-16 text-center">
            <p className="text-sm text-zinc-400">
              Nenhuma solicitação encontrada com os filtros atuais.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3 md:hidden">
              {filteredRequests.map((request) => (
                <button
                  key={request.id}
                  type="button"
                  onClick={() => setSelectedId(request.id)}
                  className={cn(
                    "w-full rounded-2xl border border-white/[0.08] bg-[#0c0c14] p-4 text-left transition-colors active:bg-white/[0.04]",
                    selectedId === request.id && "border-[#4d7cff]/40 bg-[#4d7cff]/10",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{request.name}</p>
                      <p className="mt-0.5 truncate text-xs text-zinc-500">
                        {request.email}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
                        DEMO_STATUS_STYLES[request.status],
                      )}
                    >
                      {DEMO_STATUS_LABELS[request.status]}
                    </span>
                  </div>
                  <div className="mt-3 space-y-1.5 text-sm">
                    <p className="text-white">
                      {formatScheduledDate(request.scheduledDate, request.scheduledTime)}
                    </p>
                    <p className="text-zinc-400">
                      {getSolutionsLabel(request.solutions, request.solution)}
                    </p>
                    <p className="text-xs text-zinc-500">
                      Recebida em {formatCreatedAt(request.createdAt)}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="hidden overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c14] md:block">
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
            </div>
          </>
        )}
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
    <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c14] px-4 py-3.5 sm:px-5 sm:py-4">
      <p className="text-[10px] uppercase tracking-wider text-zinc-500 sm:text-xs">
        {label}
      </p>
      <p className={cn("mt-1.5 font-display text-2xl font-bold sm:mt-2 sm:text-3xl", accent)}>
        {value}
      </p>
      {hint && <p className="mt-1 text-[10px] text-zinc-500 sm:text-xs">{hint}</p>}
    </div>
  );
}
