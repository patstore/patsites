import { useState } from "react";

export type ImageProps = {
	alt?: string;
	eager?: boolean;
	src?: string;
};

export function Image({
	alt = "Image",
	eager = false,
	src = "https://placehold.co/600x400"
}: ImageProps) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className={loaded ? "image is-loaded" : "image"}>
			<img
				className="image__img"
				src={src}
				alt={alt}
				loading={eager ? "eager" : "lazy"}
				decoding="async"
				onLoad={() => setLoaded(true)}
			/>
			<style>{`
				.image {
					width: 100%;
					aspect-ratio: 3 / 2;
					background-color: #f0f0f0;
					overflow: hidden;
				}
				.image__img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					opacity: 0;
					transition: opacity 0.3s ease;
				}
				.image.is-loaded .image__img {
					opacity: 1;
				}
			`}</style>
		</div>
	);
}
