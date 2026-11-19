/* Renderers for the E-3 / E-4 / E-5 / Observations pages. Data: observations.js, evaluations.js, feedback.js. */
(function () {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const page = document.body.dataset.page;
  const OF = window.OBS_FORMS || [], EV = window.EVALS || [], Q = window.EVAL_QUESTIONS || [];
  const pos = (r) => r[0] + r[1], tot = (r) => r[0] + r[1] + r[2] + r[3];
  const RT = { S: '<span class="rt s">SATISFACTORY</span>', NI: '<span class="rt ni">NEEDS IMPROVEMENT</span>', U: '<span class="rt u">UNSATISFACTORY</span>' };

  /* Observation dashboard (any page with data-obs-dash) */
  const niOf = (o) => o.criteria ? o.criteria.filter((c) => c[2] === "NI").map((c) => c[1]) : (o.checklist.NI ? [o.checklist.note.split("Needs Improvement: ")[1]] : []);
  const dash = `<div class="tbl-wrap"><table><caption class="sr-only">Fall 2026 faculty observations</caption>
    <thead><tr><th>EVALUATOR</th><th>COURSE</th><th>TYPE</th><th>DATE OBSERVED</th><th>OVERALL RESULT</th><th>ITEMS MARKED NEEDS IMPROVEMENT</th></tr></thead><tbody>
    ${OF.map((o) => { const ni = niOf(o); return `<tr><td>${esc(o.evaluator)}</td><td>${esc(o.course)}</td><td>${esc(o.form)}</td><td>${esc(o.observed)}</td><td><b>${esc(o.overall)}</b></td><td class="small">${ni.length ? ni.map(esc).join("<br>") : "None"}</td></tr>`; }).join("")}
    </tbody></table></div>`;
  document.querySelectorAll("[data-obs-dash]").forEach((el) => (el.innerHTML = dash));

  if (document.querySelector("#forms")) {
    $("#forms").innerHTML = OF.map((o) => `<section class="panel" id="${o.id}" style="margin-bottom:28px">
      <p class="sub">${esc(o.form)} · ${esc(o.course)} · observed ${esc(o.observed)}</p>
      <h2 style="font-size:22px">${esc(o.evaluator.toUpperCase())}</h2>
      <p><b>Class / assignment observed:</b> ${esc(o.assignment)}<br><b>Official overall result:</b> ${esc(o.overall)}<br>
      <span class="small muted">Discussed with evaluee: ${esc(o.discussed)} · Evaluator signed: ${esc(o.signedEvaluator)} · Evaluee signed: ${esc(o.signedEvaluee)} · Source: ${esc(o.source)}</span></p>
      <h3>OFFICIAL CRITERION RATINGS</h3>
      ${o.criteria ? `<div class="tbl-wrap"><table><thead><tr><th>AREA</th><th>CRITERION (FORM WORDING)</th><th>RATING</th></tr></thead><tbody>${o.criteria.map((c) => `<tr${c[2] !== "S" ? ' class="hasdis"' : ""}><td>${esc(c[0])}</td><td>${esc(c[1])}</td><td>${RT[c[2]]}</td></tr>`).join("")}</tbody></table></div>`
        : `<p><b>${o.checklist.S}</b> items Satisfactory · <b>${o.checklist.NI}</b> Needs Improvement · <b>${o.checklist.U}</b> Unsatisfactory.</p><p class="small">${esc(o.checklist.note)}</p>`}
      <div class="grid g2" style="margin-top:14px">
        <div><h3>STRENGTHS (EVALUATOR'S OWN WORDS)</h3>${o.strengths.map((s) => `<figure class="quote" style="margin-bottom:8px"><blockquote>“${esc(s)}”</blockquote></figure>`).join("")}
          ${o.strengthsNote ? `<p class="small muted">${esc(o.strengthsNote)}</p>` : ""}
          ${o.observedFacts.length ? `<h4 class="px" style="margin-top:14px">WHAT THE EVALUATOR RECORDED (SUMMARY)</h4><ul>${o.observedFacts.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}</div>
        <div><h3>SUGGESTIONS FOR IMPROVEMENT</h3><ul>${o.suggestions.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
          ${o.suggestionsNote ? `<p class="small muted">${esc(o.suggestionsNote)}</p>` : ""}
          <p><a href="e3.html#q2">▶ Response: E-3 Q2 improvement matrix</a></p></div>
      </div></section>`).join("");
  }

  /* E-3 Q1: per-course summary tables (rendered into [data-e3-course]) */
  document.querySelectorAll("[data-e3-course]").forEach((el) => {
    const e = EV.find((x) => x.course === el.dataset.e3Course); if (!e) return;
    el.innerHTML = `<p><b>${e.responses} of ${e.audience}</b> students responded (<b>${esc(e.ratio)}</b>). Positive = Strongly Agree + Agree. Source: ${esc(e.source)}, ${e.pages.items}.</p>
      <div class="tbl-wrap"><table><thead><tr><th>#</th><th>ITEM (FORM WORDING)</th><th>POSITIVE</th><th>DISAGREE</th><th>RESPONSES</th></tr></thead><tbody>
      ${e.q.map((r, i) => `<tr${r[2] + r[3] ? ' class="hasdis"' : ""}><td>${i + 1}</td><td>${esc(Q[i])}</td><td><b>${pos(r)}/${tot(r)}</b></td><td>${r[2] + r[3]}</td><td>${tot(r)}</td></tr>`).join("")}
      </tbody></table></div>
      <p class="small">Office hours (${esc(e.source)}, ${e.pages.office}): ${e.office.visited} of ${e.office.visited + e.office.notVisited} respondents had visited.${e.office.available ? ` All ${e.office.visited} Strongly Agreed the instructor was available and the time was helpful.` : ""}</p>`;
  });

  /* Verbatim comment lists */
  document.querySelectorAll("[data-e3-strengths]").forEach((el) => {
    const e = EV.find((x) => x.course === el.dataset.e3Strengths); if (!e) return;
    el.innerHTML = `<p class="small muted">All ${e.strengths.length} responses to "What are the strengths of this classroom instructor?", verbatim, in report order (${esc(e.source)}, ${e.pages.comments}). Each box is one student.</p>
      <div class="quotes">${e.strengths.map((s) => `<figure class="quote"><blockquote>“${esc(s)}”</blockquote></figure>`).join("")}</div>`;
  });
  document.querySelectorAll("[data-e3-suggestions]").forEach((el) => {
    const e = EV.find((x) => x.course === el.dataset.e3Suggestions); if (!e) return;
    el.innerHTML = `<p class="small muted">All ${e.suggestions.length} responses to "What are suggestions on how this classroom instructor can improve the class?", verbatim (${esc(e.source)}, ${e.pages.comments}). […] marks text left out of one long comment.</p>
      <ol class="sugg">${e.suggestions.map((s) => `<li>“${esc(s.text)}”</li>`).join("")}</ol>`;
  });

  /* Results by evaluation theme */
  const TH = [
    ["Clear explanations", [5], "DMA 10 item 6: 3 of 7 Disagreed."],
    ["More than one explanation of difficult points", [6], "DMA 10: 1 of 7 Disagreed."],
    ["Helpful, timely feedback", [8], "DMA 10: 2 of 7 Disagreed."],
    ["Interest in student success; responding to questions", [11, 9], "No respondent Disagreed in any course."],
    ["Engagement and class discussion", [7, 10], "DMA 10 item 11 had 6 responses."]
  ];
  document.querySelectorAll("[data-e3-themes]").forEach((el) => {
    el.innerHTML = `<div class="tbl-wrap"><table><thead><tr><th>THEME</th><th>ITEM</th>${EV.map((e) => `<th>${esc(e.course)}</th>`).join("")}<th>NOTE</th></tr></thead><tbody>
      ${TH.map(([name, items, note]) => items.map((i, k) => `<tr>${k === 0 ? `<td rowspan="${items.length}"><b>${esc(name)}</b></td>` : ""}<td>${i + 1}. ${esc(Q[i])}</td>${EV.map((e) => `<td><b>${pos(e.q[i])}/${tot(e.q[i])}</b></td>`).join("")}${k === 0 ? `<td rowspan="${items.length}" class="small">${esc(note)}</td>` : ""}</tr>`).join("")).join("")}
      </tbody></table></div>`;
  });

  /* Student work examples (anonymized; no media) */
  document.querySelectorAll("[data-student-work]").forEach((el) => {
    const P = window.PROJECTS || [];
    const ST = { partial: "Content reviewed in full", awaiting: "Video preview only" };
    el.innerHTML = `<div class="tbl-wrap"><table><thead><tr><th>WORK (ORIGINAL TITLE)</th><th>WHAT THE STUDENT CREATED</th><th>COURSE</th><th>REVIEW</th></tr></thead><tbody>
      ${P.map((p) => `<tr><td><b>${esc(p.title)}</b><br><span class="small muted">${esc(p.attribution.split(" (")[0])}</span></td><td class="small">${esc(p.created)}</td><td>${p.courseStatus === "verified" ? esc(p.course) : "Not stated in the work"}</td><td class="small">${ST[p.status] || ""}</td></tr>`).join("")}
      </tbody></table></div>`;
  });
})();
