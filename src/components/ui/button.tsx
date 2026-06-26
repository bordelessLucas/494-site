import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "default" | "ghost" | "outline" | "gradient";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-white/5 border border-white/10 hover:bg-white/10 text-white",
  ghost: "text-gray-300 hover:text-white hover:bg-accent/50",
  outline:
    "border border-white/10 bg-white/5 hover:bg-white/10 text-white shadow-xs",
  gradient:
    "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 btn-shimmer shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all",
        "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
        "outline-none focus-visible:ring-[3px] focus-visible:ring-blue-500/50",
        "h-9 px-4 py-2",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
