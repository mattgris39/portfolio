// Footer year (garde-le ✅)
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Theme toggle (manuel + sauvegarde)
const themeBtn = document.querySelector(".theme-toggle");
const root = document.documentElement;

function applyTheme(theme) {
  if (!theme) {
    root.removeAttribute("data-theme");
    localStorage.removeItem("theme");
  } else {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  const current = root.getAttribute("data-theme");
  if (themeBtn) themeBtn.textContent = current === "light" ? "☾" : "☀︎";
}

const saved = localStorage.getItem("theme");
applyTheme(saved === "light" || saved === "dark" ? saved : null);

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    if (!current) {
      const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)").matches;
      applyTheme(prefersLight ? "dark" : "light");
      return;
    }
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

// Navigation mobile
const nav = document.querySelector(".nav");
const navToggle = document.getElementById("navToggle");
const navPanel = document.getElementById("navPanel");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));

function setNavOpen(isOpen) {
  if (!nav || !navToggle || !navPanel) return;
  nav.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navPanel.setAttribute("aria-hidden", String(!isOpen && window.innerWidth <= 980));
}

setNavOpen(false);

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav?.classList.contains("nav-open");
    setNavOpen(!isOpen);
  });
}

for (const link of navLinks) {
  link.addEventListener("click", () => setNavOpen(false));
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNavOpen(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) setNavOpen(false);
});

// Lien actif selon la section visible
const sectionIds = ["top", "about", "progress", "projects", "resume", "contact"];
const sectionMap = new Map();

for (const id of sectionIds) {
  const section = document.getElementById(id);
  if (section) sectionMap.set(id, section);
}

const activeLinkByHash = new Map();
for (const link of navLinks) {
  activeLinkByHash.set(link.getAttribute("href"), link);
}

function setActiveLink(hash) {
  for (const link of navLinks) {
    link.classList.toggle("is-active", link.getAttribute("href") === hash);
  }
}

if (sectionMap.size) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visible.length) return;
      const id = visible[0].target.id;
      const hash = `#${id}`;
      if (activeLinkByHash.has(hash)) setActiveLink(hash);
    },
    {
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0.2, 0.35, 0.55],
    }
  );

  for (const section of sectionMap.values()) observer.observe(section);
}
