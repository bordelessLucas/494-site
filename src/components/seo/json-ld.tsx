import { LANDING_FAQ_ITEMS } from "@/lib/landing-data";
import {
  SITE_CONTACT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: SITE_OG_IMAGE,
        description: SITE_DESCRIPTION,
        email: SITE_CONTACT.email,
        telephone: SITE_CONTACT.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE_CONTACT.addressLocality,
          addressRegion: SITE_CONTACT.addressRegion,
          addressCountry: SITE_CONTACT.addressCountry,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: SITE_CONTACT.email,
          telephone: SITE_CONTACT.phone,
          availableLanguage: ["Portuguese"],
        },
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: "pt-BR",
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      }}
    />
  );
}

export function SoftwareApplicationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: SITE_NAME,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        image: SITE_OG_IMAGE,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
          description: "Teste grátis por 14 dias",
        },
        inLanguage: "pt-BR",
      }}
    />
  );
}

export function FaqJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: LANDING_FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; path: string }>;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}
