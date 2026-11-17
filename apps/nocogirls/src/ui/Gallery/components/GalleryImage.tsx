import type { ImageRecord } from "@types";
import styles from "../Gallery.module.scss";
import { useGalleryStore } from "../hooks/useGalleryStore";
import { imageSrc } from "../../image-src";

export function GalleryImage({ image }: { image: ImageRecord }) {
	const setActiveImage = useGalleryStore((state) => state.setActiveImage);
	const activeImage = useGalleryStore((state) => state.activeImage);
	const src = imageSrc(image);

	return (
		<button
			type="button"
			className={styles.image_container}
			onClick={() => setActiveImage(image)}
			aria-label={image.title ?? "Gallery image"}
			data-active={activeImage?.objectId === image.objectId}
		>
			{src ? (
				<img src={src} alt={image.title ?? ""} draggable={false} />
			) : null}
		</button>
	);
}
