import { createFileRoute } from "@tanstack/react-router";
import { Login } from "@content";

export const Route = createFileRoute("/login")({
    component: Login
});
