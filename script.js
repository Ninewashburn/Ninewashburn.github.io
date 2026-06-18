/* ==========================================================================
   Renaud Meynadier - Portfolio statique
   script.js - données + rendu + interactions, JavaScript pur (zéro dépendance)
   ========================================================================== */

/* Adresse assemblée au runtime : jamais en clair dans le HTML (anti-scraping) */
const EMAIL = ["meynadier.renaud", "gmail.com"].join("@");

/* ---- Locale --------------------------------------------------------------- */
const LANG = location.pathname.startsWith("/en") ? "en" : "fr";
const t = (obj) => (obj !== null && typeof obj === "object" && LANG in obj) ? obj[LANG] : obj;

/* ---- Libellés UI ---------------------------------------------------------- */
const UI = {
  cvView:        { fr: "Voir le CV",                                        en: "View CV" },
  cvVisualize:   { fr: "Visualiser",                                        en: "View" },
  cvDownload:    { fr: "Télécharger",                                       en: "Download" },
  copyEmail:     { fr: "Copier l'e-mail",                                   en: "Copy email" },
  emailCopied:   { fr: "E-mail copié",                                      en: "Email copied" },
  filterAll:     { fr: "Tous",                                              en: "All" },
  filterEmpty:   { fr: "Aucun projet ne correspond à ce filtre.",            en: "No projects match this filter." },
  caseLink:      { fr: "Voir le détail",                                    en: "View details" },
  fieldContext:  { fr: "Contexte",                                          en: "Context" },
  fieldSolution: { fr: "Solution",                                          en: "Solution" },
  fieldStack:    { fr: "Stack",                                             en: "Stack" },
  rowContext:    { fr: "Contexte",                                          en: "Context" },
  rowProblem:    { fr: "Problème",                                          en: "Problem" },
  rowSolution:   { fr: "Solution",                                          en: "Solution" },
  rowFeatures:   { fr: "Capacités métier",                                  en: "Business capabilities" },
  rowArch:       { fr: "Architecture technique",                            en: "Technical architecture" },
  rowValue:      { fr: "Valeur métier",                                     en: "Business value" },
  rowStack:      { fr: "Stack technique",                                   en: "Tech stack" },
  visitSite:     { fr: "Visiter le site",                                   en: "Visit site" },
  viewRepo:      { fr: "Voir le dépôt",                                     en: "View repository" },
  viewDemo:      { fr: "Voir la démo",                                      en: "View demo" },
  close:         { fr: "Fermer",                                            en: "Close" },
};

/* ---- Icônes (Feather / Lucide, stroke = currentColor) -------------------- */
const ICONS = {
  sun:      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon:     '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>',
  play:     '<path d="M7 5l12 7-12 7z"/>',
  pause:    '<path d="M8 5v14M16 5v14"/>',
  file:     '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
  chevron:  '<path d="m6 9 6 6 6-6"/>',
  linkedin: '<rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>',
  github:   '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.4 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5.1 5.1 0 0 0 19.9 1S18.7.6 16 2.5a13.4 13.4 0 0 0-7 0C6.3.6 5.1 1 5.1 1A5.1 5.1 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.8c0 5.4 3.3 6.5 6.4 7A3.4 3.4 0 0 0 9 18.1V22"/>',
  mail:     '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
  arrow:    '<path d="M5 12h14M12 5l7 7-7 7"/>',
  arrowUp:  '<path d="M12 19V5M5 12l7-7 7 7"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/>',
  close:    '<path d="M18 6 6 18M6 6l12 12"/>',
  copy:     '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  check:    '<path d="M20 6 9 17l-5-5"/>'
};

