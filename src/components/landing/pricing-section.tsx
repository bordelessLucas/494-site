import { Button } from "@/components/ui/button";
import { LineIcon } from "@/components/ui/icon";
import { AnimateOnScroll, SectionHeader } from "@/components/landing/motion";
import { PLANS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

export function PricingSection() {
  return (
    <section id="planos" className="section-spacing relative">
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Planos"
          title={
            <>
              Planos que{" "}
              <span className="gradient-text-animated">cabem no seu negócio</span>
            </>
          }
          description="Escolha o plano ideal para a sua operação. Todos incluem atualizações e suporte."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan, index) => (
            <AnimateOnScroll key={plan.name} delay={index * 120}>
              <div
                className={cn(
                  "rounded-2xl p-8 flex flex-col h-full transition-transform duration-500 hover:-translate-y-1",
                  plan.popular
                    ? "glass-card-premium glow-blue"
                    : "glass-card-premium",
                )}
              >
                {plan.popular && (
                  <div className="text-[11px] font-medium text-white/50 uppercase tracking-[0.2em] mb-4">
                    Mais Popular
                  </div>
                )}
                <h3 className="font-display font-bold text-xl tracking-tight mb-2">
                  {plan.name}
                </h3>
                <div className="font-display font-bold text-2xl mb-1 gradient-text">
                  {plan.price}
                </div>
                <p className="text-gray-600 text-xs mb-2">{plan.priceNote}</p>
                <p className="text-gray-500 text-sm mb-8">{plan.description}</p>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-gray-400"
                    >
                      <LineIcon
                        icon={CircleCheck}
                        className="text-white/30"
                        aria-hidden
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="#contato" className="w-full">
                  <Button
                    variant={plan.popular ? "gradient" : "default"}
                    className="w-full"
                  >
                    Falar com Consultor
                  </Button>
                </a>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
