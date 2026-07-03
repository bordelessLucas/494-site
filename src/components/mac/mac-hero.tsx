import { OpenDemoButton } from "@/components/demo/open-demo-button";
import { MacPillButton } from "@/components/mac/mac-pill-button";
import {
  LANDING_HERO,
} from "@/lib/landing-data";
import { ArrowRight, Check, TrendingUp } from "lucide-react";

const CHART_BARS = [
  { height: 56, color: "#4d7cff" },
  { height: 80, color: "#22d3ee" },
  { height: 104, color: "#b456ff" },
] as const;

function HeroGraphicCard() {
  return (
    <div className="mac-card-muted relative min-h-[220px] overflow-hidden rounded-[32px] md:min-h-[240px]">
      <div className="absolute bottom-0 left-0 h-[85%] w-[85%] rounded-tr-[100%] bg-[#4d7cff]/10" />
      <div className="mac-gradient-bg absolute right-8 top-8 h-24 w-24 rounded-full opacity-20 blur-2xl" />

      <button
        type="button"
        className="mac-gradient-bg absolute right-4 top-4 z-10 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_8px_24px_-6px_rgba(77,124,255,0.65)]"
        aria-label="Crescimento da operação"
      >
        <TrendingUp className="h-5 w-5" strokeWidth={1.75} />
      </button>
    </div>
  );
}

function HeroStatCard() {
  return (
    <div className="mac-card flex min-h-[220px] flex-col justify-between p-6 md:min-h-[240px] md:p-7">
      <div>
        <p className="font-display text-5xl font-bold tracking-tight text-white md:text-[3.25rem]">
          {LANDING_HERO.statValue}
        </p>
        <p className="mt-3 max-w-[200px] text-sm leading-relaxed text-zinc-400">
          {LANDING_HERO.statLabel}
        </p>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div className="mac-gradient-bg h-full w-[80%] rounded-full" />
      </div>
    </div>
  );
}

function HeroChartCard() {
  return (
    <div className="mac-card-dark relative overflow-hidden p-6 md:p-8">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#4d7cff]/10 via-transparent to-[#b456ff]/10"
        aria-hidden
      />
      <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            {LANDING_HERO.chartEyebrow}
          </p>
          <p className="mt-2 font-display text-xl font-bold leading-snug text-white md:text-2xl">
            {LANDING_HERO.chartTitle}
          </p>
        </div>

        <div className="flex items-end justify-center gap-3 sm:justify-end">
          {CHART_BARS.map((bar, i) => (
            <div
              key={i}
              className="w-9 rounded-t-md md:w-10"
              style={{ height: `${bar.height}px`, backgroundColor: bar.color }}
              title={["Societária", "SGC", "Escalas"][i]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function MacHero() {
  return (
    <section className="mac-section pt-6 md:pt-10">
      <div className="mac-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <div className="max-w-[540px]">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-zinc-300">
              {LANDING_HERO.badge}
            </span>
            <h1 className="mac-heading-xl mt-6 text-white">
              {LANDING_HERO.headline}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-zinc-400 md:text-[1.05rem]">
              {LANDING_HERO.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <OpenDemoButton variant="gradient" className="gap-2.5 px-6">
                {LANDING_HERO.ctaPrimary}
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </OpenDemoButton>
              <OpenDemoButton variant="outline" className="px-6">
                {LANDING_HERO.ctaSecondary}
              </OpenDemoButton>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {LANDING_HERO.trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 text-sm text-zinc-400"
                >
                  <Check className="h-3.5 w-3.5 text-[#4d7cff]" strokeWidth={2} />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <HeroGraphicCard />
            <HeroStatCard />
            <div className="sm:col-span-2">
              <HeroChartCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