const icon = (name, size = 18) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] ?? ""}</svg>`;

/* ---- Données FR ----------------------------------------------------------- */
const CVS_FR = [
  { label: "CV classique", file: "renaud-meynadier-cv-classique.pdf", url: "/assets/cv/renaud-meynadier-cv-classique.pdf" },
  { label: "CV Canva",     file: "renaud-meynadier-cv-canva.pdf",     url: "/assets/cv/renaud-meynadier-cv-canva.pdf"     }
];

const PROJECTS_FR = [
  {
    name: "Security-Base",
    tagline: "Projet personnel · Architecture inspirée d'environnements professionnels",
    status: { label: "Projet métier / Anonymisé", cls: "portfolio" },
    img: "/assets/images/projects/security-base.png",
    context: "Pilotage des incidents dans un environnement métier sensible, inspiré d'un contexte professionnel.",
    problem: "Le suivi des incidents était éclaté, les droits d'accès flous et la traçabilité insuffisante pour répondre aux exigences d'audit.",
    solution: "Une application métier centralisée structurée autour d'un contrôle d'accès par rôles (RBAC), de tableaux de bord de suivi et d'exports documentaires.",
    features: ["RBAC et gestion fine des permissions", "Tableaux de bord de suivi des incidents", "Exports PDF / Excel", "Traçabilité complète des actions"],
    architecture: "API Laravel 12 et SPA Angular 20 découplées, base MariaDB, environnement conteneurisé Docker.",
    value: "Visibilité temps réel sur les incidents, conformité renforcée et actions pleinement auditables.",
    stack: ["Laravel 12", "Angular 20", "MariaDB", "Docker"],
    demo: "/projects/security-base/",
    repo: "https://github.com/Ninewashburn/Security-Base"
  },
  {
    name: "CV Forge",
    tagline: "Projet personnel · Prototype local-first",
    status: { label: "Idée / Prototype", cls: "concept" },
    img: "/assets/images/projects/cv-forge.jpg",
    context: "Candidatures multiples à personnaliser sans dérive ni invention.",
    problem: "Générer des CV adaptés à chaque offre tout en garantissant qu'aucun fait n'est inventé.",
    solution: "Un assistant local-first qui compose les documents à partir d'un référentiel de faits validés et conserve l'historique.",
    features: ["Matching offre / profil", "Génération strictement contrôlée par les faits", "Historique exact des candidatures"],
    architecture: "Application local-first, interface Angular, traitements Python, stockage SQLite.",
    value: "Gain de temps, cohérence des candidatures et contrôle total sur le contenu.",
    stack: ["Local-first", "Angular", "Python", "SQLite"],
    demo: "/projects/cvforge-lite/",
    repo: "https://github.com/Ninewashburn/Cv-Forge"
  },
  {
    name: "Creasoka",
    tagline: "Projet client · Livré en production",
    status: { label: "En production", cls: "prod" },
    img: "/assets/images/projects/creasoka.png", thumbPos: "center",
    context: "Créateur artisanal sans présence e-commerce, souhaitant vendre en ligne.",
    problem: "Besoin d'une vitrine marchande rapide, soignée et correctement référencée, livrable en production.",
    solution: "Un site e-commerce complet conçu, développé et déployé en production pour le client.",
    features: ["Catalogue produits fluide", "Parcours utilisateur clair", "Optimisation SEO", "Déploiement continu"],
    architecture: "Next.js et TypeScript, mise en page Tailwind CSS, déploiement Vercel.",
    value: "Un site réel en production : visibilité en ligne et ouverture du canal de vente.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    site: "https://creasoka.fr/", repo: "https://github.com/Ninewashburn/Creasoka"
  },
  {
    name: "Dora Dashboard",
    tagline: "Projet personnel · Inspiré de pratiques DevOps réelles",
    status: { label: "Projet technique", cls: "tech" },
    img: "/assets/images/projects/dora-dashboard.png",
    context: "Pilotage de la performance de livraison logicielle via les métriques DORA.",
    problem: "Les métriques de livraison étaient dispersées, sans vue consolidée pour piloter l'amélioration.",
    solution: "Un tableau de bord dédié consolidant les quatre métriques DORA avec comparaisons dans le temps.",
    features: ["Fréquence de déploiement", "Taux d'échec des changements", "Temps moyen de restauration", "Graphiques comparatifs · mode clair / sombre"],
    architecture: "Front Angular et API FastAPI (Python), conteneurisation Docker.",
    value: "Une aide concrète au pilotage et à l'amélioration continue des équipes.",
    stack: ["Angular", "FastAPI", "Python", "Docker"],
    demo: "/projects/dora-dashboard/",
    repo: "https://github.com/Ninewashburn/Dora-Dashboard"
  },
  {
    name: "La Nîmes'Alerie",
    tagline: "Projet personnel · Refonte e-commerce de bout en bout",
    status: { label: "Terminé", cls: "done" },
    img: "/assets/images/projects/nimes-alerie.png",
    context: "Ancienne boutique e-commerce monolithique devenue difficile à faire évoluer.",
    problem: "Code legacy coûteux à maintenir, front et back fortement couplés, ajout de fonctionnalités risqué.",
    solution: "Refonte vers une architecture découplée : API Symfony / API Platform d'un côté, application Angular de l'autre.",
    features: ["Boutique dynamique et catalogue", "Gestion du panier et compte client", "Back-office d'administration", "Séparation claire front / back"],
    architecture: "API Platform (Symfony 7.2) exposant une API REST, front Angular 19, conteneurisation Docker.",
    value: "Une base maintenable et évolutive, prête à accueillir de nouvelles fonctionnalités sans dette.",
    stack: ["Angular 19", "Symfony 7.2", "API Platform", "Docker"],
    demo: "/projects/nimes-alerie/",
    repo: "https://github.com/Ninewashburn/Nimes-Alerie"
  },
  {
    name: "Bagni-Plage",
    tagline: "Projet personnel · Application de réservation",
    status: { label: "Terminé", cls: "done" },
    img: "/assets/images/projects/bagni-plage.png",
    context: "Gestion des réservations d'emplacements de plage et de leurs options.",
    problem: "Les disponibilités devaient être suivies finement et en temps réel, avec options additionnelles et rôles distincts.",
    solution: "Une application de réservation gérant disponibilités, options et paiement, avec espaces utilisateur et administrateur.",
    features: ["Réservation et disponibilités temps réel", "Options additionnelles", "Rôles utilisateur / administrateur", "Paiement en sandbox"],
    architecture: "API Spring Boot (Java) exposant une API REST, front Angular, base PostgreSQL.",
    value: "Des réservations fiables et une gestion centralisée des disponibilités.",
    stack: ["Java", "Spring Boot", "Angular", "PostgreSQL"],
    demo: "/projects/bagni-plage/",
    repo: "https://github.com/Ninewashburn/Bagni-Plage"
  }
];

const EXPERTISE_FR = [
  { title: "Applications métier & APIs", desc: "Logique métier, services et API REST robustes.",           skills: ["Java", "Spring Boot", "Laravel", "Symfony", "API REST"] },
  { title: "Frontend & UX",              desc: "Interfaces de gestion claires et parcours fluides.",         skills: ["Angular", "TypeScript", "Interfaces de gestion"] },
  { title: "Données & intégration",      desc: "Modélisation, requêtage et intégration des données.",       skills: ["SQL", "PostgreSQL", "Migrations", "Optimisation"] },
  { title: "Livraison & qualité",        desc: "Conteneurisation, CI/CD et code documenté et testé.",       skills: ["Docker", "Git", "CI/CD", "Documentation", "Tests"] }
];

const EXPERIENCE_FR = [
  { co: "URSSAF Auvergne", role: "Développeur Full Stack",  meta: "Applications métier",   points: ["Laravel / Angular", "API REST", "Modernisation d'application"] },
  { co: "Syxperiane",      role: "Consultant Développeur",  meta: "Conseil & intégration", points: ["Java / SQL", "Intégration ERP", "Analyse fonctionnelle"] },
  { co: "Almerys",         role: "Développeur Angular",     meta: "Santé / assurance",     points: ["Tests Jasmine", "CI/CD", "Refonte UI"] },
  { co: "O2Switch",        role: "Support technique",       meta: "Hébergement / infra",   points: ["Infrastructure", "Bases de données", "Diagnostic d'incidents"] }
];

const METHOD_FR = [
  { idx: "01", title: "Comprendre l'existant",            text: "Lire les flux, repérer les irritants et distinguer le besoin métier de l'habitude technique." },
  { idx: "02", title: "Analyser les besoins métier",      text: "Cadrer les priorités avec les parties prenantes et tracer les décisions structurantes." },
  { idx: "03", title: "Construire des solutions maintenables", text: "Développer par incréments, tester les parcours clés et documenter ce qui doit durer." },
  { idx: "04", title: "Livrer et améliorer en continu",   text: "Préparer la mise en ligne, écouter les retours et rendre l'application plus simple à maintenir." }
];

/* ---- Données EN ----------------------------------------------------------- */
const CVS_EN = [
  { label: "Classic CV", file: "renaud-meynadier-cv-classique.pdf", url: "/assets/cv/renaud-meynadier-cv-classique.pdf" },
  { label: "Canva CV",   file: "renaud-meynadier-cv-canva.pdf",     url: "/assets/cv/renaud-meynadier-cv-canva.pdf"     }
];

const PROJECTS_EN = [
  {
    name: "Security-Base",
    tagline: "Personal project · Architecture inspired by professional environments",
    status: { label: "Portfolio / Anonymized", cls: "portfolio" },
    img: "/assets/images/projects/security-base.png",
    context: "Incident management in a sensitive business environment, inspired by a professional context.",
    problem: "Incident tracking was fragmented, access rights unclear, and traceability insufficient to meet audit requirements.",
    solution: "A centralised business application structured around role-based access control (RBAC), tracking dashboards, and document exports.",
    features: ["RBAC and granular permission management", "Incident tracking dashboards", "PDF / Excel exports", "Complete action traceability"],
    architecture: "Decoupled Laravel 12 API and Angular 20 SPA, MariaDB database, Docker containerised environment.",
    value: "Real-time visibility on incidents, stronger compliance, and fully auditable actions.",
    stack: ["Laravel 12", "Angular 20", "MariaDB", "Docker"],
    demo: "/projects/security-base/",
    repo: "https://github.com/Ninewashburn/Security-Base"
  },
  {
    name: "CV Forge",
    tagline: "Personal project · Local-first prototype",
    status: { label: "Idea / Prototype", cls: "concept" },
    img: "/assets/images/projects/cv-forge.jpg",
    context: "Multiple job applications to tailor without drift or invented details.",
    problem: "Generating CVs adapted to each job offer while guaranteeing no facts are invented.",
    solution: "A local-first assistant that composes documents from a validated fact repository and keeps a full history.",
    features: ["Job offer / profile matching", "Generation strictly controlled by facts", "Exact application history"],
    architecture: "Local-first application, Angular interface, Python processing, SQLite storage.",
    value: "Time savings, consistent applications, and full control over the content.",
    stack: ["Local-first", "Angular", "Python", "SQLite"],
    demo: "/projects/cvforge-lite/",
    repo: "https://github.com/Ninewashburn/Cv-Forge"
  },
  {
    name: "Creasoka",
    tagline: "Client project · Delivered in production",
    status: { label: "In production", cls: "prod" },
    img: "/assets/images/projects/creasoka.png", thumbPos: "center",
    context: "An independent craftsman with no e-commerce presence, looking to sell online.",
    problem: "Need for a fast, polished, well-indexed online shop, ready for production.",
    solution: "A complete e-commerce website designed, developed, and deployed in production for the client.",
    features: ["Smooth product catalogue", "Clear user journey", "SEO optimisation", "Continuous deployment"],
    architecture: "Next.js and TypeScript, Tailwind CSS layout, Vercel deployment.",
    value: "A live production site: online visibility and an open sales channel.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    site: "https://creasoka.fr/", repo: "https://github.com/Ninewashburn/Creasoka"
  },
  {
    name: "Dora Dashboard",
    tagline: "Personal project · Inspired by real DevOps practices",
    status: { label: "Technical project", cls: "tech" },
    img: "/assets/images/projects/dora-dashboard.png",
    context: "Monitoring software delivery performance via DORA metrics.",
    problem: "Delivery metrics were scattered with no consolidated view for driving improvement.",
    solution: "A dedicated dashboard consolidating the four DORA metrics with time-based comparisons.",
    features: ["Deployment frequency", "Change failure rate", "Mean time to recovery", "Comparison charts · light / dark mode"],
    architecture: "Angular frontend and FastAPI (Python) API, Docker containerisation.",
    value: "Concrete support for driving and continuously improving team delivery performance.",
    stack: ["Angular", "FastAPI", "Python", "Docker"],
    demo: "/projects/dora-dashboard/",
    repo: "https://github.com/Ninewashburn/Dora-Dashboard"
  },
  {
    name: "La Nîmes'Alerie",
    tagline: "Personal project · End-to-end e-commerce redesign",
    status: { label: "Completed", cls: "done" },
    img: "/assets/images/projects/nimes-alerie.png",
    context: "A legacy e-commerce monolith that had become difficult to evolve.",
    problem: "Costly-to-maintain legacy code, tightly coupled front and back ends, risky feature additions.",
    solution: "Redesign towards a decoupled architecture: Symfony / API Platform on one side, an Angular application on the other.",
    features: ["Dynamic shop and product catalogue", "Cart and customer account management", "Administration back-office", "Clear front / back separation"],
    architecture: "API Platform (Symfony 7.2) exposing a REST API, Angular 19 frontend, Docker containerisation.",
    value: "A maintainable, scalable codebase ready to accommodate new features without technical debt.",
    stack: ["Angular 19", "Symfony 7.2", "API Platform", "Docker"],
    demo: "/projects/nimes-alerie/",
    repo: "https://github.com/Ninewashburn/Nimes-Alerie"
  },
  {
    name: "Bagni-Plage",
    tagline: "Personal project · Booking application",
    status: { label: "Completed", cls: "done" },
    img: "/assets/images/projects/bagni-plage.png",
    context: "Managing beach spot reservations and their add-on options.",
    problem: "Availability had to be tracked precisely and in real time, with additional options and distinct user roles.",
    solution: "A booking application managing availability, options, and payment, with separate user and admin interfaces.",
    features: ["Real-time booking and availability", "Add-on options", "User / administrator roles", "Sandbox payment"],
    architecture: "Spring Boot (Java) API exposing a REST API, Angular frontend, PostgreSQL database.",
    value: "Reliable bookings and centralised availability management.",
    stack: ["Java", "Spring Boot", "Angular", "PostgreSQL"],
    demo: "/projects/bagni-plage/",
    repo: "https://github.com/Ninewashburn/Bagni-Plage"
  }
];

const EXPERTISE_EN = [
  { title: "Business apps & APIs",  desc: "Business logic, services and robust REST APIs.",                  skills: ["Java", "Spring Boot", "Laravel", "Symfony", "API REST"] },
  { title: "Frontend & UX",         desc: "Clear management interfaces and smooth user journeys.",            skills: ["Angular", "TypeScript", "Interfaces de gestion"] },
  { title: "Data & integration",    desc: "Data modelling, querying and integration.",                        skills: ["SQL", "PostgreSQL", "Migrations", "Optimisation"] },
  { title: "Delivery & quality",    desc: "Containerisation, CI/CD, and documented, tested code.",            skills: ["Docker", "Git", "CI/CD", "Documentation", "Tests"] }
];

const EXPERIENCE_EN = [
  { co: "URSSAF Auvergne", role: "Full Stack Developer",    meta: "Business applications",   points: ["Laravel / Angular", "REST API", "Application modernisation"] },
  { co: "Syxperiane",      role: "Developer Consultant",    meta: "Consulting & integration", points: ["Java / SQL", "ERP integration", "Functional analysis"] },
  { co: "Almerys",         role: "Angular Developer",       meta: "Health / insurance",       points: ["Jasmine tests", "CI/CD", "UI redesign"] },
  { co: "O2Switch",        role: "Technical support",       meta: "Hosting / infrastructure", points: ["Infrastructure", "Databases", "Incident diagnostics"] }
];

const METHOD_EN = [
  { idx: "01", title: "Understand the existing system",    text: "Read the flows, identify pain points, and distinguish business needs from technical habits." },
  { idx: "02", title: "Analyse business requirements",     text: "Frame priorities with stakeholders and document key architectural decisions." },
  { idx: "03", title: "Build maintainable solutions",      text: "Develop incrementally, test key flows, and document what needs to last." },
  { idx: "04", title: "Deliver and improve continuously",  text: "Prepare the release, listen to feedback, and make the application easier to maintain." }
];

/* ---- Sélecteurs de locale ------------------------------------------------- */
const CVS      = LANG === "en" ? CVS_EN      : CVS_FR;
const PROJECTS  = LANG === "en" ? PROJECTS_EN  : PROJECTS_FR;
const EXPERTISE = LANG === "en" ? EXPERTISE_EN : EXPERTISE_FR;
const EXPERIENCE = LANG === "en" ? EXPERIENCE_EN : EXPERIENCE_FR;
const METHOD    = LANG === "en" ? METHOD_EN    : METHOD_FR;

/* ---- Utilitaires ---------------------------------------------------------- */
const HTML_ESCAPE = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc      = (s)   => String(s).replace(/[&<>"']/g, (c) => HTML_ESCAPE[c]);
const techList = (arr) => arr.map((t) => `<span class="tech">${esc(t)}</span>`).join("");

/* ---- Filtres projets ------------------------------------------------------ */
const TECH_FILTERS = [
  { label: t(UI.filterAll), key: null },
  { label: "Angular",        key: "angular" },
  { label: "Java / Spring",  key: "java" },
  { label: "Laravel",        key: "laravel" },
  { label: "Symfony",        key: "symfony" },
  { label: "Python",         key: "python" },
  { label: "Docker",         key: "docker" },
];

function matchesFilter(stack, key) {
  if (!key) return true;
  const s = stack.map((t) => t.toLowerCase()).join(" ");
  if (key === "java") return s.includes("java") || s.includes("spring");
  return s.includes(key);
}

/* ---- Rendu : cartes projets ----------------------------------------------- */
function renderProjects() {
  const grid = document.getElementById("projects-grid");

  const filterBar = document.createElement("div");
  filterBar.className = "filter-bar";
  filterBar.setAttribute("role", "group");
  filterBar.setAttribute("aria-label", LANG === "en" ? "Filter projects by technology" : "Filtrer les projets par technologie");

  const applyFilter = (key) => {
    let visible = 0;
    grid.querySelectorAll(".pcard").forEach((card) => {
      const show = matchesFilter(JSON.parse(card.dataset.stack), key);
      card.classList.toggle("filter-hidden", !show);
      if (show) visible++;
    });
    let empty = grid.querySelector(".filter-empty");
    if (visible === 0) {
      if (!empty) {
        empty = document.createElement("p");
        empty.className = "filter-empty";
        empty.textContent = t(UI.filterEmpty);
        grid.appendChild(empty);
      }
    } else {
      empty?.remove();
    }
    filterBar.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.key === String(key)));
    });
  };

  TECH_FILTERS.forEach(({ label, key }) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.textContent = label;
    btn.dataset.key = String(key);
    btn.setAttribute("aria-pressed", String(key === null));
    btn.addEventListener("click", () => applyFilter(key));
    filterBar.appendChild(btn);
  });

  grid.parentElement.insertBefore(filterBar, grid);

  grid.innerHTML = PROJECTS.map((p, i) => {
    const pos = p.thumbPos ?? "center top";
    let links = "";
    if (p.demo) links += `<a class="repo-link" href="${p.demo}" target="_blank" rel="noopener">${icon("external", 15)} Démo</a>`;
    if (p.site) links += `<a class="repo-link" href="${p.site}" target="_blank" rel="noopener">${icon("external", 15)} Site</a>`;
    if (p.repo) links += `<a class="repo-link" href="${p.repo}" target="_blank" rel="noopener">${icon("github", 15)} Dépôt</a>`;
    return `
      <article class="pcard reveal" data-stack='${JSON.stringify(p.stack)}'>
        <div class="pcard-thumb"><img src="${p.img}" alt="" loading="lazy" decoding="async" style="object-position:${pos}"></div>
        <div class="pcard-body">
          <div class="pcard-meta"><span class="status ${p.status.cls}">${esc(p.status.label)}</span></div>
          <p class="pcard-tagline">${esc(p.tagline)}</p>
          <h3>${esc(p.name)}</h3>
          <div class="pcard-fields">
            <div class="pfield"><span class="k">${t(UI.fieldContext)}</span><span class="v">${esc(p.context)}</span></div>
            <div class="pfield"><span class="k">${t(UI.fieldSolution)}</span><span class="v">${esc(p.solution)}</span></div>
            <div class="pfield"><span class="k">${t(UI.fieldStack)}</span><span class="v"><span class="pstack">${techList(p.stack)}</span></span></div>
          </div>
          <div class="pcard-foot">
            <button class="case-link" data-project="${i}">${t(UI.caseLink)} ${icon("arrow", 15)}</button>
            <div class="pcard-links">${links}</div>
          </div>
        </div>
      </article>`;
  }).join("");

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".case-link");
    if (btn) openModal(PROJECTS[+btn.dataset.project], btn);
  });
}

/* ---- Rendu : expertise ---------------------------------------------------- */
function renderExpertise() {
  document.getElementById("expertise-grid").innerHTML = EXPERTISE.map((c) => `
    <div class="exp-col reveal">
      <span class="eyebrow eyebrow--bare">${esc(c.title)}</span>
      <p class="col-desc">${esc(c.desc)}</p>
      <div class="exp-tags">${techList(c.skills)}</div>
    </div>`).join("");
}

/* ---- Rendu : timeline expériences ----------------------------------------- */
function renderExperience() {
  document.getElementById("timeline").innerHTML = EXPERIENCE.map((e) => `
    <div class="tnode reveal">
      <div class="tnode-card">
        <div class="tnode-head">
          <div>
            <div class="tnode-co">${esc(e.co)}</div>
            <div class="tnode-role">${esc(e.role)}</div>
          </div>
          <span class="tnode-meta">${esc(e.meta)}</span>
        </div>
        <div class="tnode-points">${techList(e.points)}</div>
      </div>
    </div>`).join("");
}

/* ---- Rendu : méthode ------------------------------------------------------ */
function renderMethod() {
  document.getElementById("method-grid").innerHTML = METHOD.map((m) => `
    <div class="mstep reveal">
      <span class="idx">${esc(m.idx)}</span>
      <h3>${esc(m.title)}</h3>
      <p>${esc(m.text)}</p>
    </div>`).join("");
}

/* ---- Modal étude de cas --------------------------------------------------- */
const overlay = document.getElementById("modal-overlay");
let lastFocused = null;

function trapFocus(e) {
  if (e.key !== "Tab") return;
  const focusable = [...overlay.querySelectorAll("button, a[href]")];
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

function openModal(p, trigger) {
  lastFocused = trigger ?? document.activeElement;
  const pos = p.thumbPos ?? "center top";
  const rows = [
    [t(UI.rowContext),   `<p>${esc(p.context)}</p>`],
    [t(UI.rowProblem),   `<p>${esc(p.problem)}</p>`],
    [t(UI.rowSolution),  `<p>${esc(p.solution)}</p>`],
    [t(UI.rowFeatures),  `<ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>`],
    [t(UI.rowArch),      `<p>${esc(p.architecture)}</p>`],
    [t(UI.rowValue),     `<p>${esc(p.value)}</p>`],
    [t(UI.rowStack),     `<div class="pstack">${techList(p.stack)}</div>`]
  ];

  let foot = "";
  if (p.demo) foot += `<a class="btn btn-secondary btn-sm" href="${p.demo}" target="_blank" rel="noopener">${icon("external", 16)} ${t(UI.viewDemo)}</a>`;
  if (p.site) foot += `<a class="btn btn-secondary btn-sm" href="${p.site}" target="_blank" rel="noopener">${icon("external", 16)} ${t(UI.visitSite)}</a>`;
  if (p.repo) foot += `<a class="btn btn-secondary btn-sm" href="${p.repo}" target="_blank" rel="noopener">${icon("github", 16)} ${t(UI.viewRepo)}</a>`;
  foot += `<button class="btn btn-outline btn-sm" data-close>${t(UI.close)}</button>`;

  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-hero" style="background-image:url('${p.img}');background-position:${pos}">
        <button class="modal-close" data-close aria-label="${t(UI.close)}">${icon("close", 18)}</button>
      </div>
      <div class="modal-body">
        <span class="status ${p.status.cls}">${esc(p.status.label)}</span>
        <h3 id="modal-title">${esc(p.name)}</h3>
        <p class="modal-tagline">${esc(p.tagline)}</p>
        ${rows.map(([label, content]) => `
          <div class="cs-row">
            <div class="label"><span class="eyebrow eyebrow--bare">${label}</span></div>
            <div class="content">${content}</div>
          </div>`).join("")}
      </div>
      <div class="modal-foot">${foot}</div>
    </div>`;

  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  overlay.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", closeModal));
  overlay.addEventListener("keydown", trapFocus);
  requestAnimationFrame(() => overlay.querySelector("button, a[href]")?.focus());
}

