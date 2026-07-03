"use client";

import { WHATSAPP_URL } from "@/lib/landing-data";
import { MessageCircle } from "lucide-react";

export function MacWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_32px_-8px_rgba(37,211,102,0.6)] transition-transform hover:scale-105"
      aria-label="Fale conosco pelo WhatsApp"
      title="Fale conosco pelo WhatsApp"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={1.75} />
    </a>
  );
}
