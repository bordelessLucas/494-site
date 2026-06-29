import { cn } from "@/lib/utils";

interface UniqueLogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export function UniqueLogo({ className, variant = "light" }: UniqueLogoProps) {
  const isLight = variant === "light";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="mac-gradient-bg relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full shadow-[0_0_24px_-4px_rgba(77,124,255,0.6)]">
        <span className="font-display text-lg font-bold leading-none text-white">
          U
        </span>
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-bold tracking-tight",
            isLight ? "text-white" : "text-[#050508]",
          )}
        >
          Unique
        </span>
        <span
          className={cn(
            "text-[10px] font-medium uppercase tracking-[0.2em]",
            isLight ? "text-white/60" : "text-zinc-500",
          )}
        >
          Gestor
        </span>
      </div>
    </div>
  );
}

/** @deprecated Use UniqueLogo */
export const MacLogo = UniqueLogo;
