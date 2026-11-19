// SUNLINE boot: load the data, keep the state, route by hash, draw the header, and show the toast.
import { LIST_MAKEUP, loadTrophyData, makeupLine, citedLine } from "./trophy-data.js";
import { loadProgress, saveProgress, toggleEarned, setCounter, counterStep, earnedTotal, setNote } from "./progress-store.js";
import { exportProgressFile, parseProgressFile } from "./save-file.js";
import { isKnownFilter } from "./filters.js";
import { spoilerLabel } from "./spoiler-rule.js";
import { renderChecklist, renderSaveBanner } from "./views/checklist-view.js";
import { renderGuidePane } from "./views/guide-pane.js";
import { renderRoadmap, renderMissables, setRoadmapContext } from "./views/roadmap-view.js";

export async function bootSunline() {
  const data = await loadTrophyData();
  const progress = loadProgress();
  const state = {
    ...data,
    progress,
    route: "checklist",
    filter: progress.settings.filter || "all",
    grade: "all",
    sort: "roadmap",
    query: "",
    selected: null,
  };
  state.stages = data.roadmap.stages.map((s) => ({ ...s, trophies: data.trophies.filter((t) => t.stage === s.n) }));
  setRoadmapContext({ missables: data.roadmap.missables, sources: data.sources });
  wireEvents(state);
  applyHash(state);
  render(state, { scrollToSelected: true });
  document.body.dataset.ready = "1";
  window.addEventListener("hashchange", () => {
    applyHash(state);
    render(state, { scrollToSelected: true });
  });
}

const ROUTES = ["checklist", "roadmap", "missables", "save"];

