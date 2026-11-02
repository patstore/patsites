import { createFileRoute } from "@tanstack/react-router";
import { Mitgliedschaft } from "@content";

export const Route = createFileRoute("/dgk/mitgliedschaft")({
    component: Mitgliedschaft
});
