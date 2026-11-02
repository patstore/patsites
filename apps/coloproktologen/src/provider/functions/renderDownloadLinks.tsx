import { ReactNode } from "react";
import settings from "@settings";
export const renderDownloadLinks = ({
    title,
    link
}: {
  title?: string | null;
  link?: string | null;
}): ReactNode | null => {
    if (!title || !link) return null;

    return (
        <a
            href={link}
            target="_blank"
            rel="noreferrer"
            css={{ textDecoration: "underline", color: settings.colors.primary }}
        >
            {title}
        </a>
    );
};
