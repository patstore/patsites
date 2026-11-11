import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { NotFound, RouteError } from "@components";

export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: false,
    defaultPreload: "intent",
    defaultNotFoundComponent: NotFound,
    defaultErrorComponent: RouteError,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }

  interface StaticDataRouteOption {
    scroll?: "vertical" | "horizontal";
  }
}
