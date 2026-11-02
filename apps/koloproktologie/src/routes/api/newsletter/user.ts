import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { serverEnv } from "../../../server/env";

export const Route = createFileRoute("/api/newsletter/user")({
    server: {
        handlers: {
            GET: async ({ request }) => {
                const userId = new URL(request.url).searchParams.get("userId");

                if (!userId) {
                    return Response.json(
                        { message: "User ID is required" },
                        { status: 400 }
                    );
                }

                const { patstoreApiUrl, patstoreAppId, patstoreRestKey } =
                    serverEnv;

                if (!patstoreApiUrl || !patstoreAppId || !patstoreRestKey) {
                    return Response.json(
                        { message: "Server configuration error" },
                        { status: 500 }
                    );
                }

                try {
                    const axiosclient = axios.create({
                        baseURL: patstoreApiUrl,
                        headers: {
                            "X-Parse-Application-Id": patstoreAppId,
                            "X-Parse-REST-API-Key": patstoreRestKey
                        }
                    });

                    const response = await axiosclient.get(
                        `/classes/_User/${userId}`
                    );
                    const user = response.data;

                    if (user) {
                        return Response.json({
                            first_name: user.first_name || "",
                            last_name: user.last_name || "",
                            email_list: user.email_list || []
                        });
                    }

                    return Response.json(
                        { message: "User not found" },
                        { status: 404 }
                    );
                } catch (error) {
                    console.error("Error fetching user:", error);
                    return Response.json(
                        { message: "Failed to fetch user data" },
                        { status: 500 }
                    );
                }
            }
        }
    }
});
