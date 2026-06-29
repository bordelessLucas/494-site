"use client";

import { LineIcon } from "@/components/ui/icon";
import { ProductImage } from "@/components/ui/product-image";
import { PLATFORM_SCREENS } from "@/lib/data";import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";import { useEffect, useRef, useState } from "react";

type Screen = (typeof PLATFORM_SCREENS)[number];

const TOTAL = PLATFORM_SCREENS.length;

function getSegmentBounds(index: number) {
  const segment = 1 / TOTAL;
  const start = index * segment;
  const end = (index + 1) * segment;
  const fade = segment * 0.22;
  return { start, end, fade };
}

function useScreenMotion(scrollYProgress: MotionValue<number>, index: number) {
  const { start, end, fade } = getSegmentBounds(index);
  const isFirst = index === 0;
  const isLast = index === TOTAL - 1;

  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [0, end - fade, end]
      : isLast
        ? [start, start + fade, 1]
        : [start, start + fade, end - fade, end],
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0],
  );

  const y = useTransform(
    scrollYProgress,
    isFirst
      ? [0, end]
      : isLast
        ? [start, start + fade, 1]
        : [start, start + fade, end - fade, end],
    isFirst ? [0, -32] : isLast ? [32, 0, 0] : [32, 0, 0, -32],
  );

  return { opacity, y };
}

function MockupFrame({
  screen,
  priority = false,
}: {
  screen: Screen;
  priority?: boolean;
}) {
  return (
    <>
      <div className="flex items-center gap-2 px-4 py-3 relative">
        <div className="divider-gradient absolute bottom-0 left-4 right-4" aria-hidden />
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 flex justify-center min-w-0">
          <div className="px-4 py-1 rounded-md bg-white/[0.03] text-[11px] text-gray-600 truncate">
            app.uniquegestor.com.br/{screen.urlPath}
          </div>
        </div>
      </div>
      <div className="relative aspect-[16/10] bg-[#0f0f12]">
        <ProductImage
          src={screen.image}
          alt={screen.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top opacity-90"
          priority={priority}
        />        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0f0f12]/50 via-transparent to-transparent pointer-events-none"
          aria-hidden
        />
      </div>
    </>
  );
}

function StickyMockupImage({
  screen,
  index,
  scrollYProgress,
}: {
  screen: Screen;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const { opacity, y } = useScreenMotion(scrollYProgress, index);

  return (
    <motion.div
      className="absolute inset-0 rounded-2xl overflow-hidden glass-card-premium"
      style={{ opacity, y }}
    >
      <MockupFrame screen={screen} priority={index === 0} />
    </motion.div>
  );
}

function StickyMockup({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <div className="relative w-full aspect-[16/10]">
      {PLATFORM_SCREENS.map((screen, index) => (
        <StickyMockupImage
          key={screen.slug}
          screen={screen}
          index={index}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function StaticMockup({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative w-full aspect-[16/10]">
      {PLATFORM_SCREENS.map((screen, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.div
            key={screen.slug}
            className="absolute inset-0 rounded-2xl overflow-hidden glass-card-premium"
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 16,
            }}
            transition={{ duration: 0.4 }}
          >
            <MockupFrame screen={screen} priority={index === 0} />
          </motion.div>
        );
      })}
    </div>
  );
}

function useActiveSection(refs: React.RefObject<(HTMLElement | null)[]>) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const elements = refs.current.filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          const index = elements.indexOf(visible[0].target as HTMLElement);
          if (index >= 0) setActiveIndex(index);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [refs]);

  return activeIndex;
}

export function PlatformStickyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const activeIndex = useActiveSection(sectionRefs);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="flex flex-col">
          {PLATFORM_SCREENS.map((screen, index) => (
              <article
                key={screen.slug}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="min-h-screen flex flex-col justify-center py-24 lg:py-32 my-8 lg:my-16"
                aria-label={screen.title}
              >
                <div className="lg:hidden mb-8">
                  <div className="relative rounded-2xl overflow-hidden glass-card-premium">
                    <MockupFrame screen={screen} priority={index === 0} />
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-600">
                    Sistema {index + 1} de {TOTAL}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>

                <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight mb-6">
                  {screen.title}
                </h3>

                <p className="text-gray-500 text-lg mb-8 max-w-lg">
                  {screen.description}
                </p>

                <Link
                  href={`/solucao/${screen.slug}`}
                  className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-white transition-colors group w-fit"
                >
                  Explorar {screen.title}
                  <LineIcon
                    icon={ChevronRight}
                    className="text-gray-600 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </article>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-col sticky top-20 h-[calc(100vh-5rem)] justify-center">
          {prefersReducedMotion ? (
            <StaticMockup activeIndex={activeIndex} />
          ) : (
            <StickyMockup scrollYProgress={scrollYProgress} />
          )}
        </div>
      </div>
    </div>
  );
}
