import {
	createFileRoute,
	redirect,
	stripSearchParams
} from "@tanstack/react-router";
import { SPORT_CALENDAR_DEFAULTS, sportCalendarSearchSchema } from "@ui";

/** Legacy URL, permanently moved to `/sportangebot/<fachbereich>`. */
export const Route = createFileRoute("/sportarten/$fachbereich/")({
	validateSearch: sportCalendarSearchSchema,
	search: { middlewares: [stripSearchParams(SPORT_CALENDAR_DEFAULTS)] },
	beforeLoad: ({ params, search }) => {
		throw redirect({
			to: "/sportangebot/$slug",
			params: { slug: params.fachbereich },
			search,
			statusCode: 301
		});
	}
});
