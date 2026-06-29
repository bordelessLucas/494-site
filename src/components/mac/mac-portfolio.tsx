"use client";

import { ProductImage } from "@/components/ui/product-image";
import {
  LANDING_SYSTEM_FILTERS,
  LANDING_SYSTEMS,
  LANDING_SYSTEMS_HEADING,
} from "@/lib/landing-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

type FilterId = (typeof LANDING_SYSTEM_FILTERS)[number]["id"];

function SeeDetailsBadge() {
  return (
    <div className="flex h-[220px] w-[220px] flex-shrink-0 items-center justify-center rounded-full bg-white/[0.06] md:h-[260px] md:w-[260px]">
      <div className="mac-gradient-bg flex h-28 w-28 items-center justify-center rounded-full md:h-32 md:w-32">
        <span className="text-center text-sm font-semibold leading-tight text-white">
          Ver
          <br />
          detalhes
        </span>
      </div>
    </div>
  );
}

function SystemCard({
  title,
  description,
  image,
  imageAlt,
  href,
  tags,
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  tags: readonly string[];
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-[420px] min-w-[300px] flex-shrink-0 flex-col justify-end overflow-hidden rounded-[40px] border border-white/[0.08] md:min-w-[360px]"
    >
      <ProductImage
        src={image}
        alt={imageAlt}
        fill
        sizes="360px"
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

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
        <SeeDetailsBadge />
      </div>
    </Link>
  );
}

export function MacPortfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filteredSystems =
    activeFilter === "all"
      ? LANDING_SYSTEMS
      : LANDING_SYSTEMS.filter((s) => s.category === activeFilter);

  return (
    <section id="sistemas" className="mac-section">
      <div className="mac-container">
        <div className="overflow-hidden rounded-[40px] border border-white/[0.08] bg-[#0a0a10]/80 px-6 py-12 backdrop-blur-sm md:px-12 md:py-16 lg:px-16 lg:py-20">
          <h2 className="mac-heading-lg mx-auto max-w-3xl text-center text-white">
            {LANDING_SYSTEMS_HEADING}
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-2 md:mt-12">
            {LANDING_SYSTEM_FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-medium transition-all",
                  activeFilter === filter.id
                    ? "mac-gradient-bg text-white shadow-[0_4px_20px_-6px_rgba(77,124,255,0.5)]"
                    : "border border-white/15 text-zinc-400 hover:border-white/30 hover:text-white",
                )}
              >
                {filter.label} [{filter.count}]
              </button>
            ))}
          </div>

          <div className="mt-12 flex gap-5 overflow-x-auto pb-4 md:mt-14 md:gap-6">
            <div className="hidden min-w-[300px] flex-shrink-0 items-center justify-center md:flex md:min-w-[360px]">
              <SeeDetailsBadge />
            </div>
            {filteredSystems.map((system) => (
              <SystemCard
                key={system.id}
                title={system.title}
                description={system.description}
                image={system.image}
                imageAlt={system.imageAlt}
                href={system.href}
                tags={system.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
