import assert from "node:assert/strict";
import test from "node:test";
import { cmsPathForRouteFile } from "./routes.ts";

test("maps TanStack route files onto canonical paths", () => {
  assert.equal(cmsPathForRouteFile("index.tsx"), "/");
  assert.equal(cmsPathForRouteFile("kontakt.tsx"), "/kontakt");
  assert.equal(cmsPathForRouteFile("app/profile.tsx"), "/app/profile");
  assert.equal(cmsPathForRouteFile("app/index.tsx"), "/app");
  assert.equal(cmsPathForRouteFile("app/route.tsx"), "/app");
  assert.equal(cmsPathForRouteFile("password/$key.tsx"), "/password/$key");
  assert.equal(cmsPathForRouteFile("$lang/about.tsx"), "/about");
  assert.equal(cmsPathForRouteFile("{-$lang}/index.tsx"), "/");
  assert.equal(cmsPathForRouteFile("api/login.ts"), null);
  assert.equal(cmsPathForRouteFile("__root.tsx"), null);
  assert.equal(cmsPathForRouteFile("app/$.tsx"), null);
});
