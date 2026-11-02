import { createFileRoute } from "@tanstack/react-router";
import { App } from "@content";

export const Route = createFileRoute("/app")({
    component: App
});
