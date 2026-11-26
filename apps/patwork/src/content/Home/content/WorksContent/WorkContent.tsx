import { useLayoutEffect, useRef, useState } from "react";
import { useOptionalScroll } from "@repo/core";
import { useCollection } from "@repo/provider";
import { gsap } from "gsap";
import type { ArticleClass } from "@data";
import "@/provider/collections";
import { getProjectArticles } from "@/content/Projekt/utils";
import Work from "./components/Work";
import "./works_content.scss";

const WHEEL_LINE_HEIGHT = 100 / 6;

function wheelDelta(event: WheelEvent): number {
	const dominant =
		Math.abs(event.deltaX) > Math.abs(event.deltaY)
			? event.deltaX
			: event.deltaY;
	if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
		return dominant * WHEEL_LINE_HEIGHT;
	}
	if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
		return dominant * window.innerHeight;
	}
	return dominant;
}

function loopCopies(viewportWidth: number, setWidth: number): number {
	if (setWidth <= 0) return 3;
	return Math.max(3, Math.ceil((viewportWidth + 120) / setWidth) + 2);
}

function sectionIsVisible(section: HTMLElement): boolean {
	const rect = section.getBoundingClientRect();
	return rect.bottom > 0 && rect.top < window.innerHeight;
}

/** Keep the scroll offset inside the middle copy so the loop can jump without a visual seam. */
function wrapOffset(value: number, distance: number): number {
	if (distance <= 0) return value;
	let next = value;
	while (next >= distance * 2) next -= distance;
	while (next < distance) next += distance;
	return next;
}

