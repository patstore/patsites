import { createFileRoute } from "@tanstack/react-router";
import { Leitlinien } from "@content";

export const Route = createFileRoute("/aktivitaeten/leitlinien")({
    component: Leitlinien
});
