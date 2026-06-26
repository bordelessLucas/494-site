import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/landing/hero-background";
import { HERO_TRUST_BADGES } from "@/lib/data";
import { ArrowRight, ChevronDown, CircleCheck, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <HeroBackground />

      <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-premium text-sm text-gray-300 mb-8 border-glow">
            <Zap className="w-4 h-4 text-green-400" aria-hidden />
            Plataforma de Gestão Integrada
          </div>
        </div>

        <h1 className="animate-fade-up-delay-1 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 tracking-tight">
          Gestão inteligente para{" "}
          <span className="gradient-text-animated">sua empresa</span> crescer
        </h1>

        <p className="animate-fade-up-delay-2 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Três soluções poderosas em uma única plataforma: Gestão Societária,
          Gestão de Contratos e Gestão de Escalas Médicas. Tudo integrado para
          simplificar sua operação.
        </p>

        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contato">
            <Button
              variant="gradient"
              className="h-12 px-8 text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              Agendar Demonstração
              <ArrowRight className="ml-1 w-5 h-5" aria-hidden />
            </Button>
          </a>
          <a href="#solucoes">
            <Button
              variant="outline"
              className="h-12 px-8 text-base hover:bg-white/10 hover:border-white/20"
            >
              Conhecer Soluções
            </Button>
          </a>
        </div>

        <div className="animate-fade-up-delay-4 mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-gray-500">
          {HERO_TRUST_BADGES.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CircleCheck
                className="w-4 h-4 text-green-400 shrink-0"
                aria-hidden
              />
              {item}
            </div>
          ))}
        </div>
      </div>

      <a
        href="#solucoes"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors animate-fade-up-delay-4"
        aria-label="Rolar para as soluções"
      >
        <span className="text-xs uppercase tracking-widest">Explorar</span>
        <ChevronDown className="w-5 h-5 animate-scroll-hint" aria-hidden />
      </a>
    </section>
  );
}
