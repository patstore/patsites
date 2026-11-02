import { useMemo } from "react";
import { useFindData } from "@data";
import type { VideoClass } from "@data";

const useGetVideo = () => {
    const { findByClassName } = useFindData();

    const videos = useMemo(
        () => findByClassName("videos") as VideoClass[],
        [findByClassName]
    );

    const findVideo = (id: string) => {
        return videos.find((video) => video.objectId === id);
    };

    return {
        findVideo,
        videos
    };
};

export default useGetVideo;
