import { createFileRoute } from "@tanstack/react-router";
import { Manual } from "@content";

export const Route = createFileRoute("/fortbildung/manual")({
    component: Manual
});
