import { createFileRoute, notFound, stripSearchParams } from "@tanstack/react-router";
import { getSportCategory, getTrainingData } from "@functions/sport.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import { SPORT_CALENDAR_DEFAULTS, sportCalendarSearchSchema } from "@ui";
import Fachabteilung from "../../../content/Fachabteilung/Fachabteilung";

export const Route = createFileRoute("/sportarten/$fachbereich/")({
  validateSearch: sportCalendarSearchSchema,
  search: { middlewares: [stripSearchParams(SPORT_CALENDAR_DEFAULTS)] },
  loader: async ({ params }) => {
    const [category, training] = await Promise.all([
      getSportCategory({ data: { fachbereich: params.fachbereich } }),
      getTrainingData(),
    ]);
    if (!category) {
      throw notFound();
    }
    return { fachbereich: category.fachbereich, patstore: training };
  },
  head: ({ loaderData }) => ({
    meta: seo({
      title: loaderData?.fachbereich.title,
      description: loaderData?.fachbereich.description,
    }),
  }),
  component: FachbereichPage,
});

function FachbereichPage() {
  const { fachbereich, patstore } = Route.useLoaderData();
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <PatstoreScope data={patstore}>
      <Fachabteilung
        fachabteilung={fachbereich}
        filters={filters}
        onFiltersChange={(next) =>
          navigate({
            search: (prev) => ({ ...prev, ...next }),
            replace: true,
            resetScroll: false,
          })
        }
      />
    </PatstoreScope>
  );
}
