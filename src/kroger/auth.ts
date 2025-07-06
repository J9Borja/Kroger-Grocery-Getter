import axios from "axios";

/**
 * Get an OAuth 2.0 access token from Kroger
 * @param clientId Your Kroger API client ID
 * @param clientSecret Your Kroger API client secret
 * @returns Access token as a string
 */
export async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const response = await axios.post(
    "https://api.kroger.com/v1/connect/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      scope: "product.compact"
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`
      }
    }
  );

  return response.data.access_token;
}
