import { parseErrorResponse, readBody } from "@repo/server/auth";
import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../../server/auth";

export const Route = createFileRoute("/api/members/create")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const auth = await sessionApi.requireUser(request);
                if (auth instanceof Response) {
                    return auth;
                }

                const body = await readBody(request);
                try {
                    const data = await sessionApi.callFunction(
                        "create_bcd_member",
                        {
                            ...body,
                            project_id: sessionApi.config.projectId
                        },
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
