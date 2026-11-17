import type { ImageRecord } from "@types";

export type GalleryProps = {
	images: Array<ImageRecord | null | undefined>;
	type: "horizontal" | "vertical";
	defaultImage?: ImageRecord | null;
};
