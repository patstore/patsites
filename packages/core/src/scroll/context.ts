import { createContext, useContext } from "react";
import type { ScrollOrientation, ScrollSnapshot, ScrollToOptions } from "./types.ts";

export type ScrollContextValue = {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => ScrollSnapshot;
  getServerSnapshot: () => ScrollSnapshot;
  scrollTo: (target: number | string | HTMLElement, options?: ScrollToOptions) => void;
  getViewport: () => HTMLElement | null;
  orientation: ScrollOrientation;
};

export const ScrollContext = createContext<ScrollContextValue | null>(null);

export function useScrollContext(): ScrollContextValue {
  const value = useContext(ScrollContext);
  if (!value) {
    throw new Error("useScroll must be used within SmoothScroll");
  }
  return value;
}

export function useOptionalScroll(): ScrollContextValue | null {
  return useContext(ScrollContext);
}
