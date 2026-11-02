export type GalleryDisplayMode = "mosaic" | "horizontal";

export interface GalleryProps {
	/**
	 * Array of image IDs to display in the gallery
	 */
	imageIds: string[];

	/**
	 * Function to resolve image IDs to Gatsby image data
	 * This should typically come from useFindImages hook
	 */
	findImage: (id: string) => string;

	/**
	 * Display mode for the gallery
	 * @default "horizontal"
	 */
	displayMode?: GalleryDisplayMode;

	/**
	 * Optional alt text generator function
	 * If not provided, uses the image ID as alt text
	 */
	getAltText?: (imageId: string, index: number) => string;

	/**
	 * Show thumbnails in horizontal mode
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

	/**
	 * Custom container style
	 */
	containerStyle?: React.CSSProperties;
}
