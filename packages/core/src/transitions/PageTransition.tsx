/** @jsxImportSource react */
import {
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	type CSSProperties,
	type ReactNode
} from "react";
import gsap from "gsap";
import { registerGsap } from "../gsap.ts";
import { useOptionalScroll } from "../scroll/context.ts";
import { copyScrollOffsets, elementByTransitionId } from "./dom.ts";
import { matchRouteTransition } from "./match.ts";
import type { RouteTransition, TransitionMotion } from "./types.ts";

const useIsoLayoutEffect =
	typeof window === "undefined" ? useEffect : useLayoutEffect;

export type PageTransitionProps = {
	/** Current pathname. Pass the router location in from the root route. */
	pathname: string;
	children: ReactNode;
	/** Route-pair table. The most specific `from` / `to` match is used. */
	transitions?: readonly RouteTransition[];
	/**
	 * Keep a clone of the previous page in place while the next page animates.
	 * A matching transition can override this.
	 */
	clonePrevious?: boolean;
	/** Used when no pair matches. Omit it to swap immediately. */
	fallback?: Omit<RouteTransition, "from" | "to">;
	duration?: number;
	ease?: string;
	/** Reset Lenis to the top after a pathname change. */
	scrollToTop?: boolean;
	className?: string;
	style?: CSSProperties;
};

type PendingTransition = {
	to: string;
	transition: RouteTransition;
	ghost: HTMLElement | null;
	outgoing: Map<string, DOMRect>;
	outgoingNodes: Map<string, HTMLElement>;
};

const containerStyle: CSSProperties = {
	position: "relative",
	width: "100%"
};

function motionOr(
	value: TransitionMotion | undefined,
	fallback: TransitionMotion
): TransitionMotion {
	return value ?? fallback;
}

