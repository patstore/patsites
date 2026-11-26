import type { RouteTransition } from "@repo/core";

export const routeTransitions: RouteTransition[] = [];

export function usePageTransitions(): RouteTransition[] {
	return routeTransitions;
}

export const pageFade: Omit<RouteTransition, "from" | "to"> = {
	duration: 0.45,
	ease: "power2.out",
	page: {
		from: { autoAlpha: 0 },
		to: { autoAlpha: 1 }
	}
};
