import type { CSSProperties } from "react";
import { ProgressiveImage } from "./components/ProgressiveImage";
import { findStoredImage, imageSources } from "./findImage";

export type ImageProps = {
	/** `objectId` or GraphQL `id` of an image in the generated snapshot. */
	id?: string | null;
	/**
	 * Rendered when `id` is missing or no file can be resolved for it.
	 * A path or URL, for example `/placeholder.png`.
	 */
	placeholder?: string;
	alt?: string;
	className?: string;
	style?: CSSProperties;
	/** Zooms the image slightly while the pointer is over it. */
	hoverOnZoom?: boolean;
};

export function Image({
	id,
	placeholder,
	className,
	style,
	alt,
	hoverOnZoom = false
}: ImageProps) {
	const sources = imageSources(findStoredImage(id));

	return (
		<ProgressiveImage
			key={id || placeholder || "image"}
			alt={alt ?? sources.alt}
			thumbnailSrc={sources.thumbnailSrc}
			src={sources.src}
			remoteSrc={sources.remoteSrc}
			placeholder={placeholder}
			className={className}
			style={style}
			hoverOnZoom={hoverOnZoom}
		/>
	);
}

export { imagePlaceholderSrc } from "./components/ImagePlaceholder";
