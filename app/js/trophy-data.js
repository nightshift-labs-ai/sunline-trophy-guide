// Trophy list: loading the data files and the facts SUNLINE derives from them (make-up, roadmap order, cite lines).
export const LIST_MAKEUP = { total: 55, platinum: 1, gold: 2, silver: 6, bronze: 46 };

export const GRADES = ["platinum", "gold", "silver", "bronze"];

export const KIND_LABELS = {
  story: "Story mission",
  side: "Side strand",
  activity: "Activity",
  collectible: "Collectible",
  feat: "Feat",
  completion: "Completion",
};

export async function loadTrophyData() {
  const [doc, roadmap, extra, short] = await Promise.all([
    fetch("data/trophies.json").then((r) => r.json()),
    fetch("data/roadmap.json").then((r) => r.json()),
    fetch("data/g5-sources.json").then((r) => r.json()),
    fetch("data/g7-answers.json").then((r) => r.json()),
  ]);
  mergeExtra(doc, extra);
  // G7: each trophy's short answer (our words, cited with the trophy's own numbers) opens its guide pane.
  for (const t of doc.trophies) t.answer = short.answers[String(t.id)] || "";
  const trophies = doc.trophies;
  return {
    doc,
    roadmap,
    trophies,
    sources: doc.sources,
    byId: new Map(trophies.map((t) => [t.id, t])),
    stageByN: new Map(roadmap.stages.map((s) => [s.n, s])),
  };
}

// G5: new sources join the registry; each trophy's extra steps cite them as [@key], which becomes the trophy's own
// numbered cite (added if the trophy did not cite that source yet). Official names, descriptions and grades are not
// touched. 'disagree' keeps both versions, each with its cite numbers.
export function mergeExtra(doc, extra) {
  for (const [key, ind] of Object.entries(extra.independence || {})) Object.assign(doc.sources[key], ind);
  Object.assign(doc.sources, extra.sources);
  for (const [id, add] of Object.entries(extra.trophies)) {
    const t = doc.trophies.find((x) => x.id === Number(id));
    if (!t) continue;
    const citeOf = (src) => {
      let c = t.cites.find((x) => x.src === src);
      if (!c) {
        c = { n: Math.max(0, ...t.cites.map((x) => x.n)) + 1, src, supports: add.supports?.[src] || "" };
        t.cites.push(c);
      }
      return c.n;
    };
    for (const src of Object.keys(add.supports || {})) citeOf(src);
    const mark = (text) => text.replace(/\[@(\w+)\]/g, (_, src) => `[${citeOf(src)}]`);
    t.steps = [...t.steps, ...(add.steps || []).map(mark)];
    if (add.disagree) {
      t.disagree = add.disagree.map((d) => ({
        on: d.on,
        versions: d.versions.map((v) => ({ says: v.says, cites: v.src.map(citeOf) })),
      }));
    }
  }
}

// Independent witnesses behind one step: guides that do not confirm (aggregators, low trust) are left out, and
// a near-copy or a page from the same publisher counts as one with its group.
export function witnesses(trophy, text, sources) {
  const nums = [...String(text).matchAll(/\[(\d+)\]/g)].map((m) => Number(m[1]));
  const groups = new Set();
  let guides = 0;
  for (const n of nums) {
    const s = sources[trophy.cites.find((c) => c.n === n)?.src];
    if (!s || s.role !== "guide") continue;
    guides++;
    if (s.confirms !== false) groups.add(s.group || s.short);
  }
  return { cited: nums.length > 0, guides, groups: groups.size };
}

// Counts for the audit strip and the registry, all from the data.
export function auditCounts(trophies, sources) {
  let steps = 0, cited = 0, single = 0, multi = 0;
  for (const t of trophies) {
    for (const s of t.steps || []) {
      steps++;
      const w = witnesses(t, s, sources);
      if (w.cited) cited++;
      if (w.guides > 0 && w.groups <= 1) single++;
      // Same per-step witness count as 'single': two or more independent groups back this step.
      if (w.groups >= 2) multi++;
    }
  }
  const disagree = trophies.filter((t) => t.disagree?.length);
  return { steps, cited, single, multi, disagree };
}

