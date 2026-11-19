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
  const [doc, roadmap] = await Promise.all([
    fetch("data/trophies.json").then((r) => r.json()),
    fetch("data/roadmap.json").then((r) => r.json()),
  ]);
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
  const cited = trophies.filter((t) => t.guide?.trim() && t.cites?.length).length;
  const possible = trophies.filter((t) => t.missable === "possible").length;
  const unknown = trophies.filter((t) => t.missable === "unknown").length;
  const hidden = trophies.filter((t) => t.hidden).length;
  const b = (v) => `<b>${v}</b>`;
  const parts = [
    `${b(trophies.length)} official trophies: ${b(count("platinum"))} P · ${b(count("gold"))} G · ${b(count("silver"))} S · ${b(count("bronze"))} B`,
    `${b(hidden)} hidden on PSN`,
    `${b(`${cited}/${trophies.length}`)} guides cite a source`,
    `${b(regs.length)} sources (${guides} guides, ${regs.length - guides} lists)`,
    `${b(possible)} possibly missable · ${b(unknown)} trigger not known`,
    `sources read ${reads.map(readDate).join(", ") || "date not recorded"}`,
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
