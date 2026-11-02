import * as fs from "node:fs";
import * as path from "node:path";
import { writeContentArtifacts } from "./codegen.ts";
import { normalizeModule } from "./modules.ts";
import type { ContentSnapshot } from "./types.ts";

const outputArg = process.argv.slice(2).find((arg) => arg !== "--");
const outputDir = path.resolve(outputArg ?? "data");
const dataFile = path.join(outputDir, "build-time-data.json");
const raw = JSON.parse(fs.readFileSync(dataFile, "utf8")) as ContentSnapshot;
const modules = Array.isArray(raw._modules)
  ? raw._modules.map((module) => normalizeModule(module as unknown as Record<string, unknown>))
  : [];

writeContentArtifacts(outputDir, {
  ...raw,
  _modules: modules,
});

console.log(`Wrote content artifacts to ${outputDir}`);
