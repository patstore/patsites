import * as Bytescale from "@bytescale/sdk";

export const getFileUrl = (accountId: string, filePath: string) =>
  Bytescale.UrlBuilder.url({ accountId, filePath });
