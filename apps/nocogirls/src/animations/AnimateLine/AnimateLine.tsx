import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import {
	resolveTrigger,
	useViewportTrigger
} from "../hooks/useViewportTrigger";

export type AnimateLineDirection =
	"top-to-bottom" | "left-to-right" | "right-to-left";

const animateLine: CSSProperties = {
	backgroundColor: "var(--color-dark)",
	margin: 0,
	padding: 0
};

export type AnimateLineProps = {
	length: number;
	thickness?: number | string;
	direction?: AnimateLineDirection;
	trigger?: boolean;
	viewport?: number;
	delay?: number;
	duration?: number;
	ease?: string;
	className?: string;
	unit?: "px" | "%";
	id?: string;
};

const AnimateLine = ({
	length,
	thickness = 0.9,
	direction = "top-to-bottom",
	trigger,
	viewport,
	delay = 0,
	duration = 0.8,
	ease = "power3.out",
	className,
	unit = "px",
	id
}: AnimateLineProps) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const hasAnimated = useRef(false);
	const viewportReached = useViewportTrigger(ref, viewport);
	const resolvedTrigger = resolveTrigger(trigger, viewport, viewportReached);
	const isVertical = direction === "top-to-bottom";

	const sizeStyle: CSSProperties = isVertical
		? { height: `${length}${unit}`, width: thickness }
		: { width: `${length}${unit}`, height: thickness };

	useEffect(() => {
		const el = ref.current;
		if (!el) {
			return;
		}

		if (isVertical) {
			gsap.set(el, { scaleY: 0, transformOrigin: "top center" });
		} else if (direction === "left-to-right") {
			gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
		} else {
			gsap.set(el, { scaleX: 0, transformOrigin: "right center" });
		}
	}, [direction, isVertical]);

	useEffect(() => {
		const el = ref.current;
		if (!el) {
			return;
		}

		if (resolvedTrigger !== undefined && !resolvedTrigger) {
			if (hasAnimated.current) {
				if (isVertical) {
					gsap.to(el, {
						scaleY: 0,
						transformOrigin: "top center",
						duration,
						ease,
						delay
					});
				} else if (direction === "left-to-right") {
					gsap.to(el, {
						scaleX: 0,
						transformOrigin: "left center",
						duration,
						ease,
						delay
					});
				} else {
					gsap.to(el, {
						scaleX: 0,
						transformOrigin: "right center",
						duration,
						ease,
						delay
					});
				}
				hasAnimated.current = false;
			}
			return;
		}

		if (isVertical) {
			gsap.to(el, { scaleY: 1, duration, ease, delay });
		} else {
			gsap.to(el, { scaleX: 1, duration, ease, delay });
		}
		hasAnimated.current = true;
	}, [resolvedTrigger, direction, isVertical, delay, duration, ease]);

	return (
		<div
			id={id}
			ref={ref}
			className={className}
			style={{ ...animateLine, ...sizeStyle }}
		/>
	);
};

export default AnimateLine;
