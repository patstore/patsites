import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import { PageContent } from "@provider";
import { Athlete } from "@content/Athlete";

export const Route = createFileRoute("/athletes/$slug")({
	head: () => ({ meta: seo({ title: "Athlete" }) }),
	component: AthletePage
});

function AthletePage() {
	const { slug } = Route.useParams();
	return (
		<PageContent path="/athletes/$slug">
			<Athlete slug={slug} />
		</PageContent>
	);
}
