import { createFileRoute } from "@tanstack/react-router";
import { Protokolle } from "../../content/App/content/Protokolle";

export const Route = createFileRoute("/app/protokolle")({
    component: Protokolle
});
