"use client";

import { cn } from "@/lib/utils";
import type { TourHotspot } from "@/lib/tour-data";
import { motion, useReducedMotion } from "framer-motion";

type TourHotspotMarkerProps = {
  hotspot: TourHotspot;
  accentHex: string;
  isActive: boolean;
  onSelect: (id: string) => void;
};

export function TourHotspotMarker({
  hotspot,
  accentHex,
  isActive,
  onSelect,
}: TourHotspotMarkerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <button
      type="button"
      aria-label={`Saiba mais: ${hotspot.title}`}
      aria-pressed={isActive}
      onClick={() => onSelect(hotspot.id)}
      className={cn(
        "absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none",
        "focus-visible:ring-2 focus-visible:ring-white/50",
      )}
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
    >
      {!prefersReducedMotion && !isActive && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: accentHex }}
          animate={{ scale: [1, 2.2], opacity: [0.45, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span
        className={cn(
          "relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-white shadow-lg transition-transform",
          isActive && "scale-110",
        )}
        style={{ backgroundColor: accentHex }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
      </span>
    </button>
  );
}
