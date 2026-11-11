import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Courses from "../../content/Courses/Courses";

export const Route = createFileRoute("/kurse/")({
  head: () => ({
    meta: seo({
      title: "Kurse",
      description: "Geburtsvorbereitung, Rückbildung und weitere Angebote.",
    }),
  }),
  component: Courses,
});
