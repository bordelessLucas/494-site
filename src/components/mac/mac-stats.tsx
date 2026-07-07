import { LANDING_STATS } from "@/lib/landing-data";

export function MacStats() {
  return (
    <section className="mac-section">
      <div className="mac-container">
        <div className="mac-card grid grid-cols-2 gap-4 p-5 sm:gap-6 sm:p-8 md:grid-cols-4 md:gap-6 md:p-12">
          {LANDING_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-xs text-zinc-500 sm:mt-2 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
