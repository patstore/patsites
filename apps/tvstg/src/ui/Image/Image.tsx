import React, { CSSProperties } from "react";

type ImageSource = { src: string };

type ImageProps = {
  alt?: string | null;
  image?: ImageSource | null;
  src?: string;
  objectFit?: CSSProperties["objectFit"];
  objectPosition?: CSSProperties["objectPosition"];
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
};

const RESPONSIVE_WIDTHS = [480, 960, 1440, 1920];
const BYTESCALE_RAW_URL = /^(https:\/\/upcdn\.io\/[^/]+)\/raw\/(.+)$/;

const bytescaleSrcSet = (src: string) => {
  const match = src.match(BYTESCALE_RAW_URL);
  if (!match) {
    return undefined;
  }
  const [, origin, filePath] = match;
  return RESPONSIVE_WIDTHS.map(
    (width) => `${origin}/image/${filePath}?w=${width}&fit=max ${width}w`,
  ).join(", ");
};

/** A sized wrapper around a lazy <img>; Bytescale URLs get a responsive srcSet. */
const Image: React.FC<ImageProps> = ({
  alt,
  image,
  src,
  objectFit = "cover",
  objectPosition = "50% 50%",
  width,
  height,
  loading = "lazy",
  sizes = width ? `${width}px` : "(max-width: 1240px) 100vw, 1240px",
  className,
  style,
  imgStyle,
}) => {
  const source = src ?? image?.src;
  if (!source) {
    return null;
  }
  const srcSet = bytescaleSrcSet(source);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "inline-block",
        verticalAlign: "top",
        maxWidth: "100%",
        width,
        height,
        ...style,
      }}
    >
      <img
        alt={alt ?? ""}
        src={source}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit,
          objectPosition,
          ...imgStyle,
        }}
      />
    </div>
  );
};

export default Image;
