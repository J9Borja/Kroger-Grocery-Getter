import axios from "axios";

/**
 * Search for products at a specific Kroger-family location.
 * @param searchTerm Keyword to search for (e.g., "milk").
 * @param locationId The location ID of the store you want to search.
 * @param accessToken Your OAuth access token.
 * @returns Array of products matching your search.
 */
export async function searchProducts(searchTerm: string, locationId: string, accessToken: string) {
  const response = await axios.get(
    `https://api.kroger.com/v1/products?filter.term=${encodeURIComponent(searchTerm)}&filter.locationId=${locationId}&filter.limit=5`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    
  );

  return response.data.data;
}
