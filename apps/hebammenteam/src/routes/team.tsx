import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Team from "../content/Team/Team";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: seo({
      title: "Team",
      description: "Die Hebammen, die Sie begleiten.",
    }),
  }),
  component: Team,
});
