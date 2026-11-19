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

## Done (G4a, short run, 16:36-16:58 EET): the cover gaps
- Header: one band (wordmark, big earned count + bar, P/G/S/B chips at 16 px, spoiler switch, Export, Import, "Saved in
  this browser" + time), then an audit strip counted from the data at load (55 official: 1 P · 2 G · 6 S · 46 B ·
  28 hidden on PSN · 55/55 guides cite a source · 7 sources (2 guides, 5 lists; the official list and the hidden flags
  share one Exophase page, counted once) · 2 possibly missable · 5 trigger not known · sources read 19 Nov 2026), then
  the tabs (active tab filled amber) beside the S1-S7 strip. Header + tabs: 108 px of 800 (was ~165).
- Font: "Ubuntu Sans" first in the stack, the old fallbacks kept, no font file shipped. The sheet preview's cover reads
  better than before (compared out/sheet-before.jpg vs out/sheet.jpg), so it stays.
- Checklist rows: official name + a grade word chip (PLATINUM / GOLD / SILVER / BRONZE, medal colours) on the first
  line, with the source names (PowerPyx · OutputLag, "+n" list sites) and the counter or Reveal at its end; the FULL
  official description on the second line, the chips (missable flag, stage, kind, hidden on PSN) after it, wrapping
  instead of squeezing. List column 575 -> 600 px. Masked rows leave the source tag off (Reveal shows it).
- Guide pane: boxed cite numbers (not superscripts) in steps, callouts and the stepper; each source line shows "read
  19 Nov 2026" from the registry (one `read` per source) and wraps its "supports" note; list sites the trophy does not
  cite are shown as "Cross-check of the official text only" with what each lists (below the fold on the cover).
  Positive Mental Attitude's Missable callout gained a cited Window line (after Down to Earth [OutputLag], may close
  when Chapter 1 ends [PowerPyx]).
- B5: the Missables tab badge is "2" (red) + "5?" (amber) and the Missable chip reads "2 + 5?" instead of one 7.
- Registry: `role` (guide / list), `lists` (what a list site lists), `read` (date) per source; CULTR added as a list.
- Not done in G4a (by plan): step C (roadmap: all 55 chips, counts, no ellipses, key-fact tiles) and step D (shot 3
  as a sources registry / save page). Shots 2 and 3 were not re-taken, so they still show the G3 header.

## Numbers (end of G4a)
- Shots: 1-checklist-guide.jpg 247,480 B (q85) · 2-roadmap.jpg 255,540 B · 3-spoilers-save.jpg 213,740 B (both from
  G3, unchanged). Judge-sheet preview GATE OK.
- Dossier: 1,111,561 B, byte-identical over two runs; kit check on HEAD: 4 passed, 0 failed.
- Cut text (out/cut-check.mjs, 1280x800, not committed): shot 1 state 0 of 24 checked elements; shot 2 state
  (#/roadmap, spoilers shown) 9 of 17 (stage titles and goal lines: step C, open).
- trophies.json: the 55 official names, descriptions and grades are identical to the starter (7d71397).
- Process note: one word of README.md ("fonts" -> "font files") was changed with a shell `sed` instead of the edit
  tool; every other change in this run went through the edit/write tools.

## Done (G4b, short run, 2026-11-19 16:52-17:04 EET): step C only
- Roadmap: three stage columns balanced by chip count (1-3 | 4-5 | 6-7 + watch list); every one of the 55
  trophies has a chip in its stage card (no height cap), and chips with a target show "now/target" from the save.
- No cut text: stage titles and goal lines wrap; three stage titles shortened in our own words (roadmap.json).
- Key-fact tiles over the stages, each with its sources: platinum ~200 h [PowerPyx][OutputLag], difficulty 4/10
  [PowerPyx], 1 run and no mission replay [PowerPyx][OutputLag], 0 online trophies [PowerPyx], missable split
  counted from the data. Other guides give 100-200 h; they are not in our registry, so the tile shows only ~200 h.
- PowerPyx's hour estimates on the stage groups it gives one for: whole story 60-80 h (stage 4), strands ~10 h
  (stage 5), ~100 h (stage 7). The "How this roadmap is built" card is gone (its facts moved into tiles and stages).
- Missable watch list: one compact line per trophy (flag, name, stage); the reason is in the tooltip and on the
  Missables page (the heading links there).
- Numbers: shots 247,480 / 249,984 / 213,740 B; judge-sheet GATE OK; cut text (scrollWidth > clientWidth among
  visible titles, goals, chips, names and descriptions) = 0 on the shot 1 state and 0 on the shot 2 state;
  roadmap chips = 55, all distinct; lowest roadmap card ends at 776 px of 800 (footer at ~778).
- trophies.json: the 55 official names, descriptions and grades are still identical to the starter (7d71397).

## Done (G4c, short run, 2026-11-19 17:24-17:37 EET): step D + checks
- #/save is now its own page, "Sources & save" (app/js/views/sources-save-view.js; the old save banner over the
  checklist is gone from the route): big title; Spoilers card (Hidden/Shown and how many of the 12 story trophies
  it masks right now, 11 with the demo save); Save card (saved-in-browser time, counts, Export / Import, the file
  pattern sunline-progress-YYYY-MM-DD.json and what it carries, the last import as text, kept in memory for the
  visit); By grade and By kind meters counted from the data and the save; a sources registry table (7 rows, one
  per page: name, guide / list cross-check, link, what SUNLINE used it for, guides citing it counted from the data,
  read date). The tab is renamed "Sources & save".
