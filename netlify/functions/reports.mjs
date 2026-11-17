// Cloud sync for the Weekly Report Tracker.
// Saves all weeks as one JSON file in Netlify Blobs.
// Protected by the SYNC_KEY environment variable (set it in Netlify).
import { getStore } from "@netlify/blobs";

export default async (req) => {
  const key = process.env.SYNC_KEY;
  if (!key) return new Response("SYNC_KEY is not set on this site", { status: 500 });
  if (req.headers.get("x-sync-key") !== key) return new Response("Unauthorized", { status: 401 });

  const store = getStore({ name: "weekly-reports", consistency: "strong" });

  if (req.method === "GET") {
    const data = await store.get("data", { type: "json" });
    return Response.json(data || { weeks: null, updatedAt: null });
  }
  if (req.method === "PUT") {
    const body = await req.json();
    if (!body || typeof body.weeks !== "object") return new Response("Bad data", { status: 400 });
    await store.setJSON("data", body);
    // keep a dated backup copy each day, just in case
    await store.setJSON("backup-" + new Date().toISOString().slice(0, 10), body);
    return Response.json({ ok: true });
  }
  return new Response("Method not allowed", { status: 405 });
};

export const config = { path: "/api/reports" };
