import { OpenDemoButton } from "@/components/demo/open-demo-button";
import { LANDING_CTA } from "@/lib/landing-data";
import { ArrowRight } from "lucide-react";

export function MacCta() {
  return (
    <section className="mac-section pb-6 sm:pb-8 md:pb-12">
      <div className="mac-container">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a10] px-5 py-8 sm:rounded-[32px] sm:px-8 sm:py-12 md:rounded-[40px] md:px-14 md:py-14">
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 h-56 w-[85%] -translate-x-1/2 translate-y-1/3 rounded-full bg-[#4d7cff]/20 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-[#b456ff]/15 blur-3xl"
            aria-hidden
          />

          <div className="relative flex flex-col items-stretch justify-between gap-6 sm:items-start sm:gap-8 md:flex-row md:items-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">
              {LANDING_CTA.title}
            </h2>
            <OpenDemoButton variant="light" className="w-full gap-2 px-7 font-semibold sm:w-auto">
              {LANDING_CTA.button}
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </OpenDemoButton>
          </div>
        </div>
      </div>
    </section>
  );
}
