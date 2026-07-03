import { LANDING_PLATFORM } from "@/lib/landing-data";
import Image from "next/image";

export function MacPlatform() {
  return (
    <section id="plataforma" className="mac-section">
      <div className="mac-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mac-heading-lg text-white">
              {LANDING_PLATFORM.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
              {LANDING_PLATFORM.description}
            </p>
          </div>

          <div className="mac-card relative overflow-hidden p-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px]">
              <Image
                src={LANDING_PLATFORM.image}
                alt={LANDING_PLATFORM.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
