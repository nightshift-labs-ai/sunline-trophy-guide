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

## Numbers
- Shots (q85 floor): 1-checklist-guide.jpg 248,117 B · 2-roadmap.jpg 255,520 B · 3-spoilers-save.jpg 211,051 B.
  Shots 1 and 2 stay above the 210 KiB target even at the q85 floor (dense text); all are under the gate's 256 KiB.
- Dossier: 1,081,880 B, byte-identical over two runs.
- First load (Totals): 11 files, 19,042 B gzip-9 (56,954 raw).
- Outside sources: all 55 trophies cite PowerPyx and/or OutputLag; 5 of them (unknown triggers) lead with the
  official description and cite the guides only for "trigger not known yet" or a guess.

## Known issues
- Long stage titles are cut with an ellipsis on the roadmap cards at 1280 px.
- Shots 1-2 are over the 210 KiB target (see above).
- Mid-session one batch of CSS edits went through a shell script instead of the edit tool; the whole stylesheet was
  rewritten with the Write tool right after, so every line of it comes from a direct write.

## Next (M2)
- Deepen the thinnest guides with more cited facts and a second source where one exists.
- Search box (`/` focuses it), j/k row keys.
- Missables page polish (source names in place of bare [n] markers).
- "Next up" planner card at the top of the roadmap.
- Notes per trophy, print view, a11y pass, platinum auto-suggest at 54 earned.
