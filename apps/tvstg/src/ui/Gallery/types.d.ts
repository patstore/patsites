import type { CSSProperties } from "react";

export type GalleryDisplayMode = "mosaic" | "horizontal";

export interface GalleryProps {
  /** Array of image IDs to display in the gallery */
  imageIds: string[];

  /**
   * Display mode for the gallery
   * @default "horizontal"
   */
  displayMode?: GalleryDisplayMode;

  /**
   * Optional alt text generator function
   * If not provided, uses a numbered label
   */
  getAltText?: (imageId: string, index: number) => string;

  /**
   * Show thumbnails in the lightbox
   * @default true
   */
  showThumbnails?: boolean;

  /**
   * Show fullscreen button
   * @default true
   */
  showFullscreenButton?: boolean;

  /**
   * Show play button
   * @default false
   */
  showPlayButton?: boolean;

  /**
   * Auto play the gallery
   * @default false
   */
  autoPlay?: boolean;

  /**
   * Slide interval in milliseconds when auto playing
   * @default 3000
   */
  slideInterval?: number;

  /** Custom container style */
  containerStyle?: CSSProperties;
}
