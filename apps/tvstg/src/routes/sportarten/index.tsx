import {
	createFileRoute,
	redirect,
	stripSearchParams
} from "@tanstack/react-router";
import { SPORT_CALENDAR_DEFAULTS, sportCalendarSearchSchema } from "@ui";

/** Legacy URL, permanently moved to `/sportangebot`. */
export const Route = createFileRoute("/sportarten/")({
	validateSearch: sportCalendarSearchSchema,
	search: { middlewares: [stripSearchParams(SPORT_CALENDAR_DEFAULTS)] },
	beforeLoad: ({ search }) => {
		throw redirect({ to: "/sportangebot", search, statusCode: 301 });
	}
});
