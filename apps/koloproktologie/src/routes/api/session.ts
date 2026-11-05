import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../server/auth";

export const Route = createFileRoute("/api/session")({
    server: {
        handlers: {
            GET: ({ request }) => sessionApi.session(request)
        }
    }
});
