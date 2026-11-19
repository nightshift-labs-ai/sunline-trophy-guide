// Roadmap view: 7 stage cards on the sun-line spine with progress and cites, the missable watch list, and the Missables page.
import { escapeHtml, formatAmount } from "../trophy-data.js";
import { maskedName, isSpoilerMasked } from "../spoiler-rule.js";
import { medalSvg, missableFlagHtml } from "./checklist-view.js";

export function renderRoadmap(stages, progress) {
  const flagged = stages.flatMap((s) => s.trophies).filter((t) => t.missable);
  const cards = stages.map((s) => stageCardHtml(s, progress)).join("");
  document.getElementById("roadmap").innerHTML =
    `<div class="road-head"><h2 class="banner-title">Roadmap to the platinum</h2>${nextUpHtml(stages, progress)}</div>` +
    `<p class="missables-line">${missablesSummaryHtml(flagged)}<span>${escapeHtml(context.missables)}</span></p>` +
    `<div class="road-grid"><div class="stages">${cards}${methodCardHtml()}</div>` +
    `${watchListHtml(flagged, stages, progress)}</div>`;
}

// "Next up": the first roadmap stage with work left; inside it a possibly-missable trophy comes first, then a
// counter already under way, then roadmap order. Two more follow as "then".
export function pickNextUp(stages, progress) {
  const rank = (t) => (t.missable === "possible" ? 0 : progress.counters[t.id] ? 1 : 2);
  const open = stages.flatMap((s) =>
    s.trophies.filter((t) => !progress.earned[t.id] && t.grade !== "platinum").map((t, i) => ({ t, s, i })),
  );
  if (!open.length) return [];
  const first = open[0].s.n;
  const head = open.filter((o) => o.s.n === first).sort((a, b) => rank(a.t) - rank(b.t) || a.i - b.i);
  return [...head, ...open.filter((o) => o.s.n !== first)].slice(0, 3);
}

function nextUpHtml(stages, progress) {
  const [pick, ...then] = pickNextUp(stages, progress);
  if (!pick) return `<div class="next-up"><span class="next-label">Next up</span><b>Only the platinum is left.</b></div>`;
  const t = pick.t;
  const value = progress.counters[t.id];
  const why =
    t.missable === "possible"
      ? `possibly missable: do it before ${escapeHtml(pick.s.title)} ends`
      : value
        ? "under way: finish what you started"
        : escapeHtml(pick.s.title);
  const count = t.target ? ` · <b class="num">${formatAmount(value || 0, t.unit)} / ${formatAmount(t.target, t.unit)}</b>` : "";
  const thenText = then.map((o) => escapeHtml(isSpoilerMasked(o.t, progress) ? "a story trophy" : o.t.name)).join(", ");
  return (
    `<div class="next-up" aria-label="Next up"><span class="next-label">Next up</span>` +
    `<a class="next-name" href="#/checklist?f=all&amp;t=${t.id}">${medalSvg(t.grade, 18)}${escapeHtml(maskedName(t, progress))}</a>` +
    `<span class="next-why">${count.slice(3)}</span>` +
    `<span class="next-then">Stage ${pick.s.n} · ${why}${thenText ? ` · then ${thenText}` : ""}</span></div>`
  );
}

// Fills the free grid slot under stage 7: how the stages were put together, with PowerPyx's own hour estimates.
function methodCardHtml() {
  return (
    `<article class="stage-card method-card" aria-label="How this roadmap is built"><h3 class="stage-title">How this roadmap is built</h3>` +
    `<p>Order from the official descriptions; chapters cited <sup class="cite-mark">[PPX][OL]</sup>. ` +
    `Time: story 60-80 h, 100% checklist ~100 h, strands ~10 h <sup class="cite-mark">[PPX]</sup>. ` +
    `No mission replay <sup class="cite-mark">[PPX][OL]</sup>.</p></article>`
  );
}

let context = { missables: "", sources: {} };

// Boot hands over the parts of the data files the roadmap needs besides the stages themselves.
export function setRoadmapContext(next) {
  context = { ...context, ...next };
}

function missablesSummaryHtml(flagged) {
  const possible = flagged.filter((t) => t.missable === "possible").length;
  const unknown = flagged.filter((t) => t.missable === "unknown").length;
  return `<span class="flag flag-red">${possible} POSSIBLY MISSABLE</span><span class="flag flag-amber">${unknown} ? TRIGGER UNKNOWN</span>`;
}

function citeMarks(keys) {
  return keys.map((k) => `[${escapeHtml(context.sources[k]?.short || k)}]`).join("");
}

function stageCardHtml(stage, progress) {
  const total = stage.trophies.length;
  const earned = stage.trophies.filter((t) => progress.earned[t.id]).length;
  const pct = total ? Math.round((earned / total) * 100) : 0;
  const chips = stage.trophies.map((t) => trophyChipHtml(t, progress)).join("");
  return (
    `<article class="stage-card${earned === total ? " is-done" : ""}" aria-label="Stage ${stage.n}: ${escapeHtml(stage.title)}">` +
    `<span class="stage-disc">${stage.n}</span>` +
    `<div class="stage-top"><h3 class="stage-title">${escapeHtml(stage.title)}</h3>` +
    `<span class="stage-count">${earned} / ${total}</span></div>` +
    `<div class="stage-bar"><span style="width:${pct}%"></span></div>` +
    `<p class="stage-goal" title="${escapeHtml(stage.why)}">${escapeHtml(stage.goal)} ` +
    `<sup class="cite-mark">${citeMarks(stage.cites)}</sup></p>` +
    `<div class="tchips">${chips}</div></article>`
  );
}

