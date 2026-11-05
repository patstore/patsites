import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { publishDownloadedFiles, publishPublicDir } from "./publish-files.ts";

test("downloaded PatStore files are published at /data/files", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "patstore-files-"));
  const filesDir = path.join(root, "data", "files");
  const outDir = path.join(root, "static-out");
  fs.mkdirSync(filesDir, { recursive: true });
  fs.mkdirSync(path.join(filesDir, "thumbnails"), { recursive: true });
  fs.writeFileSync(path.join(filesDir, "at0T1ifsyE-Poster_Kongress_2027.png"), "png");
  fs.writeFileSync(
    path.join(filesDir, "thumbnails", "at0T1ifsyE-Poster_Kongress_2027-480w.webp"),
    "webp",
  );

  publishDownloadedFiles(filesDir, outDir);

  assert.equal(
    fs.readFileSync(path.join(outDir, "data", "files", "at0T1ifsyE-Poster_Kongress_2027.png"), "utf8"),
    "png",
  );
  assert.equal(
    fs.readFileSync(
      path.join(outDir, "data", "files", "thumbnails", "at0T1ifsyE-Poster_Kongress_2027-480w.webp"),
      "utf8",
    ),
    "webp",
  );
});

test("the Vite public directory is merged into the published output", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "patstore-public-"));
  const publicDir = path.join(root, "static");
  const outDir = path.join(root, "static-out", "assets");
  fs.mkdirSync(path.join(publicDir, "documents"), { recursive: true });
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, "documents", "report.pdf"), "pdf");
  fs.writeFileSync(path.join(outDir, "app.js"), "js");

  publishPublicDir(publicDir, path.dirname(outDir));

  assert.equal(fs.readFileSync(path.join(path.dirname(outDir), "documents", "report.pdf"), "utf8"), "pdf");
  assert.equal(fs.readFileSync(path.join(outDir, "app.js"), "utf8"), "js");
});
