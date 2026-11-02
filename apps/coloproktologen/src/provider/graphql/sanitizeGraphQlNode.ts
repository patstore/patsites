export function sanitizeGraphQlNode(
    node: Record<string, unknown>
): Record<string, unknown> {
    if (!node || typeof node !== "object") {
        return node;
    }

    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(node)) {
        if (key === "__typename") {
            continue;
        }

        if (Array.isArray(value)) {
            result[key] = value.map((item) => {
                if (item && typeof item === "object" && "value" in item) {
                    return (item as { value: unknown }).value;
                }
                if (item && typeof item === "object") {
                    return sanitizeGraphQlNode(item as Record<string, unknown>);
                }
                return item;
            });
            continue;
        }

        if (value && typeof value === "object" && "value" in value) {
            result[key] = (value as { value: unknown }).value;
            continue;
        }

        if (value && typeof value === "object") {
            result[key] = sanitizeGraphQlNode(value as Record<string, unknown>);
            continue;
        }

        result[key] = value;
    }

    return result;
}
