import { ReactNode } from "react";

export type SmallContentElementProps = {
  title: string;
  text: string;
  content?: ReactNode;
  link?: string;
  flex?: string[] | string;
  noTextBreak?: boolean;
  date?: string;
};
