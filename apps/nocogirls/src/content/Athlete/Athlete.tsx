import { useEffect, useRef } from "react";
import { Field, Section } from "@repo/core";
import {
	Gallery,
	getImageSrc,
	useFadeOnChange,
	useGalleryStore,
	useResolveImage
} from "@ui";
import { useCollection } from "@repo/provider";
import type { CategoryRecord, ImageRecord, PersonRecord } from "@types";
import styles from "./Athlete.module.scss";

export function Athlete({ slug }: { slug: string }) {
	const resolveImage = useResolveImage();
	const setActiveImage = useGalleryStore((state) => state.setActiveImage);
	const activeImage = useGalleryStore((state) => state.activeImage);
	const { items: people } = useCollection<PersonRecord>("Person");
	const { items: categories } = useCollection<CategoryRecord>("Category");
	const { items: images } = useCollection<ImageRecord>("Image");

	const athlete = people.find(
		(person) => person.slug === slug || person.objectId === slug
	);
	const athleteImages = images.filter((image) =>
		image.categories?.includes(athlete?.objectId ?? "")
	);
	const athleteImage =
		images.find((image) => image.objectId === athlete?.image) ??
		athleteImages[0];
	const galleryImages = athleteImage
		? [
				athleteImage,
				...athleteImages.filter(
					(image) => image.objectId !== athleteImage.objectId
				)
			]
		: athleteImages;
	const category = categories.find((item) =>
		athlete?.categories?.includes(item.objectId)
	);
	const nationFlag = images.find(
		(image) => image.objectId === category?.image
	);
	const nationFlagSrc = getImageSrc(nationFlag);
	const imageRef = useRef<HTMLDivElement>(null);
	const fadingImage = useFadeOnChange(
		activeImage,
		activeImage?.objectId ?? "",
		imageRef
	);
	const fadingImageSrc = fadingImage
		? getImageSrc(fadingImage)
		: athlete?.image
			? resolveImage(athlete.image)
			: undefined;

	useEffect(() => {
		if (athleteImage) {
			setActiveImage(athleteImage);
		}
	}, [athleteImage, setActiveImage]);

	if (!athlete) {
		return <p>Athlete not found</p>;
	}

	return (
		<Section id="Athlete">
			<section className={styles.athlete}>
				<div className={styles.header}>
					<div className={styles.title}>
						<div>
							<div className="eyebrow">
								<Field id="eyebrow">Athlete Profile</Field>
							</div>
							<h1>{athlete.title}</h1>
						</div>
						<div className="separator md" />
						{nationFlagSrc ? (
							<img
								src={nationFlagSrc}
								alt={athlete.title ?? ""}
								height={30}
							/>
						) : null}
					</div>
					<div className={styles.image} ref={imageRef}>
						{fadingImageSrc ? (
							<img
								src={fadingImageSrc}
								alt={athlete.title ?? ""}
							/>
						) : null}
					</div>
				</div>
				<div className={styles.gallery}>
					<Gallery
						images={galleryImages as ImageRecord[]}
						type="horizontal"
						defaultImage={athleteImage}
					/>
				</div>
			</section>
		</Section>
	);
}
