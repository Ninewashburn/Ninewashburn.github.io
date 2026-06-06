# Portfolio - Renaud Meynadier

Portfolio statique de développeur full stack, publié avec GitHub Pages :

<https://renaudmeynadier.com/>

Le site présente mon profil, mes compétences techniques, une sélection de projets et des liens vers mon CV, LinkedIn, GitHub et mon adresse de contact.

## Stack

- HTML statique
- CSS vanilla
- JavaScript natif pour le basculement clair/sombre
- GitHub Pages pour l'hébergement

Aucun framework, aucune compilation et aucune dépendance locale ne sont nécessaires.

## Structure

```text
.
├── index.html
├── style.css
├── README.md
├── assets/
│   ├── cv/
│   │   ├── renaud-meynadier-cv-classique.pdf
│   │   └── renaud-meynadier-cv-canva.pdf
│   └── images/
│       ├── favicon.png
│       ├── og-preview.png
│       └── projects/
└── .gitignore
```

## Fonctionnalités

- Page portfolio responsive.
- Thème sombre par défaut.
- Bascule clair/sombre avec sauvegarde dans `localStorage`.
- Miniatures illustrées pour les projets.
- Balises Open Graph pour les aperçus LinkedIn et réseaux sociaux.
- CV téléchargeables depuis la page.

## Ajouter Une Page Projet

GitHub Pages sert simplement les fichiers HTML présents dans le dépôt. Il n'est donc pas nécessaire de créer les pages depuis l'interface GitHub.

Une page détail peut être ajoutée directement dans le projet, par exemple :

```text
projects/
├── nimes-alerie.html
├── security-base.html
├── bagni-plage.html
├── dora-dashboard.html
└── creasoka.html
```

Depuis `index.html`, il suffit ensuite d'ajouter un lien dans la carte concernée :

```html
<a href="projects/nimes-alerie.html" class="project-link">
    Voir détails
</a>
```

Dans une page placée dans `projects/`, la feuille de styles principale se référence ainsi :

```html
<link rel="stylesheet" href="../style.css">
```

Les captures publiques optimisées peuvent être rangées dans un dossier dédié :

```text
assets/images/project-details/nimes-alerie/
```

Les dossiers de travail contenant des captures sources ou documents temporaires restent ignorés par Git via `.gitignore`.

## Déploiement

Le site est compatible avec GitHub Pages. Après un commit et un push sur la branche configurée pour Pages, GitHub publie automatiquement les fichiers statiques.
