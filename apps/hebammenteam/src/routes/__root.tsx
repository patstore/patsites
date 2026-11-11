/// <reference types="vite/client" />
import { Suspense, type ReactNode } from "react";
import { HeadContent, Outlet, Scripts, createRootRoute, useRouterState } from "@tanstack/react-router";
import { PageTransition, SmoothScroll, type ScrollOrientation } from "@repo/core";
import { Framework, seo } from "@components";
import { SiteContextProvider } from "@provider";
import globalCss from "../styles/global.css?url";
import "@repo/core/scroll.css";
import { pageFade, routeTransitions } from "./-shell";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...seo(),
    ],
    links: [
      { rel: "stylesheet", href: globalCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
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
  matches: ReadonlyArray<{ staticData: { scroll?: ScrollOrientation } }>,
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
    select: (state) => readOrientation(state.matches),
  });

  return (
    <SiteContextProvider>
      <SmoothScroll orientation={orientation}>
        <Framework>
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
        </Framework>
      </SmoothScroll>
    </SiteContextProvider>
  );
}
