# Logging de debug pour le Worker PDF → Excel (Cloudflare)

Ajoute ces logs dans ton Worker Cloudflare pour identifier précisément où une erreur se produit.  
Utilise **console.log** pour les étapes normales et **console.error** pour les échecs.

---

## 1. Début de requête

Dès l’entrée du handler (après CORS/OPTIONS si tu en as) :

```js
console.log("[Worker] Request started", request.method, request.url);
```

---

## 2. Nom et taille du fichier reçu

Après avoir récupéré le fichier depuis le `FormData` (ou le body) :

```js
const fileName = file.name;   // ou le nom que tu utilises
const fileSize = file.size;
console.log("[Worker] Received file:", { fileName, fileSize });
```

---

## 3. Début d’upload vers OpenAI

Juste avant l’appel qui envoie le fichier à l’API OpenAI (Files API ou équivalent) :

```js
console.log("[Worker] Upload to OpenAI starting");
```

---

## 4. Statut de la réponse d’upload OpenAI

Après avoir reçu la réponse de l’upload :

```js
const uploadStatus = uploadResponse.status;  // ou uploadResponse.ok
console.log("[Worker] OpenAI upload response status:", uploadStatus);
```

---

## 5. fileId retourné

Après avoir parsé la réponse et extrait l’id de fichier :

```js
const fileId = data.id;  // ou la propriété que tu utilises
console.log("[Worker] Returned fileId:", fileId);
```

---

## 6. Début de l’appel GPT

Juste avant l’appel à l’API Chat/Completions (ou Runs avec le fileId) :

```js
console.log("[Worker] GPT call starting");
```

---

## 7. Statut de la réponse GPT

Après avoir reçu la réponse du call GPT :

```js
const gptStatus = gptResponse.status;  // ou gptResponse.ok
console.log("[Worker] GPT response status:", gptStatus);
```

---

## 8. Premiers 500 caractères du contenu GPT

Après avoir extrait le texte de la réponse (ex. `choices[0].message.content`) :

```js
const content = gptResponseBody;  // ta variable pour le contenu texte
const preview = typeof content === 'string' ? content.slice(0, 500) : String(content).slice(0, 500);
console.log("[Worker] GPT response content (first 500 chars):", preview);
```

---

## 9. Début du parsing JSON

Juste avant `JSON.parse(...)` (ou ton extraction du JSON depuis le contenu) :

```js
console.log("[Worker] JSON parsing starting");
```

---

## 10. Échec du parsing JSON + texte brut

Dans le `catch` du bloc qui fait le parsing JSON (ou après un test `if (!parsed)`) :

```js
} catch (e) {
  console.error("[Worker] JSON parsing failed:", e.message);
  console.error("[Worker] Raw text that failed to parse:", rawText);
  // puis return/throw selon ta logique
}
```

(Où `rawText` est la chaîne que tu as passée à `JSON.parse`.)

---

## 11. Début de la génération CSV

Juste avant de construire la chaîne CSV (ou le blob/fichier) :

```js
console.log("[Worker] CSV generation starting");
```

---

## 12. Fin du Worker (succès)

Juste avant de retourner la réponse réussie (fichier CSV ou Excel) :

```js
console.log("[Worker] Finished successfully");
return new Response(...);
```

---

## Résumé des 12 points

| # | Étape              | Type        | Message / contenu |
|---|--------------------|------------|-------------------|
| 1 | Début requête      | console.log | Request started + method + url |
| 2 | Fichier reçu       | console.log | Received file: name, size |
| 3 | Upload OpenAI       | console.log | Upload to OpenAI starting |
| 4 | Réponse upload     | console.log | OpenAI upload response status |
| 5 | fileId              | console.log | Returned fileId |
| 6 | Appel GPT           | console.log | GPT call starting |
| 7 | Réponse GPT         | console.log | GPT response status |
| 8 | Contenu GPT         | console.log | First 500 chars of content |
| 9 | Parsing JSON        | console.log | JSON parsing starting |
| 10| Échec parsing       | console.error | JSON parsing failed + raw text |
| 11| Génération CSV       | console.log | CSV generation starting |
| 12| Succès              | console.log | Finished successfully |

Les logs apparaissent dans **Cloudflare Dashboard → Workers & Pages → ton worker → Logs** (Real-time ou après une requête).
