"use client";

import { LANDING_FAQ_ITEMS } from "@/lib/landing-data";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export function MacFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mac-section">
      <div className="mac-container">
        <div className="mac-card grid grid-cols-1 gap-8 p-5 sm:gap-10 sm:p-6 md:p-12 lg:grid-cols-2 lg:gap-20 lg:p-16">
          <div>
            <h2 className="mac-heading-lg text-white">Perguntas Frequentes</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-400">
              Tire suas dúvidas sobre a plataforma, implementação e suporte.
            </p>
          </div>

          <div className="divide-y divide-white/[0.08]">
            {LANDING_FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={item.question} className="py-5 first:pt-0">
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base font-semibold text-white md:text-lg">
                      {item.question}
                    </span>
                    <span className="mt-0.5 flex-shrink-0 text-zinc-400">
                      {isOpen ? (
                        <Minus className="h-5 w-5" strokeWidth={1.5} />
                      ) : (
                        <Plus className="h-5 w-5" strokeWidth={1.5} />
                      )}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <p className="pt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
