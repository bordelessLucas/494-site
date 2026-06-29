"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type MacPillVariant = "dark" | "light" | "outline" | "lime" | "gradient" | "ghost";

interface MacPillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: MacPillVariant;
}

const variants: Record<MacPillVariant, string> = {
  gradient:
    "mac-gradient-bg text-white hover:opacity-90 shadow-[0_8px_32px_-8px_rgba(77,124,255,0.55)]",
  dark: "bg-white/10 text-white border border-white/10 hover:bg-white/[0.14]",
  light: "bg-white text-[#050508] hover:bg-white/90",
  outline:
    "bg-transparent text-white border border-white/20 hover:border-white/35 hover:bg-white/[0.04]",
  ghost:
    "bg-transparent text-white/90 border border-white/25 hover:bg-white/[0.06]",
  lime: "bg-mac-lime text-[#050508] hover:bg-mac-lime/90 font-semibold",
};

export const MacPillButton = forwardRef<HTMLButtonElement, MacPillButtonProps>(
  ({ className, variant = "gradient", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200",
        "outline-none focus-visible:ring-2 focus-visible:ring-[#4d7cff]/50",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  ),
);

MacPillButton.displayName = "MacPillButton";
