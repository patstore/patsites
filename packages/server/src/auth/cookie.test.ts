import assert from "node:assert/strict";
import test from "node:test";
import { clearCookieHeader, previewCookieHeader, readCookie, sessionCookieHeader } from "./cookie.ts";
import { acceptPreview, login, previewNextPath } from "./session.ts";

test("readCookie returns the named value", () => {
  assert.equal(readCookie("a=1; kol_token=abc%20d; b=2", "kol_token"), "abc d");
  assert.equal(readCookie(null, "kol_token"), "");
  assert.equal(readCookie("other=1", "kol_token"), "");
});

test("session cookie is httpOnly and the clear cookie expires immediately", () => {
  const set = sessionCookieHeader("kol_token", "secret");
  assert.match(set, /^kol_token=secret;/);
  assert.match(set, /HttpOnly/);
  assert.match(set, /SameSite=Strict/);
  assert.doesNotMatch(set, /Secure/);

  const clear = clearCookieHeader("kol_token");
  assert.match(clear, /Max-Age=0/);
  assert.match(clear, /HttpOnly/);
});

test("preview cookie lasts for the browser session", () => {
  const set = previewCookieHeader("secret");
  assert.match(set, /^preview=secret;/);
  assert.match(set, /HttpOnly/);
  assert.match(set, /SameSite=Strict/);
  assert.doesNotMatch(set, /Max-Age/);
  assert.doesNotMatch(set, /Expires/);
});

test("preview next path stays on this site", () => {
  assert.equal(previewNextPath(null), "/");
  assert.equal(previewNextPath("/aktuelles/beitrag"), "/aktuelles/beitrag");
  assert.equal(previewNextPath("https://evil.test"), "/");
  assert.equal(previewNextPath("//evil.test"), "/");
  assert.equal(previewNextPath("/\\evil.test"), "/");
});

test("preview exchange rejects a missing session without calling Parse", async () => {
  const response = await acceptPreview(new Request("http://local/api/preview?next=https://evil.test"), {
    apiUrl: "",
    appId: "",
    restKey: "",
    projectId: "",
    cookieName: "kol_token",
  });
  assert.equal(response.status, 401);
});

test("login reports missing server keys without calling Parse", async () => {
  const response = await login(
    new Request("http://local/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "ada", password: "secret" }),
    }),
    {
      apiUrl: "",
      appId: "",
      restKey: "",
      projectId: "",
      cookieName: "kol_token",
    },
  );
  assert.equal(response.status, 500);
  assert.deepEqual(await response.json(), { message: "not valid keys" });
});
