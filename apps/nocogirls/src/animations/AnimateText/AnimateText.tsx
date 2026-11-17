import {
	createElement,
	useEffect,
	useRef,
	type CSSProperties,
	type ReactNode
} from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import {
	resolveTrigger,
	useViewportTrigger
} from "../hooks/useViewportTrigger";

type AnimateTextType = "row" | "chars";
type TextTag = "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type AnimateTextProps = {
	children: ReactNode;
	type?: AnimateTextType;
	trigger?: boolean;
	viewport?: number;
	as?: TextTag;
	delay?: number;
	duration?: number;
	ease?: string;
	stagger?: number;
	className?: string;
	style?: CSSProperties;
};

const AnimateText = ({
	children,
	type = "row",
	trigger,
	viewport,
	as: Tag = "div",
	delay = 0,
	duration = 0.8,
	ease = "power3.out",
	stagger = 0.03,
	className,
	style
}: AnimateTextProps) => {
	const ref = useRef<HTMLElement | null>(null);
	const splitRef = useRef<SplitType | null>(null);
	const hasAnimated = useRef(false);
	const viewportReached = useViewportTrigger(ref, viewport);
	const resolvedTrigger = resolveTrigger(trigger, viewport, viewportReached);

	useEffect(() => {
		const el = ref.current;
		if (!el) {
			return;
		}

		splitRef.current?.revert();

		if (type === "chars") {
			const split = new SplitType(el, { types: "chars" });
			splitRef.current = split;
			gsap.set(split.chars, { y: 30, opacity: 0 });
		} else {
			const split = new SplitType(el, { types: "lines" });
			splitRef.current = split;

			split.lines?.forEach((line) => {
				const mask = document.createElement("span");
				mask.style.cssText = "display:block;overflow:hidden;";
				line.parentNode?.insertBefore(mask, line);
				mask.appendChild(line);
			});

			gsap.set(split.lines, { y: "100%", opacity: 0 });
		}

		return () => {
			splitRef.current?.revert();
		};
	}, [type]);

	useEffect(() => {
		const split = splitRef.current;
		if (!split) {
			return;
		}

		if (resolvedTrigger !== undefined && !resolvedTrigger) {
			if (hasAnimated.current) {
				if (type === "chars") {
					gsap.to(split.chars, {
						y: 30,
						opacity: 0,
						duration,
						ease,
						stagger,
						delay
					});
				} else {
					gsap.to(split.lines, {
						y: "100%",
						opacity: 0,
						duration,
						ease,
						stagger,
						delay
					});
				}
				hasAnimated.current = false;
			}
			return;
		}

		if (type === "chars") {
			gsap.to(split.chars, {
				y: 0,
				opacity: 1,
				duration,
				ease,
				stagger,
				delay
			});
		} else {
			gsap.to(split.lines, {
				y: "0%",
				opacity: 1,
				duration,
				ease,
				stagger,
				delay
			});
		}
		hasAnimated.current = true;
	}, [resolvedTrigger, type, delay, duration, ease, stagger]);

	return createElement(Tag, { ref, className, style }, children);
};

export default AnimateText;
