# Notion tracking pour les conversions PDF réussies

À ajouter dans ton **Worker Cloudflare** (dashboard Cloudflare → ton worker pdf-to-csv → Edit), **après** la génération du CSV et **avant** le `return new Response(...)`.

## Variables d'environnement

Dans les paramètres du Worker (Settings → Variables), définir :

- `NOTION_API_KEY` : clé d’intégration Notion (Create integration dans Notion)
- `NOTION_DATABASE_ID` : ID de la base Notion (URL de la base : `https://notion.so/xxx?v=yyy` → l’ID est la partie `xxx` avant `?`)

La base Notion doit avoir les propriétés suivantes (noms exacts) :

| Nom affiché | Type Notion |
|-------------|-------------|
| Name        | Title       |
| Date        | Date        |
| File name   | Rich text   |
| Layout      | Rich text   |
| User agent  | Rich text   |
| IP          | Rich text   |

## Code à insérer

Juste **avant** de retourner la réponse CSV (après avoir généré `csv` et les headers), ajouter :

```js
// Notion: log successful conversion (do not break on failure)
try {
  const file = formData.get("file"); // ou la variable qui contient le fichier PDF
  const layout = formData.get("layout") || "";
  const fileName = file && typeof file === "object" && "name" in file ? file.name : "";
  const userAgent = request.headers.get("User-Agent") || "";
  const ip = request.headers.get("CF-Connecting-IP") || "";

  if (env.NOTION_API_KEY && env.NOTION_DATABASE_ID) {
    await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: env.NOTION_DATABASE_ID },
        properties: {
          "Name": {
            title: [{ text: { content: "PDF Conversion" } }],
          },
          "Date": {
            date: { start: new Date().toISOString() },
          },
          "File name": {
            rich_text: [{ text: { content: String(fileName).slice(0, 2000) } }],
          },
          "Layout": {
            rich_text: [{ text: { content: String(layout).slice(0, 2000) } }],
          },
          "User agent": {
            rich_text: [{ text: { content: String(userAgent).slice(0, 2000) } }],
          },
          "IP": {
            rich_text: [{ text: { content: String(ip).slice(0, 2000) } }],
          },
        },
      }),
    });
  }
} catch (e) {
  console.error("[Worker] Notion log failed:", e);
}
```

## Emplacement dans le Worker

Structure typique :

```text
1. Récupérer formData depuis request
2. Extraire file + layout
3. … (upload OpenAI, GPT, parsing, génération CSV)
4. [ICI] Appeler le bloc Notion ci-dessus (try/catch)
5. return new Response(csv, { headers: { ... } });
```

Si le Worker ne garde pas `formData` jusqu’à la fin, il faut soit le garder en variable, soit refaire `await request.formData()` avant le bloc Notion (une seule lecture du body possible, donc en général on garde `formData` en variable dès le début).

## Règles

- En cas d’erreur Notion (réseau, 4xx/5xx, JSON), l’erreur est **ignorée** (try/catch) et la conversion CSV est quand même renvoyée.
- Aucun autre changement n’est nécessaire dans la logique du Worker.
- Les champs `rich_text` sont tronqués à 2000 caractères pour respecter la limite Notion.
