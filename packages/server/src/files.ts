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

    this.downloaded.set(cacheKey, record);
    return record;
  }
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
