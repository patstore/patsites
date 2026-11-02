import { createFileRoute } from "@tanstack/react-router";
import { Impressum } from "@content";

export const Route = createFileRoute("/impressum")({
    component: Impressum
});
