# Portfolio - Renaud Meynadier

Portfolio statique de développeur full stack, publié avec GitHub Pages :

<https://www.renaudmeynadier.com/>

Version anglaise : <https://www.renaudmeynadier.com/en/>

## Stack

- HTML / CSS / JavaScript ES6 natif - zéro framework, zéro dépendance, zéro compilation
- GitHub Pages pour l'hébergement

## Structure

```text
.
├── index.html          - page principale (FR)
├── script.js           - rendu, interactions, données bilingues
├── style.css           - design system complet (tokens, thème clair/sombre)
├── 404.html            - page d'erreur personnalisée
├── sitemap.xml
├── robots.txt
├── CNAME
├── en/
│   └── index.html      - page principale (EN)
├── projects/           - démos interactives autonomes (un dossier = une démo)
│   ├── security-base/  - gestion d'incidents, RBAC 4 rôles (inspiré du projet Laravel/Angular)
│   ├── cvforge-lite/   - assistant CV local-first, matching par mots-clés + visite guidée (prototype)
│   ├── dora-dashboard/ - métriques DORA multi-équipes, flux live, FR/EN (inspiré du projet Angular/FastAPI)
│   ├── nimes-alerie/   - mini-jeu Space Invaders sur canvas (refonte e-commerce Angular/Symfony)
│   └── bagni-plage/    - réservation d'emplacements + dashboard gérant (Java/Spring/Angular)
└── assets/
    ├── cv/
    │   ├── renaud-meynadier-cv-classique.pdf
    │   └── renaud-meynadier-cv-canva.pdf
    └── images/
        ├── favicon.png
        ├── og-preview.png
        └── projects/
```

Chaque démo suit la même structure (`index.html` + `style.css` + `app.js`), est 100 % statique
(données fictives, aucun backend) et est servie directement par GitHub Pages à `/projects/<nom>/`.

## Fonctionnalités

- **Bilingue FR / EN** - même `script.js`, locale détectée via l'URL (`/en/`)
- **Thème clair / sombre** - détection `prefers-color-scheme` au premier rendu (sans flash), persistance `localStorage`
- **Navigation mobile** - menu hamburger avec animation CSS, fermeture Échap / clic extérieur
- **Projets** - rendu dynamique depuis les données JS, filtrage par technologie (Angular, Java/Spring, Laravel…)
- **Démos interactives** - cinq projets disposent d'une démo jouable dans le navigateur (bouton "Démo" sur la carte), ouverte dans un nouvel onglet ; Creasoka renvoie vers le vrai site en production
- **Présentation audio** - bouton play/pause dans le header (pitch FR), fichier chargé à la demande, pause auto si l'onglet est masqué
- **Études de cas** - modal accessible avec focus trap, `aria-labelledby`, restauration du focus à la fermeture
- **Scroll spy** - lien actif dans la nav calculé sans `getBoundingClientRect` dans le handler (offsets pré-calculés)
- **CV** - bouton split avec menu déroulant (visualiser / télécharger, deux formats)
- **Copier l'e-mail** - presse-papier avec fallback `mailto:`
- **SEO** - `canonical`, `hreflang` FR/EN/x-default, `sitemap.xml`, JSON-LD `Person` + `WebSite`, Open Graph
- **Accessibilité** - lien "Passer au contenu", `aria-*`, `prefers-reduced-motion`, navigation clavier complète

## Déploiement

Commit + push sur `main` → GitHub Pages publie automatiquement.
Le domaine personnalisé est configuré via le fichier `CNAME` et les paramètres GitHub Pages du dépôt.