function applyHash(state) {
  const raw = location.hash.replace(/^#\/?/, "");
  const [path, query = ""] = raw.split("?");
  const params = new URLSearchParams(query);
  state.route = ROUTES.includes(path) ? path : "checklist";
  const f = params.get("f");
  if (state.route === "save") state.filter = "story";
  else if (f && isKnownFilter(f)) state.filter = f;
  else if (state.filter === "story" && !f) state.filter = state.progress.settings.filter || "all";
  const t = Number(params.get("t"));
  if (t && state.byId.has(t)) state.selected = t;
}

function writeHash(state, patch = {}) {
  const next = { route: state.route, f: state.filter, t: state.selected, ...patch };
  const q = new URLSearchParams();
  if (next.route === "checklist") q.set("f", next.f);
  if ((next.route === "checklist" || next.route === "save") && next.t) q.set("t", String(next.t));
  const query = q.toString();
  location.hash = `#/${next.route}${query ? `?${query}` : ""}`;
}

function render(state, { scrollToSelected = false } = {}) {
  renderHeader(state);
  document.body.dataset.route = state.route;
  const listRoute = state.route === "checklist" || state.route === "save";
  document.getElementById("checklist").hidden = !listRoute;
  document.getElementById("guide-pane").hidden = !listRoute;
  document.getElementById("save-banner").hidden = state.route !== "save";
  document.getElementById("roadmap").hidden = state.route !== "roadmap";
  document.getElementById("missables").hidden = state.route !== "missables";
  if (listRoute) {
    const visible = renderChecklist(state.trophies, state);
    if (!visible.some((t) => t.id === state.selected) && visible.length) {
      state.selected = visible[0].id;
      renderChecklist(state.trophies, state);
    }
    renderGuidePane(state.byId.get(state.selected), state);
    if (state.route === "save") renderSaveBanner(state);
    if (scrollToSelected) scrollRowIntoView(state.selected);
    if (state.focusRow) {
      state.focusRow = false;
      document.querySelector(`#trophy-list li.row[data-id="${state.selected}"]`)?.focus({ preventScroll: true });
    }
  } else if (state.route === "roadmap") {
    renderRoadmap(state.stages, state.progress);
  } else {
    renderMissables(state.stages, state.progress);
  }
}

// Scroll the selected row to the middle only when it sits outside the list's visible area.
function scrollRowIntoView(id) {
  const list = document.getElementById("trophy-list");
  const row = list.querySelector(`.row[data-id="${id}"]`);
  if (!row) return;
  const box = list.getBoundingClientRect();
  const r = row.getBoundingClientRect();
  if (r.top < box.top || r.bottom > box.bottom) row.scrollIntoView({ block: "center" });
}

function renderHeader(state) {
  const { trophies, progress } = state;
  const earned = earnedTotal(progress, trophies);
  const total = trophies.length || LIST_MAKEUP.total;
  const pct = Math.round((earned / total) * 100);
  document.getElementById("makeup").textContent = makeupLine(trophies);
  document.getElementById("cited-line").textContent = citedLine(trophies);
  document.getElementById("earned-count").innerHTML =
    `${earned} / ${total} <small>${pct}%</small> <em class="to-go">${total - earned} to go</em>`;
  const flagged = trophies.filter((t) => t.missable).length;
  document.getElementById("tab-missables").innerHTML =
    `Missables <span class="tab-badge" aria-label="${flagged} flagged">${flagged}</span>`;
  const bar = document.getElementById("progress-bar");
  bar.innerHTML = `<span style="width:${pct}%"></span>`;
  bar.setAttribute("aria-valuenow", String(pct));
  const letters = { platinum: "P", gold: "G", silver: "S", bronze: "B" };
  document.getElementById("grade-earned").innerHTML = Object.entries(letters)
    .map(([g, l]) => {
      const all = trophies.filter((t) => t.grade === g);
      const got = all.filter((t) => progress.earned[t.id]).length;
      return `<span class="ge ge-${g}">${l} ${got}/${all.length}</span>`;
    })
    .join("");
  // Per-stage strip: each roadmap stage's earned count with a small bar; a finished stage turns teal.
  document.getElementById("stage-earned").innerHTML = (state.stages || [])
    .map((s) => {
      const n = s.trophies.length;
      const got = s.trophies.filter((t) => progress.earned[t.id]).length;
      const p = n ? Math.round((got / n) * 100) : 0;
      const done = n > 0 && got === n ? " is-done" : "";
      return `<a class="se${done}" href="#/roadmap" aria-label="Stage ${s.n}: ${got} of ${n} earned">` +
        `<span><b>S${s.n}</b> ${got}/${n}</span><i><span style="width:${p}%"></span></i></a>`;
    })
    .join("");
  const when = progress.savedAt
    ? new Date(progress.savedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "nothing saved yet";
  document.getElementById("saved-at").innerHTML = `<i class="dot"></i>Saved in this browser · ${when}`;
  const sw = document.getElementById("spoiler-switch");
  sw.textContent = spoilerLabel(progress);
  sw.setAttribute("aria-pressed", String(progress.settings.spoilers !== "shown"));
  for (const a of document.querySelectorAll("#tabs a")) {
    a.classList.toggle("is-active", a.dataset.route === state.route);
  }
}

let toastTimer = null;

// The toast stays at least 6 s; re-renders and hash changes never clear it.
function showToast(text) {
  const toast = document.getElementById("toast");
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 6500);
}

function persist(state) {
  saveProgress(state.progress);
  render(state);
}

function stepCounter(state, direction) {
  const t = state.byId.get(state.selected);
  if (!t?.target) return;
  const now = state.progress.counters[t.id] || 0;
  setCounter(state.progress, t, now + direction * counterStep(t));
  persist(state);
}

function toggleSpoilers(state) {
  const s = state.progress.settings;
  s.spoilers = s.spoilers === "shown" ? "hidden" : "shown";
  state.progress.revealed.clear();
  persist(state);
}

async function importFile(state, file) {
  try {
    const parsed = parseProgressFile(await file.text(), state.trophies);
    state.progress.earned = parsed.earned;
    state.progress.counters = parsed.counters;
    state.progress.notes = parsed.notes;
    if (parsed.settings?.spoilers === "shown" || parsed.settings?.spoilers === "hidden") {
      state.progress.settings.spoilers = parsed.settings.spoilers;
    }
    state.progress.revealed.clear();
    persist(state);
    const n = Object.keys(parsed.earned).length;
    const c = Object.keys(parsed.counters).length;
    const k = Object.keys(parsed.notes).length;
    showToast(`Imported ${n} earned · ${c} counters${k ? ` · ${k} notes` : ""}${parsed.skipped ? ` · ${parsed.skipped} skipped` : ""}`);
  } catch (err) {
    showToast(`Import failed: ${err.message}`);
  }
}

function wireEvents(state) {
  document.addEventListener("click", (event) => {
    const el = event.target.closest("[data-action]");
    if (!el) return;
    const id = Number(el.dataset.id);
    switch (el.dataset.action) {
      case "select":
        if (state.selected !== id) writeHash(state, { t: id });
        break;
      case "toggle":
        event.stopPropagation();
        toggleEarned(state.progress, id);
        persist(state);
        break;
      case "reveal":
        event.stopPropagation();
        state.progress.revealed.add(id);
        state.selected = id;
        render(state);
        break;
      case "todo":
        state.todoOnly = !state.todoOnly;
        render(state);
        break;
      case "filter":
        state.progress.settings.filter = el.dataset.f;
        saveProgress(state.progress);
        writeHash(state, { route: "checklist", f: el.dataset.f });
        break;
      case "step":
        stepCounter(state, Number(el.dataset.d));
        break;
      case "spoilers":
        toggleSpoilers(state);
        break;
      case "export":
        exportFromState(state);
        break;
    }
  });
  document.addEventListener("change", (event) => {
    const el = event.target;
    if (el.id === "grade-select") state.grade = el.value;
    else if (el.id === "sort-select") state.sort = el.value;
    else return;
    render(state);
  });
  const search = document.getElementById("search");
  search.addEventListener("input", () => {
    state.query = search.value;
    render(state);
  });
  // A trophy note saves as you type; only the header (saved time) and the row's note tag refresh, so focus stays.
  document.addEventListener("input", (event) => {
    const el = event.target;
    if (el.id !== "note-input") return;
    const id = Number(el.dataset.id);
    setNote(state.progress, id, el.value);
    saveProgress(state.progress);
    renderHeader(state);
    const row = document.querySelector(`#trophy-list li[data-id="${id}"]`);
    if (row) row.classList.toggle("has-note", Boolean(state.progress.notes[id]));
  });
  // Keys outside text fields: "/" jumps to search; j / k move down / up the visible rows; x marks the selected
  // trophy earned (or not); Enter on a focused row opens its guide.
  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.target.closest("input, select, textarea")) return;
    if (event.key === "/") {
      event.preventDefault();
      if (state.route !== "checklist") writeHash(state, { route: "checklist" });
      search.focus();
      return;
    }
    if (state.route !== "checklist" && state.route !== "save") return;
    const rows = [...document.querySelectorAll("#trophy-list li.row")];
    if (event.key === "j" || event.key === "k") {
      const i = rows.findIndex((r) => Number(r.dataset.id) === state.selected);
      const next = rows[Math.max(0, Math.min(rows.length - 1, i + (event.key === "j" ? 1 : -1)))];
      if (!next || Number(next.dataset.id) === state.selected) return;
      event.preventDefault();
      state.focusRow = true;
      writeHash(state, { t: Number(next.dataset.id) });
    } else if (event.key === "x" && state.selected) {
      event.preventDefault();
      state.focusRow = true;
      toggleEarned(state.progress, state.selected);
      persist(state);
    } else if (event.key === "Enter" && event.target.matches("#trophy-list li.row")) {
      event.preventDefault();
      state.focusRow = true;
      writeHash(state, { t: Number(event.target.dataset.id) });
    }
  });
  document.getElementById("spoiler-switch").addEventListener("click", () => toggleSpoilers(state));
  document.getElementById("export-progress").addEventListener("click", () => exportFromState(state));
  document.getElementById("import-progress").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) importFile(state, file);
    event.target.value = "";
  });
}

function exportFromState(state) {
  const file = exportProgressFile(state.progress, state.trophies);
  showToast(`Exported ${file.earned.length} earned · ${Object.keys(file.counters).length} counters`);
}

bootSunline();
