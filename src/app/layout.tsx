import { DemoModalProvider } from "@/components/demo/demo-modal-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
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
  title: "Unique Gestor — Plataforma de Gestão Integrada",
  description:
    "Gestão Societária, Contratos e Escalas Médicas em uma única plataforma. Controle total, workflow inteligente e conformidade com a LGPD. Teste grátis por 14 dias.",
  keywords: [
    "gestão societária",
    "gestão de contratos",
    "escalas médicas",
    "SGC",
    "LGPD",
    "SaaS",
  ],
  openGraph: {
    title: "Unique Gestor — Plataforma de Gestão Integrada",
    description:
      "Três sistemas poderosos em uma única plataforma para simplificar sua operação.",
    type: "website",
    locale: "pt_BR",
    siteName: "Unique Gestor",
  },
  robots: { index: true, follow: true },
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
