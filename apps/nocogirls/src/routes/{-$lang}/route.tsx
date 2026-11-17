import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { guardLanguage } from "@provider";

export const Route = createFileRoute("/{-$lang}")({
	beforeLoad: ({ params, location }) => {
		guardLanguage(params.lang, location.pathname);
	},
	component: () => <Outlet />
});
