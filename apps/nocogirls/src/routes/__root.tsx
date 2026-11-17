/// <reference types="vite/client" />
import { Suspense, type ReactNode } from "react";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRoute,
	useRouterState
} from "@tanstack/react-router";
import {
	LocalizationProvider,
	PageTransition,
	SmoothScroll,
	resolveDocumentLang,
	type ScrollOrientation
} from "@repo/core";
import { isDraftMode } from "@repo/server";
import { DraftGate } from "@repo/ui/Draft";
import { Layout, seo } from "@components";
import { ThemeProvider } from "@context";
import { siteLocalization } from "@provider";
import { readPreviewSession } from "../server/preview";
import { pageFade, routeTransitions } from "./-shell";
import "@repo/core/scroll.css";
import "@styles";

export const Route = createRootRoute({
	loader: () => readPreviewSession(),
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			...seo()
		],
		links: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }]
	}),
	shellComponent: RootDocument,
	component: RootComponent
});

function RootDocument({ children }: { children: ReactNode }) {
	const pathname = useRouterState({
		select: (state) => state.location.pathname
	});
	const language = resolveDocumentLang(pathname, siteLocalization);

	return (
		<html lang={language}>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}

function readOrientation(
	matches: ReadonlyArray<{ staticData: { scroll?: ScrollOrientation } }>
): ScrollOrientation {
	for (let index = matches.length - 1; index >= 0; index -= 1) {
		const scroll = matches[index]?.staticData.scroll;
		if (scroll === "horizontal" || scroll === "vertical") {
			return scroll;
		}
	}
	return "vertical";
}

function RootComponent() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname
	});
	const orientation = useRouterState({
		select: (state) => readOrientation(state.matches)
	});
	const preview = Route.useLoaderData();

	return (
		<DraftGate preview={preview} locked={isDraftMode() && !preview}>
			<ThemeProvider>
				<LocalizationProvider pathname={pathname} {...siteLocalization}>
					<SmoothScroll orientation={orientation}>
						<Layout>
							<PageTransition
								pathname={pathname}
								transitions={routeTransitions}
								clonePrevious={false}
								fallback={pageFade}
							>
								<Suspense fallback={null}>
									<Outlet />
								</Suspense>
							</PageTransition>
						</Layout>
					</SmoothScroll>
				</LocalizationProvider>
			</ThemeProvider>
		</DraftGate>
	);
}
