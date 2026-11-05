export async function apiRequest<T>(path: string, body?: unknown): Promise<T> {
    const response = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body ?? {})
    });
    return readResponse<T>(response);
}

export async function apiGet<T>(path: string): Promise<T> {
    return readResponse<T>(await fetch(path));
}

async function readResponse<T>(response: Response): Promise<T> {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const record =
            data && typeof data === "object" ? (data as Record<string, unknown>) : {};
        const message =
            typeof record.error === "string"
                ? record.error
                : typeof record.message === "string"
                  ? record.message
                  : "Anfrage fehlgeschlagen";
        throw new Error(message);
    }
    return data as T;
}
