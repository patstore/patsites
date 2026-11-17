import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const FADE_DURATION = 0.32;

function prefersReducedMotion(): boolean {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type ElementRef = { current: HTMLElement | null };

export function useFadeOnChange<T>(
	value: T,
	key: string,
	elementRef: ElementRef
): T {
	const [displayed, setDisplayed] = useState(value);
	const displayedKeyRef = useRef(key);
	const latestValueRef = useRef(value);
	const latestKeyRef = useRef(key);
	const hasMountedRef = useRef(false);

	latestValueRef.current = value;
	latestKeyRef.current = key;

	useEffect(() => {
		if (!hasMountedRef.current) {
			hasMountedRef.current = true;
			displayedKeyRef.current = key;
			setDisplayed(value);
			return;
		}

		if (displayedKeyRef.current === key) {
			return;
		}

		const el = elementRef.current;
		const duration = prefersReducedMotion() ? 0 : FADE_DURATION;

		if (!el) {
			displayedKeyRef.current = key;
			setDisplayed(value);
			return;
		}

		const tween = gsap.to(el, {
			autoAlpha: 0,
			duration,
			ease: "power2.in",
			overwrite: true,
			onComplete() {
				displayedKeyRef.current = latestKeyRef.current;
				setDisplayed(latestValueRef.current);
				gsap.to(el, {
					autoAlpha: 1,
					duration,
					ease: "power2.out",
					overwrite: true
				});
			}
		});

		return () => {
			tween.kill();
		};
	}, [key, elementRef, value]);

	return displayed;
}
