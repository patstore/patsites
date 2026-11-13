import type { ElementType, ReactNode } from "react";
import styles from "./ContentBlock.module.css";

type ContentBlockProps = {
  children: ReactNode;
  className?: string;
  padded?: boolean;
  as?: ElementType;
};

export function ContentBlock({
  children,
  className,
  padded = false,
  as: Tag = "div",
}: ContentBlockProps) {
  return (
    <Tag className={[styles.block, padded ? styles.padded : "", className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}

export { styles as contentBlockStyles };
