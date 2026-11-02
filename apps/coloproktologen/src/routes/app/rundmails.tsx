import { createFileRoute } from "@tanstack/react-router";
import { Rundmails } from "../../content/App/content/Rundmails";

export const Route = createFileRoute("/app/rundmails")({
    component: Rundmails
});
