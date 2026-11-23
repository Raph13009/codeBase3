/**
 * POST /api/log-conversion: logs a PDF conversion of the /Convert tool into the Notion database.
 * Same behaviour as the Vercel function of the Vite version (api/log-conversion.ts); other methods answer 405.
 */
export async function POST(request: Request) {
  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.error("Notion env missing:", { key: !!NOTION_API_KEY, db: !!NOTION_DATABASE_ID });
    return Response.json({ error: "Notion not configured" }, { status: 500 });
  }

  const body = (await request.json().catch(() => ({}))) as { fileName?: string; layout?: string };
  const fileName = body?.fileName || "";
  const layout = body?.layout || "";
  const userAgent = request.headers.get("user-agent") || "";
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";

  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          Name: { title: [{ text: { content: "PDF Conversion" } }] },
          Date: { date: { start: new Date().toISOString() } },
          "File name": { rich_text: [{ text: { content: String(fileName).slice(0, 2000) } }] },
          Layout: { rich_text: [{ text: { content: String(layout).slice(0, 2000) } }] },
          "User agent": { rich_text: [{ text: { content: String(userAgent).slice(0, 2000) } }] },
          IP: { rich_text: [{ text: { content: String(ip).slice(0, 2000) } }] },
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Notion API error", response.status, text);
      return Response.json({ error: "Notion request failed" }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Notion log-conversion failed", err);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
