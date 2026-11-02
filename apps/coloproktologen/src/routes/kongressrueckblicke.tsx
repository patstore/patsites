import { createFileRoute } from "@tanstack/react-router";
import { Kongressrueckblicke } from "@content";

export const Route = createFileRoute("/kongressrueckblicke")({
    component: Kongressrueckblicke
});
