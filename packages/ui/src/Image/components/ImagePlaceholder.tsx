import type { CSSProperties } from "react";
import styles from "../Image.module.css";

/**
 * App-wide fallback used when a call site does not pass `placeholder`.
 * Leave unset until a shared asset is chosen.
 */
export const imagePlaceholderSrc: string | null = null;

type ImagePlaceholderProps = {
	alt: string;
	/** Path or URL. Overrides `imagePlaceholderSrc` for this render. */
	src?: string | null;
	className?: string;
	style?: CSSProperties;
};

export function ImagePlaceholder({
	alt,
	src,
	className,
	style
}: ImagePlaceholderProps) {
	const fillsFrame =
		style?.height != null ||
		style?.minHeight != null ||
		style?.maxHeight != null ||
		style?.aspectRatio != null;
	const frameClass = [styles.frame, fillsFrame && styles.fill, className]
		.filter(Boolean)
		.join(" ");
	const placeholderSrc = src || imagePlaceholderSrc;

	if (placeholderSrc) {
		return (
			<span className={frameClass} style={style}>
				<img
					className={`${styles.image} ${styles.fallback}`}
					src={placeholderSrc}
					alt={alt}
				/>
			</span>
		);
	}

	return (
		<span className={frameClass} style={style}>
			<span
				className={styles.placeholder}
				role={alt ? "img" : undefined}
				aria-label={alt || undefined}
			/>
		</span>
	);
}
