import { useSyncExternalStore } from "react";
import { useScrollContext } from "./context.ts";
import type { ScrollSnapshot, ScrollToOptions } from "./types.ts";

export function useScroll(): ScrollSnapshot & {
  orientation: "vertical" | "horizontal";
  scrollTo: (target: number | string | HTMLElement, options?: ScrollToOptions) => void;
  viewport: HTMLElement | null;
} {
  const scroll = useScrollContext();
  const snapshot = useSyncExternalStore(
    scroll.subscribe,
    scroll.getSnapshot,
    scroll.getServerSnapshot,
  );

  return {
    ...snapshot,
    orientation: scroll.orientation,
    scrollTo: scroll.scrollTo,
    viewport: scroll.getViewport(),
  };
}
