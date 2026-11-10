import assert from "node:assert/strict";
import test from "node:test";
import { buildApplicationSchemas } from "./application.ts";
import { buildSelection, describeModule, selectionWithoutMissingField } from "./fields.ts";
import { normalizeRecord } from "./modules.ts";
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

test("a person pointer is selected by objectId and stored as that id", () => {
  const withAuthor: PatStoreModule = {
    ...article,
    fields: [
      ...article.fields,
      {
        id: "author",
        label: "Author",
        required: false,
        type: "edit_person",
        active: true,
        position: 4,
      },
    ],
  };
  assert.match(buildSelection(withAuthor), /author \{\s*objectId\s*\}/);
  assert.equal(
    describeModule(withAuthor).find((field) => field.id === "author")?.tsType,
    "string | null",
  );
  assert.equal(
    normalizeRecord({
      objectId: "article",
      author: { __typename: "Person", id: "Person:abc", objectId: "abc" },
    }).author,
    "abc",
  );
});

test("a relation field without a subselection is removed instead of failing the class", () => {
  const selection = "title\nauthor";
  const error = new Error(
    'Field "author" of type "Person" must have a selection of subfields. Did you mean "author { ... }"?',
  );
  assert.equal(selectionWithoutMissingField(selection, error), "title");
});

test("graphql selection skips inactive fields", () => {
  const selection = buildSelection(article);
  assert.match(selection, /\btitle\b/);
  assert.match(selection, /\bstate\b/);
  assert.doesNotMatch(selection, /\binternal\b/);
});

test("image records keep a local thumbnail path out of the graphql selection", () => {
  const image: PatStoreModule = {
    objectId: "image-module",
    name: "Image",
    connected_class: "Image",
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
        id: "file",
        label: "File",
        required: false,
        type: "file",
        active: true,
        position: 2,
      },
    ],
  };
  const ids = describeModule(image).map((field) => field.id);
  assert.ok(ids.includes("filePath"));
  assert.ok(ids.includes("thumbnailPath"));
  assert.ok(ids.indexOf("filePath") < ids.indexOf("thumbnailPath"));
  assert.doesNotMatch(buildSelection(image), /thumbnailPath/);
  assert.doesNotMatch(buildSelection(image), /filePath/);
});
