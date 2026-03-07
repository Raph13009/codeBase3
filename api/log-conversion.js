/**
 * POST /api/log-conversion
 * Creates a page in the configured Notion database to log a successful PDF conversion.
 * Uses NOTION_API_KEY and NOTION_DATABASE_ID from Vercel environment.
 */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    return res.status(500).json({ error: "Notion not configured" });
  }

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
          Source: {
            rich_text: [{ text: { content: "converter" } }],
          },
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Notion API error", response.status, text);
      return res.status(502).json({ error: "Notion request failed" });
    }

    return res.status(200).end();
  } catch (err) {
    console.error("Notion log-conversion failed", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
