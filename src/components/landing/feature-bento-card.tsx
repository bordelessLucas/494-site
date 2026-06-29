"use client";

import { directionVariants, EASE_OUT, inViewProps } from "@/lib/motion";
import { LineIcon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  FileText,
  Globe,
  Shield,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

const iconMap = {
  shield: Shield,
  zap: Zap,
  chart: BarChart3,
  users: Users,
  globe: Globe,
  file: FileText,
} as const satisfies Record<string, LucideIcon>;

type FeatureIcon = keyof typeof iconMap;

interface FeatureBentoCardProps {
  title: string;
  description: string;
  icon: FeatureIcon;
  index: number;
  isFeatured?: boolean;
  className?: string;
}

export function FeatureBentoCard({
  title,
  description,
  icon,
  index,
  isFeatured = false,
  className,
}: FeatureBentoCardProps) {
  const Icon = iconMap[icon];
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className={cn(
        "h-full min-h-[200px]",
        isFeatured ? "bento-card-featured" : "bento-card-dark",
        className,
      )}
      variants={directionVariants.up}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={inViewProps.viewport}
      transition={{
        duration: 0.7,
        delay: index * 0.06,
        ease: EASE_OUT,
      }}
    >
      <div
        className={cn(
          "relative z-[1] h-full p-6 md:p-8 flex flex-col",
          isFeatured && "lg:p-10",
        )}
      >
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#141416] border border-[#1c1c1f]">
          <LineIcon
            icon={Icon}
            className={isFeatured ? "text-white/70" : "text-white/45"}
            aria-hidden
          />
        </div>

        <h3
          className={cn(
            "font-display font-bold tracking-tight mb-3",
            isFeatured ? "text-xl lg:text-2xl" : "text-lg",
          )}
        >
          {title}
        </h3>

        <p
          className={cn(
                "text-gray-500 mt-auto",
            isFeatured ? "text-sm lg:text-base" : "text-sm",
          )}
        >
          {description}
        </p>
      </div>
    </motion.article>
  );
}
