/** @jsxImportSource react */
import { type CSSProperties, type ElementType, type ReactNode } from "react";
import { TRANSITION_ID_ATTR } from "./types.ts";

export type TransitionElementProps = {
  id: string;
  children?: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

/** Marks a node that a route transition can move or resize. The id is the contract; styles stay outside. */
export function TransitionElement({
  id,
  children,
  as: Tag = "div",
  className,
  style,
}: TransitionElementProps) {
  return (
    <Tag {...{ [TRANSITION_ID_ATTR]: id }} className={className} style={style}>
      {children}
    </Tag>
  );
}
