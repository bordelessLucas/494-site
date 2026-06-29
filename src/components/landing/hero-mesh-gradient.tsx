"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const LERP = 0.04;
const MOUSE_INFLUENCE = 36;

export function HeroMeshGradient() {
  const prefersReducedMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const onMouseMove = (event: MouseEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;
      target.current = {
        x: nx * MOUSE_INFLUENCE,
        y: ny * MOUSE_INFLUENCE,
      };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let frameId = 0;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * LERP;
      current.current.y += (target.current.y - current.current.y) * LERP;
      setOffset({ x: current.current.x, y: current.current.y });
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className="absolute bottom-0 right-0 w-[min(720px,90vw)] h-[min(720px,70vh)] pointer-events-none z-[1] overflow-hidden"
      aria-hidden
    >
      <div
        className="hero-mesh absolute -bottom-1/4 -right-1/4 w-full h-full transition-transform duration-100 ease-out will-change-transform"
        style={{
          transform: prefersReducedMotion
            ? undefined
            : `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      />
    </div>
  );
}
