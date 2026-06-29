"use client";

import { Button } from "@/components/ui/button";
import { LineIcon } from "@/components/ui/icon";
import { HeroBackground } from "@/components/landing/hero-background";
import { HeroMeshGradient } from "@/components/landing/hero-mesh-gradient";
import { HeroTilt } from "@/components/landing/hero-tilt";
import { HERO_TRUST_BADGES } from "@/lib/data";
import {
  fadeUpStaggerVariants,
  fadeUpVariants,
  motionTransition,
  scrollHintKeyframes,
  scrollHintTransition,
} from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, CircleCheck, Zap } from "lucide-react";

const heroDelays = [0, 0.1, 0.2, 0.35, 0.5] as const;

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden [perspective:1200px]">
      <HeroBackground />
      <HeroMeshGradient />

      <motion.div
        className="relative z-10 container mx-auto px-4 text-center max-w-5xl"
        variants={prefersReducedMotion ? undefined : fadeUpStaggerVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        animate={prefersReducedMotion ? undefined : "visible"}
      >
        <motion.div variants={prefersReducedMotion ? undefined : fadeUpVariants}>
          <HeroTilt className="inline-block mb-10" maxTilt={6}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card-premium text-sm text-gray-500">
              <LineIcon icon={Zap} className="text-white/50" aria-hidden />
              Plataforma de Gestão Integrada
            </div>
          </HeroTilt>
        </motion.div>

        <motion.h1
          variants={prefersReducedMotion ? undefined : fadeUpVariants}
          transition={motionTransition(heroDelays[1])}
          className="heading-hero mb-8"
        >
          Gestão inteligente para{" "}
          <span className="gradient-text-animated">sua empresa</span> crescer
        </motion.h1>

        <motion.p
          variants={prefersReducedMotion ? undefined : fadeUpVariants}
          transition={motionTransition(heroDelays[2])}
          className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-12 body-relaxed"
        >
          Três soluções poderosas em uma única plataforma: Gestão Societária,
          Gestão de Contratos e Gestão de Escalas Médicas. Tudo integrado para
          simplificar sua operação.
        </motion.p>

        <motion.div
          variants={prefersReducedMotion ? undefined : fadeUpVariants}
          transition={motionTransition(heroDelays[3])}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <HeroTilt className="inline-block" maxTilt={8}>
            <a href="#contato">
              <Button variant="gradient" className="h-12 px-8 text-base gap-3">
                Agendar Demonstração
                <LineIcon
                  icon={ArrowRight}
                  className="text-[#050505]"
                  aria-hidden
                />
              </Button>
            </a>
          </HeroTilt>

          <HeroTilt className="inline-block" maxTilt={8}>
            <a href="#solucoes">
              <Button variant="outline" className="h-12 px-8 text-base">
                Conhecer Soluções
              </Button>
            </a>
          </HeroTilt>
        </motion.div>

        <motion.div
          variants={prefersReducedMotion ? undefined : fadeUpVariants}
          transition={motionTransition(heroDelays[4])}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-sm text-gray-600"
        >
          {HERO_TRUST_BADGES.map((item) => (
            <HeroTilt key={item} className="inline-block" maxTilt={5}>
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bento-card-dark">
                <LineIcon
                  icon={CircleCheck}
                  className="text-white/30"
                  aria-hidden
                />
                {item}
              </div>
            </HeroTilt>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#solucoes"
        variants={prefersReducedMotion ? undefined : fadeUpVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        animate={prefersReducedMotion ? undefined : "visible"}
        transition={motionTransition(heroDelays[4])}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors"
        aria-label="Rolar para as soluções"
      >
        <span className="text-xs uppercase tracking-widest">Explorar</span>
        <motion.span
          animate={prefersReducedMotion ? undefined : scrollHintKeyframes}
          transition={prefersReducedMotion ? undefined : scrollHintTransition}
        >
          <LineIcon icon={ChevronDown} className="text-gray-500" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
