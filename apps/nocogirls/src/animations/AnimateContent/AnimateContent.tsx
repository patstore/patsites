import {
	createElement,
	useEffect,
	useRef,
	type CSSProperties,
	type ReactNode
} from "react";
import { gsap } from "gsap";
import {
	resolveTrigger,
	useViewportTrigger
} from "../hooks/useViewportTrigger";

type ContentTag = "div" | "span" | "section" | "p";

export type AnimateContentProps = {
	children: ReactNode;
	trigger?: boolean;
	viewport?: number;
	as?: ContentTag;
	delay?: number;
	duration?: number;
	ease?: string;
	className?: string;
	style?: CSSProperties;
};

const AnimateContent = ({
	children,
	trigger,
	viewport,
	as: Tag = "div",
	delay = 0,
	duration = 0.6,
	ease = "power3.inOut",
	className,
	style
}: AnimateContentProps) => {
	const ref = useRef<HTMLElement | null>(null);
	const hasAnimated = useRef(false);
	const viewportReached = useViewportTrigger(ref, viewport);
	const resolvedTrigger = resolveTrigger(trigger, viewport, viewportReached);

	useEffect(() => {
		const el = ref.current;
		if (!el) {
			return;
		}

		gsap.set(el, { opacity: 0 });

		return () => {
			gsap.killTweensOf(el);
			gsap.set(el, { clearProps: "opacity" });
		};
	}, []);

	useEffect(() => {
		const el = ref.current;
		if (!el) {
			return;
		}

		if (resolvedTrigger !== undefined && !resolvedTrigger) {
			if (hasAnimated.current) {
				gsap.to(el, { opacity: 0, duration, ease, delay });
				hasAnimated.current = false;
			}
			return;
		}

		gsap.to(el, { opacity: 1, duration, ease, delay });
		hasAnimated.current = true;
	}, [resolvedTrigger, delay, duration, ease]);

	return createElement(Tag, { ref, className, style }, children);
};

export default AnimateContent;
