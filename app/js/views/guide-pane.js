// Guide pane: one trophy's official text, chips, counter, cited guide, missable call and numbered sources.
import { escapeHtml, formatAmount, shortUrl, readDate, KIND_LABELS } from "../trophy-data.js";
import { isSpoilerMasked, MASKED_NAME, MASKED_DESCRIPTION } from "../spoiler-rule.js";
import { medalSvg, missableFlagHtml } from "./checklist-view.js";

export function renderGuidePane(trophy, state) {
  const pane = document.getElementById("guide-pane");
  if (!trophy) {
    pane.innerHTML = `<p class="pane-empty">Pick a trophy on the left to read its guide.</p>`;
    return;
  }
  const p = state.progress;
  const masked = isSpoilerMasked(trophy, p);
  const earned = Boolean(p.earned[trophy.id]);
  const stage = state.stageByN.get(trophy.stage);
  pane.innerHTML =
    `<div class="pane-head">${medalSvg(trophy.grade, 40)}<div class="pane-title">` +
    `<h2>${escapeHtml(masked ? MASKED_NAME : trophy.name)}</h2>` +
    // G8: kind, stage and the missable call ride on the grade line as plain text instead of a row of chips.
    // Each part stays whole; the line may only break between parts.
    `<p class="grade-line">` +
    [
      `<span class="grade-word grade-${trophy.grade}">${trophy.grade}</span>`,
      escapeHtml(KIND_LABELS[trophy.kind]),
      `Stage ${stage.n} · ${escapeHtml(stage.title)}`,
      missableFlagHtml(trophy) || "Not missable",
      trophy.hidden ? "Hidden on PSN until earned" : "",
    ]
      .filter(Boolean)
      .map((part) => `<span class="gl-part">${part}</span>`)
      .join(`<span class="gl-sep">·</span> `) +
    `</p></div>` +
    `<button class="earn-toggle${earned ? " is-on" : ""}" data-action="toggle" data-id="${trophy.id}" aria-pressed="${earned}">` +
    `${earned ? "✓ Earned" : "Mark earned"}</button></div>` +
    `<div class="official${masked ? " is-masked" : ""}"><div><span class="official-label">Official description · PlayStation</span>` +
    `<p>${escapeHtml(masked ? MASKED_DESCRIPTION : trophy.description)}</p></div>${stepperHtml(trophy, state)}</div>` +
    (masked ? maskedBodyHtml(trophy) : guideBodyHtml(trophy, state)) +
    notesHtml(trophy, p);
}

// The player's own note: saved with the progress in this browser and carried in the export file.
function notesHtml(trophy, progress) {
  const text = progress.notes?.[trophy.id] || "";
  return (
    `<section class="notes-block"><h3><label for="note-input">My notes</label> ` +
    `<span class="h3-note">· saved with your progress and in the export file</span></h3>` +
    `<textarea id="note-input" data-id="${trophy.id}" rows="2" maxlength="600" ` +
    `placeholder="Where you left off, a spot to come back to, a reminder…">${escapeHtml(text)}</textarea>` +
    `<p class="keys-hint">Keys: <kbd>/</kbd> search · <kbd>j</kbd> <kbd>k</kbd> next / previous trophy · ` +
    `<kbd>x</kbd> mark earned · <kbd>Enter</kbd> open a focused row</p></section>`
  );
}

function stepperHtml(trophy, state) {
  if (!trophy.target) return "";
  const value = state.progress.counters[trophy.id] || 0;
  const mark = trophy.targetCite ? `<span class="cite-box">${trophy.targetCite}</span>` : "";
  return (
    `<span class="stepper"><button data-action="step" data-d="-1" aria-label="One less">−</button>` +
    `<span class="stepper-value num">${formatAmount(value, trophy.unit)} / ${formatAmount(trophy.target, trophy.unit)}</span>` +
    `<span class="stepper-unit">${trophy.unit === "$" ? "" : escapeHtml(trophy.unit)}${mark}</span>` +
    `<button data-action="step" data-d="1" aria-label="One more">+</button></span>`
  );
}

function maskedBodyHtml(trophy) {
  return (
    `<div class="masked-body"><p>This is a story trophy and the spoiler setting is on, so its name and guide ` +
    `stay hidden until you earn it.</p>` +
    `<button class="reveal reveal-big" data-action="reveal" data-id="${trophy.id}">Reveal this trophy</button></div>`
  );
}

// Cite numbers are boxed, full-size marks (not superscripts) so they stay readable when the page is shrunk.
function withMarks(text) {
  return escapeHtml(text).replace(/\[(\d+)\]/g, '<span class="cite-box">$1</span>');
}

