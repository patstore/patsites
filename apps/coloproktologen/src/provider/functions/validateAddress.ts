import { env } from "@env";
import axios from "axios";

export interface AddressComponents {
  street?: string;
  streetNumber?: string;
  plz?: string;
  city?: string;
  country?: string;
}

export interface ValidatedAddress {
  formattedAddress: string;
  components: AddressComponents;
  location: {
    lat: number;
    lng: number;
  };
  isValid: boolean;
}

/**
 * Validates and corrects an address using Google Maps Geocoding API
 * @param street - Street name and number
 * @param plz - Postal code
 * @param city - City name
 * @param country - Country code (default: 'DE')
 * @returns ValidatedAddress object with corrected data or null if validation fails
 */
export const validateAddressWithGoogleMaps = async (
  street: string,
  plz: string,
  city: string,
  country: string = "DE",
): Promise<ValidatedAddress | null> => {
  try {
    const apiKey = env.googleMapsApiKey;

    if (!apiKey) {
      console.error("Google Maps API key is not configured");
      return null;
    }

    // Construct the address string
    const addressString = `${street}, ${plz} ${city}, ${country}`;

    // Call Google Maps Geocoding API
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: addressString,
          key: apiKey,
          language: "de",
          region: country.toLowerCase(),
        },
      },
    );

    if (response.data.status !== "OK" || !response.data.results.length) {
      console.warn("Address validation failed:", response.data.status);
      return null;
    }

    const result = response.data.results[0];

    // Extract address components
    const components: AddressComponents = {};
    let streetName = "";
    let streetNumber = "";

    result.address_components.forEach((component: any) => {
      if (component.types.includes("route")) {
        streetName = component.long_name;
      }
      if (component.types.includes("street_number")) {
        streetNumber = component.long_name;
      }
      if (component.types.includes("postal_code")) {
        components.plz = component.long_name;
      }
      if (component.types.includes("locality")) {
        components.city = component.long_name;
      }
      if (component.types.includes("country")) {
        components.country = component.short_name;
      }
    });

    // Combine street name and number
    if (streetName && streetNumber) {
      components.street = `${streetName} ${streetNumber}`;
    } else if (streetName) {
      components.street = streetName;
    }

    return {
      formattedAddress: result.formatted_address,
      components,
      location: {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
      },
      isValid: true,
    };
  } catch (error) {
    console.error("Error validating address with Google Maps:", error);
    return null;
  }
};

/**
 * Formats an address string for display
 */
export const formatAddress = (
  street: string,
  plz: string,
  city: string,
): string => {
  return `${street}, ${plz} ${city}`;
};
