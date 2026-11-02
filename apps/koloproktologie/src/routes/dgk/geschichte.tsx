import { createFileRoute } from "@tanstack/react-router";
import { Geschichte } from "@content";

export const Route = createFileRoute("/dgk/geschichte")({
    component: Geschichte
});
