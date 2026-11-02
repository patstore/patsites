/** @jsxImportSource react */
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { registerGsap } from "../gsap.ts";
import { useOptionalScroll } from "../scroll/context.ts";
import { copyScrollOffsets, elementByTransitionId } from "./dom.ts";
import { matchRouteTransition } from "./match.ts";
import type { RouteTransition, TransitionMotion } from "./types.ts";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export type PageTransitionProps = {
  /** Current pathname. Pass the router location in from the root route. */
  pathname: string;
  children: ReactNode;
  /** Route-pair table. The most specific `from` / `to` match is used. */
  transitions?: readonly RouteTransition[];
  /**
   * Keep a clone of the previous page in place while the next page animates.
   * A matching transition can override this.
   */
  clonePrevious?: boolean;
  /** Used when no pair matches. Omit it to swap immediately. */
  fallback?: Omit<RouteTransition, "from" | "to">;
  duration?: number;
  ease?: string;
  /** Reset Lenis to the top after a pathname change. */
  scrollToTop?: boolean;
  className?: string;
  style?: CSSProperties;
};

type PendingTransition = {
  to: string;
  transition: RouteTransition;
  ghost: HTMLElement | null;
  outgoing: Map<string, DOMRect>;
};

const containerStyle: CSSProperties = {
  position: "relative",
  width: "100%",
};

function motionOr(value: TransitionMotion | undefined, fallback: TransitionMotion): TransitionMotion {
  return value ?? fallback;
}

export function PageTransition({
  pathname,
  children,
  transitions = [],
  clonePrevious = false,
  fallback,
  duration = 1.2,
  ease = "power2.inOut",
  scrollToTop = true,
  className,
  style,
}: PageTransitionProps) {
  registerGsap();
  const scroll = useOptionalScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const pending = useRef<PendingTransition | null>(null);
  const rendered = useRef(children);
  const [activePath, setActivePath] = useState(pathname);

  if (activePath === pathname) {
    rendered.current = children;
  }
  const view = activePath === pathname ? children : rendered.current;

  useIsoLayoutEffect(() => {
    if (activePath === pathname) {
      return;
    }

    const from = activePath;
    const matched = matchRouteTransition(transitions, from, pathname);
    const transition = matched ?? (fallback ? { from, to: pathname, ...fallback } : null);
    const content = currentRef.current;
    const parent = containerRef.current;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!transition || reduced || !content || !parent) {
      pending.current = null;
      setActivePath(pathname);
      if (scrollToTop) {
        scroll?.scrollTo(0, { immediate: true });
      }
      return;
    }

    const shouldClone = transition.clonePrevious ?? clonePrevious;
    const outgoing = new Map<string, DOMRect>();
    for (const element of transition.elements ?? []) {
      const node = elementByTransitionId(content, element.id);
      if (node) {
        outgoing.set(element.id, node.getBoundingClientRect());
      }
    }

    let ghost: HTMLElement | null = null;
    if (shouldClone) {
      ghost = content.cloneNode(true) as HTMLElement;
      ghost.setAttribute("aria-hidden", "true");
      ghost.inert = true;
      Object.assign(ghost.style, {
        position: "absolute",
        inset: "0",
        width: "100%",
        margin: "0",
        pointerEvents: "none",
        zIndex: "1",
      });
      copyScrollOffsets(content, ghost);
      parent.insertBefore(ghost, content);
    }

    pending.current = { to: pathname, transition, ghost, outgoing };
    setActivePath(pathname);
  }, [pathname, activePath, transitions, fallback, clonePrevious, scroll, scrollToTop]);

  useIsoLayoutEffect(() => {
    const job = pending.current;
    if (!job || job.to !== pathname || activePath !== pathname) {
      return;
    }
    pending.current = null;

    const next = currentRef.current;
    if (!next) {
      job.ghost?.remove();
      return;
    }

    if (scrollToTop) {
      scroll?.scrollTo(0, { immediate: true });
    }

    const pageDuration = job.transition.duration ?? duration;
    const pageEase = job.transition.ease ?? ease;
    const shouldClone = job.transition.clonePrevious ?? clonePrevious;
    const hasSharedElements = (job.transition.elements?.length ?? 0) > 0;
    const defaultPageFrom: TransitionMotion = shouldClone ? { autoAlpha: 0, x: "100vw" } : { autoAlpha: 0 };
    const overlays: HTMLElement[] = [];

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { duration: pageDuration, ease: pageEase },
        onComplete: () => {
          job.ghost?.remove();
          overlays.forEach((node) => node.remove());
          gsap.set(next, { clearProps: "transform,opacity,visibility" });
        },
      });

      if (job.ghost) {
        timeline.to(job.ghost, { autoAlpha: 0, x: -300 }, 0);
      }
      if (job.transition.page || !hasSharedElements) {
        timeline.fromTo(
          next,
          motionOr(job.transition.page?.from, defaultPageFrom),
          motionOr(job.transition.page?.to, { autoAlpha: 1, x: 0, y: 0 }),
          0,
        );
      }

      for (const element of job.transition.elements ?? []) {
        const target = elementByTransitionId(next, element.id);
        if (!target) {
          continue;
        }
        if (job.ghost) {
          const previous = elementByTransitionId(job.ghost, element.id);
          if (previous) {
            previous.style.visibility = "hidden";
          }
        }
        if (element.from || element.to) {
          timeline.fromTo(
            target,
            { ...element.from, immediateRender: false },
            { ...element.to, immediateRender: false },
            0,
          );
          continue;
        }

        const start = job.outgoing.get(element.id);
        if (!start) {
          continue;
        }
        const end = target.getBoundingClientRect();
        const overlay = target.cloneNode(true) as HTMLElement;
        Object.assign(overlay.style, {
          position: "fixed",
          left: `${start.left}px`,
          top: `${start.top}px`,
          width: `${start.width}px`,
          height: `${start.height}px`,
          margin: "0",
          pointerEvents: "none",
          zIndex: "50",
        });
        document.body.appendChild(overlay);
        overlays.push(overlay);
        gsap.set(target, { autoAlpha: 0 });
        timeline.to(
          overlay,
          {
            left: end.left,
            top: end.top,
            width: end.width,
            height: end.height,
            onComplete: () => {
              gsap.set(target, { autoAlpha: 1, clearProps: "visibility" });
            },
          },
          0,
        );
      }
    });

    return () => {
      context.revert();
      job.ghost?.remove();
      overlays.forEach((node) => node.remove());
    };
  }, [pathname, activePath, clonePrevious, duration, ease, scroll, scrollToTop]);

  return (
    <div ref={containerRef} className={className} style={{ ...containerStyle, ...style }}>
      <div ref={currentRef} style={{ position: "relative", zIndex: 2, width: "100%" }}>
        {view}
      </div>
    </div>
  );
}
