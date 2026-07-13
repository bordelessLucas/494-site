"use client";

import { WHATSAPP_URL } from "@/lib/landing-data";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

export function MacWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="safe-bottom fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_32px_-8px_rgba(37,211,102,0.6)] transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      aria-label="Fale conosco pelo WhatsApp"
      title="Fale conosco pelo WhatsApp"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
