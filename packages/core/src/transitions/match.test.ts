import assert from "node:assert/strict";
import test from "node:test";
import { matchRouteTransition, pathMatches } from "./match.ts";

test("wildcards and exact pairs", () => {
  assert.equal(pathMatches("*", "/projects"), true);
  assert.equal(pathMatches("/projects/*", "/projects"), true);
  assert.equal(pathMatches("/projects/*", "/projects/one"), true);
  assert.equal(pathMatches("/projects/*", "/about"), false);

  const matched = matchRouteTransition(
    [
      {
        from: "*",
        to: "*",
        page: { to: { autoAlpha: 1 } },
      },
      {
        from: "/",
        to: "/projects",
        elements: [{ id: "image_01", from: { x: 200, y: 120 }, to: { x: 0, y: 0 } }],
      },
    ],
    "/",
    "/projects",
  );

  assert.equal(matched?.elements?.[0]?.id, "image_01");
});

test("normalizes trailing slashes", () => {
  const matched = matchRouteTransition([{ from: "/kontakt", to: "/" }], "/kontakt/", "/");
  assert.equal(matched?.from, "/kontakt");
});
