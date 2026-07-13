import { WHATSAPP_URL } from "@/lib/data";
import { LineIcon } from "@/components/ui/icon";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 group"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <div className="relative w-14 h-14 rounded-full glass-card-premium flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
        <WhatsAppIcon className="w-6 h-6 text-white/60" aria-hidden />
      </div>
    </a>
  );
}
