"use client";

import { OpenDemoButton } from "@/components/demo/open-demo-button";
import { MacPillButton } from "@/components/mac/mac-pill-button";
import { UniqueLogo } from "@/components/mac/mac-logo";
import { LANDING_LOGIN_URL, LANDING_NAV_LINKS } from "@/lib/landing-data";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function MacNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color] duration-300",
        isScrolled && "border-b border-white/[0.06] bg-[#050508]/92",
      )}
    >
      <div className="mac-container flex h-14 items-center justify-between gap-3 sm:h-16 md:h-[72px]">
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
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href={LANDING_LOGIN_URL}>
            <MacPillButton variant="ghost" className="px-4">
              Acessar Plataforma
            </MacPillButton>
          </Link>
          <OpenDemoButton variant="gradient" className="px-5">
            Solicitar Demonstração
          </OpenDemoButton>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 lg:hidden"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" strokeWidth={1.75} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.75} />
          )}
        </button>
      </div>

      {isMobileOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-14 z-30 bg-black/50 lg:hidden sm:top-16 md:top-[72px]"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Fechar menu"
          />
          <div className="fixed inset-x-0 top-14 z-40 max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b border-white/[0.06] bg-[#050508]/98 backdrop-blur-xl sm:top-16 md:top-[72px] lg:hidden">
            <nav className="mac-container flex flex-col gap-1 py-4 pb-6" aria-label="Mobile">
            {LANDING_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3.5 text-base text-zinc-200 transition-colors active:bg-white/[0.06]"
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={LANDING_LOGIN_URL}
              className="rounded-xl px-3 py-3.5 text-base text-zinc-200 transition-colors active:bg-white/[0.06]"
              onClick={() => setIsMobileOpen(false)}
            >
              Acessar Plataforma
            </Link>
            <div className="mt-4 border-t border-white/[0.06] pt-6">
              <OpenDemoButton
                variant="gradient"
                className="w-full"
                onClick={() => setIsMobileOpen(false)}
              >
                Solicitar Demonstração
              </OpenDemoButton>
            </div>
          </nav>
        </div>
        </>
      )}
    </header>
  );
}
