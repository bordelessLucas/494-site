"use client";

import { TourScreenView } from "@/components/mac/tour/tour-screen";
import { cn } from "@/lib/utils";
import {
  TOUR_ACCENT_HEX,
  type TourModule,
  type TourScreen,
} from "@/lib/tour-data";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bell,
  Building2,
  CalendarDays,
  FileText,
  LayoutDashboard,
  Search,
  Settings,
  Users,
} from "lucide-react";

const SIDEBAR_ICONS = [
  LayoutDashboard,
  FileText,
  Building2,
  CalendarDays,
  Users,
  Settings,
] as const;

type TourShellProps = {
  module: TourModule;
  activeScreen: TourScreen;
  activeHotspotId: string | null;
  onSelectScreen: (screenId: string) => void;
  onSelectHotspot: (id: string) => void;
};

export function TourShell({
  module,
  activeScreen,
  activeHotspotId,
  onSelectScreen,
  onSelectHotspot,
}: TourShellProps) {
  const prefersReducedMotion = useReducedMotion();
  const accentHex = TOUR_ACCENT_HEX[module.accent];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.1] bg-[#08080e] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)] sm:rounded-[28px]">
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#0c0c14] px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-1 flex min-w-0 flex-1 items-center justify-center">
          <span className="truncate rounded-lg bg-white/[0.04] px-3 py-1.5 text-[11px] text-zinc-500 ring-1 ring-white/[0.06] sm:px-4 sm:text-xs">
            app.uniquegestor.com.br/{module.id}
          </span>
        </div>
        <div className="hidden w-[52px] sm:block" aria-hidden />
      </div>

      <div className="flex min-h-[420px] flex-col lg:min-h-[520px] lg:flex-row">
        {/* App sidebar */}
        <aside className="hidden w-[220px] shrink-0 flex-col border-r border-white/[0.06] bg-[#0a0a12] lg:flex">
          <div className="border-b border-white/[0.06] px-4 py-4">
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{ backgroundColor: accentHex }}
              >
                UG
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  Unique Gestor
                </p>
                <p className="truncate text-[11px] text-zinc-500">
                  {module.shortLabel}
                </p>
              </div>
            </div>
          </div>

          <nav
            aria-label={`Telas do módulo ${module.shortLabel}`}
            className="flex flex-1 flex-col gap-0.5 p-2.5"
          >
            <p className="px-2.5 pb-1.5 pt-1 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
              Menu
            </p>
            {module.screens.map((screen, index) => {
              const isActive = screen.id === activeScreen.id;
              const Icon = SIDEBAR_ICONS[index % SIDEBAR_ICONS.length];
              return (
                <button
                  key={screen.id}
                  type="button"
                  onClick={() => onSelectScreen(screen.id)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300",
                  )}
                >
                  <Icon
                    className="h-4 w-4 shrink-0"
                    strokeWidth={1.75}
                    style={isActive ? { color: accentHex } : undefined}
                  />
                  <span className="truncate font-medium">{screen.label}</span>
                  {isActive && (
                    <span
                      className="ml-auto h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: accentHex }}
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-white/[0.06] p-3">
            <div className="flex items-center gap-2.5 rounded-lg bg-white/[0.03] px-2.5 py-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[10px] font-semibold text-zinc-300">
                AD
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-zinc-300">
                  Admin Demo
                </p>
                <p className="truncate text-[10px] text-zinc-600">
                  empresa@demo.com
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#0c0c14]/80 px-3 py-2.5 sm:px-5 sm:py-3">
            <div className="relative min-w-0 flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-600"
                strokeWidth={1.75}
              />
              <div className="truncate rounded-lg bg-white/[0.04] py-2 pl-9 pr-3 text-xs text-zinc-600 ring-1 ring-white/[0.06]">
                Buscar em {activeScreen.label.toLowerCase()}…
              </div>
            </div>
            <button
              type="button"
              className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 ring-1 ring-white/[0.08]"
              tabIndex={-1}
              aria-hidden
            >
              <Bell className="h-4 w-4" strokeWidth={1.75} />
              <span
                className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: accentHex }}
              />
            </button>
          </div>

          {/* Mobile screen chips */}
          <nav
            aria-label={`Telas do módulo ${module.shortLabel}`}
            className="flex gap-1.5 overflow-x-auto border-b border-white/[0.06] p-2 lg:hidden"
          >
            {module.screens.map((screen) => {
              const isActive = screen.id === activeScreen.id;
              return (
                <button
                  key={screen.id}
                  type="button"
                  onClick={() => onSelectScreen(screen.id)}
                  className={cn(
                    "shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300",
                  )}
                >
                  {screen.label}
                </button>
              );
            })}
          </nav>

          <div className="relative min-h-[340px] flex-1 overflow-hidden sm:min-h-[380px] lg:min-h-[440px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${module.id}-${activeScreen.id}`}
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: 8 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion ? undefined : { opacity: 0, y: -6 }
                }
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <TourScreenView
                  screen={activeScreen}
                  accentHex={accentHex}
                  activeHotspotId={activeHotspotId}
                  onSelectHotspot={onSelectHotspot}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
