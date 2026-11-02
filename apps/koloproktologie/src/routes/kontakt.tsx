import { createFileRoute } from "@tanstack/react-router";
import { Kontakt } from "@content";

export const Route = createFileRoute("/kontakt")({
    component: Kontakt
});
