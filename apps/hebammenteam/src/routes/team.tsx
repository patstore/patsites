import { createFileRoute } from "@tanstack/react-router";
import { getTeamPage } from "@functions/pages.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Team from "../content/Team/Team";

export const Route = createFileRoute("/team")({
  loader: () => getTeamPage(),
  head: () => ({
    meta: seo({
      title: "Team",
      description: "Die Hebammen, die Sie begleiten.",
    }),
  }),
  component: TeamPage,
});

function TeamPage() {
  const { persons, patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Team persons={persons} />
    </PatstoreScope>
  );
}
