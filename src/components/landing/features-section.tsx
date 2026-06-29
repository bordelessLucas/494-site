import { FeatureBentoCard } from "@/components/landing/feature-bento-card";
import { SectionHeader } from "@/components/landing/motion";
import { FEATURES } from "@/lib/data";

const FEATURE_GRID_PLACEMENT = [
  "lg:col-span-2 lg:row-span-2",
  "",
  "",
  "",
  "",
  "lg:col-span-2",
] as const;

export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="section-spacing relative">
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

        <div className="bento-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto lg:auto-rows-fr">
          {FEATURES.map((feature, index) => (
            <FeatureBentoCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
              isFeatured={feature.icon === "shield"}
              className={FEATURE_GRID_PLACEMENT[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
