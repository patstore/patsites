import { createFileRoute } from "@tanstack/react-router";
import { getJobsData } from "@functions/pages.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Jobboerse, {
  JOBBOERSE_TEXT,
  JOBBOERSE_TITLE,
} from "../content/Jobboerse/Jobboerse";

export const Route = createFileRoute("/jobboerse")({
  loader: async () => ({ patstore: await getJobsData() }),
  head: () => ({
    meta: seo({ title: JOBBOERSE_TITLE, description: JOBBOERSE_TEXT }),
  }),
  component: JobboersePage,
});

function JobboersePage() {
  const { patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Jobboerse />
    </PatstoreScope>
  );
}
