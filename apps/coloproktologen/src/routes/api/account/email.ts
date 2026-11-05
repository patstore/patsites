import { parseErrorResponse, readBody } from "@repo/server/auth";
import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../../server/auth";

const OFFICE = {
    email: "info@coloproktologen.de",
    name: "Geschäftsstelle BCD"
};

export const Route = createFileRoute("/api/account/email")({
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

                const userId = auth.user.objectId;
                if (typeof userId !== "string") {
                    return Response.json({ message: "Ungültige Sitzung" }, { status: 401 });
                }

                try {
                    await sessionApi.updateUser(auth.token, userId, { email });
                    if (body.notify === true) {
                        const firstName = String(auth.user.first_name ?? "");
                        const lastName = String(auth.user.last_name ?? "");
                        const previousEmail = String(auth.user.email ?? "");
                        await sessionApi.callFunction(
                            "send_email",
                            {
                                email: OFFICE.email,
                                name: OFFICE.name,
                                subject: "Änderungen am Benutzerkonto",
                                project_id: "EgRR0prozh",
                                content: `
                                    <p>Änderungen am Benutzerkonto</p>
                                    <p>Vorname: ${firstName}</p>
                                    <p>Nachname: ${lastName}</p>
                                    <p>Alte E-Mail: ${previousEmail}</p>
                                    <p>Neue E-Mail: ${email}</p>
                                `
                            },
                            auth.token
                        );
                    }
                    return Response.json({ ok: true });
                } catch (error) {
                    return parseErrorResponse(error);
                }
            }
        }
    }
});
