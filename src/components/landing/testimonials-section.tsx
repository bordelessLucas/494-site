import { AnimateOnScroll, SectionHeader } from "@/components/landing/motion";
import { TESTIMONIALS } from "@/lib/data";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-24 relative">
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"
        aria-hidden
      />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <AnimateOnScroll key={testimonial.name} delay={index * 120}>
              <article className="glass-card-premium rounded-xl p-6 flex flex-col h-full transition-all duration-500 hover:border-white/20 hover:-translate-y-1 card-shine">
                <div className="flex gap-1 mb-4" aria-label="5 estrelas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <footer className="border-t border-white/5 pt-4">
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-gray-500 text-xs">{testimonial.role}</div>
                </footer>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
