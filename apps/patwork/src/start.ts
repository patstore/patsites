import { createCsrfMiddleware, createStart } from "@tanstack/react-start";

const csrfMiddleware = createCsrfMiddleware({
    filter: (ctx) => ctx.handlerType === "serverFn"
});

export const startInstance = createStart(() => ({
    // The studio site is client-rendered. GSAP, Lenis, and particles run in the browser.
    defaultSsr: false,
    requestMiddleware: [csrfMiddleware]
}));
