import { LineIcon } from "@/components/ui/icon";
import { CONTACT_INFO } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const iconMap = {
  globe: Globe,
  mail: Mail,
  phone: Phone,
  map: MapPin,
} as const;

export function ContactInfoCards({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
        className,
      )}
    >
      {CONTACT_INFO.map((info) => {
        const Icon = iconMap[info.icon];
        const content = (
          <>
            <div className="w-14 h-14 rounded-xl glass-card flex items-center justify-center shrink-0">
              <LineIcon icon={Icon} className="text-white/40" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-gray-600 leading-tight">
                {info.label}
              </div>
              <div className="text-sm font-medium text-white/80 leading-snug break-words mt-0.5">
                {info.value}
              </div>
            </div>
          </>
        );

        const cardClass =
          "flex items-center gap-4 glass-card rounded-xl p-5 min-w-0 transition-colors hover:bg-white/[0.02]";

        if ("href" in info && info.href) {
          return (
            <Link
              key={info.label}
              href={info.href}
              className={cardClass}
              {...("external" in info && info.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {content}
            </Link>
          );
        }

        return (
          <div key={info.label} className={cardClass}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
