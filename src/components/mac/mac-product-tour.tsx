"use client";

import { OpenDemoButton } from "@/components/demo/open-demo-button";
import { TourShell } from "@/components/mac/tour/tour-shell";
import { cn } from "@/lib/utils";
import {
  TOUR_ACCENT_HEX,
  TOUR_MODULES,
  TOUR_SECTION,
  type TourHotspot,
  type TourModuleId,
} from "@/lib/tour-data";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MousePointerClick, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const ACCENT_TAB: Record<TourModuleId, string> = {
  societaria:
    "data-[active=true]:bg-[#4d7cff]/20 data-[active=true]:text-[#8eb0ff] data-[active=true]:ring-[#4d7cff]/35",
  sgc: "data-[active=true]:bg-[#22d3ee]/15 data-[active=true]:text-[#67e8f9] data-[active=true]:ring-[#22d3ee]/35",
  escalas:
    "data-[active=true]:bg-[#b456ff]/20 data-[active=true]:text-[#d4a0ff] data-[active=true]:ring-[#b456ff]/35",
};

export function MacProductTour() {
  const prefersReducedMotion = useReducedMotion();
  const [moduleId, setModuleId] = useState<TourModuleId>("sgc");
  const [screenId, setScreenId] = useState(TOUR_MODULES[1].screens[0].id);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const activeModule = useMemo(
    () => TOUR_MODULES.find((item) => item.id === moduleId) ?? TOUR_MODULES[0],
    [moduleId],
  );

  const activeScreen = useMemo(() => {
    return (
      activeModule.screens.find((screen) => screen.id === screenId) ??
      activeModule.screens[0]
    );
  }, [activeModule, screenId]);

  const activeHotspot: TourHotspot | null = useMemo(() => {
    if (!activeHotspotId) return null;
    return (
      activeScreen.hotspots.find((item) => item.id === activeHotspotId) ?? null
    );
  }, [activeHotspotId, activeScreen]);

  useEffect(() => {
    const nextModule =
      TOUR_MODULES.find((item) => item.id === moduleId) ?? TOUR_MODULES[0];
    setScreenId(nextModule.screens[0].id);
    setActiveHotspotId(null);
  }, [moduleId]);

  const handleSelectScreen = (nextScreenId: string) => {
    setScreenId(nextScreenId);
    setActiveHotspotId(null);
  };

  const handleSelectHotspot = (id: string) => {
    setActiveHotspotId((current) => (current === id ? null : id));
  };

  const accentHex = TOUR_ACCENT_HEX[activeModule.accent];

  return (
    <section id="plataforma" className="mac-section">
      <div className="mac-container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mac-heading-lg text-white">{TOUR_SECTION.heading}</h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
            {TOUR_SECTION.description}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Módulos da plataforma"
          className="mt-8 flex gap-2 overflow-x-auto pb-1 sm:mt-10 sm:justify-center sm:overflow-visible"
        >
          {TOUR_MODULES.map((module) => {
            const isActive = module.id === moduleId;
            return (
              <button
                key={module.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-active={isActive}
                onClick={() => setModuleId(module.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium text-zinc-400 ring-1 ring-white/[0.08] transition-colors",
                  "hover:text-zinc-200",
                  ACCENT_TAB[module.id],
                )}
              >
                {module.shortLabel}
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-center text-sm text-zinc-500">
          {activeModule.description}
        </p>

        <div className="relative mx-auto mt-6 max-w-6xl lg:mt-8">
          <TourShell
            module={activeModule}
            activeScreen={activeScreen}
            activeHotspotId={activeHotspotId}
            onSelectScreen={handleSelectScreen}
            onSelectHotspot={handleSelectHotspot}
          />

          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-zinc-600">
            <MousePointerClick className="h-3.5 w-3.5" strokeWidth={1.75} />
            {TOUR_SECTION.hint}
          </p>

          <div className="mt-5 hidden md:block">
            <AnimatePresence mode="wait">
              {activeHotspot ? (
                <motion.aside
                  key={activeHotspot.id}
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion ? undefined : { opacity: 0, y: 6 }
                  }
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-white/[0.08] bg-[#12121a]/95 p-5 sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: accentHex }}
                          aria-hidden
                        />
                        <h3 className="font-display text-lg font-bold tracking-tight text-white">
                          {activeHotspot.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {activeHotspot.description}
                      </p>
                      <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-200">
                        {activeHotspot.benefit}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveHotspotId(null)}
                      className="shrink-0 self-start rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
                      aria-label="Fechar detalhe"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </motion.aside>
              ) : (
                <motion.aside
                  key="empty"
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] px-5 py-4 text-center text-sm text-zinc-500"
                >
                  Selecione um ponto no painel para ver o detalhe da
                  funcionalidade.
                </motion.aside>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {activeHotspot && (
              <motion.div
                className="fixed inset-x-0 bottom-0 z-[60] p-4 md:hidden"
                initial={
                  prefersReducedMotion ? false : { y: "100%", opacity: 0 }
                }
                animate={{ y: 0, opacity: 1 }}
                exit={
                  prefersReducedMotion
                    ? undefined
                    : { y: "100%", opacity: 0 }
                }
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="safe-bottom mx-auto max-w-lg rounded-2xl border border-white/[0.1] bg-[#12121a] p-5 shadow-2xl shadow-black/50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: accentHex }}
                        aria-hidden
                      />
                      <h3 className="font-display text-base font-bold text-white">
                        {activeHotspot.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveHotspotId(null)}
                      className="rounded-lg p-1 text-zinc-500 hover:text-zinc-300"
                      aria-label="Fechar"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {activeHotspot.description}
                  </p>
                  <p className="mt-3 text-sm font-medium text-zinc-200">
                    {activeHotspot.benefit}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex justify-center">
            <OpenDemoButton
              variant="gradient"
              className="w-full max-w-sm sm:w-auto sm:min-w-[260px]"
              initialSolutions={[moduleId]}
            >
              {TOUR_SECTION.cta}
            </OpenDemoButton>
          </div>
        </div>
      </div>
    </section>
  );
}
