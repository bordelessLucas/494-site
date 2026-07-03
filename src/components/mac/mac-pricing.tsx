"use client";

import { OpenDemoButton } from "@/components/demo/open-demo-button";
import { LANDING_PLANS } from "@/lib/landing-data";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function MacPricing() {
  return (
    <section id="planos" className="mac-section">
      <div className="mac-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mac-heading-lg text-white">
            Planos que cabem na sua operação
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Escolha o plano ideal para o tamanho e a complexidade da sua
            empresa. Todos incluem suporte e atualizações.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {LANDING_PLANS.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                "mac-card flex flex-col p-8",
                plan.popular && "ring-1 ring-[#4d7cff]/40",
              )}
            >
              {plan.popular && (
                <span className="mb-4 inline-flex w-fit rounded-full bg-[#4d7cff]/15 px-3 py-1 text-xs font-medium text-[#4d7cff]">
                  Mais Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-white">
                {plan.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold text-white">
                  {plan.price}
                </span>
                {plan.priceNote && (
                  <span className="text-sm text-zinc-500">{plan.priceNote}</span>
                )}
              </div>
              <p className="mt-3 text-sm text-zinc-500">{plan.description}</p>

              <ul className="mt-6 flex-grow space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-zinc-400"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#4d7cff]"
                      strokeWidth={2}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <OpenDemoButton
                variant={plan.popular ? "gradient" : "outline"}
                className="mt-8 w-full"
              >
                {plan.cta}
              </OpenDemoButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