function closeModal() {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  overlay.removeEventListener("keydown", trapFocus);
  document.body.style.overflow = "";
  lastFocused?.focus();
}

overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && overlay.classList.contains("open")) closeModal(); });

/* ---- Thème (persistant, OS-aware, sans flash) ------------------------------ */
const themeBtn       = document.getElementById("theme-toggle");
const metaThemeColor = document.getElementById("meta-theme-color");

function applyTheme(theme) {
  document.documentElement.classList.toggle("light-theme", theme === "light");
  themeBtn.innerHTML = icon(theme === "light" ? "moon" : "sun", 19);
  if (metaThemeColor) metaThemeColor.content = theme === "light" ? "#f6f8fc" : "#090e1a";
  try { localStorage.setItem("rm-theme", theme); } catch { }
}

let savedTheme;
try { savedTheme = localStorage.getItem("rm-theme"); } catch { }
savedTheme ??= matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
applyTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  applyTheme(document.documentElement.classList.contains("light-theme") ? "dark" : "light");
});

/* ---- Présentation audio (lecture à la demande) ---------------------------- */
{
  const audioBtn = document.getElementById("audio-toggle");
  if (audioBtn) {
    const audio = new Audio("/portfolio.mp3");
    audio.preload = "none";
    const render = (playing) => {
      audioBtn.innerHTML = icon(playing ? "pause" : "play", 18);
      audioBtn.setAttribute("aria-pressed", String(playing));
    };
    render(false);
    audioBtn.addEventListener("click", () => {
      if (audio.paused) audio.play().catch(() => {}); else audio.pause();
    });
    audio.addEventListener("play", () => render(true));
    audio.addEventListener("pause", () => render(false));
    audio.addEventListener("ended", () => render(false));
    // Onglet masqué / minimisé : on met en pause pour ne pas jouer dans le vide
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && !audio.paused) audio.pause();
    });
  }
}

