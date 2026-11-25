// Helpers and page chrome shared by every page.
const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Deterministic hue from a string, so each project/person gets its own color.
const hueFor = (s) => {
  let h = 0;
  for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return h;
};

const initials = (s) =>
  s.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).slice(0, 2).map((w) => w.replace(/[^A-Za-z0-9]/g, "")[0].toUpperCase()).join("");

const projectUrl = (p) => `project.html?p=${encodeURIComponent(p.slug)}`;

// Cover image, or a generated gradient with the project's initials.
function coverHtml(p, extraClass = "") {
  return p.image
    ? `<img class="${extraClass}" src="${escapeHtml(p.image)}" alt="" loading="lazy" />`
    : `<div class="cover-generated ${extraClass}" style="--h:${hueFor(p.title)}"><span>${escapeHtml(initials(p.title))}</span></div>`;
}

(function () {
  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
    links.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
