import { ContactSection } from "@/components/landing/contact-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { Navbar } from "@/components/landing/navbar";
import { PlatformSection } from "@/components/landing/platform-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { SolutionsSection } from "@/components/landing/solutions-section";
import { StatsSection } from "@/components/landing/stats-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { WhatsAppButton } from "@/components/landing/whatsapp-button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden relative">
      <div className="noise-overlay" aria-hidden />
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.08),transparent)]"
        aria-hidden
      />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <HeroSection />
        <SolutionsSection />
        <FeaturesSection />
        <PlatformSection />
        <StatsSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
