import { createFileRoute } from "@tanstack/react-router";
import { Forschungsfoerderung } from "@content";

export const Route = createFileRoute("/aktivitaeten/forschungsfoerderung")({
    component: Forschungsfoerderung
});
