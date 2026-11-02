import { createFileRoute } from "@tanstack/react-router";
import { Hospitationen } from "@content";

export const Route = createFileRoute("/aktivitaeten/hospitationen")({
    component: Hospitationen
});
