import { isSectionNode, type CmsNode, type CmsPageManifest, type CmsPathValue } from "./types.ts";

/** Flattens a nested manifest into `{ path, value }` pairs (`page.hero.title`). */
export function flattenManifestToPaths(manifest: CmsPageManifest): CmsPathValue[] {
  const out: CmsPathValue[] = [];

  const walk = (nodes: Record<string, CmsNode>, prefix: string) => {
    for (const [key, node] of Object.entries(nodes)) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (isSectionNode(node)) {
        walk(node.content, path);
      } else {
        out.push({ path, value: node.default });
      }
    }
  };

  walk(manifest, "");
  return out;
}
