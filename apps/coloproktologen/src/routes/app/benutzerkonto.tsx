import { createFileRoute } from "@tanstack/react-router";
import { Profile } from "../../content/App/content/Profile";

export const Route = createFileRoute("/app/benutzerkonto")({
    component: Profile
});
