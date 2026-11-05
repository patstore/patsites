import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getAppointmentsByYear } from "@functions/pages.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Termine from "../content/Termine/Termine";

const termineSearchSchema = z.object({
  jahr: z.number().int().min(2000).max(2100).optional().catch(undefined),
});

export const Route = createFileRoute("/termine")({
  validateSearch: termineSearchSchema,
  loaderDeps: ({ search }) => ({ jahr: search.jahr }),
  loader: ({ deps }) => getAppointmentsByYear({ data: { jahr: deps.jahr } }),
  head: ({ loaderData }) => ({
    meta: seo({
      title:
        loaderData && loaderData.jahr !== loaderData.currentYear
          ? `Termine ${loaderData.jahr}`
          : "Termine",
      description:
        "Was steht an? Kommende Termine und Veranstaltungen unseres Vereins und der Abteilungen siehst Du hier.",
    }),
  }),
  component: TerminePage,
});

function TerminePage() {
  const { jahr, currentYear, patstore } = Route.useLoaderData();
  const navigate = Route.useNavigate();

  return (
    <PatstoreScope data={patstore}>
      <Termine
        jahr={jahr}
        currentYear={currentYear}
        onYearChange={(nextYear) =>
          navigate({
            search: { jahr: nextYear === currentYear ? undefined : nextYear },
            resetScroll: false,
          })
        }
      />
    </PatstoreScope>
  );
}
