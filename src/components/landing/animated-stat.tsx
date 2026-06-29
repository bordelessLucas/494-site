"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";

interface AnimatedStatProps {
  value: string;
  label: string;
  delay?: number;
  className?: string;
}

function parseNumericValue(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)([+%,]?)$/);
  if (!match) return null;
  return { target: parseFloat(match[1]), suffix: match[2] };
}

export function AnimatedStat({
  value,
  label,
  delay = 0,
  className,
}: AnimatedStatProps) {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const parsed = useMemo(() => parseNumericValue(value), [value]);
  const hasAnimated = useRef(false);
  const [displayValue, setDisplayValue] = useState(value);
  const [isMounted, setIsMounted] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    setIsContentVisible(true);
  }, [isInView]);

  useEffect(() => {
    if (!parsed) {
      setDisplayValue(value);
      return;
    }

    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const { target, suffix } = parsed;
    const duration = 1800;
    const startTime = performance.now() + delay;
    let frameId = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      if (elapsed < 0) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = target * eased;

      const formatted =
        target % 1 !== 0
          ? current.toFixed(1)
          : Math.round(current).toString();

      setDisplayValue(`${formatted}${suffix}`);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    setDisplayValue(`0${suffix}`);
    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [isInView, parsed, delay, value]);

  const showSkeleton = !isMounted || !isContentVisible;

  return (
    <article
      ref={ref}
      className={cn(
        "bento-card-dark min-h-[160px] p-6 md:p-8 grid grid-rows-[1fr_auto] gap-4 relative",
        className,
      )}
    >
      {showSkeleton && (
        <div className="absolute inset-0 z-10 p-6 md:p-8 grid grid-rows-[1fr_auto] gap-4">
          <Skeleton className="h-12 md:h-14 w-28 md:w-32 rounded-2xl self-end" />
          <Skeleton className="h-3 w-36 md:w-40 rounded-full" />
        </div>
      )}

      <div
        className={cn(
          "font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-white self-end leading-none transition-opacity duration-500",
          showSkeleton ? "opacity-0" : "opacity-100",
        )}
      >
        {displayValue}
      </div>
      <div
        className={cn(
          "text-xs font-medium text-gray-500 uppercase tracking-[0.15em] transition-opacity duration-500",
          showSkeleton ? "opacity-0" : "opacity-100",
        )}
      >
        {label}
      </div>
    </article>
  );
}
