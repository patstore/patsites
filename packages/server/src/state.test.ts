import assert from "node:assert/strict";
import test from "node:test";
import { createDataContext, filterByStates, stateWhere } from "./state.ts";

test("state filters accept any allow-list, not a fixed published flag", () => {
  assert.deepEqual(stateWhere(null), null);
  assert.deepEqual(stateWhere(["published"]), { equalTo: "published" });
  assert.deepEqual(stateWhere(["draft", "published"]), {
    in: ["draft", "published"],
  });
  assert.deepEqual(stateWhere(["review", "archived", "scheduled"]), {
    in: ["review", "archived", "scheduled"],
  });
  assert.equal(
    createDataContext({ mode: "ssr", states: ["review"] }).mode,
    "ssr",
  );
});

test("static records keep classes without a state and honor the allow-list", () => {
  const records = [
    { objectId: "1", state: "published" },
    { objectId: "2", state: "draft" },
    { objectId: "3", state: "review" },
    { objectId: "4", title: "no state" },
  ];
  assert.deepEqual(
    filterByStates(records, ["published", "review"]).map((record) => record.objectId),
    ["1", "3", "4"],
  );
  assert.equal(filterByStates(records, null).length, 4);
});
