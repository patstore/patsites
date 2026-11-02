import { createFileRoute } from "@tanstack/react-router";
import { Spezialistensuche } from "../../content/App/content/Spezialistensuche";

export const Route = createFileRoute("/app/spezialistensuche")({
    component: Spezialistensuche
});
