import type { CSSProperties } from "react";
import { ProgressiveImage } from "./components/ProgressiveImage";
import { findStoredImage, imageSources } from "./findImage";

export type ImageProps = {
  /** `objectId` or GraphQL `id` of an image in the generated snapshot. */
  id: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  /** Zooms the image slightly while the pointer is over it. */
  hoverOnZoom?: boolean;
};

export function Image({ id, className, style, alt, hoverOnZoom = false }: ImageProps) {
  const sources = imageSources(findStoredImage(id));
  return (
    <ProgressiveImage
      key={id}
      alt={alt ?? sources.alt}
      thumbnailSrc={sources.thumbnailSrc}
      src={sources.src}
      remoteSrc={sources.remoteSrc}
      className={className}
      style={style}
      hoverOnZoom={hoverOnZoom}
    />
  );
}

export { imagePlaceholderSrc } from "./components/ImagePlaceholder";
