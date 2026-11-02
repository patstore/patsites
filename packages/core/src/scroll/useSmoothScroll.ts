import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import type { ScrollOrientation, ScrollSnapshot, ScrollToOptions } from "./types.ts";

export type SmoothScrollOptions = {
  duration?: number;
  lerp?: number;
  smoothWheel?: boolean;
  syncTouch?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
};

type UseSmoothScrollArgs = {
  viewportRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
  orientation: ScrollOrientation;
  options?: SmoothScrollOptions;
  onChange: (snapshot: ScrollSnapshot) => void;
};

/**
 * Owns one Lenis instance for a viewport/content pair and drives it from GSAP's ticker.
 * Call this from the root route. `SmoothScroll` is the same hook plus the elements and context.
 */
export function useSmoothScroll({
  viewportRef,
  contentRef,
  orientation,
  options,
  onChange,
}: UseSmoothScrollArgs): {
  scrollTo: (target: number | string | HTMLElement, options?: ScrollToOptions) => void;
} {
  const scrollToRef = useRef<
    (target: number | string | HTMLElement, options?: ScrollToOptions) => void
  >(() => {});
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) {
      return;
    }

    let cancelled = false;
    let removeTicker: (() => void) | null = null;
    let disconnect: (() => void) | null = null;
    let cleanup: (() => void) | null = null;

    void (async () => {
      const [{ default: Lenis }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        wrapper: viewport,
        content,
        orientation,
        gestureOrientation: orientation,
        duration: options?.duration ?? 0.8,
        lerp: options?.lerp,
        easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
        smoothWheel: options?.smoothWheel ?? true,
        syncTouch: options?.syncTouch,
        wheelMultiplier: options?.wheelMultiplier,
        touchMultiplier: options?.touchMultiplier,
        autoRaf: false,
      });

      const publish = () => {
        onChangeRef.current({
          scroll: lenis.scroll,
          limit: lenis.limit,
          velocity: lenis.velocity,
          direction: lenis.direction,
          progress: lenis.progress,
        });
        ScrollTrigger.update();
      };

      lenis.on("scroll", publish);

      const raf = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      removeTicker = () => {
        gsap.ticker.remove(raf);
      };

      scrollToRef.current = (target, scrollOptions) => {
        lenis.scrollTo(target, scrollOptions);
      };

      const resize = () => {
        lenis.resize();
        publish();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(content);
      disconnect = () => observer.disconnect();

      ScrollTrigger.scrollerProxy(viewport, {
        scrollTop(value) {
          if (orientation === "vertical" && arguments.length > 0 && typeof value === "number") {
            lenis.scrollTo(value, { immediate: true });
          }
          return orientation === "vertical" ? lenis.scroll : 0;
        },
        scrollLeft(value) {
          if (orientation === "horizontal" && arguments.length > 0 && typeof value === "number") {
            lenis.scrollTo(value, { immediate: true });
          }
          return orientation === "horizontal" ? lenis.scroll : 0;
        },
        getBoundingClientRect() {
          return viewport.getBoundingClientRect();
        },
      });

      publish();

      const destroy = () => {
        scrollToRef.current = () => {};
        removeTicker?.();
        disconnect?.();
        lenis.destroy();
        ScrollTrigger.scrollerProxy(viewport, {});
      };

      if (cancelled) {
        destroy();
        return;
      }

      cleanup = destroy;
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [viewportRef, contentRef, orientation, options]);

  return {
    scrollTo: (target, scrollOptions) => {
      scrollToRef.current(target, scrollOptions);
    },
  };
}
