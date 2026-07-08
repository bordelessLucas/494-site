import { DemoModalProvider } from "@/components/demo/demo-modal-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import {
  OrganizationJsonLd,
  WebsiteJsonLd,
} from "@/components/seo/json-ld";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_URL,
} from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Plataforma de Gestão Integrada`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "gestão societária",
    "gestão de contratos",
    "escalas médicas",
    "SGC",
    "LGPD",
    "SaaS",
    "Unique Gestor",
    "software de gestão",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} — Plataforma de Gestão Integrada`,
    description:
      "Três sistemas poderosos em uma única plataforma para simplificar sua operação.",
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — dashboard da plataforma`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Plataforma de Gestão Integrada`,
    description:
      "Gestão Societária, Contratos e Escalas Médicas em uma única plataforma.",
    images: [SITE_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#050508",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <SmoothScrollProvider>
          <DemoModalProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-[#4d7cff] focus:text-white focus:outline-none"
            >
              Pular para o conteúdo
            </a>
            {children}
          </DemoModalProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
