"use client";

import { ProductImage } from "@/components/ui/product-image";
import { LANDING_SYSTEMS } from "@/lib/landing-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const AUTOPLAY_MS = 5500;

type SystemItem = (typeof LANDING_SYSTEMS)[number];

function SystemCard({
  title,
  description,
  image,
  imageAlt,
  href,
  tags,
  isActive,
  isPriority,
}: SystemItem & { isActive: boolean; isPriority?: boolean }) {
  return (
    <Link
      href={href}
      tabIndex={isActive ? 0 : -1}
      aria-hidden={!isActive}
      className={cn(
        "group absolute inset-0 flex h-[420px] w-full flex-col justify-end overflow-hidden rounded-[40px] border border-white/[0.08] transition-[opacity,transform] duration-500 ease-out",
        isActive
          ? "pointer-events-auto z-10 translate-x-0 opacity-100"
          : "pointer-events-none z-0 translate-x-6 opacity-0",
      )}
    >
      <ProductImage
        src={image}
        alt={imageAlt}
        fill
        priority={isPriority}
        sizes="(max-width: 768px) 100vw, 80vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        skeletonClassName="rounded-[40px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/95 via-[#050508]/40 to-[#050508]/20" />

      <div className="relative z-10 p-8">
        <div className="mb-4 h-px w-12 bg-white/40" />
        <p className="text-sm text-white/75">
          — {tags.slice(0, 2).join(" · ")}
        </p>
        <h3 className="mt-3 font-display text-xl font-bold leading-snug text-white md:text-2xl">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-white/65">{description}</p>
      </div>
    </Link>
  );
}

export function SystemsCarousel({
  systems,
}: {
  systems: readonly SystemItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const hasMultipleSlides = systems.length > 1;

  const goToSlide = useCallback(
    (index: number) => {
      if (!hasMultipleSlides) return;
      setActiveIndex((index + systems.length) % systems.length);
    },
    [hasMultipleSlides, systems.length],
  );

  const goNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    if (!hasMultipleSlides || isPaused) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const timer = window.setInterval(goNext, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [goNext, hasMultipleSlides, isPaused]);

  return (
    <div
      className="mt-12 md:mt-14"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="relative h-[420px] overflow-hidden">
        {systems.map((system, index) => (
          <SystemCard
            key={system.id}
            {...system}
            isActive={index === activeIndex}
            isPriority={index === 0}
          />
        ))}
      </div>

      {hasMultipleSlides ? (
        <div
          className="mt-8 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Sistemas da plataforma"
        >
          {systems.map((system, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={system.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Ir para ${system.title}`}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  isActive
                    ? "w-10 mac-gradient-bg"
                    : "w-1.5 bg-white/20 hover:bg-white/35",
                )}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
