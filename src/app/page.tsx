import { MacBackToTop } from "@/components/mac/mac-back-to-top";
import { MacContact } from "@/components/mac/mac-contact";
import { MacCta } from "@/components/mac/mac-cta";
import { MacFaq } from "@/components/mac/mac-faq";
import { MacFeatures } from "@/components/mac/mac-features";
import { MacFooter } from "@/components/mac/mac-footer";
import { MacHero } from "@/components/mac/mac-hero";
import { MacNavbar } from "@/components/mac/mac-navbar";
import { MacPlatform } from "@/components/mac/mac-platform";
import { MacPricing } from "@/components/mac/mac-pricing";
import { MacServices } from "@/components/mac/mac-services";
import { MacStats } from "@/components/mac/mac-stats";
import { MacTestimonial } from "@/components/mac/mac-testimonial";
import { MacWhatsApp } from "@/components/mac/mac-whatsapp";
import {
  FaqJsonLd,
  SoftwareApplicationJsonLd,
} from "@/components/seo/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="mac-page min-h-screen overflow-x-hidden">
      <FaqJsonLd />
      <SoftwareApplicationJsonLd />
      <div className="mac-page-ambient" aria-hidden>
        <div className="mac-orb mac-orb-blue" />
        <div className="mac-orb mac-orb-purple" />
      </div>
      <div className="mac-grain" aria-hidden />
      <div className="relative z-10">
        <MacNavbar />
        <main id="main-content">
          <MacHero />
          <MacServices />
          <MacFeatures />
          <MacPlatform />
          <MacStats />
          <MacTestimonial />
          <MacPricing />
          <MacFaq />
          <MacContact />
          <MacCta />
        </main>
        <MacFooter />
        <MacBackToTop />
        <MacWhatsApp />
      </div>
    </div>
  );
}
