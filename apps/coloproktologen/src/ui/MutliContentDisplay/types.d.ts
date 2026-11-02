import { Dispatch, ReactNode, SetStateAction } from "react";

export type Content = {
  label: string;
  value: string;
  content: ReactNode;
};

export type MultiContentDisplayProps = {
  content: Content[];
  direction?: "vertical" | "horizontal";
  background?: string;
  contentHeight?: string;
  color?: "light" | "white";
};

export type ContentNavigationProps = {
  content: Content[];
  currentContent: string;
  setCurrentContent: Dispatch<SetStateAction<string>>;
  direction?: "vertical" | "horizontal";
  color?: "light" | "white";
};

export type DisplayContentProps = {
  currentContent: Content;
  direction?: "vertical" | "horizontal";
  contentHeight?: string;
  color?: "light" | "white";
};
