"use client";

import { Button } from "@/components/ui/button";
import { LOGIN_URL, NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "glass-card-premium border-b border-white/10 shadow-lg shadow-black/30 backdrop-blur-2xl"
          : "bg-transparent border-b border-transparent",
      )}
      aria-label="Navegação principal"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-500/25">
            <span className="text-white font-bold text-sm">U</span>
          </div>
          <span className="font-display font-bold text-lg">Unique Gestor</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-gray-300 hover:text-white transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link href={LOGIN_URL}>
            <Button variant="ghost">Entrar</Button>
          </Link>
          <a href="#contato">
            <Button variant="gradient">Solicitar Demo</Button>
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden text-gray-300 p-2"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-white/5 bg-[#0A0A0F]/95 backdrop-blur-2xl animate-fade-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <Link href={LOGIN_URL} onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full">
                  Entrar
                </Button>
              </Link>
              <a
                href="#contato"
                onClick={() => setIsMenuOpen(false)}
                className="w-full"
              >
                <Button variant="gradient" className="w-full">
                  Solicitar Demo
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
