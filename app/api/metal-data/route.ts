import { redis } from "@/lib/redis";

export async function GET() {
  const data = await redis.get("market-data");

  return Response.json(data);
}