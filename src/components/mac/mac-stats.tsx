import { LANDING_STATS } from "@/lib/landing-data";

export function MacStats() {
  return (
    <section className="mac-section">
      <div className="mac-container">
        <div className="mac-card grid grid-cols-2 gap-8 p-8 md:grid-cols-4 md:gap-6 md:p-12">
          {LANDING_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
