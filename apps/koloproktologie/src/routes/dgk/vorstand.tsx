import { createFileRoute } from "@tanstack/react-router";
import { Vorstand } from "@content";

export const Route = createFileRoute("/dgk/vorstand")({
    component: Vorstand
});
