// Interactive background: a drifting node network with a grid that lights up
// around the pointer. Nodes near the pointer get pushed aside and link to it.
(function () {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const COLORS = ["124,156,255", "94,234,212"]; // --accent, --accent-2
  const LINK_DIST = 130;   // max distance for node-to-node lines
  const MOUSE_RADIUS = 190; // pointer influence radius
  const GRID = 44;         // grid spacing in px

  let w = 0, h = 0, dpr = 1;
  let nodes = [];
  let running = false;
  const pointer = { x: -9999, y: -9999, active: false };

  function makeNode() {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.08 + Math.random() * 0.22;
    const bx = Math.cos(angle) * speed;
    const by = Math.sin(angle) * speed;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: bx, vy: by, bx, by,
      r: 0.8 + Math.random() * 1.4,
      c: COLORS[Math.random() < 0.7 ? 0 : 1],
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const target = Math.max(30, Math.min(130, Math.round((w * h) / 12000)));
    while (nodes.length < target) nodes.push(makeNode());
    nodes.length = target;
    for (const n of nodes) {
      n.x = Math.min(n.x, w);
      n.y = Math.min(n.y, h);
    }
    if (!running) draw();
  }

  function update() {
    const r2 = MOUSE_RADIUS * MOUSE_RADIUS;
    for (const n of nodes) {
      if (pointer.active) {
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < r2 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const force = (1 - d / MOUSE_RADIUS) * 0.35;
          n.vx += (dx / d) * force;
          n.vy += (dy / d) * force;
        }
      }
      // Ease back toward each node's own gentle drift.
      n.vx += (n.bx - n.vx) * 0.03;
      n.vy += (n.by - n.vy) * 0.03;
      n.x += n.vx;
      n.y += n.vy;

      // Wrap around the edges.
      if (n.x < -10) n.x = w + 10; else if (n.x > w + 10) n.x = -10;
      if (n.y < -10) n.y = h + 10; else if (n.y > h + 10) n.y = -10;
    }
  }

  function drawGrid() {
    if (!pointer.active) return;
    const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 320);
    g.addColorStop(0, "rgba(124,156,255,0.22)");
    g.addColorStop(1, "rgba(124,156,255,0)");
    ctx.strokeStyle = g;
    ctx.lineWidth = 1;
    ctx.beginPath();
    const x0 = Math.max(0, Math.floor((pointer.x - 320) / GRID) * GRID);
    const x1 = Math.min(w, pointer.x + 320);
    const y0 = Math.max(0, Math.floor((pointer.y - 320) / GRID) * GRID);
    const y1 = Math.min(h, pointer.y + 320);
    for (let x = x0; x <= x1; x += GRID) { ctx.moveTo(x + 0.5, y0); ctx.lineTo(x + 0.5, y1); }
    for (let y = y0; y <= y1; y += GRID) { ctx.moveTo(x0, y + 0.5); ctx.lineTo(x1, y + 0.5); }
    ctx.stroke();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    drawGrid();

    // Node-to-node links.
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        if (dx > LINK_DIST || dx < -LINK_DIST) continue;
        const dy = a.y - b.y;
        if (dy > LINK_DIST || dy < -LINK_DIST) continue;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK_DIST) {
          ctx.strokeStyle = `rgba(${a.c},${(1 - d / LINK_DIST) * 0.22})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Pointer-to-node links and nodes.
    for (const n of nodes) {
      let glow = 0;
      if (pointer.active) {
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_RADIUS * 1.25) {
          glow = 1 - d / (MOUSE_RADIUS * 1.25);
          ctx.strokeStyle = `rgba(94,234,212,${glow * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = `rgba(${n.c},${0.45 + glow * 0.55})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + glow * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function frame() {
    if (!running) return;
    update();
    draw();
    requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduceMotion.matches || document.hidden) return;
    running = true;
    requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
  }

  window.addEventListener("pointermove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
  }, { passive: true });
  document.documentElement.addEventListener("pointerleave", () => { pointer.active = false; });
  window.addEventListener("blur", () => { pointer.active = false; });
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  reduceMotion.addEventListener?.("change", () => {
    if (reduceMotion.matches) { stop(); pointer.active = false; draw(); } else start();
  });

  resize();
  start();
})();
