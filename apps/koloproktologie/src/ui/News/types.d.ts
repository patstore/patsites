import { Dispatch, ReactNode, SetStateAction } from "react";
import { ArticleClass } from "@data";

export type NewsProps = {
    title: string;
    category: string;
    content?: ReactNode;
    background?: string;
};

export type NewsElementProps = {
    news: ArticleClass;
    background?: string;
};

export type NewsButtonsProps = {
    counter: number;
    setCounter: Dispatch<SetStateAction<number>>;
};
