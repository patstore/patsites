import { getStaticSnapshot, readSnapshotRecords } from "@repo/server";

export type StoredImage = {
  objectId?: string;
  id?: string;
  title?: string | null;
  filePath?: string | null;
  thumbnailPath?: string | null;
  file?: { url?: string | null } | null;
};

export type ImageSources = {
  alt: string;
  thumbnailSrc?: string;
  /** Local original at `/data/files/...`, when the build downloaded it. */
  src?: string;
  /**
   * PatStore `file.url`. Used when the local file was not downloaded.
   * The same value is rendered during server rendering and in the browser.
   */
  remoteSrc?: string;
};

export function findStoredImage(id: string | null | undefined): StoredImage | null {
  if (!id) {
    return null;
  }
  const snapshot = getStaticSnapshot();
  if (!snapshot) {
    return null;
  }
  const images = readSnapshotRecords(snapshot, "Image");
  const found = images.find((item) => item.objectId === id || item.id === id);
  return (found as StoredImage | undefined) ?? null;
}

export function staticFileUrl(filePath: string): string {
  const encoded = filePath
    .split("/")
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join("/");
  return `/data/files/${encoded}`;
}

export function imageSources(image: StoredImage | null): ImageSources {
  const alt = image?.title?.trim() || "";
  const thumbnailSrc = image?.thumbnailPath ? staticFileUrl(image.thumbnailPath) : undefined;
  const src = image?.filePath ? staticFileUrl(image.filePath) : undefined;
  const remote = image?.file?.url ?? undefined;
  const remoteSrc = remote && /^https?:\/\//i.test(remote) ? remote : undefined;
  return {
    alt,
    thumbnailSrc,
    src,
    remoteSrc: remoteSrc && remoteSrc !== src ? remoteSrc : undefined,
  };
}
