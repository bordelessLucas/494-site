import { LANDING_INTRO } from "@/lib/landing-data";
import { Play } from "lucide-react";

function IntroStatCard() {
  return (
    <div className="mac-card-dark relative flex min-h-[300px] flex-col justify-between overflow-hidden p-8 md:min-h-[340px] md:p-10">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#4d7cff]/20 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-2/3 bg-gradient-to-bl from-[#b456ff]/15 via-transparent to-transparent"
        aria-hidden
      />

      <div className="relative">
        <p className="font-display text-6xl font-bold tracking-tight text-white md:text-7xl">
          {LANDING_INTRO.statValue}
          <span className="text-mac-lime">+</span>
        </p>
        <p className="mt-3 text-sm text-zinc-500">{LANDING_INTRO.statSubtext}</p>
      </div>

      <div className="relative flex items-center">
        <div className="flex -space-x-3">
          {["S", "G", "C", "E"].map((letter) => (
            <div
              key={letter}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0c0c14] bg-white/10 text-xs font-bold text-white"
            >
              {letter}
            </div>
          ))}
        </div>
        <div className="ml-1 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0c0c14] bg-white/[0.06] text-sm text-white">
          +
        </div>
      </div>
    </div>
  );
}

export function MacIntro() {
  return (
    <section id="empresa" className="mac-section">
      <div className="mac-container">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-2 lg:gap-16">
          <h2 className="mac-heading-lg text-white">{LANDING_INTRO.heading}</h2>
          <p className="text-base leading-relaxed text-zinc-400 md:text-lg">
            {LANDING_INTRO.description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-[2fr_3fr] md:gap-6">
          <IntroStatCard />

          <div className="mac-card-muted relative flex min-h-[300px] items-center justify-center overflow-visible md:min-h-[340px]">
            <p className="font-display text-3xl font-bold uppercase tracking-[0.25em] text-white/90 md:text-4xl lg:text-5xl">
              {LANDING_INTRO.videoLabel}
            </p>
            <button
              type="button"
              className="mac-gradient-bg absolute -bottom-4 -right-2 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-[5px] border-[#050508] text-white shadow-[0_8px_32px_-8px_rgba(77,124,255,0.55)] transition-transform hover:scale-105 md:-bottom-5 md:-right-4 md:h-20 md:w-20"
              aria-label="Assistir vídeo"
            >
              <Play className="h-5 w-5 fill-current md:h-6 md:w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
