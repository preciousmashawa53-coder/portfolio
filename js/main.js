/* Portfolio behaviour. Content lives in data.js. */
(function () {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme (dark by default, remembered) ---------- */
  const root = document.documentElement;
  const themeBtn = $("themeBtn");
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
    try { localStorage.setItem("pm-theme", t); } catch (e) {}
  }
  let saved = null;
  try { saved = localStorage.getItem("pm-theme"); } catch (e) {}
  setTheme(saved || "dark");
  themeBtn.addEventListener("click", () => setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"));

  /* ---------- Mobile menu ---------- */
  const links = $("links");
  $("menuBtn").addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));
  window.addEventListener("scroll", () => $("nav").classList.toggle("scrolled", window.scrollY > 40));

  /* ---------- Typed text ---------- */
  const typedEl = $("typed");
  const words = PROFILE.typedWords;
  if (reduceMotion) {
    typedEl.textContent = words[0];
  } else {
    let w = 0, i = 0, deleting = false;
    (function tick() {
      const word = words[w];
      typedEl.textContent = word.slice(0, i);
      if (!deleting && i < word.length) { i++; setTimeout(tick, 90); }
      else if (!deleting) { deleting = true; setTimeout(tick, 1600); }
      else if (i > 0) { i--; setTimeout(tick, 45); }
      else { deleting = false; w = (w + 1) % words.length; setTimeout(tick, 300); }
    })();
  }

  /* ---------- Social icons ---------- */
  $("socials").innerHTML = SOCIALS.filter((s) => s.url).map((s) =>
    `<a class="social" href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.name)}" title="${esc(s.name)}">
       <img src="https://cdn.simpleicons.org/${esc(s.icon)}" alt="" onerror="this.replaceWith(Object.assign(document.createElement('b'),{className:'social-letter',textContent:'${esc(s.name[0])}'}))">
     </a>`).join("");

  /* ---------- Skills ---------- */
  $("skillsGrid").innerHTML = SKILLS.map((g) =>
    `<div class="skill-card"><h3>${esc(g.group)}</h3>
       <div class="chips">${g.items.map((i) => `<span class="chip">${esc(i)}</span>`).join("")}</div></div>`).join("");

  /* ---------- Timeline ---------- */
  $("timeline").innerHTML = TIMELINE.map((t) =>
    `<div class="tl-item"><span class="tl-dot"></span>
       <small>${esc(t.when)}</small><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></div>`).join("");

  /* ---------- Projects ---------- */
  $("projectGrid").innerHTML = PROJECTS.map((p) => {
    const live = p.live
      ? `<a class="btn small" href="${esc(p.live)}" target="_blank" rel="noopener">Open live site <img src="assets/arrow-right-circle.svg" alt=""></a>`
      : `<span class="soon">Live demo coming soon</span>`;
    const code = p.code ? `<a class="btn small ghost" href="${esc(p.code)}" target="_blank" rel="noopener">View code</a>` : "";
    const img = p.image ? `<img class="card-img" src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy">` : "";
    return `<article class="card">${img}
      <span class="tag">${esc(p.tag)}</span>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.description)}</p>
      <div class="chips">${p.tech.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
      <div class="card-actions">${live}${code}</div>
    </article>`;
  }).join("");

  /* ---------- Certificates (local files, with a tidy fallback) ---------- */
  const certPath = (f) => "assets/certificates/" + f;
  $("certGrid").innerHTML = CERTIFICATES.map((c, idx) => {
    const isPdf = /\.pdf$/i.test(c.file);
    const thumb = isPdf
      ? `<div class="cert-fallback"><span>📄</span>PDF certificate</div>`
      : `<img src="${esc(certPath(c.file))}" alt="${esc(c.title)} certificate" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'cert-fallback',innerHTML:'<span>🎓</span>LinkedIn Learning'}))">`;
    return `<button class="cert" data-idx="${idx}">${thumb}
      <div class="cert-info"><strong>${esc(c.title)}</strong><small>${esc(c.date)}</small></div></button>`;
  }).join("");

  const modal = $("modal"), body = $("modalBody");
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); body.innerHTML = ""; }
  $("certGrid").addEventListener("click", (e) => {
    const btn = e.target.closest(".cert"); if (!btn) return;
    const c = CERTIFICATES[btn.dataset.idx], src = certPath(c.file);
    body.innerHTML = /\.pdf$/i.test(c.file)
      ? `<iframe src="${esc(src)}" title="${esc(c.title)}"></iframe>`
      : `<img src="${esc(src)}" alt="${esc(c.title)} certificate" onerror="this.outerHTML='<p class=&quot;missing&quot;>Certificate file not uploaded yet.</p>'">`;
    modal.classList.add("open"); modal.setAttribute("aria-hidden", "false");
  });
  $("modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  /* ---------- Contact ---------- */
  $("emailLink").href = "mailto:" + PROFILE.email; $("emailText").textContent = PROFILE.email;
  $("phoneLink").href = "tel:" + PROFILE.phone.replace(/\s/g, ""); $("phoneText").textContent = PROFILE.phone;
  $("hubLink").href = PROFILE.servicesSite; $("hubLink").target = "_blank";
  $("year").textContent = new Date().getFullYear();
  ["hubNav", "hubBanner"].forEach((id) => { $(id).href = PROFILE.servicesSite; });
  $("certCount").textContent = CERTIFICATES.length;
  $("projCount").textContent = PROJECTS.length;
  if (PROFILE.cvFile) $("cvBtn").href = PROFILE.cvFile; else $("cvBtn").remove();
  $("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target, org = f.org.value.trim();
    const subject = "Portfolio enquiry from " + f.name.value.trim() + (org ? " (" + org + ")" : "");
    location.href = "mailto:" + PROFILE.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(f.message.value);
  });
  window.addEventListener("scroll", () => $("toTop").classList.toggle("show", window.scrollY > 600));

  /* ---------- Network background (no spinning orbit) ---------- */
  const canvas = $("network"), ctx = canvas.getContext("2d");
  const colors = ["#3cc8f0", "#e8245a", "#f0b13c", "#2fb67c"];
  let pts = [], W = 0, H = 0, dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(90, (W * H) / 14000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() < 0.25 ? 6 + Math.random() * 5 : 2 + Math.random() * 3,
      c: colors[Math.floor(Math.random() * colors.length)]
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const line = getComputedStyle(root).getPropertyValue("--net-line").trim();
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 170) { ctx.strokeStyle = line; ctx.globalAlpha = 1 - d / 170; ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
    }
    ctx.globalAlpha = 1;
    pts.forEach((p) => { ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); });
  }
  function step() {
    pts.forEach((p) => { p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; });
    draw(); requestAnimationFrame(step);
  }
  resize(); window.addEventListener("resize", () => { resize(); if (reduceMotion) draw(); });
  if (reduceMotion) draw(); else requestAnimationFrame(step);

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
  document.querySelectorAll(".section .container > *").forEach((el) => { el.classList.add("reveal"); io.observe(el); });
})();
