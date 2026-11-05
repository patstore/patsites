import { parseErrorResponse, readBody } from "@repo/server/auth";
import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../../server/auth";

export const Route = createFileRoute("/api/members/search")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const body = await readBody(request);
                const lastName = typeof body.lastName === "string" ? body.lastName : "";
                const zip = typeof body.zip === "string" ? body.zip : "";

                try {
                    const data = await sessionApi.callFunction("find_member", {
                        last_name: lastName,
                        zip
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
