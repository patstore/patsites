import React, { useState, useMemo } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Image } from "../Image";
import { GalleryProps } from "./types";
import {
	galleryContainerStyle,
	horizontalGalleryWrapperStyle,
	mosaicGalleryWrapperStyle,
	mosaicImageContainerStyle,
	mosaicImageStyle,
	modalOverlayStyle,
	modalContentStyle,
	modalCloseButtonStyle
} from "./styles";

export const Gallery: React.FC<GalleryProps> = ({
	imageIds,
	findImage,
	displayMode = "horizontal",
	getAltText,
	showThumbnails = true,
	showFullscreenButton = true,
	showPlayButton = false,
	autoPlay = false,
	slideInterval = 3000,
	containerStyle
}) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Filter out invalid image IDs and get image data
	const validImages = useMemo(() => {
		return imageIds
			.map((id, index) => {
				const src = findImage(id);
				if (!src) return null;
				return {
					id,
					index,
					src,
					alt: getAltText ? getAltText(id, index) : `Image ${index + 1}`
				};
			})
			.filter((img) => img !== null);
	}, [imageIds, findImage, getAltText]);

	// Prepare images for react-image-gallery format
	const galleryImages = useMemo(() => {
		return validImages.map((img) => ({
			original: img.src,
			thumbnail: img.src,
			originalAlt: img.alt,
			thumbnailAlt: img.alt,
			renderItem: () => (
				<div style={{ width: "100%", height: "100%" }}>
					<Image src={img.src}
						alt={img.alt}
						style={{ width: "100%", height: "100%" }}
						imgStyle={{ objectFit: "contain" }}
					/>
				</div>
			),
			renderThumbInner: () => (
				<Image src={img.src}
					alt={img.alt}
					style={{ width: "100%", height: "100%" }}
					imgStyle={{ objectFit: "cover" }}
				/>
			)
		}));
	}, [validImages]);

	if (validImages.length === 0) {
		return null;
	}
	const handleMosaicImageClick = (index: number) => {
		setCurrentImageIndex(index);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleModalKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			handleCloseModal();
		}
	};

	// Mosaic view
	if (displayMode === "mosaic" || displayMode === "horizontal") {
		return (
			<>
				<div
					style={{
						...galleryContainerStyle,
						...containerStyle
					}}
				>
					<div style={displayMode === "mosaic" ? mosaicGalleryWrapperStyle : horizontalGalleryWrapperStyle}>
						{validImages.map((img, index) => (
							<div
								key={img.id}
								css={mosaicImageContainerStyle} // eslint-disable-line react/no-unknown-property
								onClick={() => handleMosaicImageClick(index)}
								role="button"
								tabIndex={0}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										handleMosaicImageClick(index);
									}
								}}
							>
								<Image src={img.src}
									alt={img.alt}
									style={mosaicImageStyle}
									imgStyle={{ objectFit: "cover" }}
								/>
							</div>
						))}
					</div>
				</div>

				{/* Modal with full gallery */}
				{modalOpen && (
					<div
						style={modalOverlayStyle}
						onClick={handleCloseModal}
						onKeyDown={handleModalKeyDown}
						role="dialog"
						aria-modal="true"
						tabIndex={-1}
					>
						<button
							style={modalCloseButtonStyle}
							onClick={handleCloseModal}
							aria-label="Close gallery"
						>
							×
						</button>
						<div
							style={modalContentStyle}
							onClick={(e) => e.stopPropagation()}
						>
							<ImageGallery
								items={galleryImages}
								startIndex={currentImageIndex}
								showThumbnails={showThumbnails}
								showFullscreenButton={showFullscreenButton}
								showPlayButton={showPlayButton}
								autoPlay={autoPlay}
								slideInterval={slideInterval}
								showNav={true}
							/>
						</div>
					</div>
				)}
			</>
		);
	}

	// Horizontal gallery view
	return (
		<div
			style={{
				...galleryContainerStyle,
				...containerStyle
			}}
		>
			<div style={horizontalGalleryWrapperStyle}>
				<ImageGallery
					items={galleryImages}
					showThumbnails={showThumbnails}
					showFullscreenButton={showFullscreenButton}
					showPlayButton={showPlayButton}
					autoPlay={autoPlay}
					slideInterval={slideInterval}
					showNav={true}
				/>
			</div>
		</div>
	);
};

export default Gallery;
