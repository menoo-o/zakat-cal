import { redis } from "@/lib/redis";

export async function getMarketData() {
  // 1. Check Redis cache
  const cachedData = await redis.get("market-data");

  // 2. If cache exists → return it
  if (cachedData) {
    console.log("CACHE HIT");
    return cachedData;
  }
//   After 9 hours: Redis auto-deletes the key THUS CACHE MISS occurs and we fetch fresh data from the external API.
  console.log("CACHE MISS");

  // 3. Fetch external API
  const response = await fetch("https://api.metals.dev/v1/latest?api_key=18WGQCAOAVT6DMMAMFII467MAMFII&currency=USD&unit=g");

  const data = await response.json();

  // 4. Store in Redis
  await redis.set("market-data", data, {
    ex: 60 * 60 * 9, // 9 hrs
  });

  // 5. Return fresh data
  return data;
}