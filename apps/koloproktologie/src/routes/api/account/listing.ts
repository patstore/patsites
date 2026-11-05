import { asRecord, parseErrorResponse, readBody } from "@repo/server/auth";
import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../../server/auth";

export const Route = createFileRoute("/api/account/listing")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const auth = await sessionApi.requireUser(request);
                if (auth instanceof Response) {
                    return auth;
                }

                const body = await readBody(request);
                const data = asRecord(body.data);
                const settings = asRecord(body.settings);
                if (!data || !settings) {
                    return Response.json({ message: "Angaben fehlen" }, { status: 400 });
                }

                const userId = auth.user.objectId;
                if (typeof userId !== "string") {
                    return Response.json({ message: "Ungültige Sitzung" }, { status: 401 });
                }

                try {
                    await sessionApi.updateUser(auth.token, userId, { data, settings });
                    return Response.json({ ok: true });
                } catch (error) {
                    return parseErrorResponse(error);
                }
            }
        }
    }
});
