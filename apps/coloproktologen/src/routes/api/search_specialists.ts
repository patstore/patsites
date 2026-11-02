import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { serverEnv } from "../../server/env";

export const Route = createFileRoute("/api/search_specialists")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const { latitude, longitude, distance } = await request.json();
                const { patstoreApiUrl, patstoreAppId, patstoreRestKey, patstoreMasterKey } =
                    serverEnv;

                if (!patstoreApiUrl || !patstoreAppId || !patstoreRestKey) {
                    return Response.json(
                        {
                            success: false,
                            message: "Fehler beim Suchen von Spezialisten",
                            result: []
                        },
                        { status: 500 }
                    );
                }

                try {
                    const specialistData = await axios.post(
                        `${patstoreApiUrl}/functions/search_specialist`,
                        { latitude, longitude, distance },
                        {
                            headers: {
                                "X-Parse-Application-Id": patstoreAppId,
                                "X-Parse-REST-API-Key": patstoreRestKey,
                                "X-Parse-Master-Key": patstoreMasterKey
                            }
                        }
                    );

                    return Response.json({
                        success: true,
                        message: "Spezialisten gefunden",
                        result: specialistData.data.result
                    });
                } catch (error) {
                    if (process.env.NODE_ENV === "development") {
                        console.error(error);
                    }
                    return Response.json(
                        {
                            success: false,
                            message: "Fehler beim Suchen von Spezialisten",
                            result: []
                        },
                        { status: 500 }
                    );
                }
            }
        }
    }
});
