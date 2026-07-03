import { LANDING_FEATURES } from "@/lib/landing-data";

export function MacFeatures() {
  return (
    <section id="funcionalidades" className="mac-section">
      <div className="mac-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mac-heading-lg text-white">
            Funcionalidades que fazem a diferença
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Cada detalhe foi pensado para eliminar retrabalho, reduzir riscos e
            dar visibilidade total à sua operação.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LANDING_FEATURES.map((feature, index) => (
            <article key={feature.title} className="mac-card p-7">
              <span className="font-display text-sm font-bold text-[#4d7cff]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
