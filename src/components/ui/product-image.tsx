"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type ProductImageProps = Omit<ImageProps, "onLoad" | "onLoadingComplete"> & {
  skeletonClassName?: string;
};

export function ProductImage({
  className,
  skeletonClassName,
  alt,
  fill,
  ...props
}: ProductImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={cn(
        fill ? "absolute inset-0" : "relative h-full w-full",
      )}
    >
      {!isLoaded && (
        <Skeleton
          className={cn("absolute inset-0 rounded-[inherit]", skeletonClassName)}
        />
      )}
      <Image
        {...props}
        fill={fill}
        alt={alt}
        loading={props.priority ? undefined : "lazy"}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          className,
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
