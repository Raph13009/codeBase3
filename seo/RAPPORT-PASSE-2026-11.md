# Visibilité du site — première passe — novembre 2026

BoostAI Consulting · www.boostaiconsulting.com

## En bref

Le site est beau, mais Google et les assistants comme ChatGPT le lisaient presque vide : ses pages sont fabriquées
par le navigateur, et les robots qui ne l'exécutent pas ne voyaient ni texte ni liens. Cette première passe pose les
fondations. Une première page de service se lit maintenant sans JavaScript. La page d'accueil vise une recherche que
les gens tapent vraiment. Les robots trouvent les liens du site. Il reste des informations à nous transmettre
(plus bas) pour aller plus loin.

## Ce que les gens cherchent, et ce que nous visons

Vérifié dans les suggestions de Google (ce que de vrais internautes tapent) :

| Recherche | Page |
|---|---|
| agence web ia | page d'accueil |
| création site internet sur mesure | page à écrire |
| agence développement mvp | **écrite ce mois-ci** |
| agence creation agent ia | page à écrire |
| agence automatisation ia | page à écrire |
| agence d'automatisation ia pour pme | page à écrire |
| commerce agentique | page existante, gardée |

Une page par recherche : c'est ce qui permet à Google de comprendre qu'une page répond exactement à la question
posée. Nous en écrivons une ou deux par mois, pas davantage : un site qui gagne d'un coup des dizaines de pages
ressemble à de la production en série.

## Ce qui a été fait

- **Une page « Agence de développement de MVP »** (`/services/agence-developpement-mvp`) : la démarche en quatre
  étapes, quatre MVP déjà livrés (Avenirea, MyTable, Musiclinks, Getlazo), les questions courantes. Son texte est
  lisible sans JavaScript.
- **Une page « Nos services »** (`/services`), qui rassemble les pages de service, liée dans le pied de page
  du site.
- **La page d'accueil** vise « agence web ia » : titre de l'onglet, description dans Google et phrase d'accroche.
  Le design ne change pas.
- **Les robots trouvent les liens du site** même sans JavaScript.
- **Le site se déclare en français** (il se déclarait en anglais).
- **Le plan du site pour Google** (sitemap) ne contient plus d'adresses qui redirigent ni de page disparue
  (`/blog`), et contient les réalisations.
- **Une formule retirée des données cachées des pages** : « meilleure agence web ». En France, ce type d'affirmation
  doit pouvoir être prouvé.

Ces changements sont prêts, vérifiés sur une copie du site, et seront en ligne au prochain déploiement.

## Ce dont nous avons besoin de vous

1. **L'accès à Search Console.** Ajouter `seo-playbook@seo-clients-mrhtry.iam.gserviceaccount.com` dans Search
   Console (Paramètres → Utilisateurs et autorisations, autorisation « Complète »). Sans cela, pas de suivi mensuel
   des recherches qui vous amènent des visiteurs.
2. **Les témoignages de la page d'accueil.** Sont-ils de vrais clients ? Pour chacun : le nom ou le prénom, la
   date et la source (LinkedIn, e-mail, avis Google). La loi demande de pouvoir dire d'où vient un avis publié.
3. **« Réponse sous 24 h »**, affiché sur le site : est-ce un engagement tenu pour toutes les demandes ?
4. **Les mentions légales et la politique de confidentialité** : raison sociale, SIREN, adresse du siège,
   responsable de la publication, hébergeur. Les deux pages sont obligatoires et manquent aujourd'hui.
5. **Des avis ou des chiffres vérifiables** (nombre de projets livrés, année de création) : c'est ce qui manque le
   plus aux pages de service pour convaincre, Google comme vos prospects.
6. **Où travaillez-vous ?** Toute la France, l'Europe, certaines villes ? Google montre des recherches comme
   « agence automatisation ia lyon » ou « … paris » : nous n'écrirons une page de ville que si vous avez un vrai
   lien avec elle (bureau, clients).
7. **Les outils que vous utilisez** : faites-vous de l'automatisation avec n8n ? La recherche « agence automatisation
   ia n8n » existe.

## La suite

- Au prochain mois : la page « Création de site internet sur mesure », puis « Agence de création d'agents IA ».
- Dès que Search Console est accessible : le premier rapport mensuel, avec les recherches sur lesquelles le site
  apparaît déjà.
- Le site passe sur Next.js (même design, mêmes pages, mêmes adresses) : chaque page arrive désormais avec son texte, lisible par Google comme par les assistants qui n'exécutent pas le JavaScript. L'accueil compris : 552 mots lisibles au lieu de 0. Prêt, en attente de votre feu vert pour la mise en ligne.

*Les positions dans Google se construisent en semaines et en mois : ce sont les tendances qui comptent.*
