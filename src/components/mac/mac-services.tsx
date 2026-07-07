import { MacPillButton } from "@/components/mac/mac-pill-button";
import { LANDING_SOLUTIONS } from "@/lib/landing-data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ACCENT_COLORS = {
  blue: "bg-[#4d7cff]",
  orange: "bg-[#22d3ee]",
  purple: "bg-[#b456ff]",
} as const;

export function MacServices() {
  return (
    <section id="solucoes" className="mac-section">
      <div className="mac-container">
        <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-16">
          <h2 className="mac-heading-lg max-w-xl text-white">
            {LANDING_SOLUTIONS.heading}
          </h2>
          <div className="lg:pt-2">
            <p className="text-base leading-relaxed text-zinc-400">
              {LANDING_SOLUTIONS.description}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3 md:gap-6">
          {LANDING_SOLUTIONS.items.map((item) => (
            <article
              key={item.id}
              className="mac-card group relative flex flex-col p-5 sm:p-6 md:p-8"
            >
              <div className="mb-8">
                <div
                  className={cn(
                    "h-3 w-3 rounded-sm",
                    ACCENT_COLORS[item.accent],
                  )}
                />
              </div>

              <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-white md:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 flex-grow text-sm leading-relaxed text-zinc-400">
                {item.excerpt}
              </p>

              <Link
                href={item.href}
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#4d7cff] transition-colors hover:text-white"
              >
                {LANDING_SOLUTIONS.cta}
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
