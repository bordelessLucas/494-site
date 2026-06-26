import { Button } from "@/components/ui/button";
import { AnimateOnScroll, SectionHeader } from "@/components/landing/motion";
import { SOLUTIONS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const colorMap = {
  amber: {
    card: "from-amber-500/20 to-amber-600/5 border-amber-500/20 glow-amber",
    tag: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    icon: "group-hover:shadow-amber-500/20",
  },
  blue: {
    card: "from-blue-500/20 to-blue-600/5 border-blue-500/20 glow-blue",
    tag: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon: "group-hover:shadow-blue-500/20",
  },
  green: {
    card: "from-green-500/20 to-green-600/5 border-green-500/20 glow-green",
    tag: "bg-green-500/10 text-green-400 border-green-500/20",
    icon: "group-hover:shadow-green-500/20",
  },
} as const;

export function SolutionsSection() {
  return (
    <section id="solucoes" className="py-24 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"
        aria-hidden
      />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Soluções"
          title={
            <>
              Três soluções,{" "}
              <span className="gradient-text-animated">uma plataforma</span>
            </>
          }
          description="Cada módulo foi projetado para resolver desafios específicos do seu negócio, com integração total entre eles."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SOLUTIONS.map((solution, index) => {
            const colors = colorMap[solution.color];
            return (
              <AnimateOnScroll key={solution.href} delay={index * 120}>
                <div
                  className={cn(
                    "group relative rounded-2xl border bg-gradient-to-b p-1 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 card-shine",
                    colors.card,
                  )}
                >
                  <div className="rounded-xl bg-[#0A0A0F]/90 p-6 h-full flex flex-col">
                    <div
                      className={cn(
                        "relative w-full h-48 rounded-lg overflow-hidden mb-6 ring-1 ring-white/5 transition-shadow duration-500",
                        colors.icon,
                        "group-hover:shadow-lg",
                      )}
                    >
                      <Image
                        src={solution.image}
                        alt={solution.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3">
                      {solution.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                      {solution.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {solution.tags.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            "text-xs px-3 py-1 rounded-full border transition-colors duration-300",
                            colors.tag,
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href={solution.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-sm text-gray-300 hover:text-white group/btn"
                      >
                        Saiba mais
                        <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
