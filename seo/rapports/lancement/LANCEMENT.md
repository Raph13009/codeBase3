# Contrôle de lancement — https://www.boostaiconsulting.com

2026-11-23 · 23 pages parcourues sans JavaScript · verdict : **BLOQUÉ** (1 bloquant(s), 5 à corriger, 4 à vérifier)

## À traiter

- **[BLOQUANT] Texte présent dans le HTML brut** — la page d'accueil ne contient que 0 mots sans JavaScript.
  - Correction : rendre les pages côté serveur : les robots d'IA n'exécutent pas le JavaScript.
  - / : 0 mots, 7 scripts
  - /blog : 0 mots, 7 scripts
  - /Convert : 0 mots, 7 scripts
  - /about : 0 mots, 7 scripts
  - /contact : 0 mots, 7 scripts
  - /realisations : 0 mots, 7 scripts
  - /ocr-terms : 0 mots, 7 scripts
  - /project/1 : 0 mots, 7 scripts
  - /project/2 : 0 mots, 7 scripts
  - /project/3 : 0 mots, 7 scripts
  - /project/4 : 0 mots, 7 scripts
  - /project/5 : 0 mots, 7 scripts
  - /project/6 : 0 mots, 7 scripts
  - /project/7 : 0 mots, 7 scripts
  - /project/8 : 0 mots, 7 scripts
- **[À corriger] Un title sur chaque page, sans doublon** — 0 page(s) sans title, 1 groupe(s) de titles identiques.
  - Correction : donner à chaque page son title : Mot-clé | Bénéfice | Marque.
  - même title : /, /blog, /Convert, /about, /contact, /realisations, /ocr-terms, /project/1, /project/2, /project/3, /project/4, /project/5, /project/6, /project/7, /project/8, /project/9, /project/10, /agent/1, /agent/2, /agent/3, /agent/4
- **[À corriger] Adresses du sitemap sans redirection** — 5 adresse(s) du sitemap redirigent.
  - Correction : écrire dans le sitemap l'adresse finale (même domaine, avec ou sans www, que le site).
  - https://boostaiconsulting.com/ → https://www.boostaiconsulting.com/
  - https://boostaiconsulting.com/blog → https://www.boostaiconsulting.com/blog
  - https://boostaiconsulting.com/Convert → https://www.boostaiconsulting.com/Convert
  - https://boostaiconsulting.com/about → https://www.boostaiconsulting.com/about
  - https://boostaiconsulting.com/contact → https://www.boostaiconsulting.com/contact
- **[À corriger] Une adresse inexistante renvoie 404** — code 200.
  - Correction : faire renvoyer le code 404 par la page d'erreur (sinon Google indexe des pages vides).
- **[À corriger] Hub des services lié** — aucun lien vers le hub /services depuis l'accueil.
  - Correction : ajouter le lien vers le hub dans le pied de page de tout le site.
- **[À corriger] Pages légales liées** — lien manquant : mentions légales.
  - Correction : publier et lier ces pages dans le pied de page (obligation légale en France).
- **[À vérifier] Un seul H1 par page** — 21 page(s) sans H1 : conséquence du point bloquant « Texte présent dans le HTML brut » : se corrige avec lui.
  - Correction : après le rendu côté serveur, garder exactement un H1 par page.
  - / (0 H1, page vide sans JavaScript)
  - /blog (0 H1, page vide sans JavaScript)
  - /Convert (0 H1, page vide sans JavaScript)
  - /about (0 H1, page vide sans JavaScript)
  - /contact (0 H1, page vide sans JavaScript)
  - /realisations (0 H1, page vide sans JavaScript)
  - /ocr-terms (0 H1, page vide sans JavaScript)
  - /project/1 (0 H1, page vide sans JavaScript)
  - /project/2 (0 H1, page vide sans JavaScript)
  - /project/3 (0 H1, page vide sans JavaScript)
  - /project/4 (0 H1, page vide sans JavaScript)
  - /project/5 (0 H1, page vide sans JavaScript)
  - /project/6 (0 H1, page vide sans JavaScript)
  - /project/7 (0 H1, page vide sans JavaScript)
  - /project/8 (0 H1, page vide sans JavaScript)
- **[À vérifier] Aucune page orpheline** — 18 page(s) qu'aucun lien n'atteint : conséquence du point bloquant « Texte présent dans le HTML brut » : se corrige avec lui (sans JavaScript, l'accueil n'a aucun lien).
  - Correction : après le rendu côté serveur, relancer ce contrôle.
  - /Convert
  - /about
  - /agent/1
  - /agent/2
  - /agent/3
  - /agent/4
  - /blog
  - /project/1
  - /project/10
  - /project/2
  - /project/3
  - /project/4
  - /project/5
  - /project/6
  - /project/7
- **[À vérifier] Pages indexables présentes dans le sitemap** — 16 page(s) absentes du sitemap.
  - Correction : ajouter ces pages au sitemap, ou les passer en noindex si elles ne doivent pas être indexées.
  - /agent/1
  - /agent/2
  - /agent/3
  - /agent/4
  - /ocr-terms
  - /project/1
  - /project/10
  - /project/2
  - /project/3
  - /project/4
  - /project/5
  - /project/6
  - /project/7
  - /project/8
  - /project/9
