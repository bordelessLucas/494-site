"use client";

import { OpenDemoButton } from "@/components/demo/open-demo-button";
import { UniqueLogo } from "@/components/mac/mac-logo";
import { LANDING_LOGIN_URL, LANDING_NAV_LINKS } from "@/lib/landing-data";
import { cn } from "@/lib/utils";
import { Bell, ChevronDown } from "lucide-react";
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
          <Link href={LANDING_LOGIN_URL}>
            <span className="hidden text-sm text-zinc-400 transition-colors hover:text-white sm:inline">
              Entrar
            </span>
          </Link>
          <OpenDemoButton variant="gradient" className="hidden px-5 sm:inline-flex">
            Solicitar demo
          </OpenDemoButton>
          <Link href="#contato">
            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition-colors hover:bg-white/10"
              aria-label="Ir para contato"
            >
              <Bell className="h-4 w-4" strokeWidth={1.5} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border border-[#050508] bg-mac-lime" />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
