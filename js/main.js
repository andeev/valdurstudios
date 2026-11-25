// Home page: project grid, filters, and team.
(function () {
  const grid = document.getElementById("project-grid");
  const filtersEl = document.querySelector(".filters");
  const teamGrid = document.getElementById("team-grid");

  function projectCard(p) {
    const tags = (p.tags || []).map((t) => `<li>${escapeHtml(t)}</li>`).join("");
    return `
      <article class="card">
        <div class="card-cover">${coverHtml(p)}</div>
        <div class="card-body">
          <div class="card-meta">
            <span class="category">${escapeHtml(p.category || "")}</span>
            ${p.status ? `<span class="status">${escapeHtml(p.status)}</span>` : ""}
          </div>
          <h3><a class="card-title-link" href="${projectUrl(p)}">${escapeHtml(p.title)}</a></h3>
          <p>${escapeHtml(p.description || "")}</p>
          <ul class="tags">${tags}</ul>
          <div class="card-foot">
            ${p.by ? `<span class="by">by ${escapeHtml(p.by)}</span>` : "<span></span>"}
            <span class="card-link" aria-hidden="true">Learn more &rarr;</span>
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

  renderFilters();
  renderProjects("All");
  renderTeam();
})();
