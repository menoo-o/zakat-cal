import { redis } from "@/lib/redis";

export async function getMarketData() {
  try {
    // 1. Check Redis cache
    const cachedData = await redis.get("market-data");

    // 2. If cache exists → return it immediately
    if (cachedData) {
      console.log("CACHE HIT");
      return cachedData;
    }

    console.log("CACHE MISS");

    // 3. Fetch external API
    const response = await fetch(
      "https://api.metals.dev/v1/latest?api_key=18WGQCAOAVT6DMMAMFII467MAMFII&currency=USD&unit=g"
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // 4. Store in Redis (9-hour expiry)
    // We do this before the conversion logic to ensure the raw data is saved even if conversion fails
    await redis.set("market-data", data, {
      ex: 60 * 60 * 9, 
    });

    // 5. Processing/Conversion Logic
    // Note: If 1 USD = 280 PKR, then PKR = USD * Rate
    const usdToPkrRate = data.currencies.PKR;
    
    const convertUsdToPkr = (usdAmount: number): number => {
      return usdAmount * usdToPkrRate;
    };

    // Example logging
    const exampleUsd = 100;
    const examplePkr = convertUsdToPkr(exampleUsd);
    console.log(`$${exampleUsd} is approximately ₨${examplePkr.toFixed(2)}`);

    // 6. Return fresh data
    return data;

  } catch (error: unknown) {
    // 7. Handle errors gracefully
    if (isErrnoException(error)) {
    if (error.code === 'EAI_AGAIN') {
      console.error("DNS/Network Error: Could not reach Upstash or the API. Check your connection.");
    } else {
      console.error("Failed to fetch market data:", error.message);
    }
  } else {
    // Handle cases where the error is a string or something unexpected
    console.error("An unexpected error occurred:", error);
  }
    // Return null or a fallback object so the UI doesn't crash
    return null;
  }
}


// 1. Define a helper to check for the 'code' property
function isErrnoException(error: unknown): error is { code: string; message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  );
}