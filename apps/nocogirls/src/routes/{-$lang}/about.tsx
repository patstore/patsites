import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import { PageContent } from "@provider";
import { About } from "@content/About";

export const Route = createFileRoute("/{-$lang}/about")({
	head: () => ({ meta: seo({ title: "About" }) }),
	component: AboutPage
});

function AboutPage() {
	return (
		<PageContent path="/about">
			<About />
		</PageContent>
	);
}
