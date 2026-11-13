import type { CSSProperties } from "react";
import styles from "../Image.module.css";

/**
 * Shown when an image record has no local file and no remote url.
 * Leave unset until a placeholder asset is chosen.
 */
export const imagePlaceholderSrc: string | null = null;

type ImagePlaceholderProps = {
  alt: string;
  className?: string;
  style?: CSSProperties;
};

export function ImagePlaceholder({ alt, className, style }: ImagePlaceholderProps) {
  const fillsFrame =
    style?.height != null ||
    style?.minHeight != null ||
    style?.maxHeight != null ||
    style?.aspectRatio != null;
  const frameClass = [styles.frame, fillsFrame && styles.fill, className].filter(Boolean).join(" ");

  if (imagePlaceholderSrc) {
    return (
      <span className={frameClass} style={style}>
        <img className={styles.image} src={imagePlaceholderSrc} alt={alt} />
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
