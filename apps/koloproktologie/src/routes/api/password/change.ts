import { parseErrorResponse, readBody } from "@repo/server/auth";
import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../../server/auth";

export const Route = createFileRoute("/api/password/change")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const body = await readBody(request);
                const userId = typeof body.userId === "string" ? body.userId : "";
                const key = typeof body.key === "string" ? body.key : "";
                const password = typeof body.password === "string" ? body.password : "";
                if (!userId || !key || !password) {
                    return Response.json(
                        { result: { success: false, message: "Invalid request" } },
                        { status: 400 }
                    );
                }

                try {
                    const data = await sessionApi.callFunction("change_user_password", {
                        user_id: userId,
                        key,
                        password
                    });
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
