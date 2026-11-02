import { ReactNode } from "react";

export type ContentElementProps = {
    largeBackground?: string;
    smallBackground?: string;
    elements: {
        content: ReactNode;
        width: "1" | "2" | "3";
        id: string;
    }[];
    borderRadius?: boolean;
};

export type ContentContainerProps = {
    children: ReactNode;
    largeBackground?: string;
    smallBackground?: string;
    borderRadius?: boolean;
    centerContent?: boolean;
    padding?: boolean;
    dividerTop?: boolean;
    dividerBottom?: boolean;
    noPaddingTop?: boolean;
};

export type TextContentElementProps = {
    title: string;
    topline?: string;
    text?: string;
    children?: ReactNode;
    titleFont?: "h2" | "h3";
    content?: ReactNode;
};
