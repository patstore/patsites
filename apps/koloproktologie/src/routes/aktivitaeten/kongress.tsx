import { createFileRoute } from "@tanstack/react-router";
import { Kongress } from "@content";

export const Route = createFileRoute("/aktivitaeten/kongress")({
    component: Kongress
});
