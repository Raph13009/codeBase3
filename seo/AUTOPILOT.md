# Passe automatique — BoostAI Consulting — 2026-11-23

Liste de tâches à exécuter **sans rien demander** (mode `auto`, `SKILL.md`). Dans l'ordre. Ce qui manque en faits ne bloque rien : cela part dans `A-CONFIRMER.md`.

## Ce que cette passe a fait

| Étape | Résultat |
|---|---|
| Plan des pages | fait — 15 pages (vague 1 : 11, vague 2 : 0, vague 3 : 4). |
| Suggestions Google | fait — 10 recherche(s) interrogée(s) · 9 mot(s)-clé(s) du plan suggéré(s) · 30 idée(s) de page · 7 question(s) |
| Propriété Search Console | sauté — introuvable : faire ajouter l'adresse du compte de service dans la Search Console du client (`gsc_fetch.py --check` la donne), ou renseigner `propriete_gsc` dans la fiche |
| Routine mensuelle | sauté — pas de données Search Console cette fois |

- Suggestions Google relevées le : 2026-11-23

## 1. Indexation

Rien à traiter (ou contrôle non fait).

## 2. Actions du mois (Search Console)

Aucune action (site trop récent, ou données non récupérées).

## 3. Pages à écrire (budget de la passe : 2 page(s) au total)

- `/` — « Agence web et IA » (réécrire en place (même adresse, `--type modification`)). Mode `page`, une à la fois.
- **Nouvelle idée** « agence digitale ia » : l'ajouter à la fiche (`services`, avec sa forme naturelle), relancer `keyword_plan.py`, puis écrire la page. Vue chez Google depuis « agence web ia ».

## 4. Variantes à glisser dans des pages existantes

- « commerce agentique ia » → `/fr/agentic-commerce`

## 5. Questions à reprendre dans les pages

- `/services/agence-automatisation-ia` : agence d automatisation ia c est quoi
- `/services/mvp-startup` : mvp startup signification
- `/services/mvp-startup` : mvp startup full form
- `/services/mvp-startup` : mvp startup means

## Règles de la passe

- Au plus 2 page(s) écrite(s) ou créée(s) : le rythme d'un site qui se construit, pas d'une production en masse.
- Chaque page passe `page_lint.py` (trois passes au plus). Si elle ne passe pas : **ne pas la publier**, noter le fait qui manque dans `A-CONFIRMER.md`, passer à la suivante.
- Une page modifiée depuis moins de 70 jours n'est pas retouchée.
- Aucun fait hors de la fiche. Aucun message envoyé à un tiers.
- À la fin : `journal.py add` pour chaque page, puis relancer `gsc_inspect.py` quelques jours plus tard.

Idées vues chez Google : 1 adoptable(s), 1 variante(s), 28 à confirmer, 0 écartée(s).