export function PageTransition({
	pathname,
	children,
	transitions = [],
	clonePrevious = false,
	fallback,
	duration = 1.2,
	ease = "power2.inOut",
	scrollToTop = true,
	className,
	style
}: PageTransitionProps) {
	registerGsap();
	const scroll = useOptionalScroll();
	const containerRef = useRef<HTMLDivElement>(null);
	const currentRef = useRef<HTMLDivElement>(null);
	const pending = useRef<PendingTransition | null>(null);
	const rendered = useRef(children);
	const [activePath, setActivePath] = useState(pathname);

	if (activePath === pathname) {
		rendered.current = children;
	}
	const view = activePath === pathname ? children : rendered.current;

	useIsoLayoutEffect(() => {
		if (activePath === pathname) {
			return;
		}

		const from = activePath;
		const matched = matchRouteTransition(transitions, from, pathname);
		const transition =
			matched ?? (fallback ? { from, to: pathname, ...fallback } : null);
		const content = currentRef.current;
		const parent = containerRef.current;
		const reduced =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (!transition || reduced || !content || !parent) {
			pending.current = null;
			setActivePath(pathname);
			if (scrollToTop) {
				scroll?.scrollTo(0, { immediate: true });
			}
			return;
		}

		const shouldClone = transition.clonePrevious ?? clonePrevious;
		const outgoing = new Map<string, DOMRect>();
		const outgoingNodes = new Map<string, HTMLElement>();
		for (const element of transition.elements ?? []) {
			const node = elementByTransitionId(content, element.id);
			if (node) {
				outgoing.set(element.id, node.getBoundingClientRect());
				outgoingNodes.set(element.id, node);
			}
		}

		let ghost: HTMLElement | null = null;
		if (shouldClone) {
			ghost = content.cloneNode(true) as HTMLElement;
			ghost.setAttribute("aria-hidden", "true");
			ghost.inert = true;
			const box = content.getBoundingClientRect();
			Object.assign(
				ghost.style,
				transition.pinPrevious
					? {
							position: "fixed",
							top: `${box.top}px`,
							left: `${box.left}px`,
							width: `${box.width}px`,
							height: `${box.height}px`,
							margin: "0",
							pointerEvents: "none",
							zIndex: "1"
						}
					: {
							position: "absolute",
							inset: "0",
							width: "100%",
							margin: "0",
							pointerEvents: "none",
							zIndex: "1"
						}
			);
			copyScrollOffsets(content, ghost);
			if (transition.pinPrevious) {
				document.body.appendChild(ghost);
			} else {
				parent.insertBefore(ghost, content);
			}
		}

		pending.current = {
			to: pathname,
			transition,
			ghost,
			outgoing,
			outgoingNodes
		};
		setActivePath(pathname);
	}, [
		pathname,
		activePath,
		transitions,
		fallback,
		clonePrevious,
		scroll,
		scrollToTop
	]);

	useIsoLayoutEffect(() => {
		const job = pending.current;
		if (!job || job.to !== pathname || activePath !== pathname) {
			return;
		}
		pending.current = null;

		const next = currentRef.current;
		if (!next) {
			job.ghost?.remove();
			return;
		}

		if (scrollToTop) {
			scroll?.scrollTo(0, { immediate: true });
		}

		const pageDuration = job.transition.duration ?? duration;
		const pageEase = job.transition.ease ?? ease;
		const shouldClone = job.transition.clonePrevious ?? clonePrevious;
		const hasSharedElements = (job.transition.elements?.length ?? 0) > 0;
		const defaultPageFrom: TransitionMotion = shouldClone
			? { autoAlpha: 0, x: "100vw" }
			: { autoAlpha: 0 };
		const overlays: HTMLElement[] = [];
		const hidden: HTMLElement[] = [];
		let raf = 0;

		const context = gsap.context(() => {
			const timeline = gsap.timeline({
				defaults: { duration: pageDuration, ease: pageEase },
				onComplete: () => {
					hidden.forEach((node) => {
						gsap.set(node, { clearProps: "opacity,visibility" });
					});
					job.ghost?.remove();
					gsap.set(next, {
						clearProps: "transform,opacity,visibility"
					});
				}
			});

			if (job.ghost) {
				timeline.to(
					job.ghost,
					job.transition.exit ?? { autoAlpha: 0, x: -300 },
					0
				);
			}
			if (job.transition.page || !hasSharedElements) {
				timeline.fromTo(
					next,
					motionOr(job.transition.page?.from, defaultPageFrom),
					motionOr(job.transition.page?.to, {
						autoAlpha: 1,
						x: 0,
						y: 0
					}),
					0
				);
			}

			const launched = new Set<string>();
			const tryFly = (tries: number) => {
				const root = currentRef.current;
				if (!root) {
					return;
				}
				let waiting = false;
				for (const element of job.transition.elements ?? []) {
					if (launched.has(element.id)) {
						continue;
					}
					const previousNode = job.outgoingNodes.get(element.id);
					const matches = [
						...root.querySelectorAll<HTMLElement>(
							`[data-transition-id="${CSS.escape(element.id)}"]`
						)
					].filter(
						(node) =>
							node !== previousNode &&
							!node.closest('[aria-hidden="true"]')
					);
					if (element.from || element.to) {
						const target = matches[0];
						if (!target) {
							waiting = true;
							continue;
						}
						launched.add(element.id);
						timeline.fromTo(
							target,
							{ ...element.from, immediateRender: false },
							{ ...element.to, immediateRender: false },
							0
						);
						continue;
					}
					const start = job.outgoing.get(element.id);
					const target = matches[0];
					if (!start || !target) {
						waiting = Boolean(start);
						continue;
					}
					const end = target.getBoundingClientRect();
					const moved =
						Math.abs(end.left - start.left) > 1 ||
						Math.abs(end.top - start.top) > 1 ||
						Math.abs(end.width - start.width) > 1 ||
						Math.abs(end.height - start.height) > 1;
					if (!moved) {
						waiting = true;
						continue;
					}
					launched.add(element.id);
					if (job.ghost) {
						const previous = elementByTransitionId(
							job.ghost,
							element.id
						);
						if (previous) {
							previous.style.visibility = "hidden";
						}
					}
					const overlay = target.cloneNode(true) as HTMLElement;
					Object.assign(overlay.style, {
						position: "fixed",
						left: `${start.left}px`,
						top: `${start.top}px`,
						width: `${start.width}px`,
						height: `${start.height}px`,
						maxWidth: "none",
						maxHeight: "none",
						margin: "0",
						objectFit: "cover",
						pointerEvents: "none",
						zIndex: "50"
					});
					document.body.appendChild(overlay);
					overlays.push(overlay);
					hidden.push(target);
					gsap.set(target, { autoAlpha: 0 });
					const flight = overlay.animate(
						[
							{
								left: `${start.left}px`,
								top: `${start.top}px`,
								width: `${start.width}px`,
								height: `${start.height}px`
							},
							{
								left: `${end.left}px`,
								top: `${end.top}px`,
								width: `${end.width}px`,
								height: `${end.height}px`
							}
						],
						{
							duration: pageDuration * 1000,
							easing: "cubic-bezier(0.77, 0, 0.175, 1)",
							fill: "forwards"
						}
					);
					flight.onfinish = () => {
						gsap.set(target, {
							autoAlpha: 1,
							clearProps: "opacity,visibility"
						});
						overlay.remove();
					};
				}
				if (waiting && tries < 12) {
					raf = window.requestAnimationFrame(() => tryFly(tries + 1));
				}
			};
			tryFly(0);
		});

		return () => {
			window.cancelAnimationFrame(raf);
			context.revert();
			job.ghost?.remove();
			overlays.forEach((node) => node.remove());
		};
	}, [
		pathname,
		activePath,
		clonePrevious,
		duration,
		ease,
		scroll,
		scrollToTop
	]);

	return (
		<div
			ref={containerRef}
			className={className}
			style={{ ...containerStyle, ...style }}
		>
			<div
				ref={currentRef}
				style={{ position: "relative", zIndex: 2, width: "100%" }}
			>
				{view}
			</div>
		</div>
	);
}
