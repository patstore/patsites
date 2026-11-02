import { useMemo } from "react";
import { useFindData } from "@data";
import { getStaticFileUrl } from "../../functions/getStaticFileUrl";

type ImageRecord = {
    objectId?: string;
    filePath?: string | null;
    file?: { url?: string | null } | null;
};

const useGetImage = () => {
    const { findByClassName, findByObjectId } = useFindData();
    const images = useMemo(
        () => (findByClassName("images") ?? []) as ImageRecord[],
        [findByClassName]
    );

    const findImage = (id: string | null | undefined) => {
        if (!id) return "";
        const image =
            images.find((item) => item.objectId === id) ?? findByObjectId<ImageRecord>(id);
        if (!image) return "";
        if (image.filePath) return getStaticFileUrl(image.filePath);
        return image.file?.url || "";
    };

    return { findImage, images };
};

export default useGetImage;
