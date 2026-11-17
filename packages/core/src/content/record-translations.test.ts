import assert from "node:assert/strict";
import test from "node:test";
import { localizeRecord, translationLocale } from "./record-translations.ts";

const news = {
	objectId: "wTsHhE9JhW",
	lang: "en",
	title: "test",
	text: "<p>English</p>",
	translations: {
		"de-DE": { text: "<p>Deutsch</p>", title: "test" },
		"en-GB": { text: "<p>English</p>", title: "test de" }
	}
};

test("a language code matches the regional key stored on the record", () => {
	assert.equal(translationLocale("de", ["de-DE", "en-GB"]), "de-DE");
	assert.equal(translationLocale("en", ["de-DE", "en-GB"]), "en-GB");
	assert.equal(translationLocale("en-GB", ["de-DE", "en-GB"]), "en-GB");
});

test("the active locale replaces only the fields it translates", () => {
	assert.equal(localizeRecord(news, "en").title, "test de");
	assert.equal(localizeRecord(news, "de").text, "<p>Deutsch</p>");
	assert.equal(localizeRecord(news, "de").objectId, news.objectId);
});

test("a record without translations keeps its own fields", () => {
	const single = { objectId: "1", title: "Only", lang: "de" };
	assert.equal(localizeRecord(single, "en"), single);
});
