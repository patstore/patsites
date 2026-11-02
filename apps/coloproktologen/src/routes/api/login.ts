import { createFileRoute } from "@tanstack/react-router";
import axios, { isAxiosError } from "axios";
import { serverEnv } from "../../server/env";

export const Route = createFileRoute("/api/login")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const { username, password } = await request.json();
                const {
                    patstoreApiUrl,
                    patstoreAppId,
                    patstoreRestKey,
                    patstoreProjectId
                } = serverEnv;

                if (!patstoreApiUrl || !patstoreAppId || !patstoreRestKey) {
                    return Response.json({ message: "not valid keys" }, { status: 500 });
                }

                const axiosclient = axios.create({
                    baseURL: patstoreApiUrl,
                    headers: {
                        "X-Parse-Application-Id": patstoreAppId,
                        "X-Parse-REST-API-Key": patstoreRestKey
                    }
                });

                const email = username?.includes("@") ? username : undefined;
                const userName = username?.includes("@") ? undefined : username;

                try {
                    const userData = await axiosclient.post("/functions/get_user_data", {
                        email,
                        username: userName,
                        project: patstoreProjectId
                    });
                    const user = userData?.data?.result?.user;
                    const expiresAt = user?.expires_at?.iso;

                    if (expiresAt && new Date(expiresAt) < new Date()) {
                        return Response.json(
                            { message: "Ihre Mitgliedschaft ist abgelaufen" },
                            { status: 401 }
                        );
                    }

                    if (!user) {
                        return Response.json(
                            { message: "Dieser Account hat keinen Zugriff auf die Anwendung" },
                            { status: 500 }
                        );
                    }

                    try {
                        const response = await axiosclient.post("login", {
                            username: email || userName,
                            password
                        });
                        return Response.json({
                            message: "Nutzer eingeloggt",
                            token: response.data.sessionToken
                        });
                    } catch (error) {
                        const parseError = isAxiosError(error)
                            ? error.response?.data?.error
                            : undefined;
                        if (process.env.NODE_ENV === "development") {
                            console.error(parseError);
                        }
                        return Response.json(
                            { message: "Ungültiger Nutzername oder Passwort." },
                            { status: 401 }
                        );
                    }
                } catch (error) {
                    if (process.env.NODE_ENV === "development") {
                        console.error(error);
                    }
                    return Response.json(
                        { message: "Für diese E-Mail Adresse ist kein Account hinterlegt" },
                        { status: 500 }
                    );
                }
            }
        }
    }
});
