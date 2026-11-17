import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import { PageContent } from "@provider";
import { Home } from "@content/Home";

export const Route = createFileRoute("/{-$lang}/")({
	head: () => ({ meta: seo({ title: "Home" }) }),
	component: HomePage
});

function HomePage() {
	return (
		<PageContent path="/">
			<Home />
		</PageContent>
	);
}
