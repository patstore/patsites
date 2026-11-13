import { useMemo, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Image } from "@repo/ui";
import { useCollection } from "@provider";
import { GalleryProps } from "./types";
import styles from "./Gallery.module.css";

export const Gallery = ({
  imageIds,
  displayMode = "horizontal",
  getAltText,
  showThumbnails = true,
  showFullscreenButton = true,
  showPlayButton = false,
  autoPlay = false,
  slideInterval = 3000,
  containerStyle,
}: GalleryProps) => {
  const { find: findStoredImage } = useCollection("Image");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const tiles = useMemo(() => {
    const next: Array<{
      id: string;
      alt: string;
      url?: string;
      lightboxIndex: number;
    }> = [];
    let lightboxIndex = 0;

    imageIds.forEach((id, index) => {
      const url = findStoredImage(id)?.url;
      next.push({
        id,
        alt: getAltText ? getAltText(id, index) : `Image ${index + 1}`,
        url,
        lightboxIndex: url ? lightboxIndex++ : -1,
      });
    });

    return next;
  }, [imageIds, findStoredImage, getAltText]);

  const galleryImages = useMemo(
    () =>
      tiles
        .filter((tile) => tile.url)
        .map((tile) => ({
          original: tile.url as string,
          thumbnail: tile.url as string,
          originalAlt: tile.alt,
          thumbnailAlt: tile.alt,
        })),
    [tiles],
  );

  if (imageIds.length === 0) {
    return null;
  }

  const openLightbox = (lightboxIndex: number) => {
    if (lightboxIndex < 0) {
      return;
    }
    setCurrentImageIndex(lightboxIndex);
    setModalOpen(true);
  };

  return (
    <>
      <div className={styles.gallery} style={containerStyle}>
        <div className={displayMode === "mosaic" ? styles.mosaic : styles.row}>
          {tiles.map((tile, index) => (
            <button
              key={`${tile.id}-${index}`}
              type="button"
              className={styles.tile}
              disabled={tile.lightboxIndex < 0}
              onClick={() => openLightbox(tile.lightboxIndex)}
            >
              <Image id={tile.id} alt={tile.alt} style={{ width: "100%", height: "100%" }} />
            </button>
          ))}
        </div>
      </div>

      {modalOpen && galleryImages.length > 0 && (
        <div
          className={styles.overlay}
          onClick={() => setModalOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setModalOpen(false);
            }
          }}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          <div className={styles.dialog} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.close}
              onClick={() => setModalOpen(false)}
              aria-label="Close gallery"
            >
              ×
            </button>
            <ImageGallery
              items={galleryImages}
              startIndex={currentImageIndex}
              showThumbnails={showThumbnails}
              showFullscreenButton={showFullscreenButton}
              showPlayButton={showPlayButton}
              autoPlay={autoPlay}
              slideInterval={slideInterval}
              showNav
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
