import React, { type CSSProperties } from "react";
import styles from "./FlexBox.module.css";

type FlexBoxProps = {
  children: React.ReactNode;
  direction?: CSSProperties["flexDirection"];
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  gap?: CSSProperties["gap"];
  wrap?: boolean;
  changeToColumn?: boolean;
  hasFullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
  styles?: CSSProperties;
};

const FlexBox: React.FC<FlexBoxProps> = ({
  children = "",
  direction = "row",
  align = "flex-start",
  justify = "flex-start",
  gap = "0",
  wrap = false,
  changeToColumn = false,
  className,
  style,
  styles: styleProp,
  hasFullWidth = false,
}) => {
  return (
    <div
      className={[
        styles.flex,
        hasFullWidth ? styles.full : "",
        changeToColumn ? styles.changeToColumn : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        flexDirection: changeToColumn ? undefined : direction,
        alignItems: changeToColumn ? undefined : align,
        justifyContent: justify,
        gap,
        flexWrap: wrap ? "wrap" : "nowrap",
        ["--flex-align" as string]: align,
        ...styleProp,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default FlexBox;