function guideBodyHtml(trophy, state) {
  const steps = (trophy.steps || []).map((s) => `<li>${withMarks(s)}</li>`).join("");
  const unknown = trophy.unknown
    ? `<h3>Not pinned down yet</h3><p>${withMarks(trophy.unknown)}</p>`
    : `<h3>Not pinned down yet</h3><p class="quiet">Nothing open: the sources agree on this one.</p>`;
  // The missable call sits in a tinted callout: red for 'possible', amber for an unknown trigger, teal for 'no'.
  const call = trophy.missable === "possible" ? "possible" : trophy.missable === "unknown" ? "unknown" : "no";
  const callHead = { possible: "Missable? Possibly", unknown: "Missable? Not known", no: "Missable? No" }[call];
  // The short answer comes first, labelled, so the gist (what to do, the one risk) is read before the steps.
  // A trophy without one falls back to its one-line summary.
  const answer = trophy.answer
    ? `<p class="answer"><b class="answer-label">Short answer</b> ${withMarks(trophy.answer)}</p>`
    : `<p class="guide-text">${withMarks(trophy.guide)}</p>`;
  return (
    answer +
    `<section class="howto"><h3>How to get it <span class="h3-note">· step by step, in our own words</span></h3>` +
    `<ol class="steps">${steps}</ol></section>` +
    disagreeHtml(trophy) +
    `<div class="pane-cols"><section class="miss-call miss-${call}" aria-label="Can it be missed?">` +
    `<h3>${callHead}</h3><p>${withMarks(trophy.missableWhy)}</p>` +
    `${trophy.window ? `<p class="miss-window"><b>Window:</b> ${withMarks(trophy.window)}</p>` : ""}</section>` +
    `${citeKeyHtml(trophy, state)}</div>` +
    `<section class="open-q">${unknown}</section>` +
    `<section class="sources-block"><h3>Sources</h3>${sourcesHtml(trophy, state)}</section>`
  );
}

// What each boxed number on this page means, beside the missable call so it stays in view: the source's short
// name, the day we read it and how many of the trophy guides cite that page. All of it is counted here, at render.
function citeKeyHtml(trophy, state) {
  const all = state.trophies || [];
  const rows = trophy.cites
    .map((c) => {
      const src = state.sources[c.src];
      if (!src) return "";
      const keys = Object.entries(state.sources).filter(([, s]) => s.url === src.url).map(([k]) => k);
      const citing = all.filter((t) => t.cites.some((x) => keys.includes(x.src))).length;
      const read = src.read ? readDate(src.read).replace(/ \d{4}$/, "") : "not recorded";
      return (
        `<li title="${escapeHtml(src.name)} · ${escapeHtml(c.supports)}"><span class="cite-box">${c.n}</span>` +
        `<b>${escapeHtml(src.short || src.name)}</b><span>${read}</span>` +
        `<span class="num">${citing} of ${all.length}</span></li>`
      );
    })
    .join("");
  // G8: a plain list under a plain heading (no box), so the pane keeps only two callouts.
  return (
    `<section class="cite-key" aria-label="What the cite numbers mean"><h3>Sources</h3>` +
    `<p class="ck-sub">read · how many of ${all.length} guides cite it</p><ol>${rows}</ol></section>`
  );
}

// Where the sources give different versions, both stay on screen, each with its cites; we do not pick silently.
function disagreeHtml(trophy) {
  if (!trophy.disagree?.length) return "";
  const marks = (nums) => nums.map((n) => `<span class="cite-box">${n}</span>`).join("");
  const items = trophy.disagree
    .map(
      (d) =>
        `<p class="dis-on"><span class="dis-tag">Sources disagree</span>${escapeHtml(d.on)}</p><ul class="dis-vs">` +
        d.versions.map((v) => `<li>${escapeHtml(v.says)} ${marks(v.cites)}</li>`).join("") +
        `</ul>`
    )
    .join("");
  return `<section class="disagree" aria-label="Sources disagree: both versions">${items}</section>`;
}

function sourcesHtml(trophy, state) {
  const items = trophy.cites
    .map((c) => {
      const src = state.sources[c.src];
      if (!src) return "";
      const read = src.read ? `read ${readDate(src.read)}` : "read date not recorded";
      return (
        `<li><span class="cite-box">${c.n}</span><div><a href="${escapeHtml(src.url)}" target="_blank" rel="noopener" ` +
        `title="${escapeHtml(shortUrl(src.url))}">${escapeHtml(src.name)}</a><span class="src-note">` +
        `<span class="src-url">${read}</span> · ${escapeHtml(c.supports)}</span></div></li>`
      );
    })
    .join("");
  const exo = state.sources.exo;
  const hiddenNote =
    trophy.hidden && exo
      ? `<p class="src-extra">Hidden-on-PSN flag: <a href="${escapeHtml(exo.url)}" target="_blank" rel="noopener">Exophase</a></p>`
      : "";
  return `<ol class="sources">${items}</ol>${hiddenNote}${crossCheckHtml(trophy, state.sources)}`;
}

// List sites only list the official text; we show them as a cross-check of exactly what each one lists, nothing more.
function crossCheckHtml(trophy, sources) {
  const cited = new Set(trophy.cites.map((c) => c.src));
  const lists = Object.entries(sources).filter(([k, s]) => s.role === "list" && k !== "psn" && k !== "exo" && !cited.has(k));
  if (!lists.length) return "";
  const links = lists
    .map(([, s]) => `<a href="${escapeHtml(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.short)}</a> (${escapeHtml(s.lists)})`)
    .join(" · ");
  return `<p class="src-extra"><b>Cross-check of the official text only:</b> ${links}</p>`;
}
