/// <reference types="vite/client" />
import { type ReactNode } from "react";
import {
    HeadContent,
    Link,
    Outlet,
    Scripts,
    createRootRoute,
    useRouterState
} from "@tanstack/react-router";
import { PageTransition, SmoothScroll } from "@repo/core";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Layout, Navigation, SEO, ThemeToggle } from "@/components";
import { pageRise, routeTransitions } from "./-shell";
import "@repo/core/scroll.css";
import "../styles/global.scss";
import "../components/PageTransition/page_transition.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

function NotFoundComponent() {
    return (
        <>
            <SEO
                title="Seite nicht gefunden | patwork"
                description="Diese Seite existiert nicht oder wurde verschoben. Zurück zur Startseite von patwork."
                noindex={true}
                type="website"
            />
            <Layout>
                <section className="section-container w-100 inner-padding padding-top-large padding-bottom-large">
                    <div className="w-66 column gap-medium">
                        <p>404</p>
                        <h2>Seite nicht gefunden</h2>
                        <p>
                            Diese Seite existiert nicht oder wurde verschoben.
                        </p>
                        <Link
                            to="/"
                            className="w-50 border-bottom dark"
                        >
                            Zur Startseite
                        </Link>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export const Route = createRootRoute({
    ssr: false,
    notFoundComponent: NotFoundComponent,
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1.0"
            },
            {
                title: "Ausdrucksstarke Webseiten & Weblösungen | patwork"
            },
            {
                name: "description",
                content:
                    "patwork ist ein Design- und Entwicklungsstudio für individuelle Webseiten und Weblösungen. Verwandle deine Ideen in digitale Erfolge – Webdesign, CMS und SEO."
            },
            { name: "author", content: "Patrick Hanke" },
            { name: "robots", content: "index, follow" },
            { property: "og:type", content: "website" },
            { property: "og:site_name", content: "patwork" },
            { property: "og:locale", content: "de_DE" },
            { name: "twitter:card", content: "summary_large_image" }
        ],
        links: [
            {
                rel: "icon",
                type: "image/webp",
                href: "/images/logo_patwork.webp"
            }
        ],
        scripts: [
            {
                src: "https://scripts.simpleanalyticscdn.com/latest.js",
                async: true,
                "data-collect-dnt": "true"
            }
        ]
    }),
    shellComponent: RootDocument,
    component: RootComponent
});

function RootDocument({ children }: { children: ReactNode }) {
    return (
        <html lang="de">
            <head>
                <HeadContent />
            </head>
            <body>
                <Navigation />
                {children}
                <Scripts />
            </body>
        </html>
    );
}

function RootComponent() {
    const pathname = useRouterState({
        select: (state) => state.location.pathname
    });

    return (
        <SmoothScroll>
            <ThemeToggle />
            <PageTransition
                pathname={pathname}
                transitions={routeTransitions}
                clonePrevious
                fallback={pageRise}
                className="page-transition"
            >
                <div className="page-transition-sheet">
                    <Outlet />
                </div>
            </PageTransition>
        </SmoothScroll>
    );
}
