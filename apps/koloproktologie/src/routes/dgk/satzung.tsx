import { createFileRoute } from "@tanstack/react-router";
import { Satzung } from "@content";

export const Route = createFileRoute("/dgk/satzung")({
    component: Satzung
});
