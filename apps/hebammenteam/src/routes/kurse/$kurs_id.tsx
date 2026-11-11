import { createFileRoute, notFound } from "@tanstack/react-router";
import { seo } from "@components";
import { courseSlug, useCollection } from "@provider";
import Course from "../../content/Course/Course";

export const Route = createFileRoute("/kurse/$kurs_id")({
  head: () => ({
    meta: seo({ title: "Kurs" }),
  }),
  component: CoursePage,
});

function CoursePage() {
  const { kurs_id } = Route.useParams();
  const { items } = useCollection("Event");
  const course = items.find(
    (event) => event.slug === kurs_id || event.objectId === kurs_id,
  );
  if (!course) {
    throw notFound();
  }
  return <Course course={course} />;
}
