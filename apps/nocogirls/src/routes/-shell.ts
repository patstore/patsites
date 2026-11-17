import type { RouteTransition } from "@repo/core";
import { siteLocalization } from "@provider";

export { siteLocalization };

export const routeTransitions: RouteTransition[] = [];

export const pageFade: Omit<RouteTransition, "from" | "to"> = {
	duration: 0.45,
	ease: "power2.out",
	page: {
		from: { autoAlpha: 0 },
		to: { autoAlpha: 1 }
	}
};
