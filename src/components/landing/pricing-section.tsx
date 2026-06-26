import { Button } from "@/components/ui/button";
import { AnimateOnScroll, SectionHeader } from "@/components/landing/motion";
import { PLANS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

export function PricingSection() {
  return (
    <section id="planos" className="py-24 relative">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none"
        aria-hidden
      />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan, index) => (
            <AnimateOnScroll key={plan.name} delay={index * 120}>
              <div
                className={cn(
                  "rounded-2xl p-6 flex flex-col h-full transition-all duration-500 hover:-translate-y-1",
                  plan.popular
                    ? "border-glow bg-gradient-to-b from-blue-950/40 to-purple-950/20 glow-blue scale-[1.02] md:scale-105"
                    : "glass-card-premium hover:border-white/20 card-shine",
                )}
              >
                {plan.popular && (
                  <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
                    Mais Popular
                  </div>
                )}
                <h3 className="font-display font-bold text-xl mb-1">
                  {plan.name}
                </h3>
                <div className="font-display font-bold text-2xl mb-1 gradient-text-animated">
                  {plan.price}
                </div>
                <p className="text-gray-500 text-xs mb-2">{plan.priceNote}</p>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <CircleCheck
                        className="w-4 h-4 text-green-400 shrink-0"
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