/* ---- Boutons à icône (data-icon) ------------------------------------------ */
document.querySelectorAll("[data-icon]").forEach((el) => {
  el.insertAdjacentHTML("afterbegin", icon(el.dataset.icon, 17));
});

/* ---- Bouton CV : libellé + menu ------------------------------------------ */
{
  const view      = document.getElementById("cv-view");
  const toggleBtn = document.getElementById("cv-toggle");
  const action    = document.getElementById("cv-action");

  view.innerHTML      = `${icon("file", 17)} ${t(UI.cvView)}`;
  toggleBtn.innerHTML = icon("chevron", 16);

  document.getElementById("cv-menu").innerHTML = CVS.map((cv) => `
    <div class="cv-menu-row">
      <span class="cv-menu-label">${esc(cv.label)}</span>
      <div class="cv-menu-actions">
        <a href="${cv.url}" target="_blank" rel="noopener" title="${t(UI.cvVisualize)} : ${esc(cv.label)}">${icon("external", 15)} ${t(UI.cvVisualize)}</a>
        <a href="${cv.url}" download="${cv.file}" title="${t(UI.cvDownload)} : ${esc(cv.label)}">${icon("download", 15)} ${t(UI.cvDownload)}</a>
      </div>
    </div>`).join("");

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = action.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", (e) => {
    if (!action.contains(e.target)) { action.classList.remove("open"); toggleBtn.setAttribute("aria-expanded", "false"); }
  });
}

