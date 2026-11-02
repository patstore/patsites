import { WebpageContentImage, WebpageContentText, WebpageContentVideo } from "@types";

export type RenderContentProps = {
    path: string;
}

export type RenderTextProps = {
    text: WebpageContentText;
}

export type RenderImageProps = {
    image: WebpageContentImage;
}

export type RenderVideoProps = {
    video: WebpageContentVideo;
}