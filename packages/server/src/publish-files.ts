import * as fs from "node:fs";
import * as path from "node:path";

export function publishDownloadedFiles(filesDir: string, outDir: string): void {
  if (!filesDir || !fs.existsSync(filesDir)) {
    return;
  }
  const destination = path.join(outDir, "data", "files");
  fs.mkdirSync(destination, { recursive: true });
  fs.cpSync(filesDir, destination, { recursive: true });
}

/**
 * Nitro publishes the client build and turns Vite's public-dir copy off.
 * Copy `publicDir` into that same output so documents and other static files ship.
 */
export function publishPublicDir(publicDir: string, outDir: string): void {
  if (!publicDir || !fs.existsSync(publicDir)) {
    return;
  }
  const source = path.resolve(publicDir);
  const target = path.resolve(outDir);
  if (source === target) {
    return;
  }
  fs.cpSync(source, target, { recursive: true });
}
