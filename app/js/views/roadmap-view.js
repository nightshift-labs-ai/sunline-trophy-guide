// Roadmap view: 7 stage cards on the sun-line spine with progress and cites, the missable watch list, and the Missables page.
import { escapeHtml } from "../trophy-data.js";
import { maskedName, isSpoilerMasked } from "../spoiler-rule.js";
import { medalSvg, missableFlagHtml } from "./checklist-view.js";

export function renderRoadmap(stages, progress) {
  const flagged = stages.flatMap((s) => s.trophies).filter((t) => t.missable);
  const cards = stages.map((s) => stageCardHtml(s, progress)).join("");
  document.getElementById("roadmap").innerHTML =
    `<div class="road-head"><h2 class="banner-title">Roadmap to the platinum</h2>` +
    `<p class="road-sub">7 stages · built from the official descriptions · chapters cited from PowerPyx &amp; OutputLag</p></div>` +
    `<p class="missables-line">${missablesSummaryHtml(flagged)}<span>${escapeHtml(context.missables)}</span></p>` +
    `<div class="road-grid"><div class="stages">${cards}</div>${watchListHtml(flagged, stages, progress)}</div>`;
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
  const cards = flagged
    .map((t) => {
      const masked = isSpoilerMasked(t, progress);
      const safe =
        t.missable === "possible"
          ? "Do it in the stage shown and keep a manual save from before that stage ends."
          : "Keep manual saves from each chapter until a guide pins the trigger down.";
      return (
        `<article class="miss-card${masked ? " is-masked" : ""}">${missableFlagHtml(t)}` +
        `<h3>${medalSvg(t.grade, 22)}${escapeHtml(maskedName(t, progress))}</h3>` +
        `<p><b>Stage ${t.stage} · ${escapeHtml(stageTitle(stages, t.stage))}</b></p>` +
        `<p><b>Why:</b> ${masked ? "Hidden with the spoiler setting on." : namedMarks(t.missableWhy, t)}</p>` +
        `<p><b>To stay safe:</b> ${escapeHtml(safe)}</p>` +
        (t.unknown && !masked ? `<p><b>Not pinned down yet:</b> ${namedMarks(t.unknown, t)}</p>` : "") +
        `<p class="miss-src">Sources: ${escapeHtml(t.cites.map((c) => context.sources[c.src]?.name).filter(Boolean).join(" · "))}</p>` +
        `<p><a href="#/checklist?f=missable&amp;t=${t.id}">Open the guide and its sources</a></p></article>`
      );
    })
    .join("");
  document.getElementById("missables").innerHTML =
    `<div class="road-head"><h2 class="banner-title">Missables</h2>` +
    `<p class="road-sub">${escapeHtml(context.missables)}</p></div>` +
    `<div class="miss-list">${cards}</div>`;
}
