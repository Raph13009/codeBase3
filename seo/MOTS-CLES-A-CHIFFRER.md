# Mots-clés à chiffrer — BoostAI Consulting

Deux outils gratuits de Google, sans abonnement. Aucun n'a d'API ouverte : la dernière étape est manuelle et prend quelques minutes.

## 1. Keyword Planner : volumes de recherche

1. Ouvrir Google Ads (compte sans campagne) > Outils > Planificateur de mots clés > « Obtenir le volume de recherche et les prévisions ».
2. Coller le contenu de `keyword-planner.txt` (9 expressions). Choisir la zone : la France, ou la région du client pour un métier local.
3. Démarrer, puis télécharger le résultat en CSV.
4. Le donner au plan : `python3 ~/.claude/skills/seo-playbook/scripts/keyword_plan.py --fiche seo/fiche-client.json --out seo/ --volumes "<export>.csv"`.

Sans dépense publicitaire, Google répond par fourchettes (« 100 – 1 k ») : un ordre de grandeur pour départager deux pages, pas un chiffre à montrer au client. Une recherche à 0 ou sans chiffre n'est pas inexistante : ne retirer aucune page pour cette seule raison.

**Sans la ville** (le volume se lit ici ; la zone du Planner fait la géographie) :

- agence web ia
- création site internet sur mesure
- agence développement mvp
- agence création agent ia
- agence automatisation ia
- commerce agentique
- agence d'automatisation ia pme
- mvp startup
- agence web ou freelance

## 2. Google Trends : lequel est le plus cherché ?

Zone : FR. Chaque lien ouvre une comparaison sur cinq ans. Trends ne donne pas de volumes mais un indice relatif (100 = le plus cherché du graphique) : il tranche entre deux pages, et la courbe montre la saison (pic, creux) à noter dans le plan.

- **Quel service est le plus recherché ? (graphique 1)** — agence web ia, création site internet sur mesure, agence développement mvp, agence création agent ia, agence automatisation ia — [ouvrir](https://trends.google.com/trends/explore?date=today%205-y&geo=FR&hl=fr&q=agence%20web%20ia,cr%C3%A9ation%20site%20internet%20sur%20mesure,agence%20d%C3%A9veloppement%20mvp,agence%20cr%C3%A9ation%20agent%20ia,agence%20automatisation%20ia)
- **Quel service est le plus recherché ? (graphique 2)** — agence web ia, commerce agentique — [ouvrir](https://trends.google.com/trends/explore?date=today%205-y&geo=FR&hl=fr&q=agence%20web%20ia,commerce%20agentique)
- **Quel nom du métier les gens tapent-ils ? (graphique 1)** — agence web ia, agence web, agence digitale, studio, développeur — [ouvrir](https://trends.google.com/trends/explore?date=today%205-y&geo=FR&hl=fr&q=agence%20web%20ia,agence%20web,agence%20digitale,studio,d%C3%A9veloppeur)
- **Quel nom du métier les gens tapent-ils ? (graphique 2)** — agence web ia, agence ia, freelance — [ouvrir](https://trends.google.com/trends/explore?date=today%205-y&geo=FR&hl=fr&q=agence%20web%20ia,agence%20ia,freelance)
- **Quel public cherche le plus ?** — agence d'automatisation ia pme, mvp startup — [ouvrir](https://trends.google.com/trends/explore?date=today%205-y&geo=FR&hl=fr&q=agence%20d%27automatisation%20ia%20pme,mvp%20startup)

Un terme sans courbe (« pas assez de données ») veut dire peu de recherches, pas aucune : le garder si c'est la recherche d'un vrai client. Pour viser une région, relancer avec `--geo FR-XXX` (`FR-ARA`, `FR-IDF`, `FR-PAC`, `FR-OCC`, `FR-NAQ`…). Les liens n'ont pas été ouverts depuis ce script : vérifier au premier usage.
