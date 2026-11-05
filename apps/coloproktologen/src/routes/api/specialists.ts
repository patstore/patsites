import { parseErrorResponse } from "@repo/server/auth";
import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../server/auth";

export const Route = createFileRoute("/api/specialists")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                try {
                    const token = sessionApi.readToken(request);
                    const data = await sessionApi.callFunction(
                        "find_bcd_specialists",
                        {},
                        token || undefined
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
