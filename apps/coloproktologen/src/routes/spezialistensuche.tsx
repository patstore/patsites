import { createFileRoute } from "@tanstack/react-router";
import { Spezialistensuche } from "@content";

export const Route = createFileRoute("/spezialistensuche")({
    component: Spezialistensuche
});
