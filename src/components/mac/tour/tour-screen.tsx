"use client";

import { TourHotspotMarker } from "@/components/mac/tour/tour-hotspot";
import { cn } from "@/lib/utils";
import type { TourScreen, TourStatusTone } from "@/lib/tour-data";
import { Filter, Plus } from "lucide-react";

const TONE_STYLES: Record<TourStatusTone, string> = {
  ok: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/20",
  warn: "bg-amber-500/15 text-amber-300 ring-amber-500/20",
  danger: "bg-rose-500/15 text-rose-300 ring-rose-500/20",
  neutral: "bg-white/10 text-zinc-300 ring-white/10",
};

type TourScreenViewProps = {
  screen: TourScreen;
  accentHex: string;
  activeHotspotId: string | null;
  onSelectHotspot: (id: string) => void;
};

export function TourScreenView({
  screen,
  accentHex,
  activeHotspotId,
  onSelectHotspot,
}: TourScreenViewProps) {
  const showTableHeader =
    screen.layout === "table" ||
    (screen.layout === "kpis" && (screen.rows?.length ?? 0) > 0);

  return (
    <div className="relative flex h-full min-h-[340px] flex-col p-3 sm:min-h-[380px] sm:p-5 lg:min-h-[440px] lg:p-6">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] text-zinc-600">
            Módulo / <span className="text-zinc-400">{screen.label}</span>
          </p>
          <h4 className="mt-0.5 font-display text-base font-semibold tracking-tight text-white sm:text-lg">
            {screen.title}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-zinc-400 ring-1 ring-white/[0.08]"
          >
            <Filter className="h-3.5 w-3.5" strokeWidth={1.75} />
            Filtrar
          </button>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white"
            style={{ backgroundColor: accentHex }}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            Novo
          </button>
        </div>
      </div>

      {screen.kpis && screen.kpis.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-2.5 sm:mb-5 sm:gap-3 lg:grid-cols-4">
          {screen.kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent px-3 py-3 sm:px-4 sm:py-3.5"
            >
              <p className="text-[10px] uppercase tracking-wide text-zinc-500 sm:text-[11px]">
                {kpi.label}
              </p>
              <p
                className={cn(
                  "mt-1.5 font-display text-xl font-bold tracking-tight sm:text-2xl",
                  kpi.tone === "ok" && "text-emerald-300",
                  kpi.tone === "warn" && "text-amber-300",
                  kpi.tone === "danger" && "text-rose-300",
                  (!kpi.tone || kpi.tone === "neutral") && "text-white",
                )}
              >
                {kpi.value}
              </p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full opacity-70"
                  style={{
                    width:
                      kpi.tone === "danger"
                        ? "28%"
                        : kpi.tone === "warn"
                          ? "55%"
                          : "78%",
                    backgroundColor: accentHex,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {screen.rows && screen.rows.length > 0 && (
        <div
          className={cn(
            "flex-1 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.015]",
            screen.layout === "grid" && "border-0 bg-transparent",
          )}
        >
          {showTableHeader && screen.layout !== "grid" && (
            <div className="hidden grid-cols-[1fr_1.1fr_auto] gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-[10px] font-medium uppercase tracking-wider text-zinc-600 sm:grid">
              <span>Registro</span>
              <span>Detalhe</span>
              <span className="text-right">Status</span>
            </div>
          )}

          <div
            className={cn(
              screen.layout === "grid"
                ? "grid grid-cols-1 gap-2.5 sm:grid-cols-2"
                : "divide-y divide-white/[0.05]",
            )}
          >
            {screen.rows.map((row, index) => (
              <div
                key={`${row.primary}-${row.secondary}`}
                className={cn(
                  "flex items-start justify-between gap-3 px-3 py-3 sm:px-4 sm:py-3.5",
                  screen.layout === "grid" &&
                    "rounded-xl border border-white/[0.06] bg-white/[0.025]",
                  index % 2 === 1 &&
                    screen.layout !== "grid" &&
                    "bg-white/[0.015]",
                )}
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div
                    className="mt-0.5 hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold text-white/80 sm:flex"
                    style={{ backgroundColor: `${accentHex}33` }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0 sm:grid sm:grid-cols-[1fr_1.1fr] sm:gap-3 lg:min-w-[28rem]">
                    <p className="truncate text-sm font-medium text-white">
                      {row.primary}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-zinc-500 sm:mt-0">
                      {row.secondary}
                    </p>
                  </div>
                </div>
                {row.status && (
                  <span
                    className={cn(
                      "shrink-0 rounded-md px-2 py-0.5 text-[10px] font-medium ring-1 sm:text-[11px]",
                      TONE_STYLES[row.statusTone ?? "neutral"],
                    )}
                  >
                    {row.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fake pagination footer */}
      {screen.rows && screen.rows.length > 0 && screen.layout !== "grid" && (
        <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-600">
          <span>
            Mostrando {screen.rows.length} de {screen.rows.length + 24}{" "}
            registros
          </span>
          <div className="flex gap-1">
            <span className="rounded px-2 py-0.5 ring-1 ring-white/[0.08]">
              1
            </span>
            <span className="rounded px-2 py-0.5 text-zinc-700">2</span>
            <span className="rounded px-2 py-0.5 text-zinc-700">3</span>
          </div>
        </div>
      )}

      {screen.hotspots.map((hotspot) => (
        <TourHotspotMarker
          key={hotspot.id}
          hotspot={hotspot}
          accentHex={accentHex}
          isActive={activeHotspotId === hotspot.id}
          onSelect={onSelectHotspot}
        />
      ))}
    </div>
  );
}
