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
        className="object-cover opacity-[0.12] scale-105"
        aria-hidden
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0f12]/30 to-[#050505]" />
      <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden />

      <div
        className="orb orb-blue absolute top-1/4 -left-32 w-[480px] h-[480px] rounded-full blur-[140px]"
        aria-hidden
      />
      <div
        className="orb orb-purple absolute bottom-1/4 -right-32 w-[480px] h-[480px] rounded-full blur-[140px]"
        aria-hidden
      />
    </div>
  );
}
