import { createFileRoute } from "@tanstack/react-router";
import { Mitgliedersuche } from "@content";

export const Route = createFileRoute("/dgk/mitgliedersuche")({
    component: Mitgliedersuche
});
