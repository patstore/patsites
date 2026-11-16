import { Suspense, type ReactNode } from "react";
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
import { isDraftMode } from "@repo/server";
import { DraftGate } from "@repo/ui/Draft";
import { fetchCollection } from "../server/content";
import { readPreviewSession } from "../server/preview";
import { defaultSeo, pageFade, routeTransitions, siteLocalization } from "./-shell";

export const Route = createRootRoute({
    loader: async ({ location }) => {
        const preview = await readPreviewSession();
        let pages: Array<{ path?: string }> = [];
        try {
            pages = (await fetchCollection("Webpage")) as Array<{ path?: string }>;
        } catch {
            pages = [];
        }
        return { seo: pageSeo({ Webpage: pages }, location.pathname), preview };
    },
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            }
        ],
        links: [
            { rel: "icon", type: "image/png", href: "/favicon.png" },
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            { rel: "apple-touch-icon", href: "/apple-touch-icon.png" }
        ]
    }),
    component: RootComponent,
    notFoundComponent: NotFoundFallback
});

function pageSeo(content: { Webpage?: Array<{ path?: string }> } | undefined, pathname: string) {
    const pages = content?.Webpage ?? [];
    const canonical = canonicalPagePath(pathname, siteLocalization);
    return pages.find((page) => page.path === pathname || page.path === canonical) ?? null;
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
    const pathname = useRouterState({ select: (state) => state.location.pathname });
    const orientation = useRouterState({
        select: (state) => readOrientation(state.matches)
    });
    const { seo, preview } = Route.useLoaderData();

    return (
        <RootDocument pathname={pathname} seo={seo}>
            <DraftGate preview={preview} locked={isDraftMode() && !preview}>
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
                                    <Suspense fallback={null}>
                                        <Outlet />
                                    </Suspense>
                                </PageTransition>
                            </SmoothScroll>
                        </LocalizationProvider>
                    </SiteContextProvider>
                </ApolloProvider>
            </DraftGate>
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
