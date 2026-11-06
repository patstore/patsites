import assert from "node:assert/strict";
import test from "node:test";
import { fetchCollection, isDraftMode } from "./content.ts";
import { registerStaticSnapshot } from "./snapshot.ts";

test("draft mode follows VITE_DRAFT_MODE", () => {
  const previous = process.env.VITE_DRAFT_MODE;
  process.env.VITE_DRAFT_MODE = "true";
  assert.equal(isDraftMode(), true);
  process.env.VITE_DRAFT_MODE = "false";
  assert.equal(isDraftMode(), false);
  delete process.env.VITE_DRAFT_MODE;
  assert.equal(isDraftMode(), false);
  if (previous === undefined) {
    delete process.env.VITE_DRAFT_MODE;
  } else {
    process.env.VITE_DRAFT_MODE = previous;
  }
});

test("static fetch keeps published records and records without a state", async () => {
  const previous = process.env.VITE_DRAFT_MODE;
  delete process.env.VITE_DRAFT_MODE;
  registerStaticSnapshot({
    articles: [
      { objectId: "1", state: "published" },
      { objectId: "2", state: "draft" },
      { objectId: "3", title: "no state" },
    ],
  });

  const rows = await fetchCollection("Article");
  assert.deepEqual(
    rows.map((row) => row.objectId),
    ["1", "3"],
  );

  if (previous === undefined) {
    delete process.env.VITE_DRAFT_MODE;
  } else {
    process.env.VITE_DRAFT_MODE = previous;
  }
});

test("account classes are not fetched as public content", async () => {
  await assert.rejects(() => fetchCollection("User"), /session routes/);
  await assert.rejects(() => fetchCollection("Email"), /session routes/);
});
