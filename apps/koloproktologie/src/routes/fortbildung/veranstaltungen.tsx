import { createFileRoute } from "@tanstack/react-router";
import { Veranstaltungen } from "@content";

export const Route = createFileRoute("/fortbildung/veranstaltungen")({
    component: Veranstaltungen
});
