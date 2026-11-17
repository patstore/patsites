import { useEffect, useMemo, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Field, Section, useOptionalScroll } from "@repo/core";
import type { ImageRecord } from "@types";
import { imageSrc } from "@ui";
import styles from "./HomeGallery.module.scss";

export type HomeGalleryProps = {
	gallery: ImageRecord[];
};

type LaneItem = {
	key: string;
	src: string;
	alt: string;
};

const LANE_COPIES = 4;
const TRAVEL_RATIO = 0.06;

function toSources(images: ImageRecord[]): Array<{ src: string; alt: string }> {
	return images.flatMap((image) => {
		const src = imageSrc(image);
		if (!src) {
			return [];
		}
		return [{ src, alt: image.title ?? "" }];
	});
}

function repeatItems(
	sources: Array<{ src: string; alt: string }>,
	copies: number,
	prefix: string
): LaneItem[] {
	const items: LaneItem[] = [];
	for (let copy = 0; copy < copies; copy++) {
		for (let index = 0; index < sources.length; index++) {
			const source = sources[index];
			if (!source) {
				continue;
			}
			items.push({
				key: `${prefix}-${copy}-${index}-${source.src}`,
				src: source.src,
				alt: source.alt
			});
		}
	}
	return items;
}

function splitLanes(gallery: ImageRecord[]): {
	lane1: LaneItem[];
	lane2: LaneItem[];
} {
	const sources = toSources(gallery);
	let top = sources.filter((_, index) => index % 2 === 0);
	let bottom = sources.filter((_, index) => index % 2 === 1);
	if (top.length === 0) {
		top = sources;
	}
	if (bottom.length === 0) {
		bottom = [...sources].reverse();
	}

	return {
		lane1: repeatItems(top, LANE_COPIES, "a"),
		lane2: repeatItems(bottom, LANE_COPIES, "b")
	};
}

function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

function sectionProgress(el: HTMLElement): number {
	const rect = el.getBoundingClientRect();
	const viewportHeight = window.innerHeight;
	const distance = viewportHeight + rect.height;
	if (distance === 0) {
		return 0;
	}
	return clamp((viewportHeight - rect.top) / distance, 0, 1);
}

function laneTranslate(
	lane: HTMLElement,
	progress: number,
	direction: 1 | -1
): string {
	const overflow = Math.max(0, lane.scrollWidth - window.innerWidth);
	const start = -overflow * 0.35;
	const travel = overflow * TRAVEL_RATIO;
	return `translate3d(${start + direction * progress * travel}px, 0, 0)`;
}

export function HomeGallery({ gallery }: HomeGalleryProps) {
	const scroll = useOptionalScroll();
	const galleryArray = useMemo(
		() => gallery.filter((image) => image.active),
		[gallery]
	);
	const { lane1, lane2 } = useMemo(
		() => splitLanes(galleryArray),
		[galleryArray]
	);
	const sectionRef = useRef<HTMLElement | null>(null);
	const lane1Ref = useRef<HTMLDivElement | null>(null);
	const lane2Ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const section = sectionRef.current;
		const firstLane = lane1Ref.current;
		const secondLane = lane2Ref.current;
		if (!section || !firstLane || !secondLane) {
			return;
		}

		const motionQuery = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		);

		const apply = () => {
			const progress = motionQuery.matches
				? 0.5
				: sectionProgress(section);
			firstLane.style.transform = laneTranslate(firstLane, progress, 1);
			secondLane.style.transform = laneTranslate(
				secondLane,
				progress,
				-1
			);
		};

		apply();
		const unsubscribe = scroll
			? scroll.subscribe(apply)
			: () => window.removeEventListener("scroll", apply);
		if (!scroll) {
			window.addEventListener("scroll", apply, { passive: true });
		}
		window.addEventListener("resize", apply);
		const observer = new ResizeObserver(apply);
		observer.observe(firstLane);
		observer.observe(secondLane);
		motionQuery.addEventListener("change", apply);

		return () => {
			unsubscribe();
			window.removeEventListener("resize", apply);
			observer.disconnect();
			motionQuery.removeEventListener("change", apply);
		};
	}, [lane1, lane2, scroll]);

	return (
		<Section id="home-gallery">
			<section className={styles.home_gallery} ref={sectionRef}>
				<div className="flex row align-end justify-between w-100">
					<div>
						<div className="eyebrow transform">
							<Field id="eyebrow">Besuche unsere</Field>
						</div>
						<h2>
							<span className="border">
								<Field id="title">Galerie</Field>
							</span>
						</h2>
					</div>
					<button className="button" type="button">
						<Field id="button">Zur Galerie</Field>
						<ArrowRight size={12} />
					</button>
				</div>
				<div className={styles.lanes}>
					<div className={styles.lane} ref={lane1Ref}>
						{lane1.map((item) => (
							<img
								key={item.key}
								className={styles.lane_image}
								src={item.src}
								alt={item.alt}
								draggable={false}
							/>
						))}
					</div>
					<div className={styles.lane} ref={lane2Ref}>
						{lane2.map((item) => (
							<img
								key={item.key}
								className={styles.lane_image}
								src={item.src}
								alt={item.alt}
								draggable={false}
							/>
						))}
					</div>
				</div>
			</section>
		</Section>
	);
}
