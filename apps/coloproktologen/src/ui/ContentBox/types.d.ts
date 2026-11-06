import React from "react";

export type ContentBoxElement = {
  id?: string;
  title: string;
  text?: string;
  link?: string;
  image?: string;
  label?: string;
  date?: string;
};

export type ContentBoxProps = ContentBoxElement & {
  children?: React.ReactNode;
  background?: string;
  color?: string;
  buttonBackground?: string;
  buttonText?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  alignCenter?: boolean;
  externalLink?: string;
};
