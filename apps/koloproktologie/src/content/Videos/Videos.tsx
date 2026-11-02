import { Layout } from "@components";
import { getDateString, useGetVideo } from "@provider";
import { ContentContainer, HeadContent } from "@ui";
import React, { useCallback, useMemo, useState } from "react";
import { Section, Video, VideoList } from "./types";
import { PatstoreVideo } from "@types";
import { videoListHeader, videoListWrapper } from "./styles";
import VIDEOS_2026_03_13 from "./constants/2026-03-13";
import VIDEOS_2026_03_14 from "./constants/2026-03-14";
import sections from "./constants/sections";
import { get, set } from "lodash-es";
import VideoSection from "./components/VideoSection";
import VideoFilter from "./components/VideoFilter";

const matchesTitleOrDescription = (
    video: PatstoreVideo,
    re: RegExp | null
): boolean => {
    if (!re) {
        return true;
    }
    const title = video.title ?? "";
    const description = video.description ?? "";
    return re.test(title) || re.test(description);
};

const Videos: React.FC = () => {
    const { videos } = useGetVideo();
    const [filter, setFilter] = useState<string>("");
    const [filterBarDocked, setFilterBarDocked] = useState(false);

    const handleFilterDocked = useCallback(() => {
        setFilterBarDocked(true);
    }, []);

    const { regex, regexError } = useMemo(() => {
        const trimmed = filter.trim();
        if (!trimmed) {
            return { regex: null as RegExp | null, regexError: null };
        }
        try {
            return {
                regex: new RegExp(trimmed, "i"),
                regexError: null as string | null
            };
        } catch {
            return {
                regex: null,
                regexError:
                    "Ungültiger regulärer Ausdruck — Eingabe korrigieren."
            };
        }
    }, [filter]);

    const videoList = useMemo(() => {
        const sectionsCopy: Section[] = sections.map((s) => ({
            ...s,
            videos: []
        }));
        const dates: VideoList = {};

        videos.forEach((video: PatstoreVideo) => {
            if (!matchesTitleOrDescription(video, regex)) {
                return;
            }

            const findVideo = [...VIDEOS_2026_03_13, ...VIDEOS_2026_03_14].find(
                (v) => v.id === video.objectId
            );

            if (!findVideo) {
                return;
            }

            const date = findVideo?.date || "";

            if (!dates[date]) {
                dates[date] = [];
            }
            const newVideo: Video = {
                ...video,
                iframe: findVideo?.iframe || "",
                start: findVideo?.start || "",
                end: findVideo?.end || "",
                date: findVideo?.date || ""
            };
            dates[date].push(newVideo);
            const sectionIndex = sectionsCopy.findIndex((section) => {
                return (
                    section.date === newVideo.date &&
                    section.start <= newVideo.start &&
                    !(section.end <= newVideo.start)
                );
            });
            if (sectionIndex !== -1) {
                const sectionVideos = get(
                    sectionsCopy,
                    `[${sectionIndex}].videos`,
                    []
                );
                sectionVideos.push(newVideo as never);
                set(sectionsCopy, `[${sectionIndex}].videos`, sectionVideos);
            }
        });
        return { dates, sections: sectionsCopy };
    }, [videos, regex]);

    return (
        <Layout>
            {" "}
            <HeadContent
                // topline="Deutscher Koloproktologen-Kongress"
                title="Vorträge Koloproktologen-Kongress 2026"
                subtitle={
                    "Alle Vorträge des Hauptprogramms stehen online - jetzt für 3 Monate verfügbar."
                }
                image="/kongress_header.jpg"
                isInline
            />
            <ContentContainer>
                <div
                    css={[
                        videoListWrapper,
                        filterBarDocked && { paddingBottom: "120px" }
                    ]}
                >
                    <VideoFilter
                        value={filter}
                        onChange={setFilter}
                        regexError={regexError}
                        onDockedChange={handleFilterDocked}
                    />
                    {Object.keys(videoList.dates)
                        .sort(
                            (a, b) =>
                                new Date(a).getTime() - new Date(b).getTime()
                        )
                        .map((date) => (
                            <div key={date}>
                                <div css={videoListHeader}>
                                    <h3>{getDateString(date).date}</h3>
                                </div>
                                {videoList.sections
                                    .filter(
                                        (sect) =>
                                            sect.date === date &&
                                            sect.videos.length > 0
                                    )
                                    .map((section) => (
                                        <VideoSection
                                            key={section.date}
                                            section={section}
                                        />
                                    ))}
                            </div>
                        ))}
                </div>
            </ContentContainer>
        </Layout>
    );
};

export default Videos;
