"use client";

import { AnimateOnScroll, SectionHeader } from "@/components/landing/motion";
import { FAQ_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 relative">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none"
        aria-hidden
      />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="FAQ"
          title={
            <>
              Perguntas{" "}
              <span className="gradient-text-animated">Frequentes</span>
            </>
          }
          description="Tire suas dúvidas sobre a plataforma Unique Gestor."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <AnimateOnScroll key={item.question} delay={index * 60}>
              <div
                className="glass-card-premium rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/[0.04] hover:border-white/15"
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-medium text-base pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-out",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
