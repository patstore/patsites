import { useEffect } from "react";
import { gsap } from "gsap";

const IMAGE_ASPECT = 16 / 9;
const MIN_THUMB = 32;

type DivRef = { current: HTMLDivElement | null };
type SpanRef = { current: HTMLSpanElement | null };

type LaneRefs = {
	galleryRef: DivRef;
	viewportRef: DivRef;
	laneRef: DivRef;
	trackRef: DivRef;
	thumbRef: DivRef;
	leftHintRef: SpanRef;
	rightHintRef: SpanRef;
};

export type UseHorizontalLaneOptions = LaneRefs & {
	enabled: boolean;
	imageCount: number;
};

function prefersReducedMotion(): boolean {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function readGap(lane: HTMLElement): number {
	return Number.parseFloat(getComputedStyle(lane).gap) || 0;
}

export function useHorizontalLane(options: UseHorizontalLaneOptions) {
	const {
		enabled,
		imageCount,
		galleryRef,
		viewportRef,
		laneRef,
		trackRef,
		thumbRef,
		leftHintRef,
		rightHintRef
	} = options;

	useEffect(() => {
		if (!enabled) {
			return;
		}

		const track = trackRef.current;
		const leftHint = leftHintRef.current;
		const rightHint = rightHintRef.current;

		const hideScrollHints = () => {
			if (leftHint) {
				leftHint.hidden = true;
			}
			if (rightHint) {
				rightHint.hidden = true;
			}
		};

		if (imageCount === 0) {
			if (!track) {
				return;
			}
			track.hidden = true;
			track.setAttribute("aria-hidden", "true");
			hideScrollHints();
			return () => {
				track.hidden = false;
				track.removeAttribute("aria-hidden");
				if (leftHint) {
					leftHint.hidden = false;
				}
				if (rightHint) {
					rightHint.hidden = false;
				}
			};
		}

		const gallery = galleryRef.current;
		const viewport = viewportRef.current;
		const lane = laneRef.current;
		const thumb = thumbRef.current;
		if (!gallery || !viewport || !lane || !track || !thumb) {
			return;
		}

		const state = { x: 0, dragging: false };

		const overflow = () =>
			Math.max(0, lane.scrollWidth - viewport.clientWidth);

		const extraLaneFromScrollbar = () => {
			const gap =
				Number.parseFloat(getComputedStyle(gallery).rowGap) || 0;
			const trackHeight =
				Number.parseFloat(getComputedStyle(track).height) || 0;
			return imageCount * (trackHeight + gap) * IMAGE_ASPECT;
		};

		const syncOverflowUi = () => {
			const max = overflow();
			const hide = track.hidden
				? max <= extraLaneFromScrollbar() + 1
				: max <= 1;
			track.hidden = hide;
			track.setAttribute("aria-hidden", hide ? "true" : "false");
		};

		const syncScrollHints = () => {
			if (!leftHint || !rightHint) {
				return;
			}

			const max = overflow();
			if (track.hidden || max <= 1) {
				hideScrollHints();
				return;
			}

			leftHint.hidden = state.x >= -1;
			rightHint.hidden = state.x <= -max + 1;
		};

		const thumbMetrics = () => {
			const max = overflow();
			const trackWidth = track.clientWidth;
			const ratio =
				max === 0 ? 1 : viewport.clientWidth / lane.scrollWidth;
			const thumbWidth = Math.max(MIN_THUMB, trackWidth * ratio);
			return {
				thumbWidth,
				travel: Math.max(0, trackWidth - thumbWidth),
				max
			};
		};

		const syncLaneWidth = () => {
			const height = viewport.clientHeight;
			if (height <= 0) {
				return;
			}
			const gap = readGap(lane);
			lane.style.width = `${imageCount * height * IMAGE_ASPECT + Math.max(0, imageCount - 1) * gap}px`;
		};

		const applyThumbSize = () => {
			if (track.hidden) {
				return;
			}
			gsap.set(thumb, { width: thumbMetrics().thumbWidth });
		};

		const layout = () => {
			const wasHidden = track.hidden;
			syncLaneWidth();
			syncOverflowUi();
			if (track.hidden !== wasHidden) {
				syncLaneWidth();
			}
			applyThumbSize();
			syncScrollHints();
		};

		const render = (x: number, duration: number) => {
			const max = overflow();
			const next = gsap.utils.clamp(-max, 0, x);
			state.x = next;
			const progress = max === 0 ? 0 : -next / max;
			const { travel } = thumbMetrics();
			const tweenDuration = prefersReducedMotion() ? 0 : duration;

			gsap.to(lane, {
				x: next,
				duration: tweenDuration,
				ease: "power3.out",
				overwrite: true
			});
			gsap.to(thumb, {
				x: progress * travel,
				duration: tweenDuration,
				ease: "power3.out",
				overwrite: true
			});
			track.setAttribute(
				"aria-valuenow",
				String(Math.round(progress * 100))
			);
			syncScrollHints();
		};

		const clientXToX = (clientX: number) => {
			const { thumbWidth, travel, max } = thumbMetrics();
			if (travel === 0 || max === 0) {
				return 0;
			}
			const progress = gsap.utils.clamp(
				0,
				1,
				(clientX -
					track.getBoundingClientRect().left -
					thumbWidth / 2) /
					travel
			);
			return -max * progress;
		};

		layout();
		gsap.set(lane, { x: 0 });
		render(0, 0);

		const onWheel = (event: WheelEvent) => {
			if (state.dragging || !gallery.contains(event.target as Node)) {
				return;
			}

			const max = overflow();
			if (max === 0) {
				return;
			}

			const delta =
				Math.abs(event.deltaX) > Math.abs(event.deltaY)
					? event.deltaX
					: event.deltaY;
			const next = gsap.utils.clamp(-max, 0, state.x - delta);
			if (next === state.x) {
				return;
			}

			event.preventDefault();
			event.stopPropagation();
			render(next, 0.55);
		};

		const onPointerDown = (event: PointerEvent) => {
			if (event.button !== 0) {
				return;
			}
			state.dragging = true;
			track.setPointerCapture(event.pointerId);
			event.preventDefault();
		};

		const onPointerMove = (event: PointerEvent) => {
			if (!state.dragging) {
				return;
			}
			render(clientXToX(event.clientX), 0.12);
		};

		const onPointerUp = (event: PointerEvent) => {
			if (!state.dragging) {
				return;
			}
			state.dragging = false;
			if (track.hasPointerCapture(event.pointerId)) {
				track.releasePointerCapture(event.pointerId);
			}
		};

		const onResize = () => {
			layout();
			render(state.x, 0);
		};

		gallery.addEventListener("wheel", onWheel, { passive: false });
		track.addEventListener("pointerdown", onPointerDown);
		track.addEventListener("pointermove", onPointerMove);
		track.addEventListener("pointerup", onPointerUp);
		track.addEventListener("pointercancel", onPointerUp);
		window.addEventListener("resize", onResize);
		const observer = new ResizeObserver(onResize);
		observer.observe(viewport);
		observer.observe(lane);

		return () => {
			gallery.removeEventListener("wheel", onWheel);
			track.removeEventListener("pointerdown", onPointerDown);
			track.removeEventListener("pointermove", onPointerMove);
			track.removeEventListener("pointerup", onPointerUp);
			track.removeEventListener("pointercancel", onPointerUp);
			window.removeEventListener("resize", onResize);
			observer.disconnect();
			gsap.killTweensOf(lane);
			gsap.killTweensOf(thumb);
			gsap.set(lane, { clearProps: "x,width" });
			gsap.set(thumb, { clearProps: "x,width" });
			track.hidden = false;
			track.removeAttribute("aria-hidden");
			if (leftHint) {
				leftHint.hidden = false;
			}
			if (rightHint) {
				rightHint.hidden = false;
			}
		};
	}, [
		enabled,
		imageCount,
		galleryRef,
		viewportRef,
		laneRef,
		trackRef,
		thumbRef,
		leftHintRef,
		rightHintRef
	]);
}
