import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { serverEnv } from "../../../server/env";

export const Route = createFileRoute("/api/newsletter/optout")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const { userId, listId } = await request.json();

                if (!userId || !listId) {
                    return Response.json(
                        { message: "User ID and List ID are required" },
                        { status: 400 }
                    );
                }

                const { patstoreApiUrl, patstoreAppId, patstoreRestKey, patstoreMasterKey } =
                    serverEnv;

                if (!patstoreApiUrl || !patstoreAppId || !patstoreRestKey) {
                    return Response.json(
                        { message: "Server configuration error" },
                        { status: 500 }
                    );
                }

                try {
                    const headers = {
                        "X-Parse-Application-Id": patstoreAppId,
                        "X-Parse-REST-API-Key": patstoreRestKey,
                        "Content-Type": "application/json",
                        "X-Parse-Master-Key": patstoreMasterKey
                    };
                    const userResponse = await axios.get(
                        `${patstoreApiUrl}/classes/_User/${userId}`,
                        { headers }
                    );
                    const user = userResponse.data;
                    if (!user) {
                        return Response.json({ message: "User not found" }, { status: 404 });
                    }

                    const emailList = user.lists || [];
                    const updatedEmailList = emailList.filter((id: string) => id !== listId);
                    const settings = user.settings || {};
                    if (!settings[listId]) {
                        settings[listId] = {};
                    }
                    settings[listId].optoutDate = new Date().toISOString();

                    const updateResponse = await axios.put(
                        `${patstoreApiUrl}/classes/_User/${userId}`,
                        { lists: updatedEmailList, settings },
                        { headers }
                    );

                    if (updateResponse.data) {
                        return Response.json({
                            message: "Successfully opted out from newsletter",
                            success: true
                        });
                    }
                    throw new Error("Update failed");
                } catch (error) {
                    console.error("Error updating user:", error);
                    return Response.json(
                        { message: "Failed to process opt-out request" },
                        { status: 500 }
                    );
                }
            }
        }
    }
});
