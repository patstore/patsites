import { createFileRoute } from "@tanstack/react-router";
import { Fortbildung } from "@content";

export const Route = createFileRoute("/fortbildung")({
    component: Fortbildung
});
