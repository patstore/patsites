/// <reference types="vite/client" />
import { Suspense, type ReactNode } from "react";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { getSiteData } from "@functions/site.functions";
import { Framework, seo } from "@components";
import { SiteContextProvider } from "@provider";
import globalCss from "../styles/global.scss?url";
import "@repo/core/scroll.css";
import favicon from "../images/tvstg_logo.png";
import "@data";

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
      { rel: "icon", type: "image/png", href: favicon },
    ],
    scripts: [{ src: "https://scripts.simpleanalyticscdn.com/latest.js", async: true }],
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
  return (
    <SiteContextProvider>
      <Framework>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Framework>
    </SiteContextProvider>
  );
}
