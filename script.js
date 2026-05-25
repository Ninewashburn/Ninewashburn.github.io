const EMAIL = "meynadier.renaud@gmail.com";

const projectExportData = [
    {
        nom: "Security-Base",
        statut: "Portfolio / Anonymisé",
        stack: "Laravel, Angular, PostgreSQL, Docker",
        points: "RBAC et permissions; Exports PDF / Excel; Traçabilité des actions",
        lien: "https://github.com/Ninewashburn/Security-Base"
    },
    {
        nom: "La Nîmes’Alerie",
        statut: "Terminé",
        stack: "Angular 19, Symfony 7.2, API Platform, Docker",
        points: "Refonte front / back découplée; Boutique, panier et compte client; Back-office d'administration",
        lien: "https://github.com/Ninewashburn/Nimes-Alerie"
    },
    {
        nom: "Creasoka",
        statut: "En production",
        stack: "Next.js, TypeScript, Tailwind CSS, Vercel",
        points: "Site livré en production; Catalogue et parcours utilisateur; SEO et déploiement Vercel",
        lien: "https://creasoka.fr/"
    },
    {
        nom: "Bagni-Plage",
        statut: "Terminé",
        stack: "Java, Spring Boot, Angular, PostgreSQL",
        points: "Réservation et disponibilités; Rôles utilisateur / admin; Paiement sandbox",
        lien: "https://github.com/Ninewashburn/Bagni-Plage"
    },
    {
        nom: "Dora Dashboard",
        statut: "Projet technique",
        stack: "Angular, FastAPI, Python, Docker",
        points: "Dashboard de métriques DORA; Graphiques comparatifs; Mode clair / sombre",
        lien: "https://github.com/Ninewashburn/Dora-Dashboard"
    },
    {
        nom: "CV Forge",
        statut: "Idée / Prototype",
        stack: "Local-first, Angular, Python, SQLite",
        points: "Matching offre / profil; Génération contrôlée par faits; Historique des candidatures",
        lien: "Prototype en cadrage"
    }
];

function initThemeToggle() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    document.body.classList.toggle("light-theme", currentTheme === "light");

    if (!themeToggleBtn) {
        return;
    }

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
        localStorage.setItem("theme", theme);
    });
}

function escapeCsvValue(value) {
    return `"${String(value).replaceAll('"', '""')}"`;
}

function exportProjectsCsv() {
    const headers = ["Nom", "Statut", "Stack", "Points clés", "Lien"];
    const rows = projectExportData.map((project) => [
        project.nom,
        project.statut,
        project.stack,
        project.points,
        project.lien
    ]);

    const csv = [headers, ...rows]
        .map((row) => row.map(escapeCsvValue).join(","))
        .join("\n");

    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "renaud-meynadier-projets.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function initProjectExport() {
    const exportButton = document.getElementById("btn-export-projects");

    if (!exportButton) {
        return;
    }

    exportButton.addEventListener("click", exportProjectsCsv);
}

async function copyEmail(button) {
    const originalText = button.textContent;

    try {
        await navigator.clipboard.writeText(EMAIL);
        button.textContent = "E-mail copié";
        button.classList.add("copy-feedback");
    } catch {
        window.location.href = `mailto:${EMAIL}`;
        button.textContent = "Ouverture e-mail";
    }

    window.setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("copy-feedback");
    }, 1800);
}

function initCopyEmail() {
    const copyButtons = document.querySelectorAll("[data-copy-email]");

    copyButtons.forEach((button) => {
        button.addEventListener("click", () => copyEmail(button));
    });
}

function initActiveNavigation() {
    const navLinks = Array.from(document.querySelectorAll(".nav-link[href^='#']"));
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if (!sections.length || !("IntersectionObserver" in window)) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach((link) => {
                link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
}

function initRevealAnimations() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll(".project-card, .skills-category-card, .method-step, .availability-card");

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        targets.forEach((target) => target.classList.add("is-visible"));
        return;
    }

    targets.forEach((target) => target.classList.add("reveal-target"));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });

    targets.forEach((target) => observer.observe(target));
}

initThemeToggle();
initProjectExport();
initCopyEmail();
initActiveNavigation();
initRevealAnimations();
