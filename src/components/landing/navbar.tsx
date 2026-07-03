"use client";

import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/data";
import { fadeUpVariants, motionTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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
          ? "glass-card-premium gradient-border-b backdrop-blur-xl bg-[#0f0f12]/60"
          : "bg-transparent",
      )}
      aria-label="Navegação principal"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-7 h-7 rounded-md gradient-border bg-white/[0.04] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <span className="text-white/80 font-bold text-xs">U</span>
          </div>
          <span className="font-display font-bold text-base tracking-tight">
            Unique Gestor
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-500 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href="#contato">
            <Button variant="gradient">Solicitar Demo</Button>
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden text-gray-400 p-2"
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
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          className="lg:hidden gradient-border-b bg-[#0f0f12]/95 backdrop-blur-xl"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={motionTransition()}
        >
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 relative">
              <div className="divider-gradient absolute top-0 left-0 right-0" />
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
        </motion.div>
      )}
    </nav>
  );
}
