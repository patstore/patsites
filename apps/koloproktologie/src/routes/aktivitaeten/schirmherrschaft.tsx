import { createFileRoute } from "@tanstack/react-router";
import { Schirmherrschaft } from "@content";

export const Route = createFileRoute("/aktivitaeten/schirmherrschaft")({
    component: Schirmherrschaft
});
