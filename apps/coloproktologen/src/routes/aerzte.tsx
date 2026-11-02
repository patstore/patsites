import { createFileRoute } from "@tanstack/react-router";
import { Aerzte } from "@content";

export const Route = createFileRoute("/aerzte")({
    component: Aerzte
});
