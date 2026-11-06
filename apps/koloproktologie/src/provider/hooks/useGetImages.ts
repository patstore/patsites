import { useCallback } from "react";
import type { ImageClass } from "@data";
import { useCollection } from "../data";
import { getStaticFileUrl } from "../functions/getStaticFileUrl";

const PLACEHOLDER = "/placeholder.jpg";

const useGetImages = () => {
    const { items: images, find } = useCollection<ImageClass>("Image");

    const findImageUrl = useCallback(
        (id: string) => {
            const image = find(id);
            if (!image) {
                return PLACEHOLDER;
            }
            if (image.filePath) {
                return getStaticFileUrl(image.filePath);
            }
            if (image.file?.url) {
                return image.file.url;
            }
            return PLACEHOLDER;
        },
        [find],
    );

    return {
        findImage: findImageUrl,
        findImageUrl,
        images,
    };
};

export default useGetImages;
