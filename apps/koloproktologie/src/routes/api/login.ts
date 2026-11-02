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
                    return Response.json(
                        { message: "not valid keys" },
                        { status: 500 }
                    );
                }

                const axiosclient = axios.create({
                    baseURL: patstoreApiUrl,
                    headers: {
                        "X-Parse-Application-Id": patstoreAppId,
                        "X-Parse-REST-API-Key": patstoreRestKey
                    }
                });

                const email = username.includes("@") ? username : undefined;
                const userName = username.includes("@") ? undefined : username;

                try {
                    const userData = await axiosclient.post(
                        "/functions/get_user_data",
                        {
                            email,
                            username: userName,
                            project: patstoreProjectId
                        }
                    );

                    const user = userData?.data?.result?.user;

                    if (!user) {
                        return Response.json(
                            {
                                message:
                                    "Dieser Account hat keinen Zugriff auf die Anwendung"
                            },
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

                        await axiosclient.post("/functions/create_log", {
                            type: "error",
                            operation: "login",
                            className: "User",
                            message: `Ungültiger Login: ${parseError}`,
                            data: {
                                username: email || userName
                            },
                            service: "login_dgk",
                            userId: user.objectId,
                            objectId: user.objectId,
                            projectId: patstoreProjectId
                        });

                        return Response.json(
                            { message: "Ungültige Zugangsdaten" },
                            { status: 401 }
                        );
                    }
                } catch {
                    return Response.json(
                        {
                            message:
                                "Für diese E-Mail Adresse ist kein Account hinterlegt"
                        },
                        { status: 500 }
                    );
                }
            }
        }
    }
});