- Shot 3 renamed 3-sources-save.jpg (shoot.mjs and shots.json follow), taken after the import toast has gone.
- Shots 1 and 2 were kept exactly as G4a/G4b took them (by plan), so the cover's tab bar still reads
  "Spoilers & save"; the next re-shoot of shot 1 will show "Sources & save".

## Numbers (end of G4c)
- Shots: 1-checklist-guide.jpg 247,480 B · 2-roadmap.jpg 249,984 B · 3-sources-save.jpg 213,385 B (all <= 250 KiB).
  Judge-sheet preview GATE OK; shot 3's title reads in its small cell.
- Dossier: 1,114,741 B on the step D commit; 1,114,713 B on the final app (key fix), byte-identical over two runs
  both times (<= 1.45 MiB); kit check on HEAD: 4 passed, 0 failed (16 skipped, 5 at submission), run on both
  commits. Path grep: no operator paths in the repo. The kit copy is level 26, the site level 27.
- Cut text (out/cut-check.mjs, 1280x800): shot 1 state 0 of 24; shot 2 state 0 of 15. Roadmap untouched since
  G4b (55 distinct chips checked then).
- trophies.json: the 55 official names, descriptions and grades are identical to the starter (7d71397).

## Done (G5, short run, 2026-11-19 19:31-19:55 EET): sourcing depth
Research input: the operator's s267 reader files A and B (both present, ~17 and ~20 KB; each a 11-12 minute pass). Their
headers say "20 Nov 2026 research", but the sessions ran 19:00-19:12 EET on 19 Nov (file times agree), so the
registry records read 2026-11-19. No new web research in this run.
- A (data): `app/data/g5-sources.json`, merged into the guides at load by `trophy-data.js` (`mergeExtra`), so
  `trophies.json` itself is unchanged. 7 new sources, all pages the readers really read: PowerPyx meditation spots,
  PowerPyx card sets hub, PowerPyx Delights Dancers (incomplete when read), GTABase, eGamers trophy list, eGamers 100%
  guide, LFCarry. Independence is data, not prose: `group` (GTABase and the three PowerPyx pages count as ONE witness
  with PowerPyx; reader B called GTABase independent, reader A and the operator say it mirrors PowerPyx, and we follow
  that) and `confirms: false` (both eGamers pages: aggregators; LFCarry: boosting sales page, low trust). 24 own-words
  steps on 20 trophies cite them as [@key], turned into each trophy's numbered cite. `disagree` on 10 trophies, both
  versions kept with cites: #7 final mission's chapter, #14 bank jobs (8 vaults vs 22 jobs) and stunts (300 vs 250),
  #17 ranges (12 vs two), #25 strands in 100%, #27 Tyrone's last job name, #28 when the balcony meditation is offered,
  #35 vehicle total (557 vs 277), #40 what opens the vaults, #46 all three valuables or not, #48 500 actions vs
  choices. Not used: LFCarry's chapter 1 mission names, cheat and hour claims (single low-trust source, no
  conflict to show); GTABase's Xbox Gamerscore values (not a PS5 fact).
