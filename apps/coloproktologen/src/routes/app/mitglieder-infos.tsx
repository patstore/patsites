import { createFileRoute } from "@tanstack/react-router";
import { MitgliederInfo } from "../../content/App/content/MitgliederInfo";

export const Route = createFileRoute("/app/mitglieder-infos")({
    component: MitgliederInfo
});
