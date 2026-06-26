"use client";

import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";
import { type ReactNode } from "react";

type AnimationDirection = "up" | "down" | "left" | "right" | "fade" | "scale";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: AnimationDirection;
  duration?: number;
  once?: boolean;
}

const hiddenTransforms: Record<AnimationDirection, string> = {
  up: "translate-y-10",
  down: "-translate-y-10",
  left: "translate-x-10",
  right: "-translate-x-10",
  fade: "",
  scale: "scale-[0.96]",
};

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 700,
  once = true,
}: AnimateOnScrollProps) {
  const { ref, isInView } = useInView({ once });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[transform,opacity]",
        isInView
          ? "opacity-100 translate-x-0 translate-y-0 scale-100"
          : cn("opacity-0", hiddenTransforms[direction]),
        className,
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: ReactNode;
  description: string;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <AnimateOnScroll className={cn("text-center mb-16", className)}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-premium text-xs font-medium text-gray-400 uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-soft" />
          {badge}
        </div>
      )}
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4 tracking-tight">
        {title}
      </h2>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </AnimateOnScroll>
  );
}
