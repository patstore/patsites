import { createFileRoute } from "@tanstack/react-router";
import { Grundkurs } from "@content";

export const Route = createFileRoute("/fortbildung/grundkurs")({
    component: Grundkurs
});
