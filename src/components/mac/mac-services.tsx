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
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16">
          <h2 className="mac-heading-lg max-w-xl text-white">
            {LANDING_SOLUTIONS.heading}
          </h2>
          <div className="lg:pt-2">
            <p className="text-base leading-relaxed text-zinc-400">
              {LANDING_SOLUTIONS.description}
            </p>
            <Link href="#sistemas">
              <MacPillButton variant="outline" className="mt-6">
                {LANDING_SOLUTIONS.cta}
              </MacPillButton>
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {LANDING_SOLUTIONS.items.map((item) => (
            <article
              key={item.id}
              className="mac-card group relative flex flex-col p-8"
            >
              <div className="mb-8 flex items-center justify-between">
                <div
                  className={cn(
                    "h-3 w-3 rounded-sm",
                    ACCENT_COLORS[item.accent],
                  )}
                />
                <span className="text-xs text-zinc-500">{item.readTime}</span>
              </div>

              <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-white md:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 flex-grow text-sm leading-relaxed text-zinc-400">
                {item.excerpt}
              </p>

              <Link
                href={item.href}
                className={cn(
                  "mt-8 flex h-11 w-11 items-center justify-center self-end rounded-full transition-all",
                  item.isFeatured
                    ? "mac-gradient-bg text-white"
                    : "border border-white/15 text-white group-hover:border-white/30 group-hover:bg-white/[0.06]",
                )}
                aria-label={`Saiba mais sobre ${item.title}`}
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
