"use client";

import {
  directionVariants,
  EASE_OUT,
  inViewProps,
  motionTransition,
  pulseSoftKeyframes,
  pulseSoftTransition,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
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

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 700,
  once = true,
}: AnimateOnScrollProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("will-change-[transform,opacity]", className)}
      variants={directionVariants[direction]}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once, margin: "-60px", amount: 0.15 }}
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: EASE_OUT,
      }}
    >
      {children}
    </motion.div>
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
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("text-center mb-20 md:mb-24", className)}
      variants={directionVariants.up}
      transition={motionTransition()}
      {...(prefersReducedMotion ? {} : inViewProps)}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-premium text-[11px] font-medium text-gray-500 uppercase tracking-[0.2em] mb-8">
          <motion.span
            className="w-1 h-1 rounded-full bg-white/40"
            animate={prefersReducedMotion ? undefined : pulseSoftKeyframes}
            transition={prefersReducedMotion ? undefined : pulseSoftTransition}
          />
          {badge}
        </div>
      )}
      <h2 className="heading-section tracking-tight mb-6">
        {title}
      </h2>
      <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto body-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
