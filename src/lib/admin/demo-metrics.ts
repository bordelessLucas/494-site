import { getSolutionsLabel } from "@/lib/admin/demo-labels";
import type { DemoRequest, DemoRequestStatus } from "@/lib/demo-requests/types";

export const DEMO_PERIODS = ["7d", "30d", "90d", "all"] as const;

export type DemoPeriod = (typeof DEMO_PERIODS)[number];

export const DEMO_PERIOD_LABELS: Record<DemoPeriod, string> = {
  "7d": "Últimos 7 dias",
  "30d": "Últimos 30 dias",
  "90d": "Últimos 90 dias",
  all: "Todo o período",
};

const PERIOD_DAYS: Record<Exclude<DemoPeriod, "all">, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

export type DemoMetrics = {
  total: number;
  byStatus: Record<DemoRequestStatus, number>;
  upcoming: number;
  conversionRate: number;
  topSolutions: Array<{ label: string; count: number }>;
};

function isWithinPeriod(request: DemoRequest, period: DemoPeriod, now: Date): boolean {
  if (period === "all") return true;

  const created = new Date(request.createdAt).getTime();
  const threshold = now.getTime() - PERIOD_DAYS[period] * 24 * 60 * 60 * 1000;
  return created >= threshold;
}

export function filterByPeriod(
  requests: DemoRequest[],
  period: DemoPeriod,
  now: Date = new Date(),
): DemoRequest[] {
  if (period === "all") return requests;
  return requests.filter((request) => isWithinPeriod(request, period, now));
}

export function computeDemoMetrics(
  requests: DemoRequest[],
  now: Date = new Date(),
): DemoMetrics {
  const byStatus: Record<DemoRequestStatus, number> = {
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
  };

  const solutionCounts = new Map<string, number>();
  let upcoming = 0;

  for (const request of requests) {
    byStatus[request.status] += 1;

    const isActive =
      request.status === "pending" || request.status === "confirmed";
    if (isActive) {
      const scheduled = new Date(
        `${request.scheduledDate}T${request.scheduledTime}`,
      );
      if (scheduled >= now) upcoming += 1;
    }

    const label = getSolutionsLabel(request.solutions, request.solution);
    if (label !== "—") {
      const solutionsList = request.solutions?.length
        ? request.solutions
        : request.solution
          ? [request.solution]
          : [];
      for (const solutionId of solutionsList) {
        const solutionLabel = getSolutionsLabel([solutionId]);
        solutionCounts.set(
          solutionLabel,
          (solutionCounts.get(solutionLabel) ?? 0) + 1,
        );
      }
    }
  }

  const total = requests.length;
  const closed = byStatus.completed;
  const conversionRate = total === 0 ? 0 : Math.round((closed / total) * 100);

  const topSolutions = Array.from(solutionCounts.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return { total, byStatus, upcoming, conversionRate, topSolutions };
}
