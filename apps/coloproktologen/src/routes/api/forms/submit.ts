import { parseErrorResponse, readBody } from "@repo/server/auth";
import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../../server/auth";

export const Route = createFileRoute("/api/forms/submit")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const body = await readBody(request);
                const referenceId =
                    typeof body.referenceId === "string" ? body.referenceId : "";
                if (!referenceId || !body.data || typeof body.data !== "object") {
                    return Response.json({ message: "Formulardaten fehlen" }, { status: 400 });
                }

                try {
                    const token = sessionApi.readToken(request);
                    const created = await sessionApi.createObject(
                        "Item",
                        {
                            data: body.data,
                            reference_id: referenceId,
                            type: "form"
                        },
                        token || undefined
                    );
                    return Response.json({ objectId: created.objectId });
                } catch (error) {
                    return parseErrorResponse(error);
                }
            }
        }
    }
});
