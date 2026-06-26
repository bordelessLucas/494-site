import { AnimatedStat } from "@/components/landing/animated-stat";
import { AnimateOnScroll } from "@/components/landing/motion";
import { STATS } from "@/lib/data";

export function StatsSection() {
  return (
    <section className="py-20 relative border-y border-white/5 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-purple-950/20 to-blue-950/20 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 80px)",
        }}
        aria-hidden
      />
      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <AnimatedStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
                delay={index * 150}
              />
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
