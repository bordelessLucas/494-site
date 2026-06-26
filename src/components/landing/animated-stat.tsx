"use client";

import { useInView } from "@/hooks/use-in-view";
import { useEffect, useMemo, useRef, useState } from "react";

interface AnimatedStatProps {
  value: string;
  label: string;
  delay?: number;
}

function parseNumericValue(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)([+%,]?)$/);
  if (!match) return null;
  return { target: parseFloat(match[1]), suffix: match[2] };
}

export function AnimatedStat({ value, label, delay = 0 }: AnimatedStatProps) {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const parsed = useMemo(() => parseNumericValue(value), [value]);
  const hasAnimated = useRef(false);
  const [displayValue, setDisplayValue] = useState(value);

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

  return (
    <div ref={ref} className="text-center group">
      <div className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl gradient-text mb-2 transition-transform duration-500 group-hover:scale-105">
        {displayValue}
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
}
