import * as fs from "node:fs";
import * as path from "node:path";
import type { DownloadedFile } from "./types.ts";

export class FileDownloader {
  private readonly outputDir: string;
  private readonly downloaded = new Map<string, DownloadedFile>();

  constructor(outputDir: string) {
    this.outputDir = outputDir;
    fs.mkdirSync(outputDir, { recursive: true });
  }

  list(): DownloadedFile[] {
    return [...this.downloaded.values()];
  }

  async attachFiles(
    record: Record<string, unknown>,
    fieldIds: readonly string[],
  ): Promise<void> {
    const objectId = typeof record.objectId === "string" ? record.objectId : "";
    if (!objectId) {
      return;
    }
    const title =
      typeof record.title === "string" && record.title
        ? record.title
        : objectId;

    for (const fieldId of fieldIds) {
      const value = record[fieldId];
      if (!value || typeof value !== "object" || !("url" in value)) {
        continue;
      }
      const url = (value as { url?: unknown }).url;
      if (typeof url !== "string" || !url) {
        continue;
      }
      const file = await this.download(url, objectId, title);
      if (file) {
        record.filePath = file.localPath;
        if (file.thumbnailPath) {
          record.thumbnailPath = file.thumbnailPath;
        }
      }
    }
  }

  private async download(
    url: string,
    objectId: string,
    title: string,
  ): Promise<DownloadedFile | null> {
    const cacheKey = `${objectId}:${url}`;
    const cached = this.downloaded.get(cacheKey);
    if (cached) {
      return cached;
    }

    const filename = filenameFor(url, objectId, title);
    const localPath = path.join(this.outputDir, filename);
    const record: DownloadedFile = {
      objectId,
      originalUrl: url,
      localPath: filename,
      filename,
      type: isImage(url) ? "image" : "document",
    };

    if (!fs.existsSync(localPath)) {
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`Skipped file ${filename}: ${response.status}`);
        return null;
      }
      const bytes = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(localPath, bytes);
    }

    if (record.type === "image") {
      const { writeImageThumbnail } = await import("./thumbnails.ts");
      const thumbnailPath = await writeImageThumbnail(this.outputDir, filename);
      if (thumbnailPath) {
        record.thumbnailPath = thumbnailPath;
      }
    }

    this.downloaded.set(cacheKey, record);
    return record;
  }
}

/** Width descriptor used in thumbnail filenames (`photo-480w.webp`). */
export const THUMBNAIL_WIDTH = 480;
export const THUMBNAIL_DIRECTORY = "thumbnails";

export function isImageFile(filename: string): boolean {
  return isImage(filename);
}

/** Relative path stored on the image as `thumbnailPath`. */
export function thumbnailRelativePath(filename: string): string | null {
  if (!isImageFile(filename)) {
    return null;
  }
  const clean = filename.split("?")[0] ?? filename;
  const extension = path.extname(clean);
  const stem = path.basename(clean, extension);
  if (!stem || stem === "." || stem === "..") {
    return null;
  }
  return `${THUMBNAIL_DIRECTORY}/${stem}-${THUMBNAIL_WIDTH}w.webp`;
}

/**
 * Local file for a `/data/files/` request.
 * Originals sit in the files directory. Thumbnails sit in `thumbnails/` beside them.
 */
export function resolveServedFile(filesDir: string, requestPath: string): string | null {
  const relative = requestPath.replace(/\\/g, "/").replace(/^\/+/, "");
  if (!relative || relative.includes("\0")) {
    return null;
  }
  const parts = relative.split("/").filter(Boolean);
  if (parts.some((part) => part === "." || part === "..")) {
    return null;
  }
  const allowed = parts.length === 1 || (parts.length === 2 && parts[0] === THUMBNAIL_DIRECTORY);
  if (!allowed) {
    return null;
  }
  const root = path.resolve(filesDir);
  const target = path.resolve(root, ...parts);
  const relativeToRoot = path.relative(root, target);
  if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) {
    return null;
  }
  return target;
}

function filenameFor(url: string, objectId: string, title: string): string {
  const extension = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/)?.[1] ?? "";
  const safe = (value: string) => value.replace(/[<>:"/\\|?*\x00-\x1f]/g, "-").trim();
  let base = safe(title);
  if (extension && base.toLowerCase().endsWith(`.${extension.toLowerCase()}`)) {
    base = base.slice(0, -(extension.length + 1));
  }
  const name = `${safe(objectId)}-${base || "file"}`;
  return extension ? `${name}.${extension}` : name;
}

function isImage(url: string): boolean {
  return /\.(png|jpe?g|gif|webp|svg|bmp|ico)(?:\?|$)/i.test(url);
}
