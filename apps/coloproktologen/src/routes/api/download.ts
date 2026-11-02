import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import fs from "node:fs";
import path from "node:path";
import { serverEnv } from "../../server/env";

const MIME_TYPES: Record<string, string> = {
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".xls": "application/vnd.ms-excel",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".ppt": "application/vnd.ms-powerpoint",
    ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ".zip": "application/zip",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".txt": "text/plain",
    ".csv": "text/csv"
};

function readCookie(header: string | null, name: string) {
    if (!header) return "";
    const match = header
        .split(";")
        .map((part) => part.trim())
        .find((part) => part.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
}

export const Route = createFileRoute("/api/download")({
    server: {
        handlers: {
            GET: async ({ request }) => {
                const sessionToken =
                    readCookie(request.headers.get("cookie"), serverEnv.sessionToken) ||
                    request.headers.get("x-parse-session-token") ||
                    "";

                if (!sessionToken) {
                    return Response.json({ message: "Nicht authentifiziert" }, { status: 401 });
                }

                const { patstoreApiUrl, patstoreAppId, patstoreRestKey } = serverEnv;
                const axiosclient = axios.create({
                    baseURL: patstoreApiUrl,
                    headers: {
                        "X-Parse-Application-Id": patstoreAppId,
                        "X-Parse-REST-API-Key": patstoreRestKey,
                        "X-Parse-Session-Token": sessionToken
                    }
                });

                try {
                    const userResponse = await axiosclient.get("/users/me");
                    if (!userResponse.data) {
                        return Response.json({ message: "Ungültige Sitzung" }, { status: 401 });
                    }

                    const file = new URL(request.url).searchParams.get("file");
                    if (!file) {
                        return Response.json({ message: "Keine Datei angegeben" }, { status: 400 });
                    }

                    const sanitizedFile = path.basename(file);
                    const candidates = [
                        path.join(process.cwd(), "protected-files", sanitizedFile),
                        path.join(process.cwd(), "src", "protected-files", sanitizedFile)
                    ];
                    const filePath = candidates.find(
                        (candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile()
                    );

                    if (!filePath) {
                        return Response.json({ message: "Datei nicht gefunden" }, { status: 404 });
                    }

                    const stat = fs.statSync(filePath);
                    const extension = path.extname(filePath).toLowerCase();
                    const bytes = fs.readFileSync(filePath);
                    return new Response(bytes, {
                        headers: {
                            "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
                            "Content-Length": String(stat.size),
                            "Content-Disposition": `attachment; filename="${sanitizedFile}"`
                        }
                    });
                } catch (error) {
                    console.error("Download error:", error);
                    return Response.json(
                        { message: "Authentifizierung fehlgeschlagen" },
                        { status: 401 }
                    );
                }
            }
        }
    }
});
