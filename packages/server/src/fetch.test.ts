import assert from "node:assert/strict";
import test from "node:test";
import {
	appendTranslationsSelection,
	recordsWhere,
	selectionForTranslations
} from "./fetch.ts";
import { omitTranslations } from "./locales.ts";

test("module scope reads rows attached to the module", () => {
	assert.deepEqual(
		recordsWhere(
			"module",
			{ projectId: "project", moduleId: "module" },
			null
		),
		{
			module: { have: { objectId: { equalTo: "module" } } }
		}
	);
});

test("omitting translations leaves the class fields in place", () => {
	assert.deepEqual(
		omitTranslations({
			objectId: "1",
			title: "Regulär",
			translations: { "de-DE": { title: "Anders" } }
		}),
		{ objectId: "1", title: "Regulär" }
	);
});

test("projects without localization settings do not select translations", () => {
	assert.equal(
		selectionForTranslations("title\ntranslations\ntext", false),
		"title\ntext"
	);
	assert.equal(
		selectionForTranslations("title\ntext", true),
		"title\ntext\ntranslations"
	);
});

test("translations are requested once on a class selection", () => {
	assert.equal(
		appendTranslationsSelection("title\ntext"),
		"title\ntext\ntranslations"
	);
	assert.equal(
		appendTranslationsSelection("title\ntranslations\ntext"),
		"title\ntranslations\ntext"
	);
});

test("project scope stays the default record filter", () => {
	assert.deepEqual(
		recordsWhere(
			"project",
			{ projectId: "project", moduleId: "module" },
			{ equalTo: "published" }
		),
		{
			project: { have: { objectId: { equalTo: "project" } } },
			state: { equalTo: "published" }
		}
	);
});
