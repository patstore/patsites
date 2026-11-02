import type { ReactNode } from "react";
import {
    Outlet,
    createRootRoute,
    HeadContent,
    Scripts,
    useRouterState
} from "@tanstack/react-router";
import { ApolloProvider } from "@apollo/client/react";
import {
    LocalizationProvider,
    PageTransition,
    SEO,
    SmoothScroll,
    canonicalPagePath,
    resolveDocumentLang,
    resolveSeo,
    type ScrollOrientation
} from "@repo/core";
import { SiteContextProvider, client } from "@provider";
import { Layout } from "@components";
import { HeadContent as PageHeadContent } from "@ui";
import { Link, NavigateBridge } from "@router";
import { loadServerContent, publishedStatic } from "../server/content";
import { defaultSeo, pageFade, routeTransitions, siteLocalization } from "./-shell";

export const Route = createRootRoute({
    loader: async ({ location }) => {
        let seo: unknown = null;
        try {
            const pages = await loadServerContent<Record<string, unknown>>(
                "Webpage",
                publishedStatic
            );
            const canonical = canonicalPagePath(location.pathname, siteLocalization);
            seo =
                pages.find((page) => page.path === location.pathname || page.path === canonical) ??
                null;
        } catch (error) {
            console.error("Static content was not available during SSR", error);
            seo = null;
        }

        return { seo };
    },
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            }
        ]
    }),
    component: RootComponent,
    notFoundComponent: NotFoundFallback
});

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
    const pathname = useRouterState({ select: (state) => state.location.pathname });
    const orientation = useRouterState({
        select: (state) => readOrientation(state.matches)
    });
    const { seo } = Route.useLoaderData();

    return (
        <RootDocument pathname={pathname} seo={seo}>
            <ApolloProvider client={client}>
                <SiteContextProvider>
                    <LocalizationProvider pathname={pathname} {...siteLocalization}>
                        <SmoothScroll orientation={orientation}>
                            <PageTransition
                                pathname={pathname}
                                transitions={routeTransitions}
                                clonePrevious={false}
                                fallback={pageFade}
                            >
                                <NavigateBridge />
                                <Outlet />
                            </PageTransition>
                        </SmoothScroll>
                    </LocalizationProvider>
                </SiteContextProvider>
            </ApolloProvider>
        </RootDocument>
    );
}

function RootDocument({
    children,
    pathname,
    seo
}: Readonly<{ children: ReactNode; pathname: string; seo: unknown }>) {
    const language = resolveDocumentLang(pathname, siteLocalization);

    return (
        <html lang={language}>
            <head>
                <HeadContent />
                <SEO {...resolveSeo(seo, defaultSeo(pathname))} />
            </head>
            <body>
                {children}
                <Scripts />
            </body>
        </html>
    );
}

function NotFoundFallback() {
    return (
        <Layout>
            <PageHeadContent
                title="Seite nicht gefunden"
                subtitle="Die eingegebene URL wurde nicht gefunden."
                content={<Link to="/">Zurück zur Startseite</Link>}
            />
        </Layout>
    );
}
