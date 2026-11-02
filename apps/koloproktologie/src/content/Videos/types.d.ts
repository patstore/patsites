import { PatstoreVideo } from "@types";

export type Video = PatstoreVideo & {
    iframe: string;
    start: string;
    end: string;
    id: string;
    date: string;
};

export type VideoList = {
    [key: string]: Video[];
};

export type VideoElementProps = {
    title: string;
    date: string;
    description?: string;
    text?: string;
    iframe: string;
    start: string;
    end: string;
};

export type Section = {
    title: string;
    chair: string[];
    date: string;
    start: string;
    end: string;
    videos: Video[];
};
