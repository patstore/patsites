import { ReactNode } from "react";

export type HeadContentProps = {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    content?: ReactNode;
    image?: string;
    isInline?: boolean;
};
