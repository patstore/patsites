import React, { CSSProperties } from "react";

type AppImageProps = {
    src: string;
    alt: string;
    className?: string;
    // Emotion's css prop accepts serialized styles as well as plain objects.
    css?: any;
    style?: CSSProperties;
    width?: number | string;
    height?: number | string;
    objectFit?: CSSProperties["objectFit"];
    objectPosition?: CSSProperties["objectPosition"];
};

/** Image element used in place of Gatsby StaticImage and GatsbyImage. */
const AppImage: React.FC<AppImageProps> = ({
    src,
    alt,
    className,
    css,
    style,
    width,
    height,
    objectFit = "cover",
    objectPosition
}) => {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            css={css}
            style={{ objectFit, objectPosition, width, height, ...style }}
            loading="lazy"
        />
    );
};

export default AppImage;
