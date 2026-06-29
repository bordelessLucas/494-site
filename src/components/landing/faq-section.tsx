"use client";

import { LineIcon } from "@/components/ui/icon";
import { AnimateOnScroll, SectionHeader } from "@/components/landing/motion";
import { FAQ_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-spacing relative">
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

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <AnimateOnScroll key={item.question} delay={index * 60}>
                <div className="glass-card-premium rounded-2xl overflow-hidden transition-colors duration-300 hover:bg-white/[0.02]">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-semibold text-base tracking-tight pr-6">
                      {item.question}
                    </span>
                  <LineIcon
                    icon={ChevronDown}
                    className={cn(
                      "text-gray-600 transition-transform duration-300",
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
                    <div className="px-6 md:px-8 pb-6 md:pb-8 text-gray-500 text-sm body-relaxed">
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
