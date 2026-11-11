import { createFileRoute, notFound, stripSearchParams } from "@tanstack/react-router";
import { getSportCategory } from "@functions/sport.functions";
import { seo } from "@components";
import { SPORT_CALENDAR_DEFAULTS, sportCalendarSearchSchema } from "@ui";
import Fachabteilung from "../../../content/Fachabteilung/Fachabteilung";

export const Route = createFileRoute("/sportarten/$fachbereich/")({
  validateSearch: sportCalendarSearchSchema,
  search: { middlewares: [stripSearchParams(SPORT_CALENDAR_DEFAULTS)] },
  loader: async ({ params }) => {
    const category = await getSportCategory({ data: { fachbereich: params.fachbereich } });
    if (!category) {
      throw notFound();
    }
    return { fachbereich: category.fachbereich };
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
  const { fachbereich } = Route.useLoaderData();
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
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
  );
}
