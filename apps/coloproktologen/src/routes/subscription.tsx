import { createFileRoute } from "@tanstack/react-router";
import { Subscription } from "@content";

export const Route = createFileRoute("/subscription")({
    component: Subscription
});
