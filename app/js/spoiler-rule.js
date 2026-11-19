// Spoiler rule: with spoilers hidden, an unearned story trophy hides its name, description and guide until revealed.
export function isSpoilerMasked(trophy, progress) {
  if (!trophy || trophy.kind !== "story") return false;
  if (progress.settings.spoilers === "shown") return false;
  if (progress.earned[trophy.id]) return false;
  return !progress.revealed?.has(trophy.id);
}

export const MASKED_NAME = "Story trophy — hidden until earned";
export const MASKED_DESCRIPTION = "Spoiler setting is on. Earn it or tap Reveal.";

export function maskedName(trophy, progress) {
  return isSpoilerMasked(trophy, progress) ? MASKED_NAME : trophy.name;
}

export function maskedDescription(trophy, progress) {
  return isSpoilerMasked(trophy, progress) ? MASKED_DESCRIPTION : trophy.description;
}

export function spoilerLabel(progress) {
  return progress.settings.spoilers === "shown" ? "Spoilers: shown" : "Spoilers: hidden until earned";
}
