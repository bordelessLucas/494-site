import { Button } from "@/components/ui/button";
import { LineIcon } from "@/components/ui/icon";
import { ProductImage } from "@/components/ui/product-image";
import { AnimateOnScroll, SectionHeader } from "@/components/landing/motion";
import { SOLUTIONS } from "@/lib/data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
export function SolutionsSection() {
  return (
    <section id="solucoes" className="section-spacing relative">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {SOLUTIONS.map((solution, index) => (
            <AnimateOnScroll key={solution.href} delay={index * 120}>
              <div className="group glass-card-premium rounded-2xl p-8 h-full flex flex-col transition-transform duration-500 hover:-translate-y-1">
                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-8">
                  <ProductImage
                    src={solution.image}
                    alt={solution.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.03]"
                    skeletonClassName="rounded-xl"
                  />                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12]/80 to-transparent" />
                </div>

                <h3 className="font-display font-bold text-xl tracking-tight mb-3">
                  {solution.title}
                </h3>
                <p className="text-gray-500 text-sm mb-8 flex-grow">
                  {solution.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {solution.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-3 py-1 rounded-full glass-card text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href={solution.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-sm text-gray-400 hover:text-white group/btn px-0"
                  >
                    Saiba mais
                    <LineIcon
                      icon={ChevronRight}
                      className="text-gray-500 transition-transform group-hover/btn:translate-x-1"
                      aria-hidden
                    />
                  </Button>
                </Link>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
