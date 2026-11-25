import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import { Privacy } from "@content/Privacy";

export const Route = createFileRoute("/{-$lang}/datenschutz")({
	head: ({ params }) => ({
		meta: seo({
			title: params.lang === "en" ? "Privacy" : "Datenschutz"
		})
	}),
	component: Privacy
});
