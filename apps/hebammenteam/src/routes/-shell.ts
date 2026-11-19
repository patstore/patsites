import { useMemo, useSyncExternalStore } from "react";
import type { RouteTransition } from "@repo/core";
import type { PersonClass } from "@data";
import { useCollection } from "@provider";
import { personSlug, personTransitionId } from "../content/Team/person";

/**
 * One entry per navigation. The most specific `from` / `to` pair wins.
 * Shared elements use the same `id` as `<TransitionElement id="...">`.
 */
export const routeTransitions: RouteTransition[] = [];

const memberFlight = (
	elements: RouteTransition["elements"]
): Omit<RouteTransition, "from" | "to"> => ({
	clonePrevious: true,
	pinPrevious: true,
	duration: 0.7,
	ease: "power3.inOut",
	exit: { autoAlpha: 0 },
	elements
});

/** Desktop flights from the home and team portraits onto a member page. */
export function memberFlightTransitions(
	persons: readonly PersonClass[]
): RouteTransition[] {
	if (persons.length === 0) {
		return [];
	}
	const flight = memberFlight(
		persons.map((person) => ({
			id: personTransitionId(person.objectId)
		}))
	);
	const transitions: RouteTransition[] = [];
	for (const person of persons) {
		const to = `/team/${personSlug(person)}`;
		transitions.push({ from: "/", to, ...flight });
		transitions.push({ from: "/team", to, ...flight });
	}
	return transitions;
}

function subscribeDesktop(onChange: () => void) {
	const query = window.matchMedia("(min-width: 900px)");
	query.addEventListener("change", onChange);
	return () => query.removeEventListener("change", onChange);
}

function desktopNow() {
	return window.matchMedia("(min-width: 900px)").matches;
}

export function usePageTransitions(): RouteTransition[] {
	const { items } = useCollection("Person");
	const desktop = useSyncExternalStore(
		subscribeDesktop,
		desktopNow,
		() => false
	);
	const key = items
		.map((person) => `${person.objectId}:${personSlug(person)}`)
		.join("|");
	return useMemo(
		() => [
			...routeTransitions,
			...(desktop ? memberFlightTransitions(items) : [])
		],
		[desktop, items, key]
	);
}

export const pageFade: Omit<RouteTransition, "from" | "to"> = {
	duration: 0.45,
	ease: "power2.out",
	page: {
		from: { autoAlpha: 0 },
		to: { autoAlpha: 1 }
	}
};
