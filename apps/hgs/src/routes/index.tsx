import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Home from "../content/Home/Home";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: seo({
			description: "Wir halten ihr Haus und Grundstück in Schuss."
		})
	}),
	component: Home
});
