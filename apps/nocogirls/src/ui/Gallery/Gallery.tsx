import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./Gallery.module.scss";
import { GalleryImage } from "./components/GalleryImage";
import { useFadeOnChange } from "./hooks/useFadeOnChange";
import { useHorizontalLane } from "./useHorizontalLane";
import type { GalleryProps } from "./types";
import type { ImageRecord } from "@types";

export function Gallery(props: GalleryProps) {
	const galleryRef = useRef<HTMLDivElement>(null);
	const viewportRef = useRef<HTMLDivElement>(null);
	const laneRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);
	const leftHintRef = useRef<HTMLSpanElement>(null);
	const rightHintRef = useRef<HTMLSpanElement>(null);
	const incomingImages = props.images.filter((image): image is ImageRecord =>
		Boolean(image?.objectId)
	);
	const imagesKey = incomingImages.map((image) => image.objectId).join("|");
	const images = useFadeOnChange(incomingImages, imagesKey, galleryRef);

	useHorizontalLane({
		enabled: props.type === "horizontal",
		imageCount: images.length,
		galleryRef,
		viewportRef,
		laneRef,
		trackRef,
		thumbRef,
		leftHintRef,
		rightHintRef
	});

	if (props.type === "horizontal") {
		return (
			<div className={styles.gallery} ref={galleryRef}>
				<div className={styles.viewport} ref={viewportRef}>
					<div className={styles.lane} ref={laneRef}>
						{images.map((image) => (
							<GalleryImage key={image.objectId} image={image} />
						))}
					</div>
					<span
						className={`${styles.scroll_hint} ${styles.scroll_hint_left}`}
						ref={leftHintRef}
						aria-hidden="true"
						hidden
					>
						<ArrowLeft size={12} />
					</span>
					<span
						className={`${styles.scroll_hint} ${styles.scroll_hint_right}`}
						ref={rightHintRef}
						aria-hidden="true"
						hidden
					>
						<ArrowRight size={12} />
					</span>
				</div>
				<div
					className={styles.scrollbar}
					ref={trackRef}
					role="scrollbar"
					aria-orientation="horizontal"
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={0}
					aria-label="Gallery scroll"
				>
					<div className={styles.scrollbar_thumb} ref={thumbRef} />
				</div>
			</div>
		);
	}

	return (
		<div className={styles.gallery} ref={galleryRef}>
			<div className={styles.vertical}>
				{images.map((image) => (
					<GalleryImage key={image.objectId} image={image} />
				))}
			</div>
		</div>
	);
}
