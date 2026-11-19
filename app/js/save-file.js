// Save file: export progress keyed by trophy name, and read it (or the starter's plain array of names) back in.
export function exportProgressFile(progress, trophies) {
  const byId = new Map(trophies.map((t) => [String(t.id), t]));
  const earned = Object.keys(progress.earned).map((id) => byId.get(id)?.name).filter(Boolean);
  const counters = {};
  for (const [id, value] of Object.entries(progress.counters)) {
    const t = byId.get(id);
    if (t) counters[t.name] = value;
  }
  const exportedAt = new Date().toISOString();
  const file = { app: "SUNLINE", version: 1, exportedAt, earned, counters, settings: { ...progress.settings } };
  const blob = new Blob([JSON.stringify(file, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `sunline-progress-${exportedAt.slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 2000);
  return file;
}

// Names compare the way the gate compares them: case, curly quotes, dashes, the ellipsis and spacing set aside.
export function normalizeName(name) {
  return String(name)
    .toLowerCase()
    .replace(/[‘’‚‛]/g, "'")
    .replace(/[“”„‟]/g, '"')
    .replace(/[‐-―−]/g, "-")
    .replace(/…/g, "...")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseProgressFile(text, trophies) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("That file is not JSON.");
  }
  const names = Array.isArray(data) ? data : data?.earned;
  if (!Array.isArray(names)) throw new Error("No list of earned trophies in that file.");
  const byName = new Map(trophies.map((t) => [normalizeName(t.name), t]));
  const stamp = (!Array.isArray(data) && data.exportedAt) || new Date().toISOString();
  const earned = {};
  const counters = {};
  let skipped = 0;
  for (const name of names) {
    const t = byName.get(normalizeName(name));
    if (t) earned[t.id] = stamp;
    else skipped += 1;
  }
  for (const [name, value] of Object.entries((!Array.isArray(data) && data.counters) || {})) {
    const t = byName.get(normalizeName(name));
    const n = Number(value);
    if (t && t.target && Number.isFinite(n)) counters[t.id] = Math.max(0, Math.min(t.target, Math.round(n)));
    else skipped += 1;
  }
  const settings = !Array.isArray(data) && data.settings && typeof data.settings === "object" ? data.settings : null;
  return { earned, counters, settings, skipped };
}
