import React, { CSSProperties } from "react";

type AppImageProps = {
    src: string;
    alt: string;
    className?: string;
    css?: CSSProperties;
    style?: CSSProperties;
    width?: number | string;
    height?: number | string;
    objectFit?: CSSProperties["objectFit"];
};

/** Simple image component replacing Gatsby StaticImage/GatsbyImage. */
const AppImage: React.FC<AppImageProps> = ({
    src,
    alt,
    className,
    css,
    style,
    width,
    height,
    objectFit = "cover"
}) => {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            css={css}
            style={{ objectFit, width, height, ...style }}
            loading="lazy"
        />
    );
};

export default AppImage;
