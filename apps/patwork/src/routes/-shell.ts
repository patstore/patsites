import type { RouteTransition } from "@repo/core";

export const routeTransitions: RouteTransition[] = [];

/**
 * The incoming page rises over a pinned copy of the page being left.
 * Duration and ease match the previous studio transition.
 */
export const pageRise: Omit<RouteTransition, "from" | "to"> = {
    clonePrevious: true,
    pinPrevious: true,
    duration: 1.2,
    ease: "power2.inOut",
    exit: { y: "-100vh" },
    page: {
        from: { y: "100vh", autoAlpha: 1 },
        to: { y: 0, autoAlpha: 1 }
    }
};
