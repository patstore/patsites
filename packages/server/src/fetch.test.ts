import assert from "node:assert/strict";
import test from "node:test";
import { recordsWhere } from "./fetch.ts";

test("module scope reads rows attached to the module", () => {
  assert.deepEqual(recordsWhere("module", { projectId: "project", moduleId: "module" }, null), {
    module: { have: { objectId: { equalTo: "module" } } },
  });
});

test("project scope stays the default record filter", () => {
  assert.deepEqual(
    recordsWhere("project", { projectId: "project", moduleId: "module" }, { equalTo: "published" }),
    {
      project: { have: { objectId: { equalTo: "project" } } },
      state: { equalTo: "published" },
    },
  );
});
