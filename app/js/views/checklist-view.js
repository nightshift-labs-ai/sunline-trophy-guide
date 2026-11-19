// Checklist view: filter chips, grade/sort tools and the trophy rows in roadmap order; also the #/save view's banner.
import { escapeHtml, roadmapOrder, formatAmount, citeShorts, KIND_LABELS } from "../trophy-data.js";
import { FILTERS, FILTER_LABELS, filterCounts, applyListFilters } from "../filters.js";
import { isSpoilerMasked, maskedName, maskedDescription } from "../spoiler-rule.js";

export function renderChecklist(trophies, state) {
  document.getElementById("filters").innerHTML = filterChipsHtml(trophies, state);
  document.getElementById("list-tools").innerHTML = listToolsHtml(state);
  const visible = visibleRows(trophies, state);
  document.getElementById("trophy-list").innerHTML = rowsHtml(visible, trophies, state);
  return visible;
}

const MEDALS = {
  platinum: { fill: "#cfd9e6", letter: "P" },
  gold: { fill: "#e8b93e", letter: "G" },
  silver: { fill: "#b9c1cc", letter: "S" },
  bronze: { fill: "#c47b4a", letter: "B" },
};

export function medalSvg(grade, size = 22) {
  const m = MEDALS[grade] || MEDALS.bronze;
  return (
    `<svg class="medal" width="${size}" height="${size}" viewBox="0 0 24 24" role="img" aria-label="${grade}">` +
    `<circle cx="12" cy="12" r="11" fill="${m.fill}"/>` +
    `<circle cx="12" cy="12" r="8.3" fill="none" stroke="#0e1320" stroke-opacity=".35" stroke-width="1.2"/>` +
    `<text x="12" y="16.3" text-anchor="middle" font-size="12" font-weight="800" fill="#0e1320"` +
    ` font-family="system-ui, sans-serif">${m.letter}</text></svg>`
  );
}

export function missableFlagHtml(trophy, compact = false) {
  if (trophy.missable === "possible") return `<span class="flag flag-red">POSSIBLY MISSABLE</span>`;
  if (trophy.missable === "unknown") {
    return `<span class="flag flag-amber">${compact ? "? Trigger unknown" : "? Trigger not known yet"}</span>`;
  }
  return "";
}

export function visibleRows(trophies, state) {
  const nameOf = (t) => maskedName(t, state.progress);
  const ordered = state.sort === "list" ? [...trophies].sort((a, b) => a.id - b.id) : roadmapOrder(trophies);
  return applyListFilters(ordered, state, nameOf);
}

function filterChipsHtml(trophies, state) {
  const counts = filterCounts(trophies);
  const chip = (f) => {
    const on = state.filter === f;
    const label = `${FILTER_LABELS[f]} <b>${counts[f]}</b>`;
    if (f === "online") {
      return (
        `<button class="chip" disabled title="No online trophies: PowerPyx overview lists 0 online">` +
        `${label} <sup class="cite-mark">[PPX]</sup></button>`
      );
    }
    return `<button class="chip${on ? " is-on" : ""}" data-action="filter" data-f="${f}" aria-pressed="${on}">${label}</button>`;
  };
  // "To do" is a switch on top of any filter: it hides what is already earned and counts what is left.
  const left = state.trophies.filter((t) => !state.progress.earned[t.id]).length;
  const todo =
    `<button class="chip chip-todo${state.todoOnly ? " is-on" : ""}" data-action="todo" aria-pressed="${!!state.todoOnly}"` +
    ` title="Hide trophies you have earned">To do <b>${left}</b></button>`;
  return ["all", ...FILTERS].map(chip).join("") + todo;
}

function listToolsHtml(state) {
  const opt = (value, label, current) =>
    `<option value="${value}"${value === current ? " selected" : ""}>${label}</option>`;
  const grades = [["all", "All grades"], ["platinum", "Platinum"], ["gold", "Gold"], ["silver", "Silver"], ["bronze", "Bronze"]];
  return (
    `<label class="tool">Grade <select id="grade-select" data-action="grade">` +
    grades.map(([v, l]) => opt(v, l, state.grade)).join("") +
    `</select></label>` +
    `<label class="tool">Sort <select id="sort-select" data-action="sort">` +
    opt("roadmap", "Roadmap", state.sort) +
    opt("list", "List order", state.sort) +
    `</select></label>`
  );
}

