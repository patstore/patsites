import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL, permanently moved to `/sportangebot/<fachbereich>/<sportart>`. */
export const Route = createFileRoute("/sportarten/$fachbereich/$sportart")({
	beforeLoad: ({ params }) => {
		throw redirect({
			to: "/sportangebot/$fachbereich/$sportart",
			params,
			statusCode: 301
		});
	}
});
