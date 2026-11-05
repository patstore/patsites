import {
  WebpageContentImage,
  WebpageContentText,
  WebpageContentVideo,
} from "@types";

export type RenderContentProps = {
  path?: string;
  contentId?: string;
};

export type RenderTextProps = {
  text: string;
};

export type RenderImageProps = {
  image?: string;
  name?: string;
};

export type RenderVideoProps = {
  video: string;
};

export type ContentElement = {
  id: string;
  type: string;
  value: string;
  active: boolean;
  [key: string]: any;
};
