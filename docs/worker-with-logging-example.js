/**
 * Example Cloudflare Worker with all 12 debug log points.
 * Copy the console.log/console.error lines into your actual Worker.
 * Logic below is placeholder – keep your real logic, only add the logs.
 */

export default {
  async fetch(request, env, ctx) {
    // ---------- 1. Log when request starts ----------
    console.log("[Worker] Request started", request.method, request.url);

    // ... your CORS / OPTIONS handling ...

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    let formData;
    try {
      formData = await request.formData();
    } catch (e) {
      console.error("[Worker] FormData parsing failed", e);
      return new Response(JSON.stringify({ error: "Invalid form" }), { status: 400 });
    }

    const file = formData.get("file");
    if (!file || !(file instanceof File)) {
      console.error("[Worker] No file in request");
      return new Response(JSON.stringify({ error: "No file" }), { status: 400 });
    }

    // ---------- 2. Log received file name and size ----------
    console.log("[Worker] Received file:", { fileName: file.name, fileSize: file.size });

    // ---------- 3. Log when upload to OpenAI starts ----------
    console.log("[Worker] Upload to OpenAI starting");

    let uploadResponse;
    try {
      uploadResponse = await uploadFileToOpenAI(file, env);
    } catch (e) {
      console.error("[Worker] OpenAI upload failed", e);
      return new Response(JSON.stringify({ error: "Upload failed" }), { status: 500 });
    }

    // ---------- 4. Log OpenAI upload response status ----------
    console.log("[Worker] OpenAI upload response status:", uploadResponse.status);

    if (!uploadResponse.ok) {
      console.error("[Worker] OpenAI upload not ok", await uploadResponse.text());
      return new Response(JSON.stringify({ error: "Upload failed" }), { status: 502 });
    }

    const uploadData = await uploadResponse.json();
    const fileId = uploadData.id; // adjust to your response shape

    // ---------- 5. Log the returned fileId ----------
    console.log("[Worker] Returned fileId:", fileId);

    // ---------- 6. Log when GPT call starts ----------
    console.log("[Worker] GPT call starting");

    let gptResponse;
    try {
      gptResponse = await callGPT(fileId, env);
    } catch (e) {
      console.error("[Worker] GPT call failed", e);
      return new Response(JSON.stringify({ error: "GPT call failed" }), { status: 502 });
    }

    // ---------- 7. Log GPT response status ----------
    console.log("[Worker] GPT response status:", gptResponse.status);

    const gptBody = await gptResponse.json();
    const content = gptBody.choices?.[0]?.message?.content ?? "";

    // ---------- 8. Log first 500 characters of GPT response content ----------
    const preview = typeof content === "string" ? content.slice(0, 500) : String(content).slice(0, 500);
    console.log("[Worker] GPT response content (first 500 chars):", preview);

    // ---------- 9. Log when JSON parsing starts ----------
    console.log("[Worker] JSON parsing starting");

    let parsed;
    try {
      const rawJson = content.includes("{") ? content.slice(content.indexOf("{"), content.lastIndexOf("}") + 1) : content;
      parsed = JSON.parse(rawJson);
    } catch (e) {
      // ---------- 10. Log if JSON parsing fails and print raw text ----------
      console.error("[Worker] JSON parsing failed:", e.message);
      console.error("[Worker] Raw text that failed to parse:", content);
      return new Response(JSON.stringify({ error: "Invalid GPT response" }), { status: 500 });
    }

    // ---------- 11. Log when CSV generation starts ----------
    console.log("[Worker] CSV generation starting");

    const csv = generateCSV(parsed); // your real CSV logic

    // ---------- Notion tracking (do not break on failure) ----------
    try {
      const layout = formData.get("layout") || "";
      const fileName = file && typeof file === "object" && "name" in file ? file.name : "";
      const userAgent = request.headers.get("User-Agent") || "";
      const ip = request.headers.get("CF-Connecting-IP") || "";

      if (env.NOTION_API_KEY && env.NOTION_DATABASE_ID) {
        console.log("Notion tracking start");
        console.log("Database ID:", env.NOTION_DATABASE_ID);
        console.log("API key present:", !!env.NOTION_API_KEY);
        console.log("Tracking file:", fileName);
        console.log("Layout:", layout);
        console.log("User agent:", userAgent);

        const notionResponse = await fetch("https://api.notion.com/v1/pages", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.NOTION_API_KEY}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parent: { database_id: env.NOTION_DATABASE_ID },
            properties: {
              "Name": { title: [{ text: { content: "PDF Conversion" } }] },
              "Date": { date: { start: new Date().toISOString() } },
              "File name": { rich_text: [{ text: { content: String(fileName).slice(0, 2000) } }] },
              "Layout": { rich_text: [{ text: { content: String(layout).slice(0, 2000) } }] },
              "User agent": { rich_text: [{ text: { content: String(userAgent).slice(0, 2000) } }] },
              "IP": { rich_text: [{ text: { content: String(ip).slice(0, 2000) } }] },
            },
          }),
        });

        console.log("Notion response status:", notionResponse.status);
        if (notionResponse.status !== 200 && notionResponse.status !== 201) {
          const body = await notionResponse.text();
          console.log("Notion response body:", body);
        }
      }
    } catch (err) {
      console.error("Notion tracking failed:", err);
    }

    // ---------- 12. Log when worker finishes successfully ----------
    console.log("[Worker] Finished successfully");

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="output.csv"',
      },
    });
  },
};

async function uploadFileToOpenAI(file, env) {
  // placeholder – use your real OpenAI Files API call
  return fetch("https://api.openai.com/v1/files", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}` },
    body: (() => { throw new Error("implement upload"); })(),
  });
}

async function callGPT(fileId, env) {
  // placeholder – use your real Chat/Completions or Runs API call
  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model: "gpt-4o", messages: [{ role: "user", content: "..." }] }),
  });
}

function generateCSV(data) {
  // placeholder – your real CSV generation
  return "col1,col2\n";
}
