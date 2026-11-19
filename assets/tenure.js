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
    ${OF.map((o) => { const ni = niOf(o); return `<tr><td><a href="observations.html#${o.id}">${esc(o.evaluator)}</a></td><td>${esc(o.course)}</td><td>${esc(o.form)}</td><td>${esc(o.observed)}</td><td><b>${esc(o.overall)}</b></td><td class="small">${ni.length ? ni.map(esc).join("<br>") : "None"}</td></tr>`; }).join("")}
    </tbody></table></div>`;
  document.querySelectorAll("[data-obs-dash]").forEach((el) => (el.innerHTML = dash));

  if (page === "observations") {
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
          ${o.observedFacts.length ? `<h4 class="px" style="font-size:11px;color:var(--pink);margin-top:14px">WHAT THE EVALUATOR RECORDED (SUMMARY)</h4><ul>${o.observedFacts.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}</div>
        <div><h3>SUGGESTIONS FOR IMPROVEMENT</h3><ul>${o.suggestions.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
          ${o.suggestionsNote ? `<p class="small muted">${esc(o.suggestionsNote)}</p>` : ""}
          <p><a href="e3.html#q2">▶ What is being done about each suggestion (E-3 Q2 matrix)</a></p></div>
      </div></section>`).join("");
  }

  /* E-3 Q1: per-course summary tables (rendered into [data-e3-course]) */
  document.querySelectorAll("[data-e3-course]").forEach((el) => {
    const e = EV.find((x) => x.course === el.dataset.e3Course); if (!e) return;
    el.innerHTML = `<p><b>${e.responses} of ${e.audience}</b> students responded (<b>${esc(e.ratio)}</b>). Positive = Strongly Agree + Agree. Source: ${esc(e.source)}, ${e.pages.items}.</p>
      <div class="tbl-wrap"><table><thead><tr><th>#</th><th>ITEM (FORM WORDING)</th><th>POSITIVE</th><th>DISAGREE</th><th>RESPONSES</th></tr></thead><tbody>
      ${e.q.map((r, i) => `<tr${r[2] + r[3] ? ' class="hasdis"' : ""}><td>${i + 1}</td><td>${esc(Q[i])}</td><td><b>${pos(r)}/${tot(r)}</b></td><td>${r[2] + r[3]}</td><td>${tot(r)}</td></tr>`).join("")}
      </tbody></table></div>`;
  });
})();
