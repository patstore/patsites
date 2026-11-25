import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/schritte")({
    beforeLoad: () => {
        throw redirect({ to: "/studio" });
    }
});