/* ---- Lien e-mail posé au runtime (anti-scraping) -------------------------- */
{
  const link = document.getElementById("email-link");
  if (link) link.href = `mailto:${EMAIL}`;
}

/* ---- Copier l'e-mail ------------------------------------------------------ */
{
  const btn      = document.getElementById("copy-email");
  const copyLabel = t(UI.copyEmail);
  const copiedLabel = t(UI.emailCopied);
  const setLabel = (name, text) => { btn.innerHTML = `${icon(name, 16)} ${text}`; };
  setLabel("copy", copyLabel);

  btn.addEventListener("click", () => {
    const done = () => {
      btn.classList.add("copied");
      setLabel("check", copiedLabel);
      setTimeout(() => { btn.classList.remove("copied"); setLabel("copy", copyLabel); }, 1800);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done).catch(() => { window.location.href = `mailto:${EMAIL}`; });
    } else {
      window.location.href = `mailto:${EMAIL}`;
    }
  });
}

/* ---- Bouton retour en haut (flottant) ------------------------------------- */
const toTop = document.getElementById("back-to-top");
toTop.innerHTML = icon("arrowUp", 18);
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---- Header au scroll + scroll-spy + bouton haut -------------------------- */
const header   = document.getElementById("header");
const spyIds   = ["projets", "expertise", "experience", "methode", "contact"];
const spyLinks = {};
document.querySelectorAll(".nav a[data-spy]").forEach((a) => { spyLinks[a.dataset.spy] = a; });

