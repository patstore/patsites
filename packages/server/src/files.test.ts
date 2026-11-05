import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";
import { resolveServedFile, thumbnailRelativePath } from "./files.ts";
import { writeImageThumbnail } from "./thumbnails.ts";

test("thumbnail paths sit beside the original and use a width descriptor", () => {
  assert.equal(
    thumbnailRelativePath("Qe8CmMzThP-Kongress am Park bei Dämmerung.jpg"),
    "thumbnails/Qe8CmMzThP-Kongress am Park bei Dämmerung-480w.webp",
  );
  assert.equal(thumbnailRelativePath("notes.pdf"), null);
});

test("served files allow originals and the thumbnails directory only", () => {
  const root = path.join(os.tmpdir(), "patstore-serve");
  assert.equal(
    resolveServedFile(root, "poster.png"),
    path.resolve(root, "poster.png"),
  );
  assert.equal(
    resolveServedFile(root, "thumbnails/poster-480w.webp"),
    path.resolve(root, "thumbnails", "poster-480w.webp"),
  );
  assert.equal(resolveServedFile(root, "../secret.png"), null);
  assert.equal(resolveServedFile(root, "thumbnails/../secret.png"), null);
  assert.equal(resolveServedFile(root, "thumbnails/nested/poster.webp"), null);
});

test("image thumbnails are written as 480-wide webp files", async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "patstore-thumb-"));
  const filename = "photo.jpg";
  await sharp({
    create: {
      width: 1200,
      height: 800,
      channels: 3,
      background: { r: 20, g: 80, b: 160 },
    },
  })
    .jpeg()
    .toFile(path.join(root, filename));

  const relative = await writeImageThumbnail(root, filename);
  assert.equal(relative, "thumbnails/photo-480w.webp");
  const metadata = await sharp(path.join(root, "thumbnails", "photo-480w.webp")).metadata();
  assert.equal(metadata.width, 480);
  assert.equal(metadata.format, "webp");
});
