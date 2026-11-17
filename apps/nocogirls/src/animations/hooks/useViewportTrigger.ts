import { useCallback, useEffect, useState } from "react";
import { useOptionalScroll } from "@repo/core";

function getViewportProgress(el: Element): number {
	const rect = el.getBoundingClientRect();
	const vh = window.innerHeight;
	const distance = vh + rect.height;
	if (distance === 0) {
		return 0;
	}
	return (vh - rect.top) / distance;
}

export function resolveTrigger(
	trigger: boolean | undefined,
	viewport: number | undefined,
	viewportReached: boolean
): boolean | undefined {
	if (viewport === undefined) {
		return trigger;
	}
	if (trigger === undefined) {
		return viewportReached;
	}
	return trigger && viewportReached;
}

export function useViewportTrigger(
	ref: { current: Element | null },
	viewport?: number
): boolean {
	const [reached, setReached] = useState(false);
	const scroll = useOptionalScroll();

	const measure = useCallback(() => {
		const el = ref.current;
		if (!el || viewport === undefined) {
			return;
		}
		const next =
			getViewportProgress(el) >= Math.min(1, Math.max(0, viewport));
		setReached((current) => (current === next ? current : next));
	}, [ref, viewport]);

	useEffect(() => {
		if (viewport === undefined) {
			setReached(false);
			return;
		}

		measure();
		const unsubscribe = scroll
			? scroll.subscribe(measure)
			: () => {
					window.removeEventListener("scroll", measure);
				};
		if (!scroll) {
			window.addEventListener("scroll", measure, { passive: true });
		}
		window.addEventListener("resize", measure);
		return () => {
			unsubscribe();
			window.removeEventListener("resize", measure);
		};
	}, [viewport, measure, scroll]);

	return reached;
}
