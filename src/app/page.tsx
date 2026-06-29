import { MacCta } from "@/components/mac/mac-cta";
import { MacFaq } from "@/components/mac/mac-faq";
import { MacFooter } from "@/components/mac/mac-footer";
import { MacHero } from "@/components/mac/mac-hero";
import { MacIntro } from "@/components/mac/mac-intro";
import { MacNavbar } from "@/components/mac/mac-navbar";
import { MacPortfolio } from "@/components/mac/mac-portfolio";
import { MacServices } from "@/components/mac/mac-services";
import { MacTestimonial } from "@/components/mac/mac-testimonial";

export default function HomePage() {
  return (
    <div className="mac-page min-h-screen overflow-x-hidden">
      <div className="mac-page-ambient" aria-hidden>
        <div className="mac-orb mac-orb-blue" />
        <div className="mac-orb mac-orb-purple" />
      </div>
      <div className="mac-grain" aria-hidden />
      <div className="relative z-10">
        <MacNavbar />
        <main id="main-content">
          <MacHero />
          <MacIntro />
          <MacPortfolio />
          <MacTestimonial />
          <MacFaq />
          <MacServices />
          <MacCta />
        </main>
        <MacFooter />
      </div>
    </div>
  );
}