export function escapeHtml(text) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(text ?? "").replace(/[&<>"']/g, (c) => map[c]);
}

// The Goal group (stage 7: the platinum and 100%) is listed first, then stages 1-6; list order inside a stage.
export function stageRank(stage) {
  return stage === 7 ? 0 : stage;
}

export function roadmapOrder(trophies) {
  return [...trophies].sort((a, b) => stageRank(a.stage) - stageRank(b.stage) || a.id - b.id);
}


// The header's audit strip: every number is counted from the data at load, nothing is typed in.
export function auditHtml(trophies, sources) {
  const count = (g) => trophies.filter((t) => t.grade === g).length;
  const used = new Set(trophies.flatMap((t) => t.cites.map((c) => c.src)));
  for (const t of trophies) if (t.hidden) used.add("exo");
  // One source per page: the official list and the hidden flags both come from the same Exophase page.
  const byUrl = new Map();
  for (const [key, s] of Object.entries(sources)) {
    if (used.has(key) || s.role === "list") byUrl.set(s.url, [key, s]);
  }
  const regs = [...byUrl.values()];
  const guides = regs.filter(([, s]) => s.role === "guide").length;
  const reads = [...new Set(regs.map(([, s]) => s.read).filter(Boolean))];
  const a = auditCounts(trophies, sources);
  const possible = trophies.filter((t) => t.missable === "possible").length;
  const unknown = trophies.filter((t) => t.missable === "unknown").length;
  const hidden = trophies.filter((t) => t.hidden).length;
  const b = (v) => `<b>${v}</b>`;
  const shortRead = (iso) => readDate(iso).replace(/ \d{4}$/, "");
  const parts = [
    `${b(trophies.length)} official: ${b(count("platinum"))} P · ${b(count("gold"))} G · ${b(count("silver"))} S · ${b(count("bronze"))} B`,
    `${b(hidden)} hidden`,
    `<span title="${guides} guides, ${regs.length - guides} lists">${b(regs.length)} sources</span>`,
    `<span title="Counted per guide step. ${a.single} of ${a.steps} steps rest on one independent witness ` +
      `(pages that echo PowerPyx count with it; aggregators never confirm).">steps: ${b(`${a.cited}/${a.steps}`)} cited · ` +
      `${b(a.multi)} on 2+ independent sources</span>`,
    `<span class="audit-dis">${b(a.disagree.length)} disagree</span>`,
    `${b(possible)} possibly missable · ${b(unknown)} trigger unknown`,
    `read ${reads.map(shortRead).join(", ") || "date not recorded"}`,
  ];
  return `<span class="audit-tag">Audit</span>${parts.join(" <i>·</i> ")}`;
}

// "2026-11-19" -> "19 Nov 2026"
export function readDate(iso) {
  const [y, m, d] = String(iso).split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return y && m && d ? `${d} ${months[m - 1]} ${y}` : String(iso);
}

export function formatAmount(value, unit) {
  const n = Number(value) || 0;
  return unit === "$" ? `$${n.toLocaleString("en-US")}` : n.toLocaleString("en-US");
}

// "powerpyx.com/gta-6-grand-theft-…" for a source line under its name.
export function shortUrl(url) {
  const u = new URL(url);
  const path = u.pathname.replace(/\/$/, "");
  const host = u.hostname.replace(/^www\./, "");
  return path.length > 18 ? `${host}${path.slice(0, 17)}…` : `${host}${path}`;
}

export function citeShorts(trophy, sources) {
  const shorts = [...new Set(trophy.cites.map((c) => sources[c.src]?.short).filter(Boolean))];
  return shorts.join(" · ");
}
