import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../server/auth";

export const Route = createFileRoute("/api/login")({
    server: {
        handlers: {
            POST: ({ request }) => sessionApi.login(request)
        }
    }
});
