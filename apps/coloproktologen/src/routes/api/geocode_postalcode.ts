import { createFileRoute } from "@tanstack/react-router";

async function geocode(request: Request) {
    const url = new URL(request.url);
    let postalcode = url.searchParams.get("postalcode");

    if (!postalcode && request.method === "POST") {
        const body = await request.json().catch(() => ({}));
        postalcode = body?.postalcode ?? null;
    }

    if (!postalcode || String(postalcode).trim() === "") {
        return Response.json(
            {
                success: false,
                message: "Postal code (postalcode) is required",
                result: []
            },
            { status: 400 }
        );
    }

    const search = new URL("https://nominatim.openstreetmap.org/search");
    search.searchParams.set("postalcode", String(postalcode).trim());
    search.searchParams.set("country", "DE");
    search.searchParams.set("format", "json");

    try {
        const response = await fetch(search.toString(), {
            headers: {
                "User-Agent":
                    "Coloproktologen-Spezialistensuche/1.0 (https://www.coloproktologen.de)"
            }
        });

        if (!response.ok) {
            return Response.json(
                {
                    success: false,
                    message: "Geocoding service temporarily unavailable",
                    result: []
                },
                { status: 502 }
            );
        }

        const data = await response.json();
        return Response.json({
            success: true,
            message: data.length > 0 ? "Coordinates found" : "No results for postal code",
            result: data
        });
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error("Geocode error:", error);
        }
        return Response.json(
            {
                success: false,
                message: "Error fetching coordinates",
                result: []
            },
            { status: 500 }
        );
    }
}

export const Route = createFileRoute("/api/geocode_postalcode")({
    server: {
        handlers: {
            GET: ({ request }) => geocode(request),
            POST: ({ request }) => geocode(request)
        }
    }
});
