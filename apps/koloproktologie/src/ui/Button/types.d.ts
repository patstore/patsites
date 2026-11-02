import React from "react";

export type ButtonProps = {
    text: string;
    color?: string;
    background?: string;
    size?: "medium" | "large";
    onClick?: () => void;
    internalLink?: string;
    externalLink?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    type?: "submit" | "button";
};
