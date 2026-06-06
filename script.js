/* ==========================================================================
   Renaud Meynadier — Portfolio statique
   script.js — données + rendu + interactions, en JavaScript pur (zéro dépendance)
   ========================================================================== */
(function () {
  "use strict";

  var EMAIL = "meynadier.renaud@gmail.com";

  /* ---- Icônes (Feather / Lucide, stroke = currentColor) ----------------- */
  var ICONS = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    linkedin: '<rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.4 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5.1 5.1 0 0 0 19.9 1S18.7.6 16 2.5a13.4 13.4 0 0 0-7 0C6.3.6 5.1 1 5.1 1A5.1 5.1 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.8c0 5.4 3.3 6.5 6.4 7A3.4 3.4 0 0 0 9 18.1V22"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    arrowUp: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    check: '<path d="M20 6 9 17l-5-5"/>'
  };
  function icon(name, size) {
    size = size || 18;
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + '</svg>';
  }

  /* ---- Données ---------------------------------------------------------- */
  var CVS = [
    { label: "CV classique", file: "CV-Renaud-Meynadier.pdf", url: "assets/cv/CV-Renaud-Meynadier.pdf" },
    { label: "CV Canva", file: "CV-Renaud-Meynadier-Canva.pdf", url: "assets/cv/CV-Renaud-Meynadier-Canva.pdf" }
  ];

  var PROJECTS = [
    {
      id: "security-base", name: "Security-Base",
      tagline: "Projet personnel · Architecture inspirée d'environnements professionnels",
      status: { label: "Portfolio / Anonymisé", cls: "portfolio" },
      img: "assets/images/projects/security-base.png",
      summary: "Application métier de gestion d'incidents : rôles et permissions, tableaux de bord de suivi et traçabilité des actions.",
      context: "Pilotage des incidents dans un environnement métier sensible, inspiré d'un contexte professionnel.",
      problem: "Le suivi des incidents était éclaté, les droits d'accès flous et la traçabilité insuffisante pour répondre aux exigences d'audit.",
      solution: "Une application métier centralisée structurée autour d'un contrôle d'accès par rôles (RBAC), de tableaux de bord de suivi et d'exports documentaires.",
      features: ["RBAC et gestion fine des permissions", "Tableaux de bord de suivi des incidents", "Exports PDF / Excel", "Traçabilité complète des actions"],
      architecture: "API Laravel et SPA Angular découplées, base PostgreSQL, environnement conteneurisé Docker.",
      value: "Visibilité temps réel sur les incidents, conformité renforcée et actions pleinement auditables.",
      stack: ["Laravel", "Angular", "PostgreSQL", "Docker"],
      repo: "https://github.com/Ninewashburn/Security-Base"
    },
    {
      id: "nimes-alerie", name: "La Nîmes'Alerie",
      tagline: "Projet personnel · Refonte e-commerce de bout en bout",
      status: { label: "Terminé", cls: "done" },
      img: "assets/images/projects/nimes-alerie.png",
      summary: "Refonte complète d'un e-commerce monolithique vers une architecture découplée moderne, boutique, panier et back-office.",
      context: "Ancienne boutique e-commerce monolithique devenue difficile à faire évoluer.",
      problem: "Code legacy coûteux à maintenir, front et back fortement couplés, ajout de fonctionnalités risqué.",
      solution: "Refonte vers une architecture découplée : API Symfony / API Platform d'un côté, application Angular de l'autre.",
      features: ["Boutique dynamique et catalogue", "Gestion du panier et compte client", "Back-office d'administration", "Séparation claire front / back"],
      architecture: "API Platform (Symfony 7.2) exposant une API REST, front Angular 19, conteneurisation Docker.",
      value: "Une base maintenable et évolutive, prête à accueillir de nouvelles fonctionnalités sans dette.",
      stack: ["Angular 19", "Symfony 7.2", "API Platform", "Docker"],
      repo: "https://github.com/Ninewashburn/Nimes-Alerie"
    },
    {
      id: "creasoka", name: "Creasoka",
      tagline: "Projet client · Livré en production",
      status: { label: "En production", cls: "prod" },
      img: "assets/images/projects/creasoka.png", thumbPos: "center",
      summary: "Site e-commerce artisanal réel, livré et déployé en production, catalogue fluide et optimisé pour le référencement.",
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
      id: "bagni-plage", name: "Bagni-Plage",
      tagline: "Projet personnel · Application de réservation",
      status: { label: "Terminé", cls: "done" },
      img: "assets/images/projects/bagni-plage.png",
      summary: "Application de réservation d'emplacements de plage avec gestion des disponibilités en temps réel et rôles utilisateurs.",
      context: "Gestion des réservations d'emplacements de plage et de leurs options.",
      problem: "Les disponibilités devaient être suivies finement et en temps réel, avec options additionnelles et rôles distincts.",
      solution: "Une application de réservation gérant disponibilités, options et paiement, avec espaces utilisateur et administrateur.",
      features: ["Réservation et disponibilités temps réel", "Options additionnelles", "Rôles utilisateur / administrateur", "Paiement en sandbox"],
      architecture: "API Spring Boot (Java) exposant une API REST, front Angular, base PostgreSQL.",
      value: "Des réservations fiables et une gestion centralisée des disponibilités.",
      stack: ["Java", "Spring Boot", "Angular", "PostgreSQL"],
      repo: "https://github.com/Ninewashburn/Bagni-Plage"
    },
    {
      id: "dora-dashboard", name: "Dora Dashboard",
      tagline: "Projet personnel · Inspiré de pratiques DevOps réelles",
      status: { label: "Projet technique", cls: "tech" },
      img: "assets/images/projects/dora-dashboard.png",
      summary: "Tableau de bord des métriques DevOps clés (DORA) : fréquence de déploiement, taux d'échec et temps de restauration.",
      context: "Pilotage de la performance de livraison logicielle via les métriques DORA.",
      problem: "Les métriques de livraison étaient dispersées, sans vue consolidée pour piloter l'amélioration.",
      solution: "Un tableau de bord dédié consolidant les quatre métriques DORA avec comparaisons dans le temps.",
      features: ["Fréquence de déploiement", "Taux d'échec des changements", "Temps moyen de restauration", "Graphiques comparatifs · mode clair / sombre"],
      architecture: "Front Angular et API FastAPI (Python), conteneurisation Docker.",
      value: "Une aide concrète au pilotage et à l'amélioration continue des équipes.",
      stack: ["Angular", "FastAPI", "Python", "Docker"],
      repo: "https://github.com/Ninewashburn/Dora-Dashboard"
    },
    {
      id: "cv-forge", name: "CV Forge",
      tagline: "Projet personnel · Prototype local-first",
      status: { label: "Idée / Prototype", cls: "concept" },
      img: "assets/images/projects/cv-forge.jpg",
      summary: "Assistant de candidature local-first qui génère des CV uniquement à partir de faits validés et garde l'historique exact des envois.",
      context: "Candidatures multiples à personnaliser sans dérive ni invention.",
      problem: "Générer des CV adaptés à chaque offre tout en garantissant qu'aucun fait n'est inventé.",
      solution: "Un assistant local-first qui compose les documents à partir d'un référentiel de faits validés et conserve l'historique.",
      features: ["Matching offre / profil", "Génération strictement contrôlée par les faits", "Historique exact des candidatures"],
      architecture: "Application local-first, interface Angular, traitements Python, stockage SQLite.",
      value: "Gain de temps, cohérence des candidatures et contrôle total sur le contenu.",
      stack: ["Local-first", "Angular", "Python", "SQLite"],
      repo: "https://github.com/Ninewashburn/Cv-Forge"
    }
  ];

  var EXPERTISE = [
    { title: "Applications métier & APIs", desc: "Logique métier, services et API REST robustes.", skills: ["Java", "Spring Boot", "Laravel", "Symfony", "API REST"] },
    { title: "Frontend & UX", desc: "Interfaces de gestion claires et parcours fluides.", skills: ["Angular", "TypeScript", "Interfaces de gestion"] },
    { title: "Données & intégration", desc: "Modélisation, requêtage et intégration des données.", skills: ["SQL", "PostgreSQL", "Migrations", "Optimisation"] },
    { title: "Livraison & qualité", desc: "Conteneurisation, CI/CD et code documenté et testé.", skills: ["Docker", "Git", "CI/CD", "Documentation", "Tests"] }
  ];

  var EXPERIENCE = [
    { co: "URSSAF Auvergne", role: "Développeur Full Stack", meta: "Applications métier", points: ["Laravel / Angular", "API REST", "Modernisation d'application"] },
    { co: "Syxperiane", role: "Consultant Développeur", meta: "Conseil & intégration", points: ["Java / SQL", "Intégration ERP", "Analyse fonctionnelle"] },
    { co: "Almerys", role: "Développeur Angular", meta: "Santé / assurance", points: ["Tests Jasmine", "CI/CD", "Refonte UI"] },
    { co: "O2Switch", role: "Support technique", meta: "Hébergement / infra", points: ["Infrastructure", "Bases de données", "Diagnostic d'incidents"] }
  ];

  var METHOD = [
    { idx: "01", title: "Comprendre l'existant", text: "Lire les flux, repérer les irritants et distinguer le besoin métier de l'habitude technique." },
    { idx: "02", title: "Analyser les besoins métier", text: "Cadrer les priorités avec les parties prenantes et tracer les décisions structurantes." },
    { idx: "03", title: "Construire des solutions maintenables", text: "Développer par incréments, tester les parcours clés et documenter ce qui doit durer." },
    { idx: "04", title: "Livrer et améliorer en continu", text: "Préparer la mise en ligne, écouter les retours et rendre l'application plus simple à maintenir." }
  ];

  /* ---- Petit utilitaire d'échappement HTML ------------------------------ */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function techList(arr) {
    return arr.map(function (t) { return '<span class="tech">' + esc(t) + "</span>"; }).join("");
  }

  /* ---- Rendu : cartes projets ------------------------------------------- */
  function renderProjects() {
    var grid = document.getElementById("projects-grid");
    grid.innerHTML = PROJECTS.map(function (p, i) {
      var pos = p.thumbPos || "center top";
      var links = "";
      if (p.site) links += '<a class="repo-link" href="' + p.site + '" target="_blank" rel="noopener">' + icon("external", 15) + " Site</a>";
      if (p.repo) links += '<a class="repo-link" href="' + p.repo + '" target="_blank" rel="noopener">' + icon("github", 15) + " Dépôt</a>";
      return '' +
        '<article class="pcard reveal">' +
          '<div class="pcard-thumb" style="background-image:url(\'' + p.img + '\');background-position:' + pos + '"></div>' +
          '<div class="pcard-body">' +
            '<div class="pcard-meta"><span class="status ' + p.status.cls + '">' + esc(p.status.label) + "</span></div>" +
            '<p class="pcard-tagline">' + esc(p.tagline) + "</p>" +
            "<h3>" + esc(p.name) + "</h3>" +
            '<div class="pcard-fields">' +
              '<div class="pfield"><span class="k">Contexte</span><span class="v">' + esc(p.context) + "</span></div>" +
              '<div class="pfield"><span class="k">Solution</span><span class="v">' + esc(p.solution) + "</span></div>" +
              '<div class="pfield"><span class="k">Stack</span><span class="v"><span class="pstack">' + techList(p.stack) + "</span></span></div>" +
            "</div>" +
            '<div class="pcard-foot">' +
              '<button class="case-link" data-project="' + i + '">Voir le détail ' + icon("arrow", 15) + "</button>" +
              '<div class="pcard-links">' + links + "</div>" +
            "</div>" +
          "</div>" +
        "</article>";
    }).join("");
    // ouverture du modal
    grid.querySelectorAll(".case-link").forEach(function (btn) {
      btn.addEventListener("click", function () { openModal(PROJECTS[+btn.dataset.project]); });
    });
  }

  /* ---- Rendu : expertise ------------------------------------------------ */
  function renderExpertise() {
    document.getElementById("expertise-grid").innerHTML = EXPERTISE.map(function (c) {
      return '<div class="exp-col reveal">' +
        '<span class="eyebrow">' + esc(c.title) + "</span>" +
        '<p class="col-desc">' + esc(c.desc) + "</p>" +
        '<div class="exp-tags">' + techList(c.skills) + "</div>" +
      "</div>";
    }).join("");
  }

  /* ---- Rendu : timeline expériences ------------------------------------- */
  function renderExperience() {
    document.getElementById("timeline").innerHTML = EXPERIENCE.map(function (e) {
      return '<div class="tnode reveal"><div class="tnode-card">' +
        '<div class="tnode-head"><div>' +
          '<div class="tnode-co">' + esc(e.co) + "</div>" +
          '<div class="tnode-role">' + esc(e.role) + "</div>" +
        "</div><span class=\"tnode-meta\">" + esc(e.meta) + "</span></div>" +
        '<div class="tnode-points">' + techList(e.points) + "</div>" +
      "</div></div>";
    }).join("");
  }

  /* ---- Rendu : méthode -------------------------------------------------- */
  function renderMethod() {
    document.getElementById("method-grid").innerHTML = METHOD.map(function (m) {
      return '<div class="mstep reveal">' +
        '<span class="idx">' + esc(m.idx) + "</span>" +
        "<h3>" + esc(m.title) + "</h3>" +
        "<p>" + esc(m.text) + "</p>" +
      "</div>";
    }).join("");
  }

  /* ---- Modal étude de cas ----------------------------------------------- */
  var overlay = document.getElementById("modal-overlay");
  function openModal(p) {
    var pos = p.thumbPos || "center top";
    var rows = [
      ["Contexte", "<p>" + esc(p.context) + "</p>"],
      ["Problème", "<p>" + esc(p.problem) + "</p>"],
      ["Solution", "<p>" + esc(p.solution) + "</p>"],
      ["Capacités métier", "<ul>" + p.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>"],
      ["Architecture technique", "<p>" + esc(p.architecture) + "</p>"],
      ["Valeur métier", "<p>" + esc(p.value) + "</p>"],
      ["Stack technique", '<div class="pstack">' + techList(p.stack) + "</div>"]
    ];
    var foot = "";
    if (p.site) foot += '<a class="btn btn-secondary btn-sm" href="' + p.site + '" target="_blank" rel="noopener">' + icon("external", 16) + " Visiter le site</a>";
    if (p.repo) foot += '<a class="btn btn-secondary btn-sm" href="' + p.repo + '" target="_blank" rel="noopener">' + icon("github", 16) + " Voir le dépôt</a>";
    foot += '<button class="btn btn-outline btn-sm" data-close>Fermer</button>';

    overlay.innerHTML = '<div class="modal" role="dialog" aria-modal="true">' +
      '<div class="modal-hero" style="background-image:url(\'' + p.img + '\');background-position:' + pos + '">' +
        '<button class="modal-close" data-close aria-label="Fermer">' + icon("close", 18) + "</button>" +
      "</div>" +
      '<div class="modal-body">' +
        '<span class="status ' + p.status.cls + '">' + esc(p.status.label) + "</span>" +
        "<h3>" + esc(p.name) + "</h3>" +
        '<p class="modal-tagline">' + esc(p.tagline) + "</p>" +
        rows.map(function (r) {
          return '<div class="cs-row"><div class="label"><span class="eyebrow">' + r[0] + "</span></div>" +
                 '<div class="content">' + r[1] + "</div></div>";
        }).join("") +
      "</div>" +
      '<div class="modal-foot">' + foot + "</div>" +
    "</div>";

    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    overlay.querySelectorAll("[data-close]").forEach(function (b) { b.addEventListener("click", closeModal); });
  }
  function closeModal() {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  overlay.addEventListener("click", function (e) { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  /* ---- Thème (sombre par défaut, persistant) ---------------------------- */
  var themeBtn = document.getElementById("theme-toggle");
  function applyTheme(t) {
    document.body.classList.toggle("light-theme", t === "light");
    themeBtn.innerHTML = icon(t === "light" ? "moon" : "sun", 19);
    try { localStorage.setItem("rm-theme", t); } catch (e) {}
  }
  var savedTheme = "dark";
  try { savedTheme = localStorage.getItem("rm-theme") || "dark"; } catch (e) {}
  applyTheme(savedTheme);
  themeBtn.addEventListener("click", function () {
    applyTheme(document.body.classList.contains("light-theme") ? "dark" : "light");
  });

  /* ---- Boutons à icône (data-icon) -------------------------------------- */
  document.querySelectorAll("[data-icon]").forEach(function (el) {
    el.insertAdjacentHTML("afterbegin", icon(el.dataset.icon, 17) + " ");
  });

  /* ---- Bouton CV : libellé + menu --------------------------------------- */
  (function () {
    var view = document.getElementById("cv-view");
    view.innerHTML = icon("file", 17) + " Voir le CV";
    var toggleBtn = document.getElementById("cv-toggle");
    toggleBtn.innerHTML = icon("chevron", 16);
    document.getElementById("cv-menu").innerHTML = CVS.map(function (cv) {
      return '<div class="cv-menu-row"><span class="cv-menu-label">' + esc(cv.label) + "</span>" +
        '<div class="cv-menu-actions">' +
          '<a href="' + cv.url + '" target="_blank" rel="noopener" title="Visualiser : ' + esc(cv.label) + '">' + icon("external", 15) + " Visualiser</a>" +
          '<a href="' + cv.url + '" download="' + cv.file + '" title="Télécharger : ' + esc(cv.label) + '">' + icon("download", 15) + " Télécharger</a>" +
        "</div></div>";
    }).join("");

    var action = document.getElementById("cv-action");
    toggleBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = action.classList.toggle("open");
      toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!action.contains(e.target)) { action.classList.remove("open"); toggleBtn.setAttribute("aria-expanded", "false"); }
    });
  })();

  /* ---- Copier l'e-mail -------------------------------------------------- */
  (function () {
    var btn = document.getElementById("copy-email");
    function setLabel(name, text) { btn.innerHTML = icon(name, 16) + " " + text; }
    setLabel("copy", "Copier l'e-mail");
    btn.addEventListener("click", function () {
      var done = function () {
        btn.classList.add("copied"); setLabel("check", "E-mail copié");
        setTimeout(function () { btn.classList.remove("copied"); setLabel("copy", "Copier l'e-mail"); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).then(done).catch(function () { window.location.href = "mailto:" + EMAIL; });
      } else { window.location.href = "mailto:" + EMAIL; }
    });
  })();

  /* ---- Bouton retour en haut (flottant) --------------------------------- */
  var toTop = document.getElementById("back-to-top");
  toTop.innerHTML = icon("arrowUp", 18);
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* ---- Header au scroll + scroll-spy + bouton haut ---------------------- */
  var header = document.getElementById("header");
  var spyIds = ["projets", "expertise", "experience", "methode", "contact"];
  var spyLinks = {};
  document.querySelectorAll(".nav a[data-spy]").forEach(function (a) { spyLinks[a.dataset.spy] = a; });

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle("scrolled", y > 12);
    toTop.classList.toggle("show", y > 640);
    toTop.tabIndex = y > 640 ? 0 : -1;

    // scroll-spy basé sur la position (robuste dans les deux sens)
    var line = window.innerHeight * 0.30;
    var current = spyIds[0];
    for (var i = 0; i < spyIds.length; i++) {
      var el = document.getElementById(spyIds[i]);
      if (el && el.getBoundingClientRect().top <= line) current = spyIds[i];
    }
    if (window.innerHeight + y >= document.body.scrollHeight - 2) current = spyIds[spyIds.length - 1];
    for (var id in spyLinks) spyLinks[id].classList.toggle("active", id === current);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  /* ---- Reveal au scroll ------------------------------------------------- */
  function setupReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!els.length) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var revealAll = function () { els.forEach(function (el) { el.classList.add("in"); }); };
    if (reduce || !("IntersectionObserver" in window)) { revealAll(); return; }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -5% 0px", threshold: 0.08 });
    els.forEach(function (el) { obs.observe(el); });
    setTimeout(revealAll, 1600); // filet de sécurité
  }

  /* ---- Init ------------------------------------------------------------- */
  renderProjects();
  renderExpertise();
  renderExperience();
  renderMethod();
  setupReveal();
  onScroll();
})();
