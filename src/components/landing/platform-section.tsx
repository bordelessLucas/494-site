import { PlatformStickyScroll } from "@/components/landing/platform-sticky-scroll";
import { SectionHeader } from "@/components/landing/motion";

export function PlatformSection() {
  return (
    <section id="plataforma" className="section-spacing relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Plataforma"
          title={
            <>
              Uma plataforma,{" "}
              <span className="gradient-text-animated">visão completa</span>
            </>
          }
          description="Role para explorar cada sistema da plataforma. A interface acompanha o conteúdo em tempo real."
        />

        <PlatformStickyScroll />
      </div>
    </section>
  );
}
