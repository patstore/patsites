import { createFileRoute, notFound } from "@tanstack/react-router";
import { excerpt, seo } from "@components";
import type { PersonClass } from "@data";
import { useCollection } from "@provider";
import { isDraftMode, loadStaticRecords } from "@repo/server";
import Member from "../../content/Team/Member";
import { displayName, personSlug, sortPersons } from "../../content/Team/person";

export const Route = createFileRoute("/team/$slug")({
	head: ({ params }) => {
		const persons = loadStaticRecords("Person", {
			states: isDraftMode() ? null : ["published"]
		}) as PersonClass[];
		const person = persons.find((item) => personSlug(item) === params.slug);
		const name = person ? displayName(person) : "Hebamme";
		return {
			meta: seo({
				title: name,
				description:
					excerpt(person?.text) ||
					`${name} begleitet bei Coming Home.`
			})
		};
	},
	component: MemberPage
});

function MemberPage() {
	const { slug } = Route.useParams();
	const { items } = useCollection("Person");
	const persons = sortPersons(items);
	const person = persons.find((item) => personSlug(item) === slug);
	if (!person) {
		throw notFound();
	}
	return <Member person={person} persons={persons} />;
}
