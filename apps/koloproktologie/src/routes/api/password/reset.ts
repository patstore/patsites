import { parseErrorResponse, readBody } from "@repo/server/auth";
import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../../server/auth";

export const Route = createFileRoute("/api/password/reset")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const body = await readBody(request);
                const email = typeof body.email === "string" ? body.email.trim() : "";
                if (!email) {
                    return Response.json({ message: "E-Mail ist erforderlich" }, { status: 400 });
                }

                try {
                    await sessionApi.callFunction("send_password_reset", {
                        email,
                        project_id: sessionApi.config.projectId
                    });
                    return Response.json({ ok: true });
                } catch (error) {
                    return parseErrorResponse(error);
                }
            }
        }
    }
});