const sectionTops = {};
function cacheSectionTops() {
  spyIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionTops[id] = el.getBoundingClientRect().top + window.scrollY;
  });
}

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 12);
  toTop.classList.toggle("show", y > 640);
  toTop.tabIndex = y > 640 ? 0 : -1;

  const threshold = y + window.innerHeight * 0.30;
  let current = spyIds[0];
  for (const id of spyIds) {
    if ((sectionTops[id] ?? Infinity) <= threshold) current = id;
  }
  if (window.innerHeight + y >= document.body.scrollHeight - 2) current = spyIds[spyIds.length - 1];
  for (const id in spyLinks) spyLinks[id].classList.toggle("active", id === current);
}

window.addEventListener("scroll", onScroll, { passive: true });

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { cacheSectionTops(); onScroll(); }, 100);
});

/* ---- Reveal au scroll ----------------------------------------------------- */
function setupReveal() {
  const els = [...document.querySelectorAll(".reveal")];
  if (!els.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  els.forEach((el) => obs.observe(el));
}

/* ---- Menu hamburger (mobile) ---------------------------------------------- */
{
  const toggle = document.getElementById("nav-toggle");
  const navEl  = document.getElementById("nav");

  if (toggle && navEl) {
    const closeNav = () => {
      navEl.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", LANG === "en" ? "Open menu" : "Ouvrir le menu");
    };

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = navEl.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open
        ? (LANG === "en" ? "Close menu" : "Fermer le menu")
        : (LANG === "en" ? "Open menu"  : "Ouvrir le menu"));
    });

    navEl.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && navEl.classList.contains("open")) closeNav(); });
    document.addEventListener("click", (e) => {
      if (navEl.classList.contains("open") && !navEl.contains(e.target) && !toggle.contains(e.target)) closeNav();
    });
  }
}

/* ---- Init ----------------------------------------------------------------- */
renderProjects();
renderExpertise();
renderExperience();
renderMethod();
cacheSectionTops();
setupReveal();
onScroll();
