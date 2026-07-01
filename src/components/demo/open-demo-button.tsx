"use client";

import { MacPillButton } from "@/components/mac/mac-pill-button";
import { useDemoModal } from "@/components/demo/demo-modal-provider";
import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

type OpenDemoButtonProps = ComponentProps<typeof MacPillButton>;

export function OpenDemoButton({ onClick, ...props }: OpenDemoButtonProps) {
  const { openDemoModal } = useDemoModal();

  return (
    <MacPillButton
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) openDemoModal();
      }}
    />
  );
}

type DemoTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

export function DemoTrigger({ children, className }: DemoTriggerProps) {
  const { openDemoModal } = useDemoModal();

  return (
    <button type="button" onClick={openDemoModal} className={cn(className)}>
      {children}
    </button>
  );
}
