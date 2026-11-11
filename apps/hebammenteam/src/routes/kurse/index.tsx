import { createFileRoute } from "@tanstack/react-router";
import { getCoursesPage } from "@functions/pages.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Courses from "../../content/Courses/Courses";

export const Route = createFileRoute("/kurse/")({
  loader: () => getCoursesPage(),
  head: () => ({
    meta: seo({
      title: "Kurse",
      description: "Geburtsvorbereitung, Rückbildung und weitere Angebote.",
    }),
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const { courses, patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Courses courses={courses} />
    </PatstoreScope>
  );
}
