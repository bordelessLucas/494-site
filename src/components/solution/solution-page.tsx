import { OpenDemoButton } from "@/components/demo/open-demo-button";
import { MacFooter } from "@/components/mac/mac-footer";
import { MacNavbar } from "@/components/mac/mac-navbar";
import { MacPillButton } from "@/components/mac/mac-pill-button";
import { MacWhatsApp } from "@/components/mac/mac-whatsapp";
import { getSolutionBySlug, type SOLUTIONS } from "@/lib/data";
import { getSolutionPageDetail } from "@/lib/solution-pages";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Solution = (typeof SOLUTIONS)[number];

export function SolutionPage({ solution }: { solution: Solution }) {
  const details = getSolutionPageDetail(solution.slug);
  if (!details) notFound();

  return (
    <div className="mac-page min-h-screen overflow-x-hidden">
      <div className="mac-page-ambient" aria-hidden>
        <div className="mac-orb mac-orb-blue" />
        <div className="mac-orb mac-orb-purple" />
      </div>
      <div className="mac-grain" aria-hidden />
      <div className="relative z-10">
        <MacNavbar />
        <main id="main-content">
          <section className="mac-section pt-4 sm:pt-6 md:pt-10">
            <div className="mac-container">
              <Link
                href="/#solucoes"
                className="mb-6 inline-block text-sm text-zinc-500 transition-colors hover:text-white sm:mb-8"
              >
                ← Voltar para soluções
              </Link>

              <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2">
                <div>
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-zinc-300 sm:px-4 sm:py-1.5 sm:text-xs">
                    {details.badge}
                  </span>
                  <h1 className="mac-heading-xl mt-4 text-white sm:mt-6">
                    {details.heroTitle}
                  </h1>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:mt-6 sm:text-base md:text-lg">
                    {details.heroSubtitle}
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                    <OpenDemoButton variant="gradient" className="w-full gap-2 px-6 sm:w-auto">
                      Solicitar Demonstração
                      <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                    </OpenDemoButton>
                    <Link href="#funcionalidades" className="w-full sm:w-auto">
                      <MacPillButton variant="outline" className="w-full px-6 sm:w-auto">
                        Ver Funcionalidades
                      </MacPillButton>
                    </Link>
                  </div>
                </div>

                <div className="mac-card relative overflow-hidden p-1.5 sm:p-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:rounded-[20px] md:rounded-[24px]">
                    <Image
                      src={solution.image}
                      alt={solution.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="funcionalidades" className="mac-section border-t border-white/[0.06]">
            <div className="mac-container">
              <h2 className="mac-heading-lg text-white">Funcionalidades</h2>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {details.features.map((feature, index) => (
                  <article key={feature.title} className="mac-card p-5 sm:p-6">
                    <span className="font-display text-sm font-bold text-[#4d7cff]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-bold text-white">
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

          <section className="mac-section border-t border-white/[0.06]">
            <div className="mac-container">
              <h2 className="mac-heading-lg text-white">{details.flowTitle}</h2>
              <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
                {details.flowSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="mac-card flex gap-4 p-5 sm:gap-5 sm:p-6"
                  >
                    <span className="font-display text-2xl font-bold text-[#4d7cff]">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {"highlights" in details &&
            details.highlights?.map((highlight) => (
              <section
                key={highlight.title}
                className="mac-section border-t border-white/[0.06]"
              >
                <div className="mac-container">
                  <div className="mac-card p-5 sm:p-8 md:p-12">
                    <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                      {highlight.title}
                    </h2>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </section>
            ))}

          {"audience" in details && details.audience && (
            <section className="mac-section border-t border-white/[0.06]">
              <div className="mac-container">
                <h2 className="mac-heading-lg text-white">{details.audienceTitle}</h2>
                <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2">
                  {details.audience.map((item) => (
                    <article key={item.segment} className="mac-card p-5 sm:p-6">
                      <h3 className="font-display text-lg font-bold text-white">
                        {item.segment}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="mac-section border-t border-white/[0.06]">
            <div className="mac-container text-center">
              <h2 className="mac-heading-lg text-white">{details.ctaTitle}</h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
                {details.ctaSubtitle}
              </p>
              <OpenDemoButton variant="gradient" className="mt-6 w-full gap-2 px-8 sm:mt-8 sm:w-auto">
                Agendar Demonstração Gratuita
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </OpenDemoButton>
            </div>
          </section>
        </main>
        <MacFooter />
        <MacWhatsApp />
      </div>
    </div>
  );
}

export function resolveSolution(slug: string) {
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();
  return solution;
}
