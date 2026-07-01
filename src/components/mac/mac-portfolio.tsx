import { SystemsCarousel } from "@/components/mac/systems-carousel";
import {
  LANDING_SYSTEMS,
  LANDING_SYSTEMS_HEADING,
} from "@/lib/landing-data";

export function MacPortfolio() {
  return (
    <section id="sistemas" className="mac-section">
      <div className="mac-container">
        <div className="overflow-hidden rounded-[40px] border border-white/[0.08] bg-[#0a0a10]/90 px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
          <h2 className="mac-heading-lg mx-auto max-w-3xl text-center text-white">
            {LANDING_SYSTEMS_HEADING}
          </h2>

          <SystemsCarousel systems={LANDING_SYSTEMS} />
        </div>
      </div>
    </section>
  );
}
