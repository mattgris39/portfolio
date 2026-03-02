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