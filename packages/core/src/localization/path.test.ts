import assert from "node:assert/strict";
import test from "node:test";
import {
  canonicalPagePath,
  languageFromPath,
  localizePath,
  resolveDocumentLang,
  resolveLocalizedPath,
} from "./path.ts";

const config = { languages: ["de", "en"], defaultLanguage: "de" };

test("default language has no prefix", () => {
  assert.equal(canonicalPagePath("/impressum", config), "/impressum");
  assert.equal(languageFromPath("/impressum", config), null);
  assert.equal(resolveDocumentLang("/", config), "de");
  assert.equal(localizePath("/impressum", "de", config), "/impressum");
});

test("prefixed language maps back to the canonical path", () => {
  assert.equal(canonicalPagePath("/en/impressum", config), "/impressum");
  assert.equal(canonicalPagePath("/en", config), "/");
  assert.equal(localizePath("/impressum", "en", config), "/en/impressum");
  assert.equal(localizePath("/en/impressum", "de", config), "/impressum");
  assert.equal(resolveDocumentLang("/en/impressum", config), "en");
  assert.equal(
    resolveLocalizedPath("/impressum", "en", config, ["/impressum", "/en/impressum"]),
    "/en/impressum",
  );
  assert.equal(resolveLocalizedPath("/impressum", "en", config, ["/impressum"]), "/impressum");
});
