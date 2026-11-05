import { parseErrorResponse, readBody } from "@repo/server/auth";
import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../../server/auth";

export const Route = createFileRoute("/api/account/newsletter")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const auth = await sessionApi.requireUser(request);
                if (auth instanceof Response) {
                    return auth;
                }

                const body = await readBody(request);
                if (!Array.isArray(body.emails)) {
                    return Response.json({ message: "E-Mail-Liste fehlt" }, { status: 400 });
                }

                const userId = auth.user.objectId;
                if (typeof userId !== "string") {
                    return Response.json({ message: "Ungültige Sitzung" }, { status: 401 });
                }

                const text = (value: unknown) => (typeof value === "string" ? value : "");

                try {
                    await sessionApi.updateUser(auth.token, userId, { emails: body.emails });
                    await sessionApi.callFunction(
                        "send_email",
                        {
                            email: "info@koloproktologie.org",
                            name: "Geschäftsstelle DGK",
                            subject: "Änderungen an DGK Rundmail-Einstellungen",
                            project_id: "JRxDkaxCoI",
                            content: `
                                <p>Änderungen an DGK Rundmail-Einstellungen</p>
                                <p>Vorname: ${String(auth.user.first_name ?? "")}</p>
                                <p>Nachname: ${String(auth.user.last_name ?? "")}</p>
                                <p>Alte Opt-In Einstellung: ${body.previousOptedIn ? "Ja" : "Nein"}</p>
                                <p>Neue Opt-In Einstellung: ${body.optedIn ? "Ja" : "Nein"}</p>
                                <p>Alte Email-Adresse: ${text(body.previousEmail) || "Nicht vorhanden"}</p>
                                <p>Neue Email-Adresse: ${text(body.nextEmail) || "Nicht vorhanden"}</p>
                            `
                        },
                        auth.token
                    );
                    return Response.json({ ok: true });
                } catch (error) {
                    return parseErrorResponse(error);
                }
            }
        }
    }
});
