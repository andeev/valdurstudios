// Project detail page: reads ?p=<slug> and renders that project from data.js.
(function () {
  const root = document.getElementById("project");
  const slug = new URLSearchParams(location.search).get("p");
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const p = PROJECTS[index];

  if (!p) {
    document.title = "Project not found — Valdur Studios";
    root.innerHTML = `
      <div class="container not-found">
        <h1>Project not found</h1>
        <p>We couldn't find that project. It may have been renamed or removed.</p>
        <a class="btn" href="index.html#projects">Back to all projects</a>
      </div>`;
    return;
  }

  document.title = `${p.title} — Valdur Studios`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", p.description || "");

  const tags = (p.tags || []).map((t) => `<li>${escapeHtml(t)}</li>`).join("");
  const about = (p.about && p.about.length ? p.about : [p.description || ""])
    .map((para) => `<p>${escapeHtml(para)}</p>`).join("");
  const features = (p.features || []).map((f) => `<li>${escapeHtml(f)}</li>`).join("");
  const shots = (p.screenshots || []).map((src) =>
    `<a href="${escapeHtml(src)}" target="_blank" rel="noopener"><img src="${escapeHtml(src)}" alt="${escapeHtml(p.title)} screenshot" loading="lazy" /></a>`).join("");

  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  root.innerHTML = `
    <section class="project-hero">
      <div class="container">
        <a class="back-link" href="index.html#projects">&larr; All projects</a>
        <div class="project-hero-grid">
          <div>
            <div class="card-meta project-meta">
              <span class="category">${escapeHtml(p.category || "")}</span>
              ${p.status ? `<span class="status-pill">${escapeHtml(p.status)}</span>` : ""}
            </div>
            <h1>${escapeHtml(p.title)}</h1>
            <p class="lead">${escapeHtml(p.description || "")}</p>
            <ul class="tags">${tags}</ul>
            <div class="project-actions">
              ${p.link ? `<a class="btn" href="${escapeHtml(p.link)}" target="_blank" rel="noopener">View project &rarr;</a>` : ""}
              ${p.by ? `<span class="by">Built by ${escapeHtml(p.by)}</span>` : ""}
            </div>
          </div>
          <div class="project-cover">${coverHtml(p)}</div>
        </div>
      </div>
    </section>

    <section class="section project-body">
      <div class="container project-columns">
        <div>
          <h2>About</h2>
          ${about}
        </div>
        ${features ? `<aside class="feature-box"><h2>Features</h2><ul class="feature-list">${features}</ul></aside>` : ""}
      </div>
    </section>

    ${shots ? `
    <section class="section section-alt">
      <div class="container">
        <h2>Screenshots</h2>
        <div class="gallery">${shots}</div>
      </div>
    </section>` : ""}

    ${PROJECTS.length > 1 ? `
    <section class="section">
      <div class="container project-nav">
        <a href="${projectUrl(prev)}" class="project-nav-link">
          <span>&larr; Previous</span><strong>${escapeHtml(prev.title)}</strong>
        </a>
        <a href="${projectUrl(next)}" class="project-nav-link next">
          <span>Next &rarr;</span><strong>${escapeHtml(next.title)}</strong>
        </a>
      </div>
    </section>` : ""}`;
})();
