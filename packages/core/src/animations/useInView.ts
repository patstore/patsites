import { useEffect, useState, type RefObject } from "react";
import { useOptionalScroll } from "../scroll/context.ts";

export type InViewOptions = {
  /** Visible fraction of the element required, from 0 to 1. */
  threshold?: number;
  /** Extra pixels required inside the viewport on every edge. */
  margin?: number;
  /** Stay visible after the first time the element enters. */
  once?: boolean;
};

function visibleRatio(element: HTMLElement, viewport: HTMLElement | null, margin: number): number {
  const bounds = element.getBoundingClientRect();
  const frame = viewport?.getBoundingClientRect() ?? {
    top: 0,
    left: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
  };
  const width = Math.min(bounds.right, frame.right - margin) - Math.max(bounds.left, frame.left + margin);
  const height = Math.min(bounds.bottom, frame.bottom - margin) - Math.max(bounds.top, frame.top + margin);
  const area = bounds.width * bounds.height;
  if (area <= 0) {
    return 0;
  }
  return (Math.max(0, width) * Math.max(0, height)) / area;
}

/** Lenis scroll, or the window when no `SmoothScroll` is mounted. Works for both axes via bounding boxes. */
export function useInView(
  ref: RefObject<HTMLElement | null>,
  { threshold = 0.2, margin = 0, once = true }: InViewOptions = {},
): boolean {
  const scroll = useOptionalScroll();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView && once) {
      return;
    }

    const check = () => {
      const element = ref.current;
      if (!element) {
        return;
      }
      const next = visibleRatio(element, scroll?.getViewport() ?? null, margin) >= threshold;
      setInView((current) => (once && current ? true : next));
    };

    check();
    const unsubscribe = scroll?.subscribe(check);
    window.addEventListener("resize", check);
    if (!scroll) {
      window.addEventListener("scroll", check, { passive: true });
    }

    return () => {
      unsubscribe?.();
      window.removeEventListener("resize", check);
      window.removeEventListener("scroll", check);
    };
  }, [ref, scroll, threshold, margin, once, inView]);

  return inView;
}
