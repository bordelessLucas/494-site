"use client";

import { OpenDemoButton } from "@/components/demo/open-demo-button";
import { UniqueLogo } from "@/components/mac/mac-logo";
import { LANDING_NAV_LINKS } from "@/lib/landing-data";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function MacNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrolled = window.scrollY > 12;
        setIsScrolled((prev) => (prev === scrolled ? prev : scrolled));
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color] duration-300",
        isScrolled && "border-b border-white/[0.06] bg-[#050508]/92",
      )}
    >
      <div className="mac-container flex h-[72px] items-center justify-between gap-8">
        <Link href="/" aria-label="Unique Gestor — Início">
          <UniqueLogo />
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex xl:gap-8"
          aria-label="Principal"
        >
          {LANDING_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
              {link.hasDropdown && (
                <ChevronDown className="h-3.5 w-3.5 opacity-60" strokeWidth={2} />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <OpenDemoButton variant="gradient" className="px-5">
            Solicitar demo
          </OpenDemoButton>
        </div>
      </div>
    </header>
  );
}
