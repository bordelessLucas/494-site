import { LineIcon } from "@/components/ui/icon";
import { AnimateOnScroll, SectionHeader } from "@/components/landing/motion";
import { TESTIMONIALS } from "@/lib/data";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="section-spacing relative">
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Depoimentos"
          title={
            <>
              Quem usa, <span className="gradient-text-animated">recomenda</span>
            </>
          }
          description="Veja o que nossos clientes dizem sobre a plataforma Unique Gestor."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <AnimateOnScroll key={testimonial.name} delay={index * 120}>
              <article className="glass-card-premium rounded-2xl p-8 flex flex-col h-full transition-transform duration-500 hover:-translate-y-1">
                <div className="flex gap-1 mb-6" aria-label="5 estrelas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <LineIcon
                      key={i}
                      icon={Star}
                      className="text-white/25"
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="text-gray-400 text-sm body-relaxed mb-8 flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <footer className="pt-6 relative">
                  <div className="divider-gradient absolute top-0 left-0 right-0" aria-hidden />
                  <div className="font-display font-semibold text-sm tracking-tight pt-6">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-xs mt-1">{testimonial.role}</div>
                </footer>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
