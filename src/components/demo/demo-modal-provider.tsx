"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DemoModal } from "@/components/demo/demo-modal";
import type { DemoSolutionId } from "@/lib/demo-data";

type OpenDemoModalOptions = {
  solutions?: DemoSolutionId[];
};

type DemoModalContextValue = {
  isOpen: boolean;
  openDemoModal: (options?: OpenDemoModalOptions) => void;
  closeDemoModal: () => void;
};

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialSolutions, setInitialSolutions] = useState<DemoSolutionId[]>(
    [],
  );

  const openDemoModal = useCallback((options?: OpenDemoModalOptions) => {
    setInitialSolutions(options?.solutions ?? []);
    setIsOpen(true);
  }, []);

  const closeDemoModal = useCallback(() => {
    setIsOpen(false);
    setInitialSolutions([]);
  }, []);

  const value = useMemo(
    () => ({ isOpen, openDemoModal, closeDemoModal }),
    [isOpen, openDemoModal, closeDemoModal],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDemoModal();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeDemoModal]);

  return (
    <DemoModalContext.Provider value={value}>
      {children}
      <DemoModal
        isOpen={isOpen}
        onClose={closeDemoModal}
        initialSolutions={initialSolutions}
      />
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  const context = useContext(DemoModalContext);
  if (!context) {
    throw new Error("useDemoModal deve ser usado dentro de DemoModalProvider");
  }
  return context;
}
