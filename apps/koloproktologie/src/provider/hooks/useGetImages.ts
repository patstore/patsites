import { useMemo } from "react";
import { useFindData } from "@data";
import type { ImageClass } from "@data";
import { getStaticFileUrl } from "../functions/getStaticFileUrl";

const PLACEHOLDER = "/placeholder.jpg";

const useGetImages = () => {
    const { findByClassName, findByObjectId } = useFindData();

    const images = useMemo(
        () => findByClassName("images") as ImageClass[],
        [findByClassName]
    );

    const findImageUrl: (id: string) => string = (id: string) => {
        const image = images.find((item) => item.objectId === id);
        if (!image) {
            const byId = findByObjectId<ImageClass>(id);
            if (byId?.filePath) {
                return getStaticFileUrl(byId.filePath);
            }
            return PLACEHOLDER;
        }

        if (image.filePath) {
            return getStaticFileUrl(image.filePath);
        }

        if (image.file?.url) {
            return image.file.url;
        }

        return PLACEHOLDER;
    };

    return {
        findImage: findImageUrl,
        findImageUrl,
        images
    };
};

export default useGetImages;