function trophyChipHtml(t, progress) {
  const classes = ["tchip"];
  if (progress.earned[t.id]) classes.push("is-earned");
  if (isSpoilerMasked(t, progress)) classes.push("is-masked");
  if (t.missable) classes.push(`flag-${t.missable}`);
  const mark = t.missable === "possible" ? "! " : t.missable === "unknown" ? "? " : "";
  const name = isSpoilerMasked(t, progress) ? "Story trophy" : t.name;
  return (
    `<a class="${classes.join(" ")}" href="#/checklist?f=all&amp;t=${t.id}" title="${escapeHtml(maskedName(t, progress))}">` +
    `${medalSvg(t.grade, 16)}${mark}${escapeHtml(name)}${progress.earned[t.id] ? " ✓" : ""}</a>`
  );
}

function stageTitle(stages, n) {
  return stages.find((s) => s.n === n)?.title || "";
}

function plainWhy(text) {
  return String(text).replace(/\s*\[\d+\]/g, "");
}

function watchListHtml(flagged, stages, progress) {
  const items = flagged
    .map(
      (t) =>
        `<li><div class="watch-top">${missableFlagHtml(t, true)}<span class="watch-name">${escapeHtml(maskedName(t, progress))}</span></div>` +
        `<p class="watch-why"><b>Stage ${t.stage}</b> · ${escapeHtml(plainWhy(t.missableWhy))}</p></li>`,
    )
    .join("");
  return `<aside class="watch" aria-label="Missable watch list"><h3>Missable watch list</h3><ul>${items}</ul></aside>`;
}

// "[2]" in a trophy's text becomes "[OL]": the page shows no numbered source list, so it names the source instead.
function namedMarks(text, trophy) {
  return escapeHtml(text).replace(/\[(\d+)\]/g, (whole, n) => {
    const cite = trophy.cites.find((c) => c.n === Number(n));
    const short = cite && context.sources[cite.src]?.short;
    return `<sup class="cite-mark">[${escapeHtml(short || n)}]</sup>`;
  });
}

// The Missables page: every flagged trophy with the reason for the call and what to do to stay safe.
export function renderMissables(stages, progress) {
  const flagged = stages.flatMap((s) => s.trophies).filter((t) => t.missable);
  const group = (kind, title) => {
    const items = flagged.filter((t) => t.missable === kind);
    return (
      `<h3 class="miss-group">${title} <span class="num">· ${items.length}</span></h3>` +
      `<div class="miss-list">${items.map((t) => missCardHtml(t, stages, progress)).join("")}</div>`
    );
  };
  document.getElementById("missables").innerHTML =
    `<div class="road-head"><h2 class="banner-title">Missables</h2>` +
    `<p class="road-sub">${escapeHtml(context.missables)}</p></div>` +
    safeListHtml() +
    group("possible", "Possibly missable") +
    group("unknown", "Trigger not known yet");
}

// What the guides say cannot be missed, so the flagged list below reads in proportion.
function safeListHtml() {
  const m = (s) => `<sup class="cite-mark">[${s}]</sup>`;
  return (
    `<section class="miss-safe" aria-label="What cannot be missed"><h3>Good news first: what cannot be missed</h3><ul>` +
    `<li>Story and chapter trophies unlock on their own as the story runs ${m("PPX")}.</li>` +
    `<li>Nothing on the 100% checklist can be missed ${m("PPX")}.</li>` +
    `<li>Let’s Go Bowling stays open: its valuables respawn ${m("PPX")}.</li>` +
    `<li>Side-story finales are still there after the credits ${m("OL")}.</li>` +
    `<li>There is no mission replay, so keep a manual save before the final mission ${m("OL")}.</li></ul></section>`
  );
}

function missCardHtml(t, stages, progress) {
  const masked = isSpoilerMasked(t, progress);
  const safe =
    t.missable === "possible"
      ? "Do it in the stage shown and keep a manual save from before that stage ends."
      : "Keep manual saves from each chapter until a guide pins the trigger down.";
  const value = progress.counters[t.id];
  const status = progress.earned[t.id]
    ? `<span class="miss-status is-earned">Earned ✓</span>`
    : t.target
      ? `<span class="miss-status num">${formatAmount(value || 0, t.unit)} / ${formatAmount(t.target, t.unit)}</span>`
      : `<span class="miss-status">Not earned yet</span>`;
  const links = t.cites
    .map((c) => context.sources[c.src])
    .filter(Boolean)
    .map((s) => `<a href="${escapeHtml(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.short)}</a>`)
    .join(" · ");
  return (
    `<article class="miss-card miss-${t.missable}${masked ? " is-masked" : ""}"><div class="miss-top">${missableFlagHtml(t)}${status}</div>` +
    `<h3>${medalSvg(t.grade, 22)}${escapeHtml(maskedName(t, progress))}</h3>` +
    `<p><b>Stage ${t.stage} · ${escapeHtml(stageTitle(stages, t.stage))}</b></p>` +
    `<p><b>Why:</b> ${masked ? "Hidden with the spoiler setting on." : namedMarks(t.missableWhy, t)}</p>` +
    `<p><b>To stay safe:</b> ${escapeHtml(safe)}</p>` +
    (t.unknown && !masked ? `<p><b>Not pinned down yet:</b> ${namedMarks(t.unknown, t)}</p>` : "") +
    `<p class="miss-src">Sources: ${links} · <a href="#/checklist?f=missable&amp;t=${t.id}">open the full guide</a></p></article>`
  );
}
