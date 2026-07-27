# Agentic Commerce integration (BoostAI Consulting)

## Routes

- `/en/agentic-commerce`
- `/fr/agentic-commerce`

## Form backend (Web3Forms)

The readiness assessment form submits **from the browser** to:

`https://api.web3forms.com/submit`

No custom Vercel API, Supabase leads table, or Resend integration is used.

### Environment variable

| Variable | Where | Purpose |
|---|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | Vite client + Vercel | Web3Forms access key (safe to expose client-side) |

### Configure in Vercel

1. Open the BoostAI project in the [Vercel Dashboard](https://vercel.com/dashboard).
2. Go to **Settings → Environment Variables**.
3. Add:
   - **Name:** `VITE_WEB3FORMS_ACCESS_KEY`
   - **Value:** your access key from [web3forms.com](https://web3forms.com/)
   - **Environments:** Production, Preview, and Development (as needed)
4. Redeploy the project so the Vite build embeds the new value.

Locally, add the same key to a gitignored `.env` file:

```bash
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

Get a key at https://web3forms.com/ (verify the destination email there — never hardcode personal emails in the repo).

### Submission metadata

Each successful submit includes:

- `form_name`: Agentic Commerce Readiness Assessment
- `source_page`
- `language`
- `submitted_at`
- all visible assessment fields
- Web3Forms honeypot `botcheck`

## Prerendering

Production builds write static HTML for both routes:

- `dist/en/agentic-commerce/index.html`
- `dist/fr/agentic-commerce/index.html`

Each file includes localized metadata, hreflang, JSON-LD, and indexable page content inside `#root` for crawlers. React hydrates over that content at runtime.

## Privacy link

The form privacy notice links to the existing BoostAI page `/ocr-terms` (no new legal page; no 404 links).
