import { createFileRoute } from "@tanstack/react-router";
import { Bcd } from "@content";

export const Route = createFileRoute("/bcd")({
    component: Bcd
});