function stageHeadHtml(stage, all, state) {
  const inStage = all.filter((t) => t.stage === stage.n);
  const earned = inStage.filter((t) => state.progress.earned[t.id]).length;
  const label = stage.n === 7 ? `Goal · ${stage.title}` : `${stage.n} · ${stage.title}`;
  return `<li class="stage-head"><span>${escapeHtml(label)}</span><span class="num">${earned}/${inStage.length} earned</span></li>`;
}

function rowsHtml(visible, all, state) {
  if (!visible.length) return `<li class="empty">No trophy matches these filters.</li>`;
  const out = [];
  let lastStage = null;
  for (const t of visible) {
    if (state.sort !== "list" && t.stage !== lastStage) {
      out.push(stageHeadHtml(state.stageByN.get(t.stage), all, state));
      lastStage = t.stage;
    }
    out.push(rowHtml(t, state));
  }
  return out.join("");
}

function rowHtml(t, state) {
  const p = state.progress;
  const earned = Boolean(p.earned[t.id]);
  const masked = isSpoilerMasked(t, p);
  const classes = ["row", earned && "is-earned", masked && "is-masked", state.selected === t.id && "is-selected"];
  const counter = t.target
    ? `<span class="row-count num">${formatAmount(p.counters[t.id] || 0, t.unit)}/${formatAmount(t.target, t.unit)}</span>`
    : "";
  const reveal = masked ? `<button class="reveal" data-action="reveal" data-id="${t.id}">Reveal</button>` : "";
  const hidden = t.hidden ? `<span class="tag tag-hidden">hidden on PSN</span>` : "";
  return (
    `<li class="${classes.filter(Boolean).join(" ")}" data-action="select" data-id="${t.id}">` +
    `<button class="check" data-action="toggle" data-id="${t.id}" aria-pressed="${earned}"` +
    ` aria-label="Earned: ${escapeHtml(maskedName(t, p))}">${earned ? "✓" : ""}</button>` +
    `<span class="row-medal">${medalSvg(t.grade)}</span>` +
    `<div class="row-main"><div class="row-line">` +
    `<span class="row-name">${escapeHtml(maskedName(t, p))}</span>${missableFlagHtml(t, true)}</div>` +
    `<div class="row-line row-sub"><span class="row-desc">${escapeHtml(maskedDescription(t, p))}</span>` +
    `<span class="tag tag-stage">S${t.stage}</span><span class="tag">${ROW_KIND[t.kind]}</span>${hidden}</div></div>` +
    `<div class="row-side">${counter || reveal}<span class="cite-badge">${escapeHtml(badgeText(t, state.sources))}</span>` +
    `${counter ? reveal : ""}</div></li>`
  );
}

const ROW_KIND = { story: "Story", side: "Side", activity: "Activity", collectible: "Collectible", feat: "Feat", completion: "100%" };

// Row badge: at most two source short names, then "+n" for the rest (the pane lists them all).
function badgeText(trophy, sources) {
  const shorts = citeShorts(trophy, sources).split(" · ").filter(Boolean);
  return shorts.length > 2 ? `${shorts.slice(0, 2).join(" · ")} +${shorts.length - 2}` : shorts.join(" · ");
}

// The #/save view: banner with the spoiler rule and the save-file format above the story checklist.
export function renderSaveBanner(state) {
  const on = state.progress.settings.spoilers !== "shown";
  document.getElementById("save-banner").innerHTML =
    `<h2 class="banner-title">Spoiler setting &amp; save file</h2>` +
    `<p class="banner-line">Spoilers are <b>${on ? "hidden" : "shown"}</b>: an unearned story trophy hides its name, ` +
    `description and guide until you earn it or tap Reveal. Grades and stages stay visible.</p>` +
    `<p class="banner-line">Progress is saved in this browser. Export writes <code>sunline-progress-YYYY-MM-DD.json</code> ` +
    `(earned trophies and counters by official name); Import reads it back, or a plain list of names.</p>` +
    `<div class="banner-actions"><button data-action="spoilers" aria-pressed="${on}">` +
    `${on ? "Spoilers: hidden until earned" : "Spoilers: shown"}</button>` +
    `<button data-action="export">Export progress</button>` +
    `<label class="btn" for="import-progress">Import progress</label></div>`;
}
