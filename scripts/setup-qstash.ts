import { Client } from "@upstash/qstash";

const client = new Client({ token: process.env.QSTASH_TOKEN! });

async function setupSchedule() {
  const schedule = await client.schedules.create({
    destination: "https://zakat-cal-swart.vercel.app/api/cron/refresh-cache",
    cron: "0 */8 * * *", // every 8 hours
  });

  console.log("Schedule created:", schedule.scheduleId);
}

setupSchedule();