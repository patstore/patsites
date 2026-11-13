import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "../Image.module.css";
import { ImagePlaceholder } from "./ImagePlaceholder";

type ProgressiveImageProps = {
  alt: string;
  thumbnailSrc?: string;
  src?: string;
  remoteSrc?: string;
  className?: string;
  style?: CSSProperties;
  hoverOnZoom?: boolean;
};

export function ProgressiveImage({
  alt,
  thumbnailSrc,
  src,
  remoteSrc,
  className,
  style,
  hoverOnZoom = false,
}: ProgressiveImageProps) {
  const fullRef = useRef<HTMLImageElement>(null);
  const [thumbFailed, setThumbFailed] = useState(false);
  const [localFailed, setLocalFailed] = useState(false);
  const [remoteFailed, setRemoteFailed] = useState(false);
  const [fullReady, setFullReady] = useState(false);

  const fullSrc = !localFailed && src ? src : !remoteFailed ? remoteSrc : undefined;
  const showThumb = Boolean(thumbnailSrc) && !thumbFailed;
  const showFull = Boolean(fullSrc);
  const stacked = showThumb && showFull;
  const fillsFrame =
    style?.height != null ||
    style?.minHeight != null ||
    style?.maxHeight != null ||
    style?.aspectRatio != null;

  useEffect(() => {
    const image = fullRef.current;
    setFullReady(Boolean(image && image.complete && image.naturalWidth > 0));
  }, [fullSrc]);

  if (!showThumb && !showFull) {
    return <ImagePlaceholder alt={alt} className={className} style={style} />;
  }

  const frameClass = [styles.frame, fillsFrame && styles.fill, hoverOnZoom && styles.zoom, className]
    .filter(Boolean)
    .join(" ");
  const fullClass = [styles.image, stacked && styles.full, stacked && fullReady && styles.ready]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={frameClass} style={style}>
      {showThumb ? (
        <img
          className={styles.image}
          src={thumbnailSrc}
          alt={alt}
          decoding="async"
          onError={() => setThumbFailed(true)}
        />
      ) : null}
      {showFull ? (
        <img
          ref={fullRef}
          className={fullClass}
          src={fullSrc}
          alt={showThumb ? "" : alt}
          decoding="async"
          onLoad={() => setFullReady(true)}
          onError={() => {
            setFullReady(false);
            if (src && fullSrc === src) {
              setLocalFailed(true);
              return;
            }
            setRemoteFailed(true);
          }}
        />
      ) : null}
    </span>
  );
}
