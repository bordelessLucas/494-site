import { AnimateOnScroll, SectionHeader } from "@/components/landing/motion";
import { FEATURES } from "@/lib/data";
import {
  BarChart3,
  FileText,
  Globe,
  Shield,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<(typeof FEATURES)[number]["icon"], LucideIcon> = {
  shield: Shield,
  zap: Zap,
  chart: BarChart3,
  users: Users,
  globe: Globe,
  file: FileText,
};

export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="py-24 relative">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none"
        aria-hidden
      />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Funcionalidades"
          title={
            <>
              Funcionalidades que{" "}
              <span className="gradient-text-animated">fazem a diferença</span>
            </>
          }
          description="Tecnologia de ponta para automatizar processos e dar controle total sobre sua operação."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <AnimateOnScroll key={feature.title} delay={index * 80}>
                <div className="glass-card-premium rounded-xl p-6 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-1 group card-shine h-full">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/10 transition-all duration-500">
                    <Icon className="w-6 h-6 text-blue-400" aria-hidden />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
