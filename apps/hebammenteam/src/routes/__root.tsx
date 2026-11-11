/// <reference types="vite/client" />
import type { ReactNode } from "react";
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { getSiteData } from "@functions/site.functions";
import { Framework, seo } from "@components";
import { PatstoreScope, SiteContextProvider } from "@provider";
import globalCss from "../styles/global.css?url";
import "@repo/core/scroll.css";

export const Route = createRootRoute({
  loader: () => getSiteData(),
  staleTime: 5 * 60_000,
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

function RootComponent() {
  const { patstore } = Route.useLoaderData();

  return (
    <SiteContextProvider>
      <PatstoreScope data={patstore}>
        <Framework>
          <Outlet />
        </Framework>
      </PatstoreScope>
    </SiteContextProvider>
  );
}
