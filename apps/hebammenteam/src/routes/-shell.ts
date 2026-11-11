import type { RouteTransition } from "@repo/core";

/**
 * One entry per navigation. The most specific `from` / `to` pair wins.
 * Shared elements use the same `id` as `<TransitionElement id="...">`.
 */
export const routeTransitions: RouteTransition[] = [];

export const pageFade: Omit<RouteTransition, "from" | "to"> = {
  duration: 0.45,
  ease: "power2.out",
  page: {
    from: { autoAlpha: 0 },
    to: { autoAlpha: 1 },
  },
};