- **[À vérifier] Langue déclarée et affichage mobile** — lang="en" sur l'accueil, viewport présent ; 1 page(s) dont la langue déclarée ne correspond pas.
  - Correction : déclarer sur chaque page la langue de son texte (<html lang="fr">, "en" sous /en/) et la balise meta viewport.
  - / : lang="en", attendu « fr »

## Conforme

- HTTPS et version unique du site — HTTPS actif, une seule version du site
- robots.txt ouvert — présent, ouvert, sitemap déclaré
- Robots d'IA autorisés dans robots.txt — aucun robot d'IA interdit
- Accès des robots d'IA (pare-feu) — l'accueil répond aux signatures de GPTBot, OAI-SearchBot, ClaudeBot et PerplexityBot
- Sitemap — 7 adresses
- Meta descriptions — présentes partout
- Pages indexables — aucun noindex, balises canoniques cohérentes
- Texte des blocs repliés présent dans le HTML — aucun bloc replié vide dans le HTML
- Aucun lien interne cassé — aucun
- Pas de redirections en chaîne — aucune
- Pas de pages au texte quasi identique — aucun doublon
- Pas de lenteur réelle — réponse médiane du serveur : 106 ms
- Textes alternatifs des images — toutes les images ont un texte alternatif
- Pas de ressource chargée en http:// — aucune
- Données structurées de l'entreprise — bloc Organization (sans adresse : normal en portée nationale)

## Non contrôlé

- Toute page à trois clics au plus de l'accueil — non mesurable : l'accueil n'a aucun lien dans le HTML reçu

## Pages parcourues

| Page | Clics depuis l'accueil | Mots | H1 | Dans le sitemap | Liens reçus |
|---|---|---|---|---|---|
| `/` | 0 | 0 | 0 | oui | 2 |
| `/Convert` | non relié à l'accueil | 0 | 0 | oui | 0 |
| `/about` | non relié à l'accueil | 0 | 0 | oui | 0 |
| `/agent/1` | non relié à l'accueil | 0 | 0 | non | 0 |
| `/agent/2` | non relié à l'accueil | 0 | 0 | non | 0 |
| `/agent/3` | non relié à l'accueil | 0 | 0 | non | 0 |
| `/agent/4` | non relié à l'accueil | 0 | 0 | non | 0 |
| `/blog` | non relié à l'accueil | 0 | 0 | oui | 0 |
| `/contact` | non relié à l'accueil | 0 | 0 | oui | 2 |
| `/en/agentic-commerce` | non relié à l'accueil | 616 | 1 | oui | 1 |
| `/fr/agentic-commerce` | non relié à l'accueil | 692 | 1 | oui | 1 |
| `/ocr-terms` | non relié à l'accueil | 0 | 0 | non | 2 |
| `/project/1` | non relié à l'accueil | 0 | 0 | non | 0 |
| `/project/10` | non relié à l'accueil | 0 | 0 | non | 0 |
| `/project/2` | non relié à l'accueil | 0 | 0 | non | 0 |
| `/project/3` | non relié à l'accueil | 0 | 0 | non | 0 |
| `/project/4` | non relié à l'accueil | 0 | 0 | non | 0 |
| `/project/5` | non relié à l'accueil | 0 | 0 | non | 0 |
| `/project/6` | non relié à l'accueil | 0 | 0 | non | 0 |
| `/project/7` | non relié à l'accueil | 0 | 0 | non | 0 |
| `/project/8` | non relié à l'accueil | 0 | 0 | non | 0 |
| `/project/9` | non relié à l'accueil | 0 | 0 | non | 0 |
| `/realisations` | non relié à l'accueil | 0 | 0 | non | 0 |

## À faire à la main

**Google Search Console**
- [ ] Propriété créée et validée (propriété de domaine de préférence)
- [ ] Sitemap soumis
- [ ] Page d'accueil inspectée, indexation demandée
- [ ] Compte de service ajouté comme utilisateur (references/search-console-api.md)

**Bing Webmaster Tools**
- [ ] Site déclaré (import depuis Search Console)

**Mesure**
- [ ] Outil de statistiques posé
- [ ] Envois de formulaire et prises de rendez-vous suivis

**Fiche Google**
- [ ] Seulement si l'entreprise reçoit des clients à une adresse ou se déplace chez eux : fiche revendiquée, zone desservie, services liés à leurs pages. Sinon, rien à faire ici

**Premiers liens**
- [ ] Trois à cinq annuaires ou comparateurs du métier
- [ ] Deux partenaires de métiers voisins sollicités

**Avis**
- [ ] Lien de dépôt d'avis créé et envoyé à tous les clients récents, sans tri

**Hébergement**
- [ ] Si Cloudflare ou pare-feu : blocage des robots d'IA désactivé

---

Ce contrôle vérifie le minimum pour être lu et indexé. Pour un audit technique complet : `/seo technical`.
