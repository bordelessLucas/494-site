import { cn } from "@/lib/utils";
import type { LucideIcon, LucideProps } from "lucide-react";

export const LINE_ICON_SIZE = 24;
export const LINE_ICON_STROKE = 1.5;

export function lineIconProps(
  className?: string,
  overrides?: Partial<LucideProps>,
): LucideProps {
  return {
    size: LINE_ICON_SIZE,
    strokeWidth: LINE_ICON_STROKE,
    className: cn("shrink-0", className),
    ...overrides,
  };
}

interface LineIconProps extends Omit<LucideProps, "ref"> {
  icon: LucideIcon;
}

export function LineIcon({ icon: Icon, className, ...props }: LineIconProps) {
  return (
    <Icon
      size={LINE_ICON_SIZE}
      strokeWidth={LINE_ICON_STROKE}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}
