import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCoursePage } from "@functions/pages.functions";
import { excerpt, seo } from "@components";
import { PatstoreScope } from "@provider";
import Course from "../../content/Course/Course";

export const Route = createFileRoute("/kurse/$kurs_id")({
  loader: async ({ params }) => {
    const result = await getCoursePage({ data: { kursId: params.kurs_id } });
    if (!result) {
      throw notFound();
    }
    return result;
  },
  head: ({ loaderData }) => ({
    meta: seo({
      title: loaderData?.course.title ?? "Seite nicht gefunden",
      description: excerpt(loaderData?.course.subtitle || loaderData?.course.text),
    }),
  }),
  component: CoursePage,
});

function CoursePage() {
  const { course, patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Course course={course} />
    </PatstoreScope>
  );
}
