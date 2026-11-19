export type TransitionMotion = {
	x?: number | string;
	y?: number | string;
	scale?: number;
	scaleX?: number;
	scaleY?: number;
	rotation?: number;
	autoAlpha?: number;
	width?: number | string;
	height?: number | string;
	/** GSAP delay, in seconds. Not a tweened property. */
	delay?: number;
	/** Overrides the timeline duration for this tween. */
	duration?: number;
};

export type SharedElementTransition = {
	/** Matches `data-transition-id` on the element, or `<TransitionElement id>`. */
	id: string;
	/**
	 * Explicit start and end. When both are omitted, the element is measured on the
	 * outgoing page and moved onto its rectangle on the incoming page.
	 */
	from?: TransitionMotion;
	to?: TransitionMotion;
};

export type RouteTransition = {
	/** Pathname, `"*"` for any path, or a prefix such as `"/projects/*"`. */
	from: string;
	to: string;
	/** Overrides the `clonePrevious` prop for this pair. */
	clonePrevious?: boolean;
	/**
	 * Pin the cloned page to the viewport so a scroll reset does not move it.
	 * Use this when a shared element should leave from the spot the user clicked.
	 */
	pinPrevious?: boolean;
	duration?: number;
	ease?: string;
	/** Motion of the cloned previous page. Defaults to fading and sliding left. */
	exit?: TransitionMotion;
	/** Motion of the incoming page. A clone, when enabled, leaves toward the left on its own. */
	page?: {
		from?: TransitionMotion;
		to?: TransitionMotion;
	};
	elements?: SharedElementTransition[];
};

export const TRANSITION_ID_ATTR = "data-transition-id";