- B (cover): the audit strip counts at load: 14 sources (9 guides, 5 lists; the count is in its tooltip),
  182/182 steps cited, 136 single-source tips (a step whose guide cites reduce to one independent witness), 10 where
  sources disagree, 2 possibly missable, 5 trigger unknown, read 19 Nov. Shorter labels so the no-wrap strip fits at
  1280 px. Guide pane: a violet "Sources disagree" row under the steps with both versions side by side, each with
  boxed cites. Positive Mental Attitude stays the open trophy (it has a disagreement); its two new PowerPyx-spots
  steps (18 = spots 2-9 twice + balcony + summit; the summit appears only after 17; the eight shared spots). Compared
  out/sheet_before.jpg with the new sheet at 768x480: the new cover reads at least as well (more sourcing facts, the
  disagree row legible); the list shows about one row less because longer source tags wrap. Kept.
- C (shot 3): registry rows link the source name and add a computed "Counts as" column (independent witness / one
  witness with PowerPyx / never a confirmation) beside "Guides citing"; "Where sources disagree" list (10 trophies,
  both versions with source names; masked story names stay masked) beside the table. Shots 1-3 re-taken.
- Rival (dev #1, 0.948) read from the brief image: it shows per-source "cited by n of 55" in a column on its cover.
  Ours shows those counts on Sources & save; the cover's per-trophy Sources list is below the fold. Open.

## Numbers (end of G5)
- Shots: 1-checklist-guide.jpg 248,459 B · 2-roadmap.jpg 254,678 B (q81) · 3-sources-save.jpg 214,159 B (all
  <= 250 KiB). Judge-sheet preview GATE OK.
- Dossier: 1,130,618 B on the step C commit and again on the docs commit (da958f4), byte-identical over two runs
  each time (<= 1.45 MiB); kit check on HEAD, both commits: 4 passed, 0 failed (16 skipped, 5 at submission). Path
  grep: 0 files. Kit copy level 26, site 27.
- Data: 55 official names, descriptions and grades identical to the starter (checked after the merge); every step
  and every disagree version carries a cite that resolves to a registry source (0 unresolved); 182 steps.
- Guides citing (trophies): PowerPyx 55, OutputLag 48, GTABase 21, LFCarry 8, eGamers 100% 2, PowerPyx spots 1,
  PowerPyx cards 1, PowerPyx Delights 1, eGamers list 1.

## Known issues
- G5: 136 of 182 steps still rest on one independent witness; GTABase echoes do not lower that by design.
- G5: the single-source count treats a step that cites only an aggregator or LFCarry as single-source (0 witnesses).
- G5: the step A commit message says "25 steps into 22 trophies"; after step B trimmed Positive Mental Attitude's
  three new steps to two it is 24 steps on 20 trophies (24 trophies touched counting the disagree-only ones).
- The registry lists CULTR with 0 guides citing it: it is shown only as a list cross-check in the guide pane.
- Keys j / k / x act only on #/checklist now (they used to reach the hidden list from #/save).
- G4b checks on the step C commit: dossier 1,106,514 B, byte-identical over two runs; kit check on HEAD 4 passed,
  0 failed (16 skipped, 5 at submission). The kit copy is level 26, the site level 27 (operator's call to refresh).
- Step 1 of the Positive Mental Attitude guide leaves its cite box alone on a second line at 1280 px.
- Shots 1-2 are over the 210 KiB target (dense text); both are under the gate's 256 KiB.
- Mid-session in run 1 one batch of CSS edits went through a shell script instead of the edit tool; the whole
  stylesheet was rewritten with the Write tool right after, so every line of it comes from a direct write.

## Next
- More sources for the one-source guides once new guides publish (Push Square, KeenGamer could not be read).
- Bring the shots under 210 KiB (less text in view, or fewer rows) without losing the cover's required parts.
- A "Next up" pick could weigh time-sensitive strands (Race Against Yago) above plain roadmap order.
- G5 follow-ups: show "cited by n" per source on the cover (guide pane Sources, or the row tag); a filter chip for
  "sources disagree"; a second independent witness for the 136 single-source steps once more guides are readable.
