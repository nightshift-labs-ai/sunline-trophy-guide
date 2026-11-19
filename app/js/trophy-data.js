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

export function makeupLine(trophies) {
  const count = (g) => trophies.filter((t) => t.grade === g).length;
  const parts = GRADES.map((g) => `${count(g)} ${g}`);
  return `${trophies.length} official trophies · ${parts.join(" · ")}`;
}

// Header line computed from the cites: how many guides cite a guide site, how many lean on the description alone.
export function citedLine(trophies) {
  const cited = trophies.filter((t) => t.guide?.trim() && t.cites?.length).length;
  const guideSites = trophies.filter((t) => t.cites.some((c) => c.src === "ppx" || c.src === "ol")).length;
  const officialOnly = trophies.filter((t) => t.cites.every((c) => c.src === "psn")).length;
  const unknown = trophies.filter((t) => t.missable === "unknown").length;
  const parts = [`Guides: ${cited}/${trophies.length} cited`, `${guideSites} cite PowerPyx and/or OutputLag`];
  if (officialOnly) parts.push(`${officialOnly} cite the official description only`);
  parts.push(`${unknown} triggers not known yet`);
  return parts.join(" · ");
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
