// Saved progress: earned dates, counters and settings, kept in this browser's localStorage.
export const STORAGE_KEY = "sunline.progress.v1";

export function emptyProgress() {
  return {
    earned: {},
    counters: {},
    notes: {},
    settings: { spoilers: "hidden", filter: "all" },
    savedAt: null,
    revealed: new Set(),
  };
}

export function loadProgress() {
  const progress = emptyProgress();
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (raw && typeof raw === "object") {
      Object.assign(progress.earned, raw.earned || {});
      Object.assign(progress.counters, raw.counters || {});
      for (const [id, text] of Object.entries(raw.notes || {})) setNote(progress, id, text);
      Object.assign(progress.settings, raw.settings || {});
      progress.savedAt = raw.savedAt || null;
    }
  } catch {
    // A damaged save starts clean rather than breaking the page.
  }
  return progress;
}

export function saveProgress(progress) {
  progress.savedAt = new Date().toISOString();
  const { earned, counters, notes, settings, savedAt } = progress;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ earned, counters, notes, settings, savedAt }));
  } catch {
    // Private windows can refuse storage; the page keeps working for this visit.
  }
}

export function isEarned(progress, id) {
  return Boolean(progress.earned[id]);
}

export function toggleEarned(progress, id) {
  if (progress.earned[id]) delete progress.earned[id];
  else progress.earned[id] = new Date().toISOString();
}

export function counterStep(trophy) {
  if (trophy.unit === "$") return 5000;
  return trophy.target >= 200 ? 5 : 1;
}

export function counterValue(progress, trophy) {
  return Number(progress.counters[trophy.id]) || 0;
}

export function setCounter(progress, trophy, value) {
  const clamped = Math.max(0, Math.min(trophy.target, Math.round(value)));
  if (clamped) progress.counters[trophy.id] = clamped;
  else delete progress.counters[trophy.id];
  return clamped;
}

// A player's own note on one trophy: plain text, at most 600 characters; an empty note is removed.
export const NOTE_MAX = 600;

export function setNote(progress, id, text) {
  const clean = typeof text === "string" ? text.slice(0, NOTE_MAX) : "";
  if (clean.trim()) progress.notes[id] = clean;
  else delete progress.notes[id];
}

export function earnedTotal(progress, trophies) {
  return trophies.filter((t) => progress.earned[t.id]).length;
}
