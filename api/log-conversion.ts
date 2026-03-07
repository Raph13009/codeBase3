export default async function handler(
  req: { method?: string; body?: { fileName?: string; layout?: string }; headers?: Record<string, string> },
  res: { status: (code: number) => { end: () => void; json: (body: unknown) => void } }
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.error("Notion env missing:", { key: !!NOTION_API_KEY, db: !!NOTION_DATABASE_ID });
    return res.status(500).json({ error: "Notion not configured" });
  }

  const fileName = req.body?.fileName || "";
  const layout = req.body?.layout || "";
  const userAgent = req.headers?.["user-agent"] || "";
  const ip = req.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() || "";

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
          Name: {
            title: [{ text: { content: "PDF Conversion" } }],
          },
          Date: {
            date: { start: new Date().toISOString() },
          },
          "File name": {
            rich_text: [{ text: { content: String(fileName).slice(0, 2000) } }],
          },
          Layout: {
            rich_text: [{ text: { content: String(layout).slice(0, 2000) } }],
          },
          "User agent": {
            rich_text: [{ text: { content: String(userAgent).slice(0, 2000) } }],
          },
          IP: {
            rich_text: [{ text: { content: String(ip).slice(0, 2000) } }],
          },
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Notion API error", response.status, text);
      return res.status(502).json({ error: "Notion request failed" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Notion log-conversion failed", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
