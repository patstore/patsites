import { parseErrorResponse, readBody } from "@repo/server/auth";
import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../../server/auth";

export const Route = createFileRoute("/api/password/user")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const body = await readBody(request);
                const email = typeof body.email === "string" ? body.email : "";
                const key = typeof body.key === "string" ? body.key : "";
                if (!email || !key) {
                    return Response.json(
                        {
                            success: false,
                            message: "Invalid request",
                            user: null
                        },
                        { status: 400 }
                    );
                }

                try {
                    const data = await sessionApi.callFunction("get_user_from_password_key", {
                        email,
                        key
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
