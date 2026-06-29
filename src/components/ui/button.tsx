import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "default" | "ghost" | "outline" | "gradient";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "gradient-border bg-white/[0.03] hover:bg-white/[0.06] text-white/90",
  ghost: "text-gray-500 hover:text-white hover:bg-white/[0.03]",
  outline:
    "gradient-border bg-transparent hover:bg-white/[0.03] text-white/90",
  gradient:
    "bg-white text-[#050505] hover:bg-white/90 border-0 font-semibold",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300",
        "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
        "outline-none focus-visible:ring-2 focus-visible:ring-white/20",
        "h-9 px-4 py-2",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
