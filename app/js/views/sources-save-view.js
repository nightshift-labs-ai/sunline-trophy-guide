// SUNLINE "Sources & save" page: the spoiler setting, the save card, progress by grade and kind, and the
// sources registry (every source the guides cite, with what we used it for, how many guides cite it, when read).
import { isSpoilerMasked } from "../spoiler-rule.js";
import { readDate } from "../trophy-data.js";

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const GRADES = ["platinum", "gold", "silver", "bronze"];
const KIND_WORDS = {
  story: "Story", side: "Side", activity: "Activities", collectible: "Collectibles", feat: "Feats", completion: "Completion",
};

function meter(label, got, all, cls = "") {
  const p = all ? Math.round((got / all) * 100) : 0;
  return `<li class="pm ${cls}"><span class="pm-label">${label}</span><b>${got}/${all}</b>` +
    `<i class="pm-bar"><span style="width:${p}%"></span></i></li>`;
}

// Sources that share one page (the official list and the hidden flags on Exophase) are one registry row.
function registryRows(trophies, sources) {
  const byUrl = new Map();
  for (const [key, s] of Object.entries(sources)) {
    const row = byUrl.get(s.url) || { keys: [], src: [] };
    row.keys.push(key);
    row.src.push(s);
    byUrl.set(s.url, row);
  }
  return [...byUrl.values()].map(({ keys, src }) => {
    const cites = trophies.filter((t) => t.cites.some((c) => keys.includes(c.src))).length;
    const guide = src.some((s) => s.role === "guide");
    const lists = src.map((s) => s.lists).filter(Boolean).sort((a, b) => b.length - a.length)[0];
    const s0 = src[0];
    const use = !guide
      ? `List cross-check of ${lists || "the official text"} only`
      : s0.group && s0.group !== s0.short || s0.confirms === false
        ? s0.note
        : "Steps; hours, replay, missable windows";
    // Independence, from the data: aggregators and low-trust pages never confirm; near-copies and pages from the
    // same publisher count as one witness with their group.
    const counts = !guide ? "official text only"
      : s0.confirms === false ? "never a confirmation"
        : s0.group && s0.group !== s0.short ? `one witness with ${s0.group}` : "independent witness";
    return { name: src.map((s) => s.short).join(" + "), url: s0.url, guide, use, counts, cites, read: s0.read };
  }).sort((a, b) => Number(b.guide) - Number(a.guide) || b.cites - a.cites);
}

// Every trophy where two sources give different versions, with both versions and their sources.
function disagreeList(trophies, sources, progress) {
  const names = (t, v) => v.cites.map((n) => sources[t.cites.find((c) => c.n === n)?.src]?.short).filter(Boolean)
    .join(", ");
  return trophies.filter((t) => t.disagree?.length).map((t) => {
    const name = isSpoilerMasked(t, progress) ? "Story trophy (hidden until earned)" : t.name;
    const pts = t.disagree.map((d) => `<li><b>${esc(d.on)}:</b> ` +
      d.versions.map((v) => `${esc(v.says.replace(/\.$/, ""))} <i>(${esc(names(t, v))})</i>`).join(" <em>vs</em> ") +
      `</li>`).join("");
    return `<li><span class="dl-name">${esc(name)}</span><ul>${pts}</ul></li>`;
  });
}

