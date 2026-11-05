import { parseErrorResponse, readBody } from "@repo/server/auth";
import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../../server/auth";

export const Route = createFileRoute("/api/members/lookup")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const auth = await sessionApi.requireUser(request);
                if (auth instanceof Response) {
                    return auth;
                }

                const body = await readBody(request);
                const email = typeof body.email === "string" ? body.email.trim() : "";
                if (!email) {
                    return Response.json({ message: "E-Mail ist erforderlich" }, { status: 400 });
                }

                try {
                    const data = await sessionApi.callFunction(
                        "find_existing_user_from_email",
                        { email, project_id: sessionApi.config.projectId },
                        auth.token
                    );
                    const result =
                        data && typeof data === "object" && "result" in data
                            ? data.result
                            : data;
                    return Response.json({ result });
                } catch (error) {
                    return parseErrorResponse(error);
                }
            }
        }
    }
});
