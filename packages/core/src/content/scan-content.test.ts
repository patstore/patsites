import assert from "node:assert/strict";
import test from "node:test";
import { flattenManifestToPaths } from "./flatten.ts";
import { scanSourceContent } from "./scan-content.ts";

const source = `
<Section id="page" label="Seite">
  <Section id="hero" label="Hero">
    <Field id="title" label="Title">Home</Field>
    <ImageField id="image" src="/hero.jpg" />
  </Section>
  <CollectionField id="members" label="Members">
    <Field id="name">Jane</Field>
  </CollectionField>
</Section>
<Field id="ignored">Nope</Field>
`;

test("scans nested sections and ignores fields outside them", () => {
  const manifest = scanSourceContent(source);
  const flat = Object.fromEntries(flattenManifestToPaths(manifest).map((entry) => [entry.path, entry.value]));
  assert.equal(flat["page.hero.title"], "Home");
  assert.equal(flat["page.hero.image"], "/hero.jpg");
  assert.deepEqual(flat["page.members"], [{ name: "Jane" }]);
  assert.equal(flat.ignored, undefined);
});
