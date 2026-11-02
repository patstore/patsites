import { createFileRoute } from "@tanstack/react-router";
import { Leistungen } from "../../content/App/content/Leistungen";

export const Route = createFileRoute("/app/leistungen")({
    component: Leistungen
});
