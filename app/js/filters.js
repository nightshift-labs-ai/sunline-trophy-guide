// Checklist filters: the chips (story, missable, collectibles, activities, online, side, feats), grade and search.
export const FILTERS = ["story","missable","collectibles","activities","online","side","feats"];

export const FILTER_LABELS = {
  all: "All",
  story: "Story",
  missable: "Missable",
  collectibles: "Collectibles",
  activities: "Activities",
  online: "Online",
  side: "Side",
  feats: "Feats",
};

export function isKnownFilter(name) {
  return name === "all" || FILTERS.includes(name);
}

export function matchesFilter(trophy, filter) {
  return filter === "all" || trophy.filters.includes(filter);
}

export function filterCounts(trophies) {
  const counts = { all: trophies.length };
  for (const f of FILTERS) counts[f] = trophies.filter((t) => t.filters.includes(f)).length;
  return counts;
}

// Search looks at what the player can see: a masked story trophy is found by its grade or stage, not its name.
export function matchesSearch(trophy, query, visibleName) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hay = [visibleName, trophy.grade, trophy.kind, `s${trophy.stage}`].join(" ").toLowerCase();
  return hay.includes(q);
}

export function applyListFilters(trophies, state, nameOf) {
  return trophies.filter(
    (t) =>
      matchesFilter(t, state.filter) &&
      (state.grade === "all" || t.grade === state.grade) &&
      !(state.todoOnly && state.progress?.earned[t.id]) &&
      matchesSearch(t, state.query || "", nameOf(t)),
  );
}
