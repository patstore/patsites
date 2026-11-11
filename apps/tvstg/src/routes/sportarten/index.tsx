import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { seo } from "@components";
import { SPORT_CALENDAR_DEFAULTS, sportCalendarSearchSchema } from "@ui";
import Sportangebot from "../../content/Sportangebot/Sportangebot";

export const Route = createFileRoute("/sportarten/")({
  validateSearch: sportCalendarSearchSchema,
  search: { middlewares: [stripSearchParams(SPORT_CALENDAR_DEFAULTS)] },
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
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
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
  );
}
