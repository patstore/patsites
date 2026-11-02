import { useMemo } from "react";
import { useFindData } from "@data";
import type { DownloadClass } from "@data";
import { getStaticFileUrl } from "../../functions/getStaticFileUrl";

const useGetDownload = () => {
    const { findByClassName } = useFindData();

    const allDownload = useMemo(
        () => findByClassName("downloads") as DownloadClass[],
        [findByClassName]
    );

    const findDownload: (id: string) => DownloadClass | undefined = (id) => {
        return allDownload.find((item) => item.objectId === id);
    };

    const getDownloadUrl = (download: DownloadClass) => {
        if (download.filePath) {
            return getStaticFileUrl(download.filePath);
        }
        return download.file?.url || "";
    };

    return {
        findDownload,
        downloads: allDownload,
        getDownloadUrl
    };
};

export default useGetDownload;
