import * as Bytescale from "@bytescale/sdk";

export const getImageUrl = ({
  accountId,
  filePath,
  height,
  width,
}: {
  accountId: string;
  filePath: string;
  height?: number;
  width?: number;
}): string => {
  if (width && height) {
    return Bytescale.UrlBuilder.url({
      accountId,
      filePath,
      options: {
        transformation: "image",
        transformationParams: { w: width, h: height, fit: "crop", cro: "center" },
      },
    });
  }

  if (width) {
    return Bytescale.UrlBuilder.url({
      accountId,
      filePath,
      options: {
        transformation: "image",
        transformationParams: { w: width, fit: "max" },
      },
    });
  }

  if (height) {
    return Bytescale.UrlBuilder.url({
      accountId,
      filePath,
      options: {
        transformation: "image",
        transformationParams: { h: height, fit: "height" },
      },
    });
  }

  return Bytescale.UrlBuilder.url({ accountId, filePath });
};

export const getFileUrl = (accountId: string, filePath: string) =>
  Bytescale.UrlBuilder.url({ accountId, filePath });
