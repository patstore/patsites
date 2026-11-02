import { createFileRoute } from "@tanstack/react-router";
import { Patienten } from "@content";

export const Route = createFileRoute("/patienten")({
    component: Patienten
});
