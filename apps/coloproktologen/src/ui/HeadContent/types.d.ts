import { ReactNode } from "react";

export type HeadContentProps = {
  id?: string;
  title: string;
  subtitle?: string;
  description?: string | ReactNode;
  backgroundImage?: string;
  content?: ReactNode;
  image?: string;
  isInline?: boolean;
};
