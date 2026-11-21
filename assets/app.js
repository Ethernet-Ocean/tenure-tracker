/* Tenure Tracker. Shared behaviour; no build step, no dependencies.
   Evidence-first: evaluation figures and quotes are rendered from assets/evaluations.js and assets/observations.js,
   which are transcribed from the original signed reports. */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const page = document.body.dataset.page;
  const P = window.PROJECTS || [], COV = window.COVERAGE || [], G = window.GROUPS || {}, CRS = window.COURSES || {};
  const EV = window.EVALS || [], Q = window.EVAL_QUESTIONS || [], FB = window.FEEDBACK || [], OBS = window.OBSERVATIONS || [];

  /* ---------- chrome ---------- */
  // The site covers Appendix E-3 and E-4 only.
  const NAV = [
    ["index.html", "START HERE", ["home"]],
    ["e3.html", "E-3 STUDENT EVALUATIONS", ["e3"]],
    ["e4.html", "E-4 SELF-EVALUATION", ["e4"]]
  ];
  const JUMP = [
    ["E-3 Q1", "e3.html#q1"], ["E-3 Q2", "e3.html#q2"], ["E-3 Q3", "e3.html#q3"],
    ["1(a)", "e4.html#q1a"], ["1(b)", "e4.html#q1b"], ["1(c)", "e4.html#q1c"], ["1(d)", "e4.html#q1d"], ["1(e)", "e4.html#q1e"], ["1(f)", "e4.html#q1f"], ["1(g)", "e4.html#q1g"], ["1(h)", "e4.html#q1h"],
    ["E-4 Q2", "e4.html#q2"], ["E-4 Q3", "e4.html#q3"], ["E-4 Q4", "e4.html#q4"]
  ];
  const die = `<svg class="die" viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="3" width="26" height="26" rx="7" fill="#F06B9B" stroke="#0d0f24" stroke-width="3"/><circle cx="11" cy="11" r="2.6" fill="#FAEF88"/><circle cx="21" cy="21" r="2.6" fill="#FAEF88"/><circle cx="16" cy="16" r="2.6" fill="#FAEF88"/></svg>`;
  const header = $("#bar");
  if (header) header.innerHTML = `<div class="wrap"><a class="brand" href="index.html"><span>TENURE TRACKER</span><small class="brand-sub">Oceano Marshall | LBCC Faculty Tenure Portfolio | Year One (2026–2027)</small></a>
    <nav class="nav" aria-label="Main">${NAV.map(([h, t, ks]) => `<a href="${h}"${ks.includes(page) ? ' aria-current="page"' : ""}>${t}</a>`).join("")}</nav></div>
    <div class="jump"><div class="wrap"><span class="jl">JUMP TO:</span> ${JUMP.map(([t, h]) => `<a href="${h}">${t}</a>`).join("")}</div></div>`;
  const foot = $("#foot");
  if (foot) foot.innerHTML = `<div class="wrap"><p class="px">TENURE TRACKER · Oceano Marshall · Visual &amp; Media Arts · Long Beach City College</p>
    <p>This site supplements the official LBCC evaluation process. It is not an official LBCC submission and does not replace any required signed form.
    Student evaluation figures and comments are transcribed from the Fall 2026 Individual Reports; signed evaluations, observation forms and personnel records are not published here and are available to the committee on request.
    No student names, grades or work samples are published.</p></div>`;

  /* ---------- starfield (decorative) ---------- */
  const cv = $("#stars");
  if (cv && cv.getContext) {
    const ctx = cv.getContext("2d"); let W, H, S = [];
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; S = Array.from({ length: Math.min(140, W / 8) }, () => ({ x: Math.random() * W, y: Math.random() * H, z: Math.random() * 1.6 + .4, t: Math.random() * 6 })); };
    const draw = (t) => { ctx.clearRect(0, 0, W, H); for (const s of S) { const a = .35 + .35 * Math.sin(t / 700 + s.t); ctx.fillStyle = `rgba(250,239,136,${a})`; const p = Math.round(s.z * 2); ctx.fillRect(s.x | 0, s.y | 0, p, p); if (!still) { s.y += s.z * .12; if (s.y > H) s.y = 0; } } if (!still) requestAnimationFrame(draw); };
    addEventListener("resize", size); size(); requestAnimationFrame(draw);
  }

  /* ---------- helpers ---------- */
  const evalOf = (c) => EV.find((e) => e.course === c);
  const pos = (row) => row[0] + row[1];
  const tot = (row) => row[0] + row[1] + row[2] + row[3];
  const quote = (c, i) => { const e = evalOf(c); return { text: e.strengths[i], ref: `${c} · ${e.term} · ${e.source}, ${e.pages.comments} (strengths)` }; };
  const quoteHTML = (q) => `<figure class="quote"><blockquote>“${esc(q.text)}”</blockquote><figcaption>${esc(q.ref)}</figcaption></figure>`;
  const STATUS = { partial: ["PARTIALLY VERIFIED", "partial"], awaiting: ["AWAITING EVIDENCE", "awaiting"], verified: ["VERIFIED", "verified"] };
  const stTag = (s) => `<span class="vtag ${STATUS[s][1]}">${STATUS[s][0]}</span>`;
  const courseTag = (p) => p.courseStatus === "verified" ? `<span class="tag c${p.course.slice(4)}">${esc(p.course)}</span><span class="tag ver">COURSE VERIFIED</span>` : `<span class="tag inf" title="Course not stated in the evidence">COURSE NOT VERIFIED</span>`;
  const locked = (p) => `<div class="locked" role="img" aria-label="Student media withheld until a release is on file">
    <span class="lk">🔒</span><span class="px">EVIDENCE ON FILE</span><span class="small">${esc(p.format)}</span><span class="small muted">Media withheld · release pending</span></div>`;

  const cardHTML = (p) => `<button class="card" data-id="${p.id}" aria-haspopup="dialog">
    <div class="art">${locked(p)}</div>
    <div class="body"><span class="sub">${esc(p.attribution.split(" (")[0])} · ${esc(window.SEMESTER)}</span>
    <h3>${esc(p.title)}</h3><p>${esc(p.created.split(". ")[0])}.</p>
    <div class="tags">${stTag(p.status)}${courseTag(p)}</div></div></button>`;

  /* ---------- case-study dialog ---------- */
  const dlg = $("#case");
  function openCase(id) {
    const p = P.find((x) => x.id === id); if (!p || !dlg) return;
    const ul = (a) => `<ul>${a.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
    const F = (h, body) => `<div class="field"><h4>${h}</h4>${body}</div>`;
    dlg.innerHTML = `<div class="dlg-head"><div><span class="sub">Case study · ${esc(p.attribution)}</span><h2 style="margin:4px 0 0;font-size:19px">${esc(p.title)}</h2></div>
      <button class="btn" data-close>✕ CLOSE</button></div>
      <div class="dlg-body">
      <p style="margin-top:0">${stTag(p.status)} ${courseTag(p)}</p>
      <div class="case-grid"><div>
        <div style="aspect-ratio:16/9;border:4px solid var(--gold);border-radius:12px;overflow:hidden">${locked(p)}</div>
        ${F("ORIGINAL MEDIA", `<p>Withheld. No publication release is on file. The original is held in the course Drive.</p>`)}
        ${F("PROJECT TITLE", `<p>${esc(p.title)}</p><p class="small muted">Source: ${esc(p.titleSource)}</p>`)}
        ${F("COURSE & SEMESTER", `<p>${p.courseStatus === "verified" ? esc(p.course) + ": " + esc(CRS[p.course].name) + " (named in the student's filename)" : "Course: Not Verified" + (p.course.startsWith("DMA") ? ` (provisionally grouped with ${esc(p.course)})` : "")}</p><p class="small muted">Semester: Fall 2026 (file dates Sep–Oct 2026) · ${esc(p.weeks)}</p>`)}
        ${F("FORMAT", `<p>${esc(p.format)}</p>`)}
        ${F("SOFTWARE", `<p>${esc(p.software)}</p>`)}
        ${F("EVIDENCE SOURCE", `<ul>${p.evidence.map(([r, d]) => `<li><span class="px" >${esc(r)}</span>: ${esc(d)}</li>`).join("")}</ul><p class="small muted">IDs refer to the private evidence inventory (course Drive, Student Work folder).</p>`)}
      </div><div>
        ${F("ASSIGNMENT GOAL", `<p>${esc(p.assignmentGoal)}</p>`)}
        ${F("WHAT THE STUDENT CREATED", `<p>${esc(p.created)}</p>`)}
        ${F("DEMONSTRATED SKILLS (VISIBLE IN THE EVIDENCE)", ul(p.skills))}
        ${F("INSTRUCTIONAL SUPPORT", `<p>${esc(p.support)}</p>`)}
        ${F("LEARNING OUTCOME", `<p>${esc(p.outcome)}</p>`)}
        ${F("TENURE CONNECTION", `<p>${esc(p.tenure)}</p>`)}
        ${F("PUBLICATION PERMISSION", `<p>${esc(p.permission)}</p>`)}
        ${p.note ? `<div class="callout gold">${esc(p.note)}</div>` : ""}
        ${p.privacy ? `<div class="callout" style="margin-top:8px">${esc(p.privacy)}</div>` : ""}
      </div></div>
      ${p.sequence ? `<h3 style="margin-top:16px">POSSIBLE SEQUENCE (UNCONFIRMED)</h3><div class="growth" style="grid-template-columns:repeat(${p.sequence.length},1fr)">${p.sequence.map((g) => `<div class="step"><b>${esc(g.stage.toUpperCase())}</b>${esc(g.text)}<span class="ref">${esc(g.ref)}</span></div>`).join("")}</div><p class="small muted">${esc(p.sequenceNote)}</p>` : ""}
      </div>`;
    if (!dlg.open) dlg.showModal();
    history.replaceState(null, "", "#case=" + id);
  }
  if (dlg) {
    dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest("[data-close]")) dlg.close(); });
    dlg.addEventListener("close", () => history.replaceState(null, "", location.pathname + location.search));
    document.addEventListener("click", (e) => { const c = e.target.closest(".card[data-id], [data-open]"); if (c) openCase(c.dataset.id || c.dataset.open); });
    const m = location.hash.match(/case=([\w-]+)/); if (m) setTimeout(() => openCase(m[1]), 0);
  }

  /* ---------- evaluation rendering ---------- */
  const bar = (row) => `<span class="bar5" aria-hidden="true">${[0, 1, 2, 3].map((i) => `<i class="b${i}" style="flex:${row[i]}"></i>`).join("")}</span>`;
  const evalTable = (e) => `<div class="tbl-wrap"><table class="evt"><caption class="sr-only">${esc(e.course)} item results</caption>
    <thead><tr><th>#</th><th>ITEM (ORIGINAL WORDING)</th><th>SA</th><th>A</th><th>D</th><th>SD</th><th>POSITIVE (n/N)</th><th>MEAN*</th><th></th></tr></thead>
    <tbody>${e.q.map((r, i) => `<tr${r[2] + r[3] ? ' class="hasdis"' : ""}><td>${i + 1}</td><td>${esc(Q[i])}</td><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td><b>${pos(r)}/${tot(r)}</b></td><td>${r[4].toFixed(2)}</td><td style="min-width:110px">${bar(r)}</td></tr>`).join("")}</tbody></table></div>
    <p class="small muted">SA = Strongly Agree (4), A = Agree (3), D = Disagree (2), SD = Strongly Disagree (1). Positive = SA + A. *Mean as printed in the report (1–4 scale). Rows with any Disagree are highlighted. Source: ${esc(e.source)}, ${e.pages.items}.</p>`;
  const evalHeader = (e) => `<div class="stats" style="margin:12px 0 16px">
    <div class="stat"><b>${e.responses}</b><span>responses</span></div><div class="stat"><b>${e.audience}</b><span>students surveyed</span></div>
    <div class="stat"><b>${esc(e.ratio)}</b><span>response rate</span></div><div class="stat"><b>${e.q.filter((r) => pos(r) === tot(r)).length}/12</b><span>items with every response positive</span></div></div>`;

  /* ---------- HOME ---------- */
  if (page === "home" && $("#featured")) {
    $("#featured").innerHTML = P.filter((p) => p.home).map(cardHTML).join("");
    const resp = EV.reduce((a, e) => a + e.responses, 0), aud = EV.reduce((a, e) => a + e.audience, 0);
    $("#stats").innerHTML = [[COV.length, "Drive files inventoried"], [P.length, "case studies (anonymous)"], [`${resp}/${aud}`, "evaluation responses / students surveyed†"], [0, "student media published"]]
      .map(([v, l]) => `<div class="stat"><b>${v}</b><span>${l}</span></div>`).join("");
    $("#evals-mini").innerHTML = EV.map((e) => `<a class="panel mini-eval" href="voices.html#${e.course.replace(" ", "")}"><span class="sub">${esc(e.course)} · CRN ${e.crn}</span><h3 style="margin:.2em 0">${esc(e.name.toUpperCase())}</h3>
      <p>${e.responses} of ${e.audience} students responded (${esc(e.ratio)}). ${e.q.filter((r) => pos(r) === tot(r)).length} of 12 items had every response positive.</p>${quoteHTML(quote(e.course, e.course === "DMA 40" ? 1 : e.course === "DMA 15" ? 2 : 0))}</a>`).join("");
  }

  /* ---------- CREATIONS ---------- */
  if (page === "creations") {
    const groups = ["DMA 10", "DMA 15", "DMA 40", "Not Verified"];
    $("#featured").innerHTML = groups.map((g) => { const list = P.filter((p) => (p.course.startsWith("DMA") ? p.course : "Not Verified") === g); if (!list.length) return "";
      const head = g === "Not Verified" ? "NO COURSE GROUP" : g + ": " + CRS[g].name.toUpperCase();
      return `<h3 style="margin-top:28px">${esc(head)}</h3><p class="small muted" style="margin-top:-6px">${g === "DMA 15" ? "Provisional group. One project's course is verified from its filename; the others are not." : "Provisional group: course not verified for any project here."}</p><div class="grid g3">${list.map(cardHTML).join("")}</div>`; }).join("");
    $("#notfound").innerHTML = (window.NOT_FOUND || []).map((n) => `<li>${esc(n)}</li>`).join("");
    const items = COV.filter((c) => c.status === "reviewed" || c.status === "featured").map((c) => { const g = G[c.project] || G["-"]; return { c, g, text: [g.title, c.content, c.software, g.skills.join(" ")].join(" ").toLowerCase() }; });
    const soft = (s) => s.replace(/ \(.*$/, "");
    const fill = (sel, vals) => { sel.innerHTML = `<option value="">All</option>` + vals.map((v) => `<option>${esc(v)}</option>`).join(""); };
    fill($("#f-course"), ["DMA 10", "DMA 15", "DMA 40"]);
    fill($("#f-soft"), [...new Set(items.map((i) => soft(i.c.software)))].sort());
    fill($("#f-skill"), [...new Set(items.flatMap((i) => i.g.skills))].sort());
    fill($("#f-depth"), ["Full document", "Full image", "Preview frame"]);
    const DEPTH = { DOC: "Full document", IMG: "Full image", FRAME: "Preview frame", LIST: "Archive listing" };
    const render = () => {
      const q = $("#f-q").value.trim().toLowerCase(), fc = $("#f-course").value, fs = $("#f-soft").value, fk = $("#f-skill").value, fd = $("#f-depth").value;
      const hit = items.filter((i) => (!fc || i.c.course.startsWith(fc)) && (!fs || soft(i.c.software) === fs) && (!fk || i.g.skills.includes(fk)) && (!fd || DEPTH[i.c.depth] === fd) && (!q || i.text.includes(q)));
      $("#cat-count").textContent = `${hit.length} OF ${items.length} FILES`;
      $("#cat-files").innerHTML = hit.map(({ c, g }) => `<div class="mini${c.status === "featured" ? " feat" : ""}"><span class="id">${esc(c.id)} · ${esc(c.kind.toUpperCase())} · ${DEPTH[c.depth].toUpperCase()}</span><b>${esc(g.title.toUpperCase())}</b><span>${esc(c.content)}</span>
        <span class="small muted">Software: ${esc(c.software)}<br>Course: ${c.course.includes("verified") ? "DMA 15 (named in filename)" : "Not Verified (provisional group " + esc(c.course) + ")"}</span></div>`).join("") || `<p class="muted">No files match.</p>`;
    };
    $$("#filters input, #filters select").forEach((el) => el.addEventListener("input", render));
    $("#f-reset").addEventListener("click", () => { $$("#filters input, #filters select").forEach((el) => (el.value = "")); render(); });
    render();
  }

  /* ---------- STUDENT VOICES ---------- */
  if (page === "voices") {
    $("#courses").innerHTML = EV.map((e) => `<section class="panel" id="${e.course.replace(" ", "")}" style="margin-bottom:30px">
      <p class="sub">${esc(e.term)} · CRN ${e.crn} · ${esc(e.source)}</p><h2>${esc(e.course)}: ${esc(e.name.toUpperCase())}</h2>
      ${evalHeader(e)}
      <h3>WHAT STUDENTS SAID ABOUT STRENGTHS</h3>
      <p class="small muted">Every response to "What are the strengths of this classroom instructor?" (${e.strengths.length} comments), verbatim with original spelling, in report order. Each box is one student's comment. Source: ${esc(e.source)}, ${e.pages.comments}.</p>
      <div class="quotes">${e.strengths.map((s) => `<figure class="quote"><blockquote>“${esc(s)}”</blockquote><figcaption>${esc(e.course)} · ${esc(e.term)} · ${e.pages.comments}</figcaption></figure>`).join("")}</div>
      <details style="margin-top:16px"><summary class="px">ALL 12 SURVEY ITEMS + OFFICE HOURS</summary>${evalTable(e)}
        <p><b>Office hours</b> (${esc(e.source)}, ${e.pages.office}): ${e.office.visited} of ${e.office.visited + e.office.notVisited} respondents said they had visited.
        ${e.office.available ? ` Of those ${e.office.visited}, ${e.office.available[0]} Strongly Agreed the instructor was available and ${e.office.helpful[0]} Strongly Agreed the time was helpful.` : ""}</p></details>
      <p style="margin-top:14px"><a href="e3.html#verbatim">▶ Suggestions for improvement</a></p>
    </section>`).join("");
    $("#obs").innerHTML = OBS.map((o) => `<tr><td>${esc(o.evaluator)}</td><td>${esc(o.course)}</td><td>${esc(o.type)}</td><td><span class="st deferred">DOCUMENT NOT PROVIDED</span></td><td class="small">No rating, date or comment is shown until the official form is provided.</td></tr>`).join("");
  }

  /* ---------- FEEDBACK → ACTION ---------- */
  if (page === "feedback") {
    $("#suggest").innerHTML = EV.map((e) => `<div class="panel"><h3>${esc(e.course)}: ALL ${e.suggestions.length} SUGGESTION COMMENTS</h3>
      <p class="small muted">"What are suggestions on how this classroom instructor can improve the class?" Verbatim. […] marks text left out of a long comment. ${esc(e.source)}, ${e.pages.comments}.</p>
      <ol class="sugg">${e.suggestions.map((s) => `<li>“${esc(s.text)}”${s.excerpted ? ' <span class="small muted">(excerpt)</span>' : ""}</li>`).join("")}</ol></div>`).join("");
    $("#themes").innerHTML = FB.map((t) => `<article class="fb">
      <div class="fb-h"><h3>${esc(t.theme.toUpperCase())}</h3><span class="tag">${esc(t.course)}</span></div>
      <div class="fb-grid">
        <div><h4>FEEDBACK</h4>${t.evidence.map((v) => `<div class="ev ${v.kind}"><span class="k">${v.kind === "comment" ? "STUDENT COMMENT" : v.kind === "item" ? "SURVEY ITEM" : "FOR CONTEXT"}</span>${v.kind === "comment" ? "“" + esc(v.text) + "”" : esc(v.text)}<span class="ref">${esc(v.ref)}</span></div>`).join("")}${t.note ? `<p class="small muted">${esc(t.note)}</p>` : ""}</div>
        <div><h4>ACTION</h4>${t.responses.length ? `<ul>${t.responses.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` : `<p class="muted">No response has been reported yet.</p>`}
          <span class="vtag awaiting">${t.responses.length ? "REPORTED BY INSTRUCTOR: NOT YET VERIFIED" : "NO ACTION DOCUMENTED"}</span></div>
        <div><h4>IMPROVEMENT</h4><p class="muted">No evidence yet. Needed: dated materials (for example, a revised Canvas module, checklist or tutorial) and, later, follow-up student feedback.</p></div>
      </div></article>`).join("");
  }

  /* ---------- TEACHING EVIDENCE ---------- */
  if (page === "evidence") {
    const THEMES = [
      { name: "Clear explanations", items: [5], quotes: [["DMA 15", 2], ["DMA 15", 3], ["DMA 10", 5], ["DMA 10", 6]], counter: "DMA 10 item 6: 3 of 7 respondents Disagreed that subject matter was presented clearly. Several DMA 10 and DMA 15 comments ask for clearer and more visual instructions (see Feedback → Action)." },
      { name: "Patience & more than one explanation", items: [6], quotes: [["DMA 10", 0], ["DMA 15", 4], ["DMA 15", 0]], counter: "DMA 10 item 7: 1 of 7 Disagreed. One DMA 10 comment describes feeling left behind by the pace." },
      { name: "Helpful, timely feedback", items: [8], quotes: [["DMA 15", 5]], counter: "DMA 10 item 9: 2 of 7 Disagreed." },
      { name: "Individualized help & interest in student success", items: [11, 9], quotes: [["DMA 40", 1], ["DMA 15", 1], ["DMA 10", 3]], counter: "No respondent in any course Disagreed on items 10 or 12." },
      { name: "Engagement", items: [7, 10], quotes: [["DMA 10", 1]], counter: "DMA 10 item 11 had 6 responses, not 7. One DMA 10 comment asks for more engaging, less rushed sessions." },
      { name: "Career & industry connection", items: [], quotes: [["DMA 10", 2], ["DMA 10", 4]], counter: "There is no survey item for this theme; the evidence is open-ended comments only." }
    ];
    $("#themes").innerHTML = THEMES.map((t) => `<section class="panel" style="margin-bottom:26px"><h2 style="font-size:22px">${esc(t.name.toUpperCase())}</h2>
      ${t.items.length ? `<div class="tbl-wrap" style="margin-bottom:12px"><table><thead><tr><th>SURVEY ITEM</th>${EV.map((e) => `<th>${esc(e.course)}</th>`).join("")}</tr></thead><tbody>
        ${t.items.map((i) => `<tr><td>${i + 1}. ${esc(Q[i])}</td>${EV.map((e) => `<td><b>${pos(e.q[i])}/${tot(e.q[i])}</b> positive<br><span class="small muted">${e.q[i][0]} SA · ${e.q[i][1]} A · ${e.q[i][2]} D</span></td>`).join("")}</tr>`).join("")}
      </tbody></table></div>` : ""}
      <div class="quotes">${t.quotes.map(([c, i]) => quoteHTML(quote(c, i))).join("")}</div>
      <div class="callout gold" style="margin-top:12px"><b>Counter-evidence and limits:</b> ${esc(t.counter)}</div>
      <div class="chain" style="margin-top:14px">
        <div class="link"><i>TEACHING PRACTICE</i>Awaiting documentation (lesson plans / Canvas not yet provided)</div>
        <div class="link"><i>ASSIGNMENT</i>Awaiting documentation</div>
        <div class="link"><i>STUDENT ARTIFACT</i>Not linked: no artifact's course and assignment are verified for this theme</div>
        <div class="link"><i>DEMONSTRATED LEARNING</i>Not established</div>
        <div class="link ok"><i>EVALUATION EVIDENCE</i>Verified: Fall 2026 course evaluations (above)</div>
      </div></section>`).join("");
  }

  /* ---------- EVIDENCE VAULT ---------- */
  if (page === "ethics") {
    $("#perm").innerHTML = P.map((p) => `<tr><td><b>${esc(p.title)}</b><br><span class="small muted">${esc(p.attribution)}</span></td><td>${p.courseStatus === "verified" ? esc(p.course) : "Not Verified"}</td>
      <td>${p.evidence.map((e) => esc(e[0])).join("<br>")}</td><td>${stTag(p.status)}<br><span class="st deferred" style="margin-top:4px;display:inline-block">RELEASE PENDING</span></td>
      <td class="small">${p.courseStatus !== "verified" ? "Confirm course and assignment. " : ""}${p.status === "awaiting" ? "Watch the full footage (needs Drive sign-in). " : ""}${p.sequence ? "Confirm whether the files are one student's work. " : ""}${p.privacy ? esc(p.privacy) + " " : ""}Collect a signed media release and the student's preferred credit.</td></tr>`).join("");
    const rows = () => {
      const f = $("#cov-f").value; const list = COV.filter((c) => !f || c.status === f);
      $("#cov-count").textContent = `${list.length} OF ${COV.length} FILES`;
      $("#cov").innerHTML = list.map((c) => `<tr><td class="px" >${esc(c.id)}</td><td>${esc(c.kind)}</td><td>${esc(c.content)}</td><td class="small">${esc(c.software)}</td><td><span class="st ${c.status}">${esc(c.status.toUpperCase())}</span></td><td class="small">${esc(c.reason)}${c.privacyFlag ? ' <span class="st deferred">PRIVACY FLAG</span>' : ""}</td><td class="small">${{ DOC: "Full document", IMG: "Full image", FRAME: "Preview frame only", LIST: "Archive listing" }[c.depth]}</td></tr>`).join("");
    };
    $("#cov-f").addEventListener("input", rows); rows();
    const cnt = (s) => COV.filter((c) => c.status === s).length;
    $("#cov-sum").innerHTML = [["featured", cnt("featured")], ["reviewed", cnt("reviewed")], ["deferred", cnt("deferred")], ["excluded", cnt("excluded")], ["preview frame only", COV.filter((c) => c.depth === "FRAME").length]].map(([k, v]) => `<div class="stat"><b>${v}</b><span>${k}</span></div>`).join("");

    // Evidence register: every claim category on this site, with its source and status.
    const R = [];
    R.push(["Name, title, department, first semester (Fall 2026)", "Identity", "Instructor's brief (Nov 16, 2026)", "n/a", "2026–27", "Self-reported", "Partial: not checked against an appointment letter", "Public-safe", "Instructor", "Home"]);
    EV.forEach((e) => {
      R.push([`${e.course}: ${e.responses} of ${e.audience} responded (${e.ratio}); all 12 item counts`, "Teaching (student evaluation)", e.source, `${e.pages.office}; ${e.pages.items}`, `${e.term} · CRN ${e.crn}`, "Survey", "Verified (transcribed)", "Public-safe summary; PDF not published", "Instructor (own record)", "Student Voices; Teaching Evidence"]);
      R.push([`${e.course}: ${e.strengths.length} strengths comments quoted verbatim`, "Teaching (student comments)", e.source, e.pages.comments, e.term, "Survey comment", "Verified (verbatim)", "Anonymous", "Instructor (own record)", "Student Voices; Teaching Evidence"]);
      R.push([`${e.course}: ${e.suggestions.length} suggestion comments`, "Teaching (constructive feedback)", e.source, e.pages.comments, e.term, "Survey comment", "Verified (verbatim; 1 DMA 10 comment excerpted)", "Anonymous", "Instructor (own record)", "Feedback → Action"]);
    });
    FB.forEach((t) => R.push([`Response to "${t.theme}": ${t.responses.join("; ") || "none reported"}`, "Teaching improvement", "Instructor's brief (Nov 16, 2026)", "n/a", t.course, "Self-report", "Unavailable: no dated evidence", "Public-safe", "Instructor", "Feedback → Action"]));
    (window.OBS_FORMS || []).forEach((o) => R.push([`${o.form} observation of ${o.course} by ${o.evaluator}: overall ${o.overall}`, "Teaching (faculty observation)", o.source, "All pages", `${o.course} · observed ${o.observed}`, "Signed observation", "Verified (transcribed)", "Summary and quotes public; PDF not published", "Instructor (own personnel record)", "Faculty Observations; E-3 Q2; E-5"]));
    [["Teach Online Seminar 3.0 completed", "Professional development", "Parchment digital badge", "Badge page", "Issued Sep 9, 2026", "Badge", "Verified", "Public-safe", "Instructor", "E-4 Q3"],
     ["Compliance trainings incl. Diversity and Inclusion (13 min), Title IX, FERPA", "Professional development / DEIA", "8 certificates of completion", "Each certificate", "Jul 25 – Aug 6, 2026", "Certificate", "Verified", "Public-safe", "Instructor", "E-4 Q4"],
     ["22.63 FLEX hours", "Professional development", "FLEX transcript", "—", "Fall 2026", "Transcript", "Unavailable (reported only)", "Public-safe", "Instructor", "E-4 Q3"],
     ["Oct 28 industry advisory recommendation (3 motions carried)", "Curriculum", "Advisory attendance and approval record; draft minutes", "pp. 1–4", "Oct 28, 2026", "Meeting record", "Verified; minutes marked DRAFT FOR REVIEW", "Public-safe (member names and affiliations)", "n/a", "E-4 1(h)"],
     ["Department approval of the A.S.", "Curriculum", "Department approval addendum", "Department Action", "—", "Approval form", "Not approved yet (fields blank)", "Public-safe", "n/a", "E-4 1(h)"],
     ["DMA 43 / DMA 45 course proposals", "Curriculum", "CourseLeaf proposal PDFs", "Header", "Fall 2026", "Proposal draft", "Verified as drafts (no effective term)", "Public-safe", "n/a", "E-4 1(h)"],
     ["Sep 10 and Sep 16 curriculum meetings", "Curriculum / service", "Meeting notes; minutes", "Whole documents", "Sep 10 & 16, 2026", "Meeting record", "Verified (instructor-prepared records)", "Public-safe", "n/a", "E-4 Q2"],
     ["MLK 2027 T-shirt contest coordinator", "Service", "Contest flyer", "Footer", "Deadline Dec 2026 (TBD)", "Flyer", "Verified role; dates unverified", "Public-safe", "n/a", "E-4 Q2"],
     ["Meet the Arts high-school breakouts", "Service / outreach", "Two slide decks", "Title slides", "Undated", "Slides", "Verified materials; date reported", "Public-safe", "n/a", "E-4 Q2"]
    ].forEach((r) => R.push(r));
    P.forEach((p) => R.push([`Case study: ${p.title}`, "Student work", p.evidence.map((x) => x[0]).join(", "), "Drive · Student Work folder", p.courseStatus === "verified" ? `${p.course} · Fall 2026` : "Course Not Verified · Fall 2026", "Work sample", p.status === "partial" ? "Partial (content inspected; course/goal unverified)" : "Awaiting (preview frame only)", "Restricted media; anonymized description public", "Pending", "Student Creations"]));
    R.push(['DMA 10 Canvas structure: 4 units, 16 weekly Discover/Discuss/Demonstrate modules', 'Teaching (course design)', 'Canvas export dma-10-...-71864-export.imscc', 'course_settings/module_meta.xml', 'DMA 10 · exported Aug 25, 2026', 'Course export', 'Verified for Aug 25; state during term unverified', 'Public-safe', 'Instructor', 'DMA 10 Audit']);
    R.push(['DMA 10 UDL tutorial credit option', 'Teaching (UDL)', 'DMA10_71864_Marshall (1).pdf', 'p. 8', 'DMA 10 · file dated Oct 12, 2026', 'Syllabus', 'Verified that the option is stated; student use unverified', 'Public-safe', 'Instructor', 'DMA 10 Audit']);
    R.push(['DMA 10 Roblox obby: DMA 15 playtest feedback and revision guide (7 projects)', 'Teaching (formative feedback)', 'DMA10_DMA15_Playtest_Feedback.docx', 'Whole document', 'DMA 10 · Sep 30, 2026', 'Instructor-authored feedback', 'Verified that it exists; delivery to students unverified', 'Restricted (student names); summarized only', 'Instructor', 'DMA 10 Audit']);
    R.push(['Oct 27 Unity physics lesson plans (5 files) and Castaño observation', 'Teaching (lesson / observation)', 'Not provided', 'n/a', 'DMA 10 · Oct 27, 2026', 'Lesson plan / observation', 'Unavailable', 'Pending', 'Pending', 'DMA 10 Audit (listed as missing)']);
    R.push([`Inventory of ${COV.length} Drive files`, "Student work", "Drive · Student Work folder", "Weeks 1–3 / 4–6 / 7–9", "Fall 2026", "Inventory", "Verified (listing); depth varies per file", "Public-safe (no filenames)", "n/a", "Evidence Vault"]);
    $("#reg").innerHTML = R.map((r) => `<tr>${r.map((c, i) => `<td${i ? ' class="small"' : ""}>${esc(c)}</td>`).join("")}</tr>`).join("");
  }
})();
