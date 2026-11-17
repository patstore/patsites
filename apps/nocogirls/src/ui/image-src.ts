import { useCallback } from "react";
import { useFindData } from "@data";
import type { ImageRecord } from "@types";

export function staticFileUrl(filePath: string): string {
	const encoded = filePath
		.split("/")
		.filter(Boolean)
		.map((part) => encodeURIComponent(part))
		.join("/");
	return `/data/files/${encoded}`;
}

export function imageSrc(
	image?: Partial<ImageRecord> | null
): string | undefined {
	if (!image) {
		return undefined;
	}
	if (image.url) {
		return image.url;
	}
	if (typeof image.file_local === "string" && image.file_local) {
		return image.file_local;
	}
	if (Array.isArray(image.file_local) && image.file_local[0]) {
		return image.file_local[0];
	}
	if (image.filePath) {
		return staticFileUrl(image.filePath);
	}
	return image.file?.url;
}

export function isDirectMediaSrc(value: string): boolean {
	return (
		value.startsWith("/") ||
		value.startsWith("http://") ||
		value.startsWith("https://") ||
		value.startsWith("data:")
	);
}

export function useResolveImage() {
	const { findByObjectId } = useFindData();

	return useCallback(
		(value: string) => {
			if (!value) {
				return undefined;
			}
			if (isDirectMediaSrc(value)) {
				return value;
			}
			return imageSrc(findByObjectId<ImageRecord>(value)) ?? value;
		},
		[findByObjectId]
	);
}
