"use client";

import { LANDING_TESTIMONIALS } from "@/lib/landing-data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function MacTestimonial() {
  const [index, setIndex] = useState(0);
  const total = LANDING_TESTIMONIALS.length;
  const current = LANDING_TESTIMONIALS[index];

  const goPrev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  const pageLabel = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  return (
    <section id="depoimentos" className="mac-section">
      <div className="mac-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mac-heading-lg text-white">Quem usa, recomenda</h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Veja como a Unique Gestor está transformando a gestão de empresas em
            todo o Brasil.
          </p>
        </div>

        <blockquote className="mx-auto mt-8 max-w-5xl font-display text-xl font-bold leading-snug tracking-tight text-white sm:mt-12 sm:text-2xl md:text-3xl lg:text-4xl">
          &ldquo;{current.quote}&rdquo;
        </blockquote>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:mt-14 sm:flex-row sm:items-end sm:gap-8">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-white/15">
              <Image
                key={current.avatar}
                src={current.avatar}
                alt={`Foto de ${current.name}`}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-white">
                {current.name}
              </p>
              <p className="text-sm text-zinc-500">{current.role}</p>
            </div>
          </div>

          <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-start">
            <button
              type="button"
              onClick={goPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:h-12 sm:w-12"
              aria-label="Depoimento anterior"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            </button>

            <p className="min-w-[4.5rem] text-center text-sm text-white">
              <span className="font-bold underline decoration-[#4d7cff] underline-offset-4">
                {pageLabel}
              </span>
              <span className="text-zinc-500">/{totalLabel}</span>
            </p>

            <button
              type="button"
              onClick={goNext}
              className="mac-gradient-bg flex h-11 w-11 items-center justify-center rounded-full text-white transition-opacity hover:opacity-90 sm:h-12 sm:w-12"
              aria-label="Próximo depoimento"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
