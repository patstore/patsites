import { createFileRoute } from "@tanstack/react-router";
import { Datenschutzerklaerung } from "@content";

export const Route = createFileRoute("/datenschutzerklaerung")({
    component: Datenschutzerklaerung
});
