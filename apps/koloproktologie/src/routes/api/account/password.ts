import { parseErrorResponse, readBody } from "@repo/server/auth";
import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../../server/auth";

export const Route = createFileRoute("/api/account/password")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const auth = await sessionApi.requireUser(request);
                if (auth instanceof Response) {
                    return auth;
                }

                const body = await readBody(request);
                const password = typeof body.password === "string" ? body.password : "";
                if (password.length < 8) {
                    return Response.json(
                        { message: "Passwort muss mindestens 8 Zeichen lang sein" },
                        { status: 400 }
                    );
                }

                const userId = auth.user.objectId;
                if (typeof userId !== "string") {
                    return Response.json({ message: "Ungültige Sitzung" }, { status: 401 });
                }

                try {
                    await sessionApi.updateUser(auth.token, userId, { password });
                    return Response.json({ ok: true });
                } catch (error) {
                    return parseErrorResponse(error);
                }
            }
        }
    }
});
