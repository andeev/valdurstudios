(function () {
  const grid = document.getElementById("project-grid");
  const filtersEl = document.querySelector(".filters");
  const teamGrid = document.getElementById("team-grid");

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Deterministic hue from a string, so each project gets its own cover color.
  const hueFor = (s) => {
    let h = 0;
    for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) % 360;
    return h;
  };

  const initials = (s) =>
    s.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

  function projectCard(p) {
    const hue = hueFor(p.title);
    const cover = p.image
      ? `<img src="${escapeHtml(p.image)}" alt="" loading="lazy" />`
      : `<div class="cover-generated" style="--h:${hue}"><span>${escapeHtml(initials(p.title))}</span></div>`;
    const tags = (p.tags || []).map((t) => `<li>${escapeHtml(t)}</li>`).join("");
    const link = p.link
      ? `<a class="card-link" href="${escapeHtml(p.link)}" target="_blank" rel="noopener">View project &rarr;</a>`
      : "";
    return `
      <article class="card">
        <div class="card-cover">${cover}</div>
        <div class="card-body">
          <div class="card-meta">
            <span class="category">${escapeHtml(p.category || "")}</span>
            ${p.status ? `<span class="status">${escapeHtml(p.status)}</span>` : ""}
          </div>
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.description || "")}</p>
          <ul class="tags">${tags}</ul>
          <div class="card-foot">
            ${p.by ? `<span class="by">by ${escapeHtml(p.by)}</span>` : "<span></span>"}
            ${link}
          </div>
        </div>
      </article>`;
  }

  function renderProjects(category) {
    const list = category === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === category);
    grid.innerHTML = list.length
      ? list.map(projectCard).join("")
      : `<p class="empty">No projects here yet.</p>`;
  }

  function renderFilters() {
    const cats = ["All", ...new Set(PROJECTS.map((p) => p.category).filter(Boolean))];
    filtersEl.innerHTML = cats
      .map((c, i) => `<button role="tab" aria-selected="${i === 0}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`)
      .join("");
    filtersEl.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      filtersEl.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", b === btn));
      renderProjects(btn.dataset.cat);
    });
  }

  function renderTeam() {
    teamGrid.innerHTML = TEAM.map((m) => {
      const name = m.link
        ? `<a href="${escapeHtml(m.link)}" target="_blank" rel="noopener">${escapeHtml(m.name)}</a>`
        : escapeHtml(m.name);
      return `
        <div class="member">
          <div class="avatar" style="--h:${hueFor(m.name)}">${escapeHtml(initials(m.name))}</div>
          <div><strong>${name}</strong><span>${escapeHtml(m.role || "")}</span></div>
        </div>`;
    }).join("");
  }

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
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

  document.getElementById("year").textContent = new Date().getFullYear();
  renderFilters();
  renderProjects("All");
  renderTeam();
})();
