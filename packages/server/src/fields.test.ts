import assert from "node:assert/strict";
import test from "node:test";
import { buildApplicationSchemas } from "./application.ts";
import { buildSelection } from "./fields.ts";
import type { PatStoreModule } from "./types.ts";

const article: PatStoreModule = {
  objectId: "module-1",
  name: "Article",
  connected_class: "Article",
  data_fields: [],
  fields: [
    {
      id: "title",
      label: "Title",
      required: true,
      type: "edit_string",
      active: true,
      position: 1,
    },
    {
      id: "state",
      label: "State",
      required: false,
      type: "state",
      active: true,
      position: 2,
    },
    {
      id: "internal",
      label: "Internal",
      required: false,
      type: "edit_string",
      active: false,
      position: 3,
    },
  ],
};

test("application schemas follow active module fields", () => {
  const schemas = buildApplicationSchemas([article]);
  const schema = schemas.Article;
  assert.ok(schema);
  assert.equal(
    schema.safeParse({ objectId: "a", title: "Hello", state: "review" }).success,
    true,
  );
  const parsed = schema.parse({
    objectId: "a",
    title: "Hello",
    state: "review",
    internal: "hidden",
  });
  assert.equal("title" in (parsed as object), true);
  assert.equal((parsed as { title: string }).title, "Hello");
});

test("graphql selection skips inactive fields", () => {
  const selection = buildSelection(article);
  assert.match(selection, /\btitle\b/);
  assert.match(selection, /\bstate\b/);
  assert.doesNotMatch(selection, /\binternal\b/);
});
