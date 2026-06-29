import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  const hasMacVariant =
    className?.includes("skeleton-mac") ||
    className?.includes("skeleton-mac-dark");

  return (
    <div
      className={cn(!hasMacVariant && "skeleton-dark", className)}
      aria-hidden
    />
  );
}
