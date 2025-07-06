import axios from "axios";

/**
 * Find Kroger-family locations near a ZIP code.
 * @param zip ZIP code to search around (e.g., "67202" for Wichita, KS).
 * @param accessToken Kroger API OAuth token.
 * @returns Array of nearby locations.
 */
export async function findLocations(zip: string, accessToken: string) {
  const response = await axios.get(
    `https://api.kroger.com/v1/locations?filter.zipCode.near=${zip}&filter.limit=5`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );

  return response.data.data;
}
