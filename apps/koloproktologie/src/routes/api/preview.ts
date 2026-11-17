import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../server/auth";

export const Route = createFileRoute("/api/preview")({
	server: {
		handlers: {
			GET: ({ request }) => sessionApi.acceptPreview(request)
		}
	}
});
