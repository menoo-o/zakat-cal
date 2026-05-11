import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET(req: Request) {

  // Security: Vercel sends this header automatically on cron calls
  // Reject anything that isn't Vercel itself calling this route
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      "https://api.metals.dev/v1/latest?api_key=YOUR_KEY&currency=USD&unit=g"
    );

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();

    // 8hr TTL — cron fires every 8hrs, so cache is always refreshed before expiry
    await redis.set("market-data", data, { ex: 60 * 60 * 8 });

    console.log("Cron: market data refreshed at", new Date().toISOString());
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Cron refresh failed:", error);
    return NextResponse.json({ error: "Refresh failed" }, { status: 500 });
  }
}