# CORS pour le Worker PDF → Excel (Cloudflare)

Le Worker `pdf-to-csv.raphaellevy027.workers.dev` renvoie actuellement  
`Access-Control-Allow-Origin: https://boostaiconsulting.com` uniquement,  
ce qui bloque les appels depuis `http://localhost:8080` (ou autre port en dev).

## Correction à appliquer dans le Worker Cloudflare

Dans le code de ton Worker (dashboard Cloudflare → Workers & Pages → ton worker → Edit code), ajoute une gestion CORS qui autorise **à la fois** la prod et le dev.

### 1. Origines autorisées

En haut du Worker (ou dans un bloc commun), définis les origines autorisées :

```js
const ALLOWED_ORIGINS = [
  'https://boostaiconsulting.com',
  'http://localhost:8080',
  'http://localhost:5173',   // au cas où tu utilises un autre port Vite
  'http://127.0.0.1:8080',
  'http://127.0.0.1:5173',
];
```

### 2. Headers CORS à renvoyer

Crée un objet de headers CORS qui reflète l’origine de la requête si elle est autorisée :

```js
function getCorsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
  };
}
```

### 3. Répondre à la prévolée OPTIONS

Au tout début du handler (ex. `fetch`), gère la prévolée CORS :

```js
export default {
  async fetch(request, env, ctx) {
    // Réponse CORS pour la prévolée OPTIONS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: getCorsHeaders(request),
      });
    }

    // ... ton code existant pour POST /Convert ...
  },
};
```

### 4. Ajouter les headers CORS sur la réponse réelle

Sur la **réponse** de ton endpoint (après conversion PDF → Excel), ajoute les mêmes headers CORS. Par exemple :

```js
// Exemple : tu renvoies un fichier Excel
return new Response(excelBody, {
  status: 200,
  headers: {
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Content-Disposition': 'attachment; filename="Converted.xlsx"',
    ...getCorsHeaders(request),
  },
});
```

Et en cas d’erreur :

```js
return new Response(JSON.stringify({ error: '...' }), {
  status: 500,
  headers: {
    'Content-Type': 'application/json',
    ...getCorsHeaders(request),
  },
});
```

## Résumé

- **Problème** : le Worker n’accepte que `https://boostaiconsulting.com`, donc `http://localhost:8080` est refusé par CORS.
- **Solution** : dans le Worker, utiliser une liste d’origines autorisées (prod + localhost), renvoyer `Access-Control-Allow-Origin` avec l’origine de la requête si elle est dans la liste, répondre à `OPTIONS` avec ces headers, et ajouter ces mêmes headers sur toutes les réponses (succès et erreur).

Après déploiement du Worker avec ces changements, le convertisseur devrait fonctionner depuis localhost et depuis le site en prod.
