import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../server/auth";

export const Route = createFileRoute("/api/logout")({
    server: {
        handlers: {
            POST: ({ request }) => sessionApi.logout(request)
        }
    }
});
