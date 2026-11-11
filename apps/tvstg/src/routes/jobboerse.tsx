import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Jobboerse, {
  JOBBOERSE_TEXT,
  JOBBOERSE_TITLE,
} from "../content/Jobboerse/Jobboerse";

export const Route = createFileRoute("/jobboerse")({
  head: () => ({
    meta: seo({ title: JOBBOERSE_TITLE, description: JOBBOERSE_TEXT }),
  }),
  component: Jobboerse,
});
