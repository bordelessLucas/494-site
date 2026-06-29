import type { Transition, Variants } from "framer-motion";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const motionTransition = (
  delay = 0,
  duration = 0.7,
): Transition => ({
  duration,
  delay,
  ease: EASE_OUT,
});

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeUpStaggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const directionVariants: Record<
  "up" | "down" | "left" | "right" | "fade" | "scale",
  Variants
> = {
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
};

export const floatKeyframes = {
  y: [0, -14, 0],
};

export const floatTransition = {
  duration: 7,
  ease: "easeInOut" as const,
  repeat: Infinity,
};

export const pulseSoftKeyframes = {
  opacity: [1, 0.4, 1],
};

export const pulseSoftTransition = {
  duration: 2,
  ease: "easeInOut" as const,
  repeat: Infinity,
};

export const scrollHintKeyframes = {
  y: [0, 8, 0],
  opacity: [0.6, 1, 0.6],
};

export const scrollHintTransition = {
  duration: 2,
  ease: "easeInOut" as const,
  repeat: Infinity,
};

export const inViewProps = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, margin: "-60px" as const, amount: 0.15 as const },
};
