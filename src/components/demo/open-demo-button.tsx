"use client";

import { MacPillButton } from "@/components/mac/mac-pill-button";
import { useDemoModal } from "@/components/demo/demo-modal-provider";
import type { DemoSolutionId } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

type OpenDemoButtonProps = ComponentProps<typeof MacPillButton> & {
  initialSolutions?: DemoSolutionId[];
};

export function OpenDemoButton({
  onClick,
  initialSolutions,
  ...props
}: OpenDemoButtonProps) {
  const { openDemoModal } = useDemoModal();

  return (
    <MacPillButton
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          openDemoModal(
            initialSolutions?.length
              ? { solutions: initialSolutions }
              : undefined,
          );
        }
      }}
    />
  );
}

type DemoTriggerProps = {
  children: React.ReactNode;
  className?: string;
  initialSolutions?: DemoSolutionId[];
};

export function DemoTrigger({
  children,
  className,
  initialSolutions,
}: DemoTriggerProps) {
  const { openDemoModal } = useDemoModal();

  return (
    <button
      type="button"
      onClick={() =>
        openDemoModal(
          initialSolutions?.length
            ? { solutions: initialSolutions }
            : undefined,
        )
      }
      className={cn(className)}
    >
      {children}
    </button>
  );
}
