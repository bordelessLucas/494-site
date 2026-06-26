"use client";

import { PLATFORM_SCREENS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Splide, SplideSlide, type SplideComponent } from "@splidejs/react-splide";
import type { Options } from "@splidejs/splide";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import "@splidejs/react-splide/css/core";

const colorMap = {
  amber: {
    glow: "shadow-amber-500/20",
    border: "border-amber-500/40",
    ring: "ring-amber-500/30",
  },
  blue: {
    glow: "shadow-blue-500/20",
    border: "border-blue-500/40",
    ring: "ring-blue-500/30",
  },
  green: {
    glow: "shadow-green-500/20",
    border: "border-green-500/40",
    ring: "ring-green-500/30",
  },
} as const;

const primaryOptions: Options = {
  type: "fade",
  rewind: true,
  pagination: false,
  arrows: false,
  cover: true,
  speed: 600,
  drag: true,
};

const thumbnailOptions: Options = {
  rewind: true,
  fixedWidth: 120,
  fixedHeight: 72,
  isNavigation: true,
  gap: 12,
  focus: "center",
  pagination: false,
  cover: true,
  arrows: false,
  breakpoints: {
    640: {
      fixedWidth: 88,
      fixedHeight: 52,
      gap: 8,
    },
  },
};

export function PlatformCarousel() {
  const primaryRef = useRef<SplideComponent | null>(null);
  const thumbnailRef = useRef<SplideComponent | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeScreen = PLATFORM_SCREENS[activeIndex];
  const activeColors = colorMap[activeScreen.color];

  useEffect(() => {
    const primary = primaryRef.current?.splide;
    const thumbnail = thumbnailRef.current?.splide;

    if (!primary || !thumbnail) return;

    primary.sync(thumbnail);

    const onMoved = () => {
      setActiveIndex(primary.index);
    };

    primary.on("moved", onMoved);
    return () => {
      primary.off("moved");
    };
  }, []);

  return (
    <div className="platform-splide relative max-w-5xl mx-auto">
      <div
        className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl opacity-60 animate-pulse-soft"
        aria-hidden
      />

      <div
        className={cn(
          "relative rounded-2xl overflow-hidden border border-white/10 glow-purple glass-card-premium transition-shadow duration-500 animate-float",
          activeColors.glow,
        )}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 flex justify-center min-w-0">
            <div className="px-4 py-1 rounded-md bg-white/5 text-xs text-gray-500 border border-white/5 truncate max-w-[280px] sm:max-w-none transition-all duration-500">
              app.uniquegestor.com.br/{activeScreen.urlPath}
            </div>
          </div>
        </div>

        <Splide
          ref={primaryRef}
          options={primaryOptions}
          className="platform-splide__primary"
          aria-label="Visualização dos sistemas"
        >
          {PLATFORM_SCREENS.map((screen, index) => (
            <SplideSlide key={screen.slug}>
              <div className="relative aspect-[16/10] bg-[#0A0A0F]">
                <Image
                  src={screen.image}
                  alt={screen.imageAlt}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1024px"
                  className="object-cover object-top"
                  priority={index === 0}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/50 via-transparent to-transparent pointer-events-none"
                  aria-hidden
                />
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto pointer-events-none">
                  <p className="font-display font-semibold text-white text-sm sm:text-base drop-shadow-lg">
                    {screen.title}
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm mt-0.5 max-w-md drop-shadow-md hidden sm:block">
                    {screen.description}
                  </p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      <Splide
        ref={thumbnailRef}
        options={thumbnailOptions}
        className="platform-splide__thumbnails mt-6"
        aria-label="Selecionar sistema"
      >
        {PLATFORM_SCREENS.map((screen) => {
          const colors = colorMap[screen.color];
          return (
            <SplideSlide key={screen.slug}>
              <div
                className={cn(
                  "relative w-full h-full rounded-lg overflow-hidden border-2 border-transparent transition-all duration-200",
                  colors.border,
                )}
              >
                <Image
                  src={screen.image}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover object-top"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-[#0A0A0F]/40" aria-hidden />
                <span className="absolute bottom-1 left-0 right-0 text-center text-[10px] sm:text-xs font-medium text-white px-1 truncate drop-shadow-md">
                  {screen.title.split(" ")[0]}
                </span>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>

      <div className="mt-6 text-center">
        <Link
          href={`/solucao/${activeScreen.slug}`}
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors group"
        >
          Explorar {activeScreen.title}
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
