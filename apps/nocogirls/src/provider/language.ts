import { notFound, redirect } from "@tanstack/react-router";
import { localizePath } from "@repo/core";
import { siteLocalization } from "./localization";

export function guardLanguage(lang: string | undefined, pathname: string) {
	if (!lang) {
		return;
	}
	if (!siteLocalization.languages.includes(lang)) {
		throw notFound();
	}
	if (lang === siteLocalization.defaultLanguage) {
		throw redirect({
			href: localizePath(pathname, lang, siteLocalization)
		});
	}
}