export function renderSourcesSave(state) {
  const { trophies, progress, sources = {} } = state;
  const el = document.getElementById("save-page");
  const story = trophies.filter((t) => t.kind === "story");
  const masked = story.filter((t) => isSpoilerMasked(t, progress)).length;
  const hidden = progress.settings.spoilers !== "shown";
  const saved = progress.savedAt
    ? new Date(progress.savedAt).toLocaleString([], { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
    : "nothing saved yet";
  const nE = Object.keys(progress.earned).length;
  const nC = Object.keys(progress.counters).length;
  const nN = Object.keys(progress.notes || {}).length;
  const last = state.lastImport
    ? `Last import: <b>${esc(state.lastImport.file)}</b> at ${esc(state.lastImport.at)} · ${esc(state.lastImport.summary)}`
    : "Last import: none in this visit";
  const got = (list) => list.filter((t) => progress.earned[t.id]).length;
  const grades = GRADES.map((g) => {
    const all = trophies.filter((t) => t.grade === g);
    return meter(`<span class="gw gw-${g}">${g.toUpperCase()}</span>`, got(all), all.length, `pm-${g}`);
  }).join("");
  const kinds = Object.keys(KIND_WORDS).map((k) => {
    const all = trophies.filter((t) => t.kind === k);
    return all.length ? meter(KIND_WORDS[k], got(all), all.length) : "";
  }).join("");
  const rows = registryRows(trophies, sources);
  const reg = rows.map((r) =>
    `<tr><th scope="row"><a href="${esc(r.url)}" rel="noopener">${esc(r.name)}</a>` +
    `<span class="reg-role ${r.guide ? "is-guide" : "is-list"}">${r.guide ? "guide" : "list"}</span></th>` +
    `<td>${esc(r.use)}</td><td class="reg-counts ${r.counts === "independent witness" ? "is-ind" : ""}">${esc(r.counts)}</td>` +
    `<td class="num">${r.cites}</td><td>${r.read ? readDate(r.read).replace(/ \d{4}$/, "") : "not recorded"}</td></tr>`).join("");
  const dis = disagreeList(trophies, sources, progress);

  el.innerHTML = `
<header class="sp-head"><h1 class="sp-title">Sources &amp; save</h1>
<p class="sp-sub">Where every fact comes from, and what this browser keeps for you.</p></header>
<div class="sp-grid">
<section class="sp-card" aria-label="Spoiler setting"><h2>Spoilers</h2>
<p class="sp-big">${hidden ? "Hidden" : "Shown"}</p>
<p>${hidden ? `<b>${masked}</b> of ${story.length} story trophies masked right now (earned ones show).`
    : `All ${story.length} story trophies show their names and descriptions.`}</p>
<button data-action="spoilers" aria-pressed="${hidden}">${hidden ? "Show spoilers" : "Hide spoilers"}</button></section>
<section class="sp-card" aria-label="Save"><h2>Save</h2>
<p class="sp-big">Saved in this browser</p><p>${esc(saved)} · ${nE} earned · ${nC} counters · ${nN} notes</p>
<div class="sp-actions"><button data-action="export">Export</button>
<label for="import-progress" class="btn">Import</label></div>
<p>File: <code>sunline-progress-YYYY-MM-DD.json</code> carries earned dates, counters, notes and settings.</p>
<p class="sp-last">${last}</p></section>
<section class="sp-card" aria-label="Progress by grade"><h2>By grade</h2><ul class="pm-list">${grades}</ul></section>
<section class="sp-card" aria-label="Progress by kind"><h2>By kind</h2><ul class="pm-list">${kinds}</ul></section>
</div>
<div class="sp-regwrap"><section class="sp-reg" aria-label="Sources registry"><h2>Sources registry <small>${rows.length}
sources · counts, independence and read dates come from the data</small></h2>
<table><thead><tr><th>Source</th><th>What SUNLINE used it for</th><th>Counts as</th><th class="num">Guides citing</th>
<th>Read</th></tr></thead><tbody>${reg}</tbody></table>
<p class="sp-note">Not listed: pages we could not read (Push Square, KeenGamer, TrueTrophies, TrueAchievements,
PlayStationTrophies) and sites whose robots.txt bars us. The official list and the hidden flags share one Exophase
page, so they are one row.</p></section>
<section class="sp-dis" aria-label="Where sources disagree"><h2>Where sources disagree <small>${dis.length}
trophies · both versions kept</small></h2><ol class="dis-list">${dis.join("")}</ol></section></div>`;
}
