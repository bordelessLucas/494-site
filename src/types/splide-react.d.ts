declare module "@splidejs/react-splide" {
  import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
  import type { Options, Splide as SplideInstance } from "@splidejs/splide";

  export interface SplideComponent {
    splide: SplideInstance;
    sync: (target: SplideInstance) => void;
  }

  export interface SplideProps extends ComponentPropsWithoutRef<"div"> {
    options?: Options;
    children?: ReactNode;
    ref?: Ref<SplideComponent>;
    "aria-label"?: string;
  }

  export const Splide: (props: SplideProps) => JSX.Element;

  export const SplideSlide: (
    props: ComponentPropsWithoutRef<"li"> & { children?: ReactNode },
  ) => JSX.Element;
}
