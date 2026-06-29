import { AnimatedStat } from "@/components/landing/animated-stat";
import { AnimateOnScroll } from "@/components/landing/motion";
import { STATS } from "@/lib/data";

export function StatsSection() {
  return (
    <section className="section-spacing relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll>
          <div className="bento-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
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
