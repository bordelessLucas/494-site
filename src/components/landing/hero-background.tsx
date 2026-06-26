import { ASSETS } from "@/lib/data";
import Image from "next/image";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Image
        src={ASSETS.heroBg}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30 scale-105"
        aria-hidden
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/70 via-[#0A0A0F]/40 to-[#0A0A0F]" />
      <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.15),transparent)]"
        aria-hidden
      />

      <div
        className="orb orb-blue absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full blur-[120px]"
        aria-hidden
      />
      <div
        className="orb orb-purple absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full blur-[120px]"
        aria-hidden
      />
      <div
        className="orb orb-cyan absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px] opacity-40"
        aria-hidden
      />
    </div>
  );
}
