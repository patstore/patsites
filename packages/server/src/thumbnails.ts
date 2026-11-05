/**
 * Thumbnails are WebP files at 480px wide, stored in `thumbnails/` next to the
 * originals. The filename keeps the original stem and adds the srcset width
 * descriptor, for example `thumbnails/photo-480w.webp`.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import sharp from "sharp";
import { THUMBNAIL_WIDTH, thumbnailRelativePath } from "./files.ts";

export async function writeImageThumbnail(
  filesDir: string,
  filename: string,
): Promise<string | null> {
  const relative = thumbnailRelativePath(filename);
  if (!relative) {
    return null;
  }

  const source = path.join(filesDir, filename);
  if (!fs.existsSync(source) || !fs.statSync(source).isFile()) {
    return null;
  }

  const target = path.join(filesDir, ...relative.split("/"));
  const sourceTime = fs.statSync(source).mtimeMs;
  if (fs.existsSync(target) && fs.statSync(target).mtimeMs >= sourceTime) {
    return relative;
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  try {
    await sharp(source)
      .rotate()
      .resize({ width: THUMBNAIL_WIDTH, withoutEnlargement: true })
      .webp({ quality: 60 })
      .toFile(target);
  } catch (error) {
    console.warn(
      `Skipped thumbnail for ${filename}: ${error instanceof Error ? error.message : error}`,
    );
    return null;
  }

  return relative;
}
