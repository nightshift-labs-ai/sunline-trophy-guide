# SUNLINE build notes (session s263, 2026-11-19)

## Done (M1)
- Data: 55 trophies with official name/description/grade (unchanged from the starter), `hidden` flags (28, Exophase),
  kind, filters, stage 1-7, missable call + own-words reason, targets/units, own-words guide + 2-4 steps, `unknown`
  notes, and one-line cites resolved through the top-level `sources` registry. `roadmap.json`: 7 stages with cites and
  the missables banner line.
- Tracker: checklist in roadmap order (Goal group first, stage header rows with earned counts), filter chips with
  counts (Online 0 disabled and cited), grade and sort selects, counters (row + stepper in the guide pane), spoiler
  rule (masked rows, panes, roadmap chips, watch list, Missables page; Reveal), localStorage save, export/import by
  trophy name (also reads a plain array of names), toast.
- Guide pane: medal, name, grade, earned toggle, official description, chips, stepper with cite marker, How to get it,
  Can it be missed?, Not pinned down yet, numbered Sources with links and notes.
- Roadmap: 7 stage cards on the sun-line spine with n / m and bars, cite markers, flagged chips, Missable watch list.
  Missables page with why / how to stay safe / what is not known.
- Shots via `tools/shoot.mjs` (fresh context, demo save imported through the app's own file input).

## Done (M2, this run)
- (a) Treat Yo Self gained a second source (OutputLag). Still on one source: ids 8, 9, 10, 12, 16, 19, 31, 42 (the
  sources file has no second source for them).
- (b) Search box in the checklist tools; `/` focuses it; it matches the visible name (masked names stay masked),
  grade, kind and stage.
- (c) Missables page names its sources ([PPX], [OL]) and lists them per card.
- (d) "Next up" card: not done (cut at end−10).

## Done (M2, short run 2: gaps against the top-rated rival's shots 1-2)
- Header card: a per-stage strip under the buttons, S1-S7 with "earned / total" and a small sun-gradient bar for
  each; a finished stage turns teal; each one links to the roadmap. (The rival shows the same counts as one line of
  text; ours reads at a glance and stays in shot 1.)
- "To do n" chip at the end of the filter chips: it hides earned trophies on top of any filter, search or grade, and
  its number is what is left. Sized to stay on the second chip row, so the shot 1 list shows the same rows as before.
- Step 2 items were left for run 3 (below).

## Done (M2, run 3: the rest of M2, 15:13-15:52 EET)
- Shot 1 gaps against the top rival: the guide pane's missable call is now a tinted callout ("Missable? Possibly" red,
  "Not known" amber, "No" teal) instead of plain prose; "How to get it · in our own words"; "n to go" under the big
  count; a red count badge on the Missables tab (7).
- Deeper guides: a cited third step for Trust, Break the Bank, Family Matters, Hi-Jacked, Earn Cash, Not Kudos, The
  Goodtime State, Whip It Good and T**s Ass Drug Money; OutputLag added as second source to the four story trophies
  that had PowerPyx alone (Trust, Break the Bank, Family Matters, Hi-Jacked). Now 158 steps and 113 cites; still on
  one outside source (the sources file has nothing more): ids 16, 30, 31, 42, 49, 50, 51.
- Roadmap: "Next up" card beside the title (first stage with work left; a possibly-missable trophy first, then a
  counter under way, then roadmap order; two more as "then"; masked names stay masked) and a cited "How this roadmap
  is built" card in the free slot under stage 7 (PowerPyx's hour estimates, no mission replay). The old one-line
  subline (cut with an ellipsis) made room for it, so the grid did not move.
- Missables page: cited "Good news first: what cannot be missed" panel, groups with counts, a status chip per card
  (earned, counter, or not earned yet), a flag-coloured left edge, sources as short links.
- Notes per trophy: a "My notes" box in the guide pane (600 chars), saved with the progress, exported and imported by
  trophy name, a pencil mark on the row; typing saves without re-rendering the pane, so focus stays.
- Keys: `/` search, `j` / `k` next / previous visible row (focus follows), `x` toggles earned, Enter opens a focused
  row; a hint line under the notes box.
- a11y: red fill darkened to #a82626 (white text 7.07:1) and the red callout heading to #ff9d94 (7.66:1); every other
  text pair checked at >= 7:1; aria-current on the active tab and the selected row; rows take focus with a visible ring;
  a skip link to the selected row.
- Print view (`@media print`: the checklist as a black-on-white list) and a platinum nudge toast at 54 of 54.
- Shot tool: still q85 floor for the 210 KiB target, and below q85 (down to q78) only when a shot would pass 250 KiB,
  under the gate's 256 KiB.

## Numbers (end of run 3)
- Shots: 1-checklist-guide.jpg 253,884 B (q85) · 2-roadmap.jpg 255,540 B (q81, to stay under 250 KiB with the two
  new cards) · 3-spoilers-save.jpg 213,740 B (q85).
- Dossier: 1,113,949 B, byte-identical over two runs; kit check on HEAD: 4 passed, 0 failed; judge-sheet GATE OK.
- First load (Totals): 11 files, 24,061 B gzip-9 (75,172 raw); whole app 13 files, 137,970 B.
- Outside sources: all 55 trophies cite PowerPyx and/or OutputLag; 5 of them (unknown triggers) lead with the
  official description and cite the guides only for "trigger not known yet" or a guess.

## Known issues
- Long stage titles are cut with an ellipsis on the roadmap cards at 1280 px.
- Shots 1-2 are over the 210 KiB target (dense text); both are under the gate's 256 KiB.
- Mid-session in run 1 one batch of CSS edits went through a shell script instead of the edit tool; the whole
  stylesheet was rewritten with the Write tool right after, so every line of it comes from a direct write.

## Next
- More sources for the one-source guides once new guides publish (Push Square, KeenGamer could not be read).
- Bring the shots under 210 KiB (less text in view, or fewer rows) without losing the cover's required parts.
- A "Next up" pick could weigh time-sensitive strands (Race Against Yago) above plain roadmap order.
