import { createFileRoute } from "@tanstack/react-router";
import { Beitragsordnung } from "@content";

export const Route = createFileRoute("/dgk/beitragsordnung")({
    component: Beitragsordnung
});
