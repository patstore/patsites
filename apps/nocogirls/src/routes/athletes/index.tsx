import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import { PageContent } from "@provider";
import { Athletes } from "@content/Athletes";

export const Route = createFileRoute("/athletes/")({
	head: () => ({ meta: seo({ title: "Athletes" }) }),
	component: AthletesPage
});

function AthletesPage() {
	return (
		<PageContent path="/athletes">
			<Athletes />
		</PageContent>
	);
}
