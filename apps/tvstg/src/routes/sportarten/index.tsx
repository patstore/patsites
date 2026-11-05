import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { getTrainingData } from "@functions/sport.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import { SPORT_CALENDAR_DEFAULTS, sportCalendarSearchSchema } from "@ui";
import Sportangebot from "../../content/Sportangebot/Sportangebot";

export const Route = createFileRoute("/sportarten/")({
  validateSearch: sportCalendarSearchSchema,
  search: { middlewares: [stripSearchParams(SPORT_CALENDAR_DEFAULTS)] },
  loader: async () => ({ patstore: await getTrainingData() }),
  head: () => ({
    meta: seo({
      title: "Sportangebot",
      description:
        "Alle Trainingszeiten des TV Freiburg St. Georgen – filterbar nach Sportart, Alter und Geschlecht.",
    }),
  }),
  component: SportangebotPage,
});

function SportangebotPage() {
  const { patstore } = Route.useLoaderData();
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <PatstoreScope data={patstore}>
      <Sportangebot
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
