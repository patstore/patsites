import { useCallback } from "react";
import { useGetImage } from "./collections";

export type ImageSource = {
  src: string;
};

export const PLACEHOLDER_IMAGE: ImageSource = { src: "/tvstg_placeholder.png" };

const useFindImages = () => {
  const { images, findImage: findRecord } = useGetImage();

  const findImage = useCallback(
    (id: string | null | undefined): ImageSource => {
      const image = findRecord(id);
      return image ? { src: image.url } : PLACEHOLDER_IMAGE;
    },
    [findRecord],
  );

  const findImageUrl = useCallback(
    (id: string | null | undefined) => findRecord(id)?.url ?? null,
    [findRecord],
  );

  return {
    findImage,
    findImageUrl,
    images,
  };
};

export default useFindImages;
