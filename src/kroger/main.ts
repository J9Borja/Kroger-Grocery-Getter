import dotenv from "dotenv";
dotenv.config();

import { getAccessToken } from "./auth";
import { findLocations } from "./locations";  
import { searchProducts } from "./products";

const clientId = process.env.KROGER_CLIENT_ID!;
const clientSecret = process.env.KROGER_CLIENT_SECRET!;

async function main() {
  try {
    console.log("Getting access token...");
    const accessToken = await getAccessToken(clientId, clientSecret);
    console.log("✅ Access token acquired:", accessToken);

    const zipCode = "66502"; // Manhattan, KS example
    console.log(`Finding locations near ZIP ${zipCode}...`);
    const locations = await findLocations(zipCode, accessToken);

    if (!locations || locations.length === 0) {
      console.log("⚠️ No locations found near that ZIP. Try a different ZIP code.");
      return;
    }
    
    console.log("✅ Nearby locations found:");
    locations.forEach((loc: any) => {
      console.log(`- ${loc.name} (ID: ${loc.locationId}) at ${loc.address.addressLine1}, ${loc.address.city}`);
  });

  // use the first location for searching products
    const locationId = locations[0].locationId;
    const searchTerm = "sara lee bread";

    console.log(`Searching for '${searchTerm}' at store ID ${locationId}...`);

    const products = await searchProducts(searchTerm, locationId, accessToken);

    if (!products || products.length === 0) {
      console.log(`⚠️ No products found for '${searchTerm}' at that store.`);
      return;
    }

      console.log(`✅ Products found for '${searchTerm}':`);
      products.forEach((product: any, index: number) => {
      console.log(`\n==== Raw data for product #${index + 1} ====`);
      console.log(JSON.stringify(product, null, 2)); // pretty-print each product
      
      const item = product.items?.[0];
      const price = item?.price?.regular ? `$${item.price.regular.toFixed(2)}` : "N/A";

      const brand = product.brand ?? "No brand";
      const desc = product.description ?? "No description";
      const upc = item?.upc ?? product.upc ?? "No UPC";

      console.log(`Parsed output: - ${brand} ${desc} [UPC: ${upc}] (${price})`);

    });

} catch (error) {
  console.error("❌ An error occurred:", error);

  }


}

main();
