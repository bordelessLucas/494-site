"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type SpringOptions,
} from "framer-motion";
import { type MouseEvent, type ReactNode, useCallback, useRef } from "react";

const DEFAULT_SPRING: SpringOptions = {
  stiffness: 180,
  damping: 22,
  mass: 0.6,
};

interface HeroTiltProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  spring?: SpringOptions;
}

export function HeroTilt({
  children,
  className,
  maxTilt = 7,
  spring = DEFAULT_SPRING,
}: HeroTiltProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const targetRotateX = useMotionValue(0);
  const targetRotateY = useMotionValue(0);

  const rotateX = useSpring(targetRotateX, spring);
  const rotateY = useSpring(targetRotateY, spring);

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const element = ref.current;
      if (!element || prefersReducedMotion) return;

      const rect = element.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

      targetRotateY.set(offsetX * maxTilt * 2);
      targetRotateX.set(-offsetY * maxTilt * 2);
    },
    [maxTilt, prefersReducedMotion, targetRotateX, targetRotateY],
  );

  const handleMouseLeave = useCallback(() => {
    targetRotateX.set(0);
    targetRotateY.set(0);
  }, [targetRotateX, targetRotateY]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}
