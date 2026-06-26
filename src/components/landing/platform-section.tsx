"use client";

import { AnimateOnScroll, SectionHeader } from "@/components/landing/motion";
import { PlatformCarousel } from "@/components/landing/platform-carousel";

export function PlatformSection() {
  return (
    <section id="plataforma" className="py-24 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"
        aria-hidden
      />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Plataforma"
          title={
            <>
              Uma plataforma,{" "}
              <span className="gradient-text-animated">visão completa</span>
            </>
          }
          description="Interface moderna e intuitiva que funciona perfeitamente em desktop e dispositivos móveis. Selecione um sistema para explorar."
        />

        <AnimateOnScroll direction="scale" duration={900}>
          <PlatformCarousel />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
