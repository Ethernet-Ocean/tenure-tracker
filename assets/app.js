/* High Rollers tenure portfolio: shared behaviour. No build step, no dependencies. */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const page = document.body.dataset.page;

  /* ---------- chrome ---------- */
  const NAV = [
    ["index.html", "HOME", "home"],
    ["creations.html", "STUDENT CREATIONS", "creations"],
    ["evidence.html", "TEACHING EVIDENCE", "evidence"],
    ["ethics.html", "ETHICS & CONSENT", "ethics"]
  ];
  const die = `<svg class="die" viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="3" width="26" height="26" rx="7" fill="#F06B9B" stroke="#0d0f24" stroke-width="3"/><circle cx="11" cy="11" r="2.6" fill="#FAEF88"/><circle cx="21" cy="21" r="2.6" fill="#FAEF88"/><circle cx="16" cy="16" r="2.6" fill="#FAEF88"/></svg>`;
  const header = $("#bar");
  if (header) header.innerHTML = `<div class="wrap"><a class="brand" href="index.html">${die}<span>PROFESSOR OCEAN: TENURE QUEST</span></a>
    <nav class="nav" aria-label="Main">${NAV.map(([h, t, k]) => `<a href="${h}"${k === page ? ' aria-current="page"' : ""}>${t}</a>`).join("")}</nav></div>`;
  const foot = $("#foot");
  if (foot) foot.innerHTML = `<div class="wrap"><p class="px" style="color:var(--yellow);font-size:12px">PROFESSOR OCEAN: TENURE QUEST · VISUAL &amp; MEDIA ARTS · LONG BEACH CITY COLLEGE</p>
    <p>Student work appears here anonymously, as descriptions and original illustrations. No student images, video, names, grades or private feedback are published.
    Media will be added only after a student signs a release (see <a href="ethics.html">Ethics &amp; Consent</a>).</p>
    <p>Visual style adapted from the instructor's independently developed game <em>High Rollers</em>, including its RollerPixel typeface. This site supplements the official LBCC evaluation process. It is not an official LBCC submission and does not replace any required signed form.</p></div>`;

  /* ---------- starfield ---------- */
  const cv = $("#stars");
  if (cv && cv.getContext) {
    const ctx = cv.getContext("2d"); let W, H, S = [];
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; S = Array.from({ length: Math.min(140, W / 8) }, () => ({ x: Math.random() * W, y: Math.random() * H, z: Math.random() * 1.6 + .4, t: Math.random() * 6 })); };
    const draw = (t) => { ctx.clearRect(0, 0, W, H); for (const s of S) { const a = .35 + .35 * Math.sin(t / 700 + s.t); ctx.fillStyle = `rgba(250,239,136,${a})`; const p = Math.round(s.z * 2); ctx.fillRect(s.x | 0, s.y | 0, p, p); if (!still) { s.y += s.z * .12; if (s.y > H) s.y = 0; } } if (!still) requestAnimationFrame(draw); };
    addEventListener("resize", size); size(); requestAnimationFrame(draw);
  }

  /* ---------- original illustrations (NOT student work) ---------- */
  const C = { n: "#202445", i: "#0d0f24", g: "#EDC54C", y: "#FAEF88", p: "#F7BADF", h: "#F06B9B", s: "#7fd3f7", m: "#8ee6b4", l: "#2b3060" };
  const st = `stroke="${C.i}" stroke-width="4" stroke-linejoin="round"`;
  const sky = (a, b) => `<defs><linearGradient id="g${a.slice(1)}${b.slice(1)}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="320" height="200" fill="url(#g${a.slice(1)}${b.slice(1)})"/>`;
  const ART = {
    catch: () => `${sky("#141733", "#2b3060")}<text x="16" y="28" font-family="RollerPixel" font-size="14" fill="${C.m}">SCORE=32</text>
      <rect x="0" y="160" width="320" height="40" fill="${C.m}" ${st}/><rect x="140" y="126" width="34" height="34" rx="4" fill="${C.y}" ${st}/>
      <circle cx="70" cy="60" r="10" fill="${C.h}" ${st}/><path d="M232 46l10 12 10-12-10 22z" fill="${C.p}" ${st}/><rect x="190" y="96" width="16" height="16" fill="${C.g}" ${st}/><circle cx="110" cy="104" r="7" fill="${C.s}" ${st}/>`,
    ferris: () => `${sky("#7fd3f7", "#F7BADF")}<rect x="0" y="168" width="320" height="32" fill="${C.m}" ${st}/>
      <g transform="translate(160 90)"><circle r="62" fill="none" ${st}/><circle r="62" fill="none" stroke="${C.g}" stroke-width="2"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<line x1="0" y1="0" x2="${(62 * Math.cos(a * Math.PI / 180)).toFixed(1)}" y2="${(62 * Math.sin(a * Math.PI / 180)).toFixed(1)}" stroke="${C.i}" stroke-width="3"/><rect x="${(62 * Math.cos(a * Math.PI / 180) - 8).toFixed(1)}" y="${(62 * Math.sin(a * Math.PI / 180) - 4).toFixed(1)}" width="16" height="12" rx="3" fill="${[C.h, C.y, C.s, C.p][a / 45 % 4]}" ${st}/>`).join("")}<circle r="9" fill="${C.g}" ${st}/></g>
      <path d="M160 90L120 168M160 90L200 168" ${st} fill="none"/><rect x="236" y="130" width="58" height="26" rx="6" fill="${C.n}" ${st}/><rect x="242" y="136" width="20" height="14" rx="3" fill="${C.m}"/><rect x="268" y="136" width="20" height="14" rx="3" fill="${C.h}"/>`,
    obby: () => `${sky("#2b3060", "#c2456f")}<circle cx="250" cy="50" r="22" fill="${C.y}"/>${[0, 1, 2, 3, 4].map(i => `<rect x="${20 + i * 60}" y="${150 - i * 18}" width="44" height="14" rx="3" fill="${[C.h, C.g, C.s, C.p, C.m][i]}" ${st}/>`).join("")}
      <rect x="60" y="16" width="200" height="30" rx="10" fill="${C.l}" stroke="${C.p}" stroke-width="3"/><text x="160" y="36" text-anchor="middle" font-family="RollerPixel" font-size="11" fill="#fff">WELCOME!</text><path d="M0 200l40-40 30 40zM270 200l30-50 30 50z" fill="${C.i}"/>`,
    galaxian: () => `<rect width="320" height="200" fill="${C.i}"/>${Array.from({ length: 24 }, (_, i) => `<rect x="${(i * 53) % 320}" y="${(i * 37) % 200}" width="2" height="2" fill="${C.y}"/>`).join("")}
      ${[0, 1, 2, 3, 4, 5].map(i => `<path transform="translate(${60 + i * 36} 50)" d="M0 0h16v6h-4v6h-8v-6h-4z" fill="${[C.h, C.p, C.s, C.y, C.m, C.h][i]}"/>`).join("")}${[0, 1, 2, 3].map(i => `<path transform="translate(${88 + i * 36} 78)" d="M0 0h12v5h4v6h-20v-6h4z" fill="${C.g}"/>`).join("")}
      <path d="M152 160l8-16 8 16h6v8h-28v-8z" fill="${C.s}" ${st}/><rect x="158" y="118" width="3" height="14" fill="${C.y}"/><text x="14" y="22" font-family="RollerPixel" font-size="11" fill="${C.h}">1UP</text><text x="306" y="22" text-anchor="end" font-family="RollerPixel" font-size="11" fill="${C.y}">003700</text>
      <rect x="10" y="10" width="300" height="180" fill="none" stroke="${C.g}" stroke-width="3" stroke-dasharray="6 6"/>`,
    ux: () => `<rect width="320" height="200" fill="${C.l}"/>${[[20, 30, C.y], [120, 30, C.p], [220, 30, C.s], [70, 120, C.m], [170, 120, C.h]].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="80" height="50" rx="8" fill="${c}" ${st}/><rect x="${x + 10}" y="${y + 12}" width="50" height="6" rx="3" fill="${C.i}" opacity=".5"/><rect x="${x + 10}" y="${y + 26}" width="36" height="6" rx="3" fill="${C.i}" opacity=".35"/>`).join("")}
      <path d="M100 55h20M200 55h20M110 80l-10 40M210 80l-10 40M150 145h20" stroke="${C.i}" stroke-width="4" fill="none"/>`,
    gui: () => `${sky("#2b3060", "#141733")}<rect x="60" y="34" width="200" height="132" rx="14" fill="${C.n}" stroke="${C.g}" stroke-width="5"/><rect x="66" y="40" width="188" height="120" rx="10" fill="none" stroke="${C.i}" stroke-width="3"/>
      <text x="160" y="66" text-anchor="middle" font-family="RollerPixel" font-size="13" fill="${C.y}">SETTINGS</text>
      <rect x="84" y="86" width="150" height="10" rx="5" fill="${C.i}"/><rect x="84" y="86" width="104" height="10" rx="5" fill="${C.s}"/><circle cx="188" cy="91" r="9" fill="#fff" ${st}/>
      <rect x="84" y="118" width="150" height="10" rx="5" fill="${C.i}"/><rect x="84" y="118" width="120" height="10" rx="5" fill="${C.h}"/><circle cx="204" cy="123" r="9" fill="#fff" ${st}/>
      <path d="M22 26c0-8 12-8 12 0 0-8 12-8 12 0 0 8-12 16-12 16s-12-8-12-16z" fill="${C.h}" ${st}/><rect x="52" y="24" width="90" height="12" rx="6" fill="${C.m}" ${st}/>`,
    landscape: () => `${sky("#F7BADF", "#F06B9B")}<rect y="130" width="320" height="70" fill="#e58fb6"/><path d="M0 130 Q160 118 320 130" fill="none" stroke="${C.i}" stroke-width="3"/>
      <ellipse cx="90" cy="150" rx="70" ry="14" fill="${C.m}" ${st}/><ellipse cx="230" cy="165" rx="56" ry="11" fill="${C.m}" ${st}/><ellipse cx="200" cy="138" rx="26" ry="6" fill="${C.m}" ${st}/>
      <path d="M150 140l6-104 6 104z" fill="${C.p}" ${st}/>`,
    bed: () => `<rect width="320" height="200" fill="${C.i}"/><circle cx="160" cy="100" r="88" fill="${C.l}"/>
      <path d="M80 70v86M240 96v60" ${st} stroke-width="8" stroke="${C.i}"/><path d="M80 70v86M240 96v60" stroke="#a8693a" stroke-width="5"/>
      <rect x="84" y="112" width="152" height="30" rx="6" fill="#b5503f" ${st}/><rect x="92" y="98" width="40" height="18" rx="8" fill="#fff" ${st}/><rect x="84" y="138" width="152" height="12" fill="#a8693a" ${st}/>`,
    planet: () => `<rect width="320" height="200" fill="#26174a"/>${Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 71) % 320}" cy="${(i * 43) % 200}" r="${i % 3 ? 1 : 2}" fill="#fff" opacity=".7"/>`).join("")}
      <circle cx="120" cy="104" r="64" fill="${C.p}" ${st}/>${[0, 1, 2, 3, 4].map(i => `<path d="M${60 + i * 2} ${70 + i * 16} Q120 ${60 + i * 16} ${180 - i * 2} ${76 + i * 16}" stroke="${[C.h, "#fff", C.h, C.g, C.h][i]}" stroke-width="6" fill="none" opacity=".75"/>`).join("")}
      <circle cx="120" cy="104" r="64" fill="none" stroke="${C.y}" stroke-width="2" opacity=".6"/><circle cx="250" cy="60" r="22" fill="${C.s}" ${st}/><path d="M236 52q10-6 20 4" stroke="${C.m}" stroke-width="6" fill="none"/>`,
    ocean: () => `${sky("#0d0f24", "#2b3060")}<path d="M0 60 Q80 20 160 50 T320 40" stroke="${C.m}" stroke-width="10" fill="none" opacity=".45"/><path d="M0 70 Q90 40 170 66 T320 56" stroke="${C.p}" stroke-width="6" fill="none" opacity=".35"/>
      ${[0, 1, 2, 3].map(i => `<path d="M0 ${110 + i * 24} q20 -12 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 V200 H0z" fill="${["#2f6fb0", "#245a95", "#1b467a", "#13345f"][i]}" stroke="${C.i}" stroke-width="3"/>`).join("")}`,
    snow: () => `${sky("#141733", "#2b3060")}<circle cx="250" cy="44" r="18" fill="${C.y}"/><path d="M0 120l60-50 50 40 60-60 70 60 80-30v120H0z" fill="#3a4170" ${st}/>
      <rect y="150" width="320" height="50" fill="#dfe6ff" ${st}/>${[30, 70, 230, 280].map(x => `<path d="M${x} 152l14-40 14 40z" fill="${C.i}"/>`).join("")}${Array.from({ length: 20 }, (_, i) => `<circle cx="${(i * 61) % 320}" cy="${(i * 29) % 140}" r="1.6" fill="#fff"/>`).join("")}`,
    marble: () => `<rect width="320" height="200" fill="#3b1b6e"/><rect width="320" height="200" fill="url(#mg)"/><defs><radialGradient id="mg"><stop offset="0" stop-color="${C.h}" stop-opacity=".5"/><stop offset="1" stop-color="#3b1b6e" stop-opacity="0"/></radialGradient></defs>
      <path d="M40 40h50l-18 40h-14z" fill="${C.y}" ${st}/><path d="M70 82 Q160 70 150 120 T250 150" stroke="${C.s}" stroke-width="10" fill="none"/><path d="M70 82 Q160 70 150 120 T250 150" stroke="${C.i}" stroke-width="3" fill="none"/>
      <circle cx="232" cy="70" r="26" fill="none" stroke="${C.p}" stroke-width="8"/><circle cx="232" cy="70" r="26" fill="none" ${st}/><circle cx="130" cy="88" r="9" fill="${C.m}" ${st}/><path d="M240 160h50l-10 26h-30z" fill="${C.h}" ${st}/>`,
    ball: () => `<rect width="320" height="200" fill="#f4f1ea"/><path d="M30 60v110h260V60" fill="none" stroke="#c9c4b8" stroke-width="16"/>
      ${[[50, 40, 1], [90, 120, .5], [130, 156, .2], [170, 130, .5], [210, 154, .2], [250, 100, .6]].map(([x, y, o]) => `<ellipse cx="${x}" cy="${y}" rx="${y > 150 ? 15 : 11}" ry="${y > 150 ? 8 : 11}" fill="${C.i}" opacity="${o}"/>`).join("")}
      <path d="M50 40 Q90 120 130 156 Q170 110 210 154 Q240 90 250 100" fill="none" stroke="${C.h}" stroke-width="2" stroke-dasharray="5 5"/>`,
    generic: () => `${sky("#202445", "#2b3060")}<rect x="110" y="50" width="100" height="100" rx="18" fill="${C.h}" ${st}/>${[[135, 75], [185, 125], [160, 100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${C.y}"/>`).join("")}`
  };
  const artSVG = (k) => `<svg viewBox="0 0 320 200" role="img" aria-label="Illustration (not student work)" preserveAspectRatio="xMidYMid slice">${(ART[k] || ART.generic)()}</svg>`;

  /* ---------- data helpers ---------- */
  const P = window.PROJECTS || [], COV = window.COVERAGE || [], G = window.GROUPS || {}, TH = window.THEMES || {}, CRS = window.COURSES || {};
  const OUTCOME_OF = {
    "UX analysis": "Analyze & critique", "Usability": "Analyze & critique",
    "Game mechanics": "Build working systems", "Physics systems": "Build working systems", "Game logic": "Build working systems", "UI design": "Build working systems", "Interaction design": "Build working systems",
    "Prototyping & iteration": "Iterate & test", "Playtesting": "Iterate & test",
    "3D modeling": "Create & compose", "Texturing": "Create & compose", "Procedural materials & shaders": "Create & compose", "Lighting": "Create & compose", "Animation": "Create & compose", "VFX": "Create & compose", "Environment design": "Create & compose", "Spatial design": "Create & compose", "Level design": "Create & compose"
  };
  const outcomesOf = (skills, extra) => [...new Set(skills.map((s) => OUTCOME_OF[s]).filter(Boolean).concat(extra || []))];
  const courseKey = (c) => (c || "").slice(0, 6).trim();
  const ctag = (c) => { const k = courseKey(c); return k.startsWith("DMA") ? `<span class="tag c${k.slice(4)}">${esc(k)}</span>` : ""; };
  const vtag = (s) => s === "verified" ? `<span class="tag ver" title="Course stated in the work itself">VERIFIED</span>` : `<span class="tag inf" title="Course not stated in the work; provisional grouping pending instructor verification">COURSE UNVERIFIED</span>`;
  P.forEach((p) => { p.outcomes = outcomesOf(p.skills, /reflection/i.test(p.achievement + p.skillsDemonstrated.join(" ")) ? ["Reflect & communicate"] : []); });

  const cardHTML = (p) => `<button class="card" data-id="${p.id}" aria-haspopup="dialog">
    <div class="art">${artSVG(p.art)}<span class="lock">🔒 MEDIA PENDING RELEASE</span></div>
    <div class="body"><span class="sub">${esc(p.attribution)} · ${esc(window.SEMESTER)} · ${esc(p.weeks)}</span>
    <h3>${esc(p.title)}</h3><p>${esc(p.achievement.split(". ")[0])}.</p>
    <div class="tags">${ctag(p.course)}${vtag(p.courseStatus)}${p.software.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}${p.growth ? '<span class="tag" style="color:var(--hot);border-color:var(--hot)">GROWTH</span>' : ""}</div></div></button>`;

  /* ---------- case-study dialog ---------- */
  let dlg = $("#case");
  function openCase(id, push = true) {
    const p = P.find((x) => x.id === id); if (!p || !dlg) return;
    const list = (a) => a && a.length ? `<ul>${a.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p class="muted">None noted.</p>`;
    const LABELS = ["Teaching practice", "Assignment", "Student work", "Demonstrated learning", "Evaluation evidence"];
    dlg.innerHTML = `<div class="dlg-head"><div><span class="sub">Case study · ${esc(p.attribution)} · ${esc(CRS[p.course]?.name || "")}</span><h2 style="margin:4px 0 0;font-size:20px">${esc(p.title)}</h2></div>
      <button class="btn" data-close>✕ CLOSE</button></div>
      <div class="dlg-body">
      <div class="case-grid"><div>
        <div class="art" style="border:4px solid var(--gold);border-radius:12px;overflow:hidden;position:relative;aspect-ratio:16/9">${artSVG(p.art)}<span class="lock">🔒 MEDIA PENDING RELEASE</span></div>
        <p class="small muted" style="margin-top:6px">Original illustration, not the student's work. Student media will replace it once a signed release is on file.</p>
        <div class="field"><h4>ORIGINAL TITLE</h4><p>${esc(p.originalTitle)}</p></div>
        <div class="field"><h4>COURSE & SEMESTER</h4><p>${esc(p.course)}: ${esc(CRS[p.course]?.name || "")} · ${esc(window.SEMESTER)} · ${esc(p.weeks)} ${vtag(p.courseStatus)}</p>
          <p class="small muted">${p.courseStatus === "verified" ? "The course is stated in the student's own file." : "Not stated in the work. This is a provisional grouping, pending instructor verification."} Semester confirmed by file dates (Sep–Oct 2026).</p></div>
        <div class="field"><h4>SOFTWARE (AS SEEN IN THE EVIDENCE, NOT YET CONFIRMED)</h4><p>${p.software.map(esc).join(", ")}</p></div>
        <div class="field"><h4>EVIDENCE ON FILE</h4><ul>${p.evidence.map(([r, d]) => `<li><span class="px" style="font-size:10px;color:var(--pink)">${esc(r)}</span>: ${esc(d)}</li>`).join("")}</ul>
          <p class="small muted">IDs refer to the instructor's private evidence inventory. Files are held in the course Drive and are not public.</p></div>
      </div><div>
        <div class="field"><h4>LEARNING OBJECTIVE</h4><p>${esc(p.objective)}</p></div>
        <div class="field"><h4>STUDENT ACHIEVEMENT</h4><p>${esc(p.achievement)}</p></div>
        <div class="field"><h4>SKILLS: DEMONSTRATED</h4>${list(p.skillsDemonstrated)}</div>
        <div class="field"><h4>SKILLS: ASSUMED / NOT VERIFIABLE FROM EVIDENCE</h4>${list(p.skillsAssumed)}</div>
        <div class="field"><h4>INSTRUCTIONAL CONNECTION</h4><p>${esc(p.connection)}</p></div>
        <div class="field"><h4>TENURE RELEVANCE</h4><p>${esc(p.tenure)}</p></div>
        ${p.privacy ? `<div class="callout">${esc(p.privacy)}</div>` : ""}
      </div></div>
      ${p.growth ? `<h3 style="margin-top:14px">GROWTH: BEFORE → FEEDBACK → REVISION → FINAL</h3><div class="growth">${p.growth.map((g) => `<div class="step${g.missing ? " missing" : ""}"><b>${esc(g.stage.toUpperCase())}</b>${esc(g.text)}${g.ref ? `<span class="ref">${esc(g.ref)}</span>` : ""}</div>`).join("")}</div>` : ""}
      ${p.growthNote ? `<p class="small muted">${esc(p.growthNote)}</p>` : ""}
      ${p.themes.length ? `<h3 style="margin-top:14px">EVIDENCE CHAIN</h3>${p.themes.map((t) => `<p style="margin:6px 0"><span class="px" style="color:var(--yellow);font-size:12px">${esc(TH[t.theme])}</span> <span class="status ${t.status}">${t.status === "artifact" ? "ARTIFACT-SUPPORTED" : "NEEDS INSTRUCTOR EVIDENCE"}</span></p>
        <div class="chain">${t.chain.map((c, i) => `<div class="link"><i>${LABELS[i]}</i>${esc(c)}</div>`).join("")}</div>`).join("")}
        <p class="small muted">One project is evidence about one student's learning. It does not show course-wide outcomes.</p>` : ""}
      </div>`;
    if (!dlg.open) dlg.showModal();
    if (push) history.replaceState(null, "", "#case=" + id);
  }
  if (dlg) {
    dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest("[data-close]")) dlg.close(); });
    dlg.addEventListener("close", () => history.replaceState(null, "", location.pathname + location.search));
    document.addEventListener("click", (e) => { const c = e.target.closest(".card[data-id]"); if (c) openCase(c.dataset.id); const o = e.target.closest("[data-open]"); if (o) openCase(o.dataset.open); });
    const m = location.hash.match(/case=([\w-]+)/); if (m) openCase(m[1], false);
  }

  /* ---------- HOME ---------- */
  if (page === "home") {
    $("#featured").innerHTML = P.filter((p) => p.home).map(cardHTML).join("");
    const n = (s) => COV.filter((c) => c.status === s).length;
    $("#stats").innerHTML = [[COV.length, "files reviewed"], [P.length, "case studies"], [3, "courses"], [P.filter((p) => p.growth).length, "growth sequences"], [0, "student media published"]]
      .map(([v, l]) => `<div class="stat"><b>${v}</b><span>${l}</span></div>`).join("");
  }

  /* ---------- CREATIONS ---------- */
  if (page === "creations") {
    // per-course galleries
    const tabs = $("#course-tabs"), gal = $("#gallery");
    const showCourse = (k) => {
      $$("button", tabs).forEach((b) => b.setAttribute("aria-pressed", b.dataset.k === k));
      const c = CRS[k];
      gal.innerHTML = `<p class="lede" style="margin-top:0"><b class="px" style="color:var(--yellow)">${esc(k)}: ${esc(c.name)}</b> · Focus: ${c.focus.map(esc).join(" · ")}</p>
        <div class="grid g3">${P.filter((p) => p.course === k).map(cardHTML).join("")}</div>`;
    };
    tabs.innerHTML = Object.keys(CRS).map((k) => `<button class="chip" data-k="${k}">${k} · ${esc(CRS[k].name.toUpperCase())}</button>`).join("");
    tabs.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) showCourse(b.dataset.k); });
    showCourse("DMA 10");

    // catalogue = featured case studies + every reviewed/featured file
    const items = [
      ...P.map((p) => ({ kind: "case", id: p.id, title: p.title, course: p.course, software: p.software, skills: p.skills, outcomes: p.outcomes, text: [p.title, p.objective, p.achievement, p.skillsDemonstrated.join(" "), p.skills.join(" "), p.software.join(" ")].join(" "), p })),
      ...COV.filter((c) => c.status === "reviewed" || c.status === "featured").map((c) => { const g = G[c.project] || G["-"]; return { kind: "file", id: c.id, title: g.title, course: courseKey(c.course), software: [c.software], skills: g.skills, outcomes: outcomesOf(g.skills), text: [g.title, c.content, c.software, g.skills.join(" ")].join(" "), c }; })
    ];
    const uniq = (f) => [...new Set(items.flatMap(f))].filter((x) => x && x !== "?" && x !== "-").sort();
    const fill = (sel, vals) => { sel.innerHTML = `<option value="">All</option>` + vals.map((v) => `<option>${esc(v)}</option>`).join(""); };
    fill($("#f-course"), Object.keys(CRS)); fill($("#f-soft"), uniq((i) => i.software)); fill($("#f-skill"), uniq((i) => i.skills)); fill($("#f-out"), uniq((i) => i.outcomes));
    const render = () => {
      const q = $("#f-q").value.trim().toLowerCase(), fc = $("#f-course").value, fs = $("#f-soft").value, fk = $("#f-skill").value, fo = $("#f-out").value;
      const hit = items.filter((i) => (!fc || i.course === fc) && (!fs || i.software.includes(fs)) && (!fk || i.skills.includes(fk)) && (!fo || i.outcomes.includes(fo)) && (!q || i.text.toLowerCase().includes(q)));
      $("#cat-count").textContent = `${hit.length} OF ${items.length} ENTRIES`;
      const cases = hit.filter((i) => i.kind === "case"), files = hit.filter((i) => i.kind === "file");
      $("#cat-cases").innerHTML = cases.length ? cases.map((i) => cardHTML(i.p)).join("") : `<p class="muted">No case studies match.</p>`;
      $("#cat-files").innerHTML = files.map((i) => `<div class="mini${i.c.status === "featured" ? " feat" : ""}"><span class="id">${esc(i.id)} · ${esc(i.c.kind.toUpperCase())}${i.c.status === "featured" ? " · IN A CASE STUDY" : ""}</span><b>${esc(i.title.toUpperCase())}</b><span>${esc(i.c.content)}</span>
        <span class="tags">${ctag(i.c.course)}${i.c.course.includes("verified") ? vtag("verified") : vtag("inferred")}<span class="tag">${esc(i.c.software)}</span></span></div>`).join("") || `<p class="muted">No catalogued files match.</p>`;
    };
    $$("#filters input, #filters select").forEach((el) => el.addEventListener("input", render));
    $("#f-reset").addEventListener("click", () => { $$("#filters input, #filters select").forEach((el) => (el.value = "")); render(); });
    render();
  }

  /* ---------- EVIDENCE ---------- */
  if (page === "evidence") {
    const LABELS = ["Teaching practice", "Assignment", "Student work", "Demonstrated learning", "Evaluation evidence"];
    $("#themes").innerHTML = Object.entries(TH).map(([k, name]) => {
      const links = P.flatMap((p) => p.themes.filter((t) => t.theme === k).map((t) => ({ p, t })));
      return `<div class="panel" style="margin-bottom:26px"><h2 style="font-size:22px">${esc(name.toUpperCase())}</h2>
        ${links.length ? links.map(({ p, t }) => `<p style="margin:10px 0 4px"><button class="btn ghost" style="padding:7px 10px;font-size:10px" data-open="${p.id}">${esc(p.title)}</button> <span class="status ${t.status}">${t.status === "artifact" ? "ARTIFACT-SUPPORTED" : "NEEDS INSTRUCTOR EVIDENCE"}</span></p>
          <div class="chain">${t.chain.map((c, i) => `<div class="link"><i>${LABELS[i]}</i>${esc(c)}</div>`).join("")}</div>`).join("")
        : `<p class="callout gold">The Student Work folder has no artifact that documents this theme. Nothing is claimed here. Add evidence (for example, a dated feedback exchange or an evaluation excerpt) before linking a project.</p>`}</div>`;
    }).join("");
    if (location.hash.includes("case=")) { const m = location.hash.match(/case=([\w-]+)/); if (m) openCase(m[1], false); }
  }

  /* ---------- ETHICS ---------- */
  if (page === "ethics") {
    $("#perm").innerHTML = P.map((p) => `<tr><td><b>${esc(p.title)}</b><br><span class="small muted">${esc(p.attribution)}</span></td><td>${esc(p.course)} ${vtag(p.courseStatus)}</td>
      <td>${p.evidence.map((e) => esc(e[0])).join("<br>")}</td><td><span class="st deferred">RELEASE PENDING</span></td>
      <td class="small">${p.courseStatus === "inferred" ? "Confirm course. " : ""}${p.growth ? "Confirm the sequence is one student's work. " : ""}${p.privacy ? esc(p.privacy) + " " : ""}${(p.themes || []).some((t) => t.status === "needs-evidence") ? "Confirm or remove the evaluation-theme link. " : ""}Collect a signed media release and the student's preferred credit (anonymous, initials or full name).</td></tr>`).join("");
    const rows = () => {
      const f = $("#cov-f").value;
      const list = COV.filter((c) => !f || c.status === f);
      $("#cov-count").textContent = `${list.length} OF ${COV.length} FILES`;
      $("#cov").innerHTML = list.map((c) => `<tr><td class="px" style="font-size:10px;color:var(--pink)">${esc(c.id)}</td><td>${esc(c.kind)}</td><td>${esc(c.content)}</td><td>${esc(c.course)}</td><td><span class="st ${c.status}">${esc(c.status.toUpperCase())}</span></td><td class="small">${esc(c.reason)}${c.privacyFlag ? ' <span class="st deferred">PRIVACY FLAG</span>' : ""}</td><td class="small">${{ DOC: "Full document", IMG: "Full image", FRAME: "Preview frame", LIST: "Archive listing" }[c.depth]}</td></tr>`).join("");
    };
    $("#cov-f").addEventListener("input", rows); rows();
    const cnt = (s) => COV.filter((c) => c.status === s).length;
    $("#cov-sum").innerHTML = [["featured", cnt("featured")], ["reviewed", cnt("reviewed")], ["deferred", cnt("deferred")], ["excluded", cnt("excluded")]].map(([k, v]) => `<div class="stat"><b>${v}</b><span>${k}</span></div>`).join("");
  }
})();
