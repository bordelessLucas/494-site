"use client";

import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function MacBackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 480);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
      className={cn(
        "safe-bottom fixed bottom-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#12121a]/95 text-white shadow-lg transition-all duration-300 sm:bottom-6 sm:left-6 sm:h-14 sm:w-14",
        "hover:border-white/25 hover:bg-[#1a1a24]",
        "outline-none focus-visible:ring-2 focus-visible:ring-[#4d7cff]/50",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={1.75} />
      <span className="sr-only">Voltar ao topo</span>
    </button>
  );
}
