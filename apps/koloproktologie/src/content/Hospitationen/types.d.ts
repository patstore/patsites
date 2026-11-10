import React from "react";

export type ReportProps = {
    id: string;
    title: string;
    subtitle: string;
    text: React.Element;
    background: string;
    label?: string;
    image?: string;
    documents?: string[] | null;
};
