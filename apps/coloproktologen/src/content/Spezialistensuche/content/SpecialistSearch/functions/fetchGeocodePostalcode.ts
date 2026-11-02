export interface NominatimResult {
    lat: string;
    lon: string;
    display_name?: string;
    [key: string]: unknown;
}

export interface GeocodeResponse {
    success: boolean;
    message: string;
    result: NominatimResult[];
}

export async function fetchGeocodePostalcode(
    postalcode: string
): Promise<GeocodeResponse> {
    const response = await fetch("/api/geocode_postalcode", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ postalcode })
    });

    return response.json();
}
