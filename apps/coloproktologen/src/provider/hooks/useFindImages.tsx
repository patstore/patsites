import { useCallback } from "react";
import { useCollection } from "../data";
import { getStaticFileUrl } from "../functions/getStaticFileUrl";

type ImageRecord = {
    objectId?: string | null;
    filePath?: string | null;
    file?: { url?: string | null } | null;
};

const useFindImages = () => {
    const { items: images, find } = useCollection<ImageRecord>("Image");

    const findImage = useCallback(
        (id: string | null | undefined) => {
            if (!id) {
                return "";
            }
            const image = find(id);
            if (!image) {
                return "";
            }
            if (image.filePath) {
                return getStaticFileUrl(image.filePath);
            }
            return image.file?.url || "";
        },
        [find],
    );

    return {
        findImage,
        findImageUrl: findImage,
        images,
    };
};

export default useFindImages;