const WorkContent = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const viewportRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const [copies, setCopies] = useState(3);
	const scroll = useOptionalScroll();

	const { items } = useCollection<ArticleClass>("Article");
	const projects = getProjectArticles(items);
	const projectKey = projects.map((project) => project.objectId).join(":");

	useLayoutEffect(() => {
		const section = sectionRef.current;
		const viewport = viewportRef.current;
		const track = trackRef.current;
		if (!section || !viewport || !track || projects.length === 0) return;

		let cancelled = false;
		let distance = 0;
		let lock = false;
		let tracking = false;
		let moved = 0;
		let current = 0;
		let target = 0;
		let written = -1;
		const scroller = scroll?.getViewport() ?? null;
		let lastPage = scroller?.scrollTop ?? 0;
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;
		let drag: {
			id: number;
			x: number;
			y: number;
			scroll: number;
			overRow: boolean;
		} | null = null;

		const measure = () => {
			const first = track.children[0] as HTMLElement | undefined;
			const next = track.children[projects.length] as HTMLElement | undefined;
			if (!first || !next) return 0;
			return next.offsetLeft - first.offsetLeft;
		};

		const render = () => {
			const wrapped = wrapOffset(current, distance);
			target += wrapped - current;
			current = wrapped;
			if (Math.abs(viewport.scrollLeft - current) < 0.4) return;
			written = current;
			lock = true;
			viewport.scrollLeft = current;
			lock = false;
		};

		const normalize = () => {
			if (distance <= 0) return;
			const wrapped = wrapOffset(viewport.scrollLeft, distance);
			if (Math.abs(wrapped - viewport.scrollLeft) < 0.5 && current !== 0) {
				return;
			}
			current = wrapped;
			target = wrapped;
			lock = true;
			viewport.scrollLeft = wrapped;
			lock = false;
		};

		const tick = (_time: number, deltaTime: number) => {
			if (cancelled || drag || reduceMotion) return;
			const diff = target - current;
			if (Math.abs(diff) < 0.2) {
				if (diff === 0) return;
				current = target;
			} else {
				const frame = Math.min(deltaTime, 48);
				const amount = 1 - Math.pow(0.88, frame / 16.67);
				current += diff * amount;
			}
			render();
		};

		const sync = () => {
			if (cancelled) return;
			const nextDistance = measure();
			if (nextDistance <= 0) return;
			distance = nextDistance;
			const needed = loopCopies(viewport.clientWidth, distance);
			if (needed !== copies) {
				setCopies(needed);
				return;
			}
			normalize();
		};

		const pageCanScroll = (delta: number) => {
			if (!scroller) return false;
			const top = scroller.scrollTop;
			const limit = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
			if (delta > 0) return top < limit - 1;
			if (delta < 0) return top > 1;
			return false;
		};

		const onWheel = (event: WheelEvent) => {
			if (
				event.target instanceof HTMLElement &&
				event.target.closest(
					"input, textarea, select, [contenteditable='true']"
				)
			) {
				return;
			}
			if (!sectionIsVisible(section)) return;

			const delta = wheelDelta(event);
			if (!delta) return;

			const overRow = viewport.contains(event.target as Node);
			const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
			if (!overRow && !horizontal && pageCanScroll(delta)) return;

			if (event.cancelable) event.preventDefault();
			event.stopPropagation();
			if (reduceMotion) {
				current += delta;
				target = current;
				render();
				return;
			}
			target += delta;
		};

		const onPageScroll = () => {
			if (!scroller) return;
			const next = scroller.scrollTop;
			const delta = next - lastPage;
			lastPage = next;
			if (!delta || !sectionIsVisible(section)) return;
			current += delta;
			target += delta;
			render();
		};

		const onNativeScroll = () => {
			if (lock) return;
			const left = viewport.scrollLeft;
			if (Math.abs(left - written) < 1) return;
			current = left;
			target = current;
			const wrapped = wrapOffset(current, distance);
			if (Math.abs(wrapped - current) < 0.5) return;
			current = wrapped;
			target = wrapped;
			lock = true;
			viewport.scrollLeft = wrapped;
			lock = false;
		};

		const onPointerDown = (event: PointerEvent) => {
			const overRow = viewport.contains(event.target as Node);
			if (event.pointerType === "mouse") {
				if (!overRow) return;
				tracking = true;
				moved = 0;
				return;
			}
			target = current;
			drag = {
				id: event.pointerId,
				x: event.clientX,
				y: event.clientY,
				scroll: current,
				overRow
			};
			tracking = overRow;
			moved = 0;
		};

		const onPointerMove = (event: PointerEvent) => {
			if (tracking && event.pointerType === "mouse") {
				moved += Math.abs(event.movementX) + Math.abs(event.movementY);
			}
			if (!drag || drag.id !== event.pointerId || !sectionIsVisible(section)) {
				return;
			}
			const dx = event.clientX - drag.x;
			const dy = event.clientY - drag.y;
			const mostlyHorizontal = Math.abs(dx) > Math.abs(dy);
			if (drag.overRow && mostlyHorizontal) return;
			if (!mostlyHorizontal && pageCanScroll(-dy)) return;
			if (event.cancelable) event.preventDefault();
			moved = Math.abs(dx) + Math.abs(dy);
			current = drag.scroll + (mostlyHorizontal ? -dx : -dy);
			target = current;
			render();
		};

		const onPointerUp = () => {
			tracking = false;
			drag = null;
		};

		const onClick = (event: MouseEvent) => {
			if (moved < 8) return;
			event.preventDefault();
			event.stopPropagation();
			moved = 0;
		};

		sync();
		current = viewport.scrollLeft;
		target = current;

		const observer = new ResizeObserver(sync);
		observer.observe(viewport);
		observer.observe(track);

		gsap.ticker.add(tick);
		window.addEventListener("wheel", onWheel, {
			passive: false,
			capture: true
		});
		scroller?.addEventListener("scroll", onPageScroll, { passive: true });
		viewport.addEventListener("scroll", onNativeScroll, { passive: true });
		window.addEventListener("pointerdown", onPointerDown);
		window.addEventListener("pointermove", onPointerMove);
		window.addEventListener("pointerup", onPointerUp);
		window.addEventListener("pointercancel", onPointerUp);
		viewport.addEventListener("click", onClick, true);

		return () => {
			cancelled = true;
			observer.disconnect();
			gsap.ticker.remove(tick);
			window.removeEventListener("wheel", onWheel, { capture: true });
			scroller?.removeEventListener("scroll", onPageScroll);
			viewport.removeEventListener("scroll", onNativeScroll);
			window.removeEventListener("pointerdown", onPointerDown);
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", onPointerUp);
			window.removeEventListener("pointercancel", onPointerUp);
			viewport.removeEventListener("click", onClick, true);
		};
	}, [copies, projectKey, projects.length, scroll]);

	if (projects.length === 0) return null;

	const length = projects.length.toString().padStart(2, "0");

	return (
		<section
			id="work"
			ref={sectionRef}
			className="works-section"
			aria-label="Projekte"
		>
			<div className="works-section-inner">
				<div
					ref={viewportRef}
					className="works-marquee-viewport"
					tabIndex={0}
				>
					<div ref={trackRef} className="works-marquee-track">
						{Array.from({ length: copies }, (_, copy) =>
							projects.map((project, index) => (
								<Work
									key={`${project.objectId}-${copy}`}
									work={project}
									index={index}
									duplicate={copy > 0}
									number={(index + 1)
										.toString()
										.padStart(2, "0")}
									length={length}
								/>
							))
						).flat()}
					</div>
				</div>
				<div className="works-section-cta section-container-element align-self-end w-33"></div>
			</div>
		</section>
	);
};

export default WorkContent;
