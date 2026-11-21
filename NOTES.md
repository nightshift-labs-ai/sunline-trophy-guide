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

## Done (G6, short polish run, 2026-11-19 19:50-20:11 EET): shot 1 only
Input: the operator's s268 judge read of G5 against dev #1 (G5 behind on cited guidance because the cover's cite boxes
had no legend in view: G5 B pushed the guide pane's Sources block below the fold). No new facts, no new web research,
no data change. A/B rule for every step: re-shoot shot 1 as shots.json defines it, build the judge-sheet preview into
out/ab/, read before and after at 768x480, run the cut-text check on the shot 1 state; keep only if the cover reads
better and the cut count stays 0. Baseline: out/ab/before.jpg and out/sheet_before.jpg (G5's cover).
1. Kept. Cite numbers resolve on the cover. Beside the missable call (where "Not pinned down yet" sat) the guide pane
   now has a "Cite numbers" legend: one line per cite number with the source's short name, the day it was read and
   how many of the 55 guides cite that page (n/55), all counted at render from the trophies and sources (same
   by-page counting as the registry's "Guides citing"). "Not pinned down yet" moves just below, still in the pane.
   First try showed lines 1-5 with [6] under the fold; tightened to 18 px lines and all six show. At 768x480 every
   box in the pane ([1] [2] [4] [5] [6]; [3] is the official list) has a readable line: PowerPyx 55/55, OutputLag
   48/55, Official list 7/55, PowerPyx spots 1/55, GTABase 21/55, LFCarry 8/55. Missable call, window line and the
   "Sources disagree" row with both versions stay in view. Cut text 0.
2. Kept. No count reads as "57". Filter chip "Missable 2 · 5 unclear" and tab badge "2 | 5 unclear" replace "2 + 5?"
   and "5?". Same counts, computed as before. The chip row still fits one line. Cut text 0.
3. Kept. The audit strip names its unit and leads with the positive count: "steps: 182/182 cited · 37 on 2+
   independent sources". 37, not 182 - 136 = 46: counted with the same per-step witness count as the single-source
   figure, 182 = 37 (two or more independent groups) + 136 single-source (135 with one witness, 1 that cites only a
   guide that never confirms) + 9 that cite no guide at all (official list only, e.g. the goal wording). The 136
   stays in the strip's tooltip and here. Sources & save does not show it, so shot 3 was not changed for it.
4. (optional) Kept. Row source tags show the first two guides and "+n" (full list in the tag's tooltip), so they stay
   on the name line: the cover shows about 10 rows instead of 8. Cut text 0 (21 elements checked).
Shots 2 and 3 were re-taken only because the shared header changed (audit strip, tab badge); their views did not
change, so their shots.json sentences stay. Shot 1's sentence now names the legend, the strip and the tags.

## Numbers (end of G6)
- Shots: 1-checklist-guide.jpg 250,869 B (q83) · 2-roadmap.jpg 255,802 B (q81) · 3-sources-save.jpg 215,559 B (all
  <= 250 KiB = 256,000 B). Judge-sheet preview GATE OK; final sheet out/ab/sheet_final.jpg read at 768x480.
- Cut text: shot 1 state 0, shot 2 state 0, after every step.
- Dossier: 1,136,967 B, byte-identical over two runs (<= 1.45 MiB), on the checks commit. Kit check on HEAD: 4
  passed, 0 failed (16 skipped, 5 at submission). Path grep: 0 files. Kit copy level 26, site 27.
- Data: app/data unchanged since G5 (0 diff lines); 55 official names, descriptions and grades identical to the
  starter; 182 steps and every disagree version carry cites that resolve to registry sources (0 unresolved).

## Done (G7, short run, 2026-11-19 20:35-20:54 EET): shot 1 only
Input: the operator's judge read of G6 against the two tied leaders: each opens a trophy's detail with a short,
labelled, plain-language answer (what to do, the one risk, missable or not) before the numbered steps; our pane had
one unlabelled line there that reads like a sub-heading at judge size. No new facts, no new sources, no web
research, no theme change. A/B rule as in G6: re-shoot shot 1 as shots.json defines it, judge-sheet preview into
out/ab/ (g7_sheet_*.jpg), read before (out/ab/sheet_before.jpg) and after at 768x480, cut-text check on the shot 1
state; keep only if the cover clearly reads better and the cut count stays 0.
1. Kept. Every guide pane opens, right under the official description and its chips, with a "Short answer": a
   teal-ruled block with an inline label, at most two sentences, each ending with the trophy's own cite numbers (the
   same [n] its steps use). Written for all 55 in our own words from each trophy's cited steps and missable call
   (new file app/data/g7-answers.json, attached at load; trophies.json's official fields untouched). It replaces the
   unlabelled one-line summary (the 'guide' field stays in the data as a fallback only; it is not shown beside the
   answer). The steps' heading now reads "How to get it · step by step, in our own words". Answer text is 15 px,
   the steps' size, in the pane's brightest text colour.
   First shot: the answer took three lines and pushed the window line and legend rows [4]-[6] under the fold. Room
   was made inside the pane, nothing dropped: step spacing 1.33 -> 1.28 with no gap between steps; Positive Mental
   Attitude's steps 1 and 3 reworded shorter with the same cites (step 1's lone cite box on a second line is gone,
   and step 3 no longer wraps for "Collections [1][2]"); its answer trimmed to two lines. At 768x480 the cover now
   reads: SHORT ANSWER "Meditate at all 18 spots: 2-9 as each lead, plus balcony and Kalaga summit [1][4]. Do
   Jason's house in Chapter 1 and keep a save; it may go later [1][2]", then six steps, the "Sources disagree"
   row with both versions, the missable call with its full window line, and all six legend lines, all above the
   fold. Cut text 0 (21 checked). Four answers (23, 34, 39, 44) and then two more (1, 26) were trimmed to keep all
   55 at 34 words or fewer.
2. (optional) Tried and reverted. Answer text one size larger (16 px): on the cover the answer wraps to a third
   line with "later [1][2]" alone on it, and everything below moves down so the legend's last line and the window
   line sit on the fold edge. Cut text stayed 0, but the cover did not clearly read better, so the CSS and shot 1
   were restored with git. Open.
3. Checks. Shots 2 and 3 were not re-taken: the roadmap and Sources & save views do not show the guide pane, and
   their counts did not change. shots.json: only shot 1's "shows" sentence changed (it names the Short answer).

## Numbers (end of G7)
- Shots: 1-checklist-guide.jpg 249,994 B (q82) · 2-roadmap.jpg 255,802 B (q81, unchanged) · 3-sources-save.jpg
  215,559 B (unchanged), all <= 250 KiB = 256,000 B. Judge-sheet preview GATE OK; final sheet out/ab/g7_sheet_final.jpg
  read at 768x480.
- Cut text: shot 1 state 0, shot 2 state 0, after every shoot.
- Dossier: 1,135,043 B, byte-identical over two runs (<= 1.45 MiB), on step 1b and again on the checks commit. Kit
  check on HEAD: 4 passed, 0 failed (16 skipped, 5 at submission). Path grep: 0 files. Kit copy level 26, site 27.
- Answers: 55/55 written; each has at most 2 sentences, each sentence ends with cite numbers, every cite resolves to
  a registry source through that trophy's own cites (0 unresolved); longest 34 words (cites not counted).
- Data: 55 official names, descriptions and grades identical to the starter (0 differences). trophies.json changed
  only in Positive Mental Attitude's steps 1 and 3 (shorter wording, same cites [1] and [1][2]). 182/182 steps cited;
  audit counts unchanged: 37 on 2+ independent sources, 136 single-source, 10 trophies where sources disagree.

## Done (G8, short run, 2026-11-20 03:45-04:00 EET): shot 1 only, calm
Goal: shot 1's guide pane reads calmer at the judge's 1024 px (after G7 the judge placed us #20, 0.9385; the pane
stacked about six coloured boxes in small type). No new facts, sources or wording; app/data untouched; theme kept.
Baseline: out/ab/before_1024.jpg and out/ab/sheet_before.jpg (the G7 shot 1).
1a. KEPT. Room freed without changing type size: the Short answer loses its panel (no background, border or
   padding; its teal label stays inline); the official description loses its tinted box (label and 9/18 counter
   kept); kind, stage and the missable call leave their chip row and sit as plain text on the grade line under the
   trophy name (each part kept whole, so the line only breaks between parts: on the cover it breaks before
   POSSIBLY MISSABLE); the cite legend loses its box and becomes a plain list headed 'Sources' ('read · how many of
   55 guides cite it'; rows 'n of 55', no more '55/55'), still in the right column beside the missable call; h3 and
   callout top margins 8/6 -> 4 px. Two coloured callouts are left (sources disagree, possibly missable). A/B at
   1024x640 (out/ab/g8a2_1024.jpg vs before_1024.jpg): clearly calmer, four boxes fewer, every fact still shown,
   about 47 px freed. The first shoot broke 'Stage 1 · Chapter 1' across lines; fixed before the commit.
1b. KEPT for the steps, REVERTED for the answer. Steps 15 -> 16 px (line height 1.26). The answer at 16 px wrapped to
   a third line holding only its last cite (the G7 result again), so it stays at 15 px as the plan says. A/B at
   1024x640 (out/ab/g8b2_1024.jpg) and on the 768x480 sheet (out/ab/g8b2_sheet.jpg vs sheet_before.jpg): steps
   visibly larger and easier, the pane calmer, nothing lost; on the 1280x800 shot the window line's last cite and
   the last 'Sources' row (LFCarry) sit fully inside the pane, above its bottom edge (read on the 1024 and 1280 images, not measured in px).
3. Checks. Shots 2 and 3 not re-taken (their views do not show the guide pane). shots.json: only shot 1's "shows"
   sentence changed.

## Numbers (end of G8)
- Shots: 1-checklist-guide.jpg 255,911 B (q82) · 2-roadmap.jpg 255,802 B (unchanged) · 3-sources-save.jpg 215,559 B
  (unchanged), all <= 250 KiB = 256,000 B. Judge-sheet preview GATE OK after every shoot; final sheet
  out/ab/g8b2_sheet.jpg read at 768x480.
- Cut text: shot 1 state 0, shot 2 state 0, after every shoot.
- Dossier: 1,142,973 B, byte-identical over two runs (<= 1.45 MiB), on the checks commit. Kit check on HEAD:
  4 passed, 0 failed (16 skipped, 5 at submission). Path grep: nothing printed.
- Data: app/data byte-identical to G7 (git diff 1cb2280 -- app/data/ is empty): 55 official names, descriptions
  and grades unchanged, answers 55/55, every step and answer cite as in G7 (0 unresolved).

## Done (G9, short run, 2026-11-21 09:46-10:05 EET): the evidence reads at a glance
Goal: the header's audit facts read at a glance on shot 1, at the judge's 1024x640 and on the 768x480 sheet (after
G8 we were dev #40 of 6,482, 0.9458). The old audit line was one 14 px line: hard to read at 1024 and unreadable at
768. No new facts, sources or wording in the data; app/data untouched; theme, band, tagline and guide pane unchanged.
Baseline: out/ab/g9_before_1024.jpg and out/ab/g9_sheet_before.jpg (the G8 shot 1; the older before_* files are G7).
1. KEPT. The audit line becomes a row of seven tiles under the band. Each tile is a big number (24 px, line height
   24 px, weight 800, near-white) with its words beside it on the right, in one or two 12 px lines (line height
   12 px), and tiles are split by a thin dark rule rather than boxed. The row: teal 'Audit' tag; 55 official
   (second line 1 P · 2 G · 6 S · 46 B); 28 hidden; 14 sources (second line 'read 19 Nov'; hover '9 guides, 5
   lists'); 182/182 steps cited; 37 on 2+ independent sources (both step tiles carry the hover '136 of 182 steps rest
   on one independent witness ...'); 10 sources disagree (violet, its own colour as before); and 2 possibly missable
   and 5 trigger unknown as two separate numbers, each with its own words. auditHtml still counts every number from
   the data at load, and nothing is typed in. id="audit" and class "audit" are kept on the row (boot.js fills it;
   cut-check reads it).
   Room: the row is 26 px tall where the old line was 22 px; .top padding-top 6 -> 4 px and its gap 3 -> 2 px;
   --head-h is still 108 px. Measured with Playwright at 1280x800: the tab row's top was 78 and is now 77.6, the
   guide pane's top was 118 and is still 118, and the audit row sits at y 50-76, width 1240 with no overflow.
   Keep rule, as I read it: at 1024x640 (out/ab/g9_2_1024.jpg vs g9_before_1024.jpg) each number (55, 28, 14,
   182/182, 37, 10, 2, 5) reads without zooming, where before the line was small print. On the 768x480 sheet
   (out/ab/g9_2_sheet.jpg vs g9_sheet_before.jpg) the row now reads as a row of numbers; before, it was one grey
   line. Every fact the line showed is still on the cover or in a hover title, the guide pane and list start
   at the same y (118) and show the same lines down to the fold, nothing overlaps (full-res header crop out/ab/g9_2_head.jpg), and cut text is 0.
   First try had 11.5 px labels and 16 px tile padding, so the row ended at x 1070; the kept version uses 12 px
   labels and 20 px padding to spread the row across the free width.
2. Checks. Shots 2 and 3 were re-taken because their header shows the same tile row (the views under it did not
   change). shots.json: only shot 1's "shows" sentence changed (the audit line became the tile row); shots 2 and 3
   do not describe the header.

## Numbers (end of G9)
- Shots: 1-checklist-guide.jpg 251,825 B (q81) · 2-roadmap.jpg 250,613 B (q80) · 3-sources-save.jpg 216,922 B
  (q85), all <= 250 KiB = 256,000 B. Judge-sheet preview GATE OK after every shoot; final sheet
  out/ab/g9_final_sheet.jpg read at 768x480. Tile numbers stay crisp at q81 at 1024x640.
- Cut text: shot 1 state 0, shot 2 state 0, after every shoot.
- Header geometry (1280x800): tab row top 78 -> 77.6, guide pane top 118 -> 118, audit row y 50-76 (26 px), last tile
  ends at x 1142.
- Dossier: 1,132,381 B, byte-identical over two runs (<= 1.45 MiB). Kit check on HEAD (checks commit): 4 passed,
  0 failed (16 skipped, 5 at submission); the kit copy is level 26 and the site is at 32 (operator's call). Path
  grep: nothing printed.
- Data: app/data byte-identical to G8 (git diff e4d38d7 -- app/data/ is empty): 55 official names, descriptions and
  grades unchanged, answers 55/55, every step and answer cite as in G8; 0 trophies without cites.

## Known issues
- G9: the tile labels are 12 px, so at 768x480 the numbers read but most of their words do not; the hover titles
  only help on a real screen.
- G9: the official tile's second line (1 P · 2 G · 6 S · 46 B) is the smallest text in the row.
- G9: the tile row has no narrow-screen rule; its last tile ends at x 1142 on the 1280 cover, so below about
  1160 px wide it would run past the right edge.
- G9 (seen, not new): on shot 3 the fixed footer line sits over the last visible registry row (eGamers list); the
  G8 shot 3 shows the same thing (out/ab/g8_shot3_foot.jpg).
- G8: shot 1 is 89 B under the 256,000 B cap (q82); any more text in view will push the shooter's quality lower.
- G8: the next section's heading ('Not pinned down yet') and the top half of its first line now peek in at the
  pane's bottom edge on the cover (scrollable content below the fold, not cut horizontally; cut check 0).
- G8: on the cover, step 6 ends with 'rocks [4].' alone on its third line at 16 px.
- G8: the answer (15 px) is now one size smaller than the steps (16 px); the label and brighter colour still mark
  it as the lead.
- G7: answers summarise the trophy's cited steps, so where a step's figure is itself disputed (A Long Road: 300
  stunts per [1][2], 250 per LFCarry [5]) the answer gives the steps' figure and the dispute stays in the pane's
  "Sources disagree" row, not in the answer.
- G7: the Short answer adds about two lines to every pane; a trophy with six or more two-line steps plus a long
  legend (more than about six cites) may now push its last legend lines under the fold at 1280x800. Positive
  Mental Attitude, the cover, fits.
- G6: the roadmap's Missable watch list still marks a trigger-unknown trophy with an amber "?" flag (a glyph beside
  a name, not after a digit); left as it is in this run. Open.
- G6: shots 1 and 2 sit just under the 250 KiB cap (q83 and q81); more text in view would push the quality lower.
- G6: the legend sits beside the missable call, so a trophy with many cites (more than about six) would push its
  last lines under the fold at 1280x800; Positive Mental Attitude has six.
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

## G10: nothing is hidden under the footer
- Flaw named by every call of an independent 6-call review: on shot 3 (Sources & save) the footer line was drawn
  over the registry table's last row (eGamers list), so both read as a jumble. Cause: .view has a fixed height
  (100vh minus header and footer) but on the save route nothing in it scrolled, so the save page overflowed down
  past .view and under the transparent footer.
- Step 1 (CSS only, app/css/sunline.css): on the save route .view gets overflow-y auto and 8 px bottom padding, so it
  is its own scroll area that ends above the footer; the footer gets position relative, z-index 1 and the opaque page
  background, so even if content overflows, nothing shows through the footer strip. No markup, text, data, tiles,
  detail pane or theme changed. Checklist and roadmap rules are untouched.
- KEPT. Before/after crops of the lowest 240 px of all three shots (out/ab/g10_before_*_bottom.jpg,
  g10_after_*_bottom.jpg): on shot 3 the footer now sits on its own strip and the registry ends cleanly at the
  scroll area's edge after PowerPyx Delights (the 14th row, eGamers list, is one scroll down, not overdrawn); the
  "where sources disagree" column is cut the same clean way. Shots 1 and 2 bottoms are unchanged; shot 1's only pixel
  difference from G9 is a 6x9 px spot in the header's saved-at time (x 1141, y 29), so tab row top 77.6 and pane top
  118 are unchanged, and the missable window line and the last 'Sources' row (LFCarry) stay inside the pane.
  Cut-text check: shot 1 21 checked, 0 cut; shot 2 15 checked, 0 cut.
- Numbers: shots 251,728 B (q81) / 250,613 B (q80) / 212,356 B (q85), all <= 250 KiB = 256,000 B; judge-size preview
  of shot 3 at 1024x640 read (footer clean), sheet out/ab/g10_sheet_final.jpg; dossier 1,126,171 B, byte-identical
  twice (out/g10d1, out/g10d2); kit check on HEAD 4 passed, 0 failed (16 skipped); path grep empty. shots.json
  unchanged: shot 3 still shows the registry and its "14 sources" heading. App data unchanged since G9.

## Next
- G9 open: a narrow-screen rule for the tile row (wrap to two rows, or drop the second label lines below ~1160 px).
- G9 open: try 13 px tile labels if the row still fits 1240 px and 26 px height (labels would read better at 768).
- G10 open: a small "more below" fade or row count at the foot of the Sources & save scroll area, so the 14th source
  (eGamers list) reads as one scroll away.
- G8 open: the Short answer at 16 px like the steps; it needs Positive Mental Attitude's answer to fit two lines at
  16 px (a few words shorter, same cites), then A/B at 1024x640 and 768x480 again. The plain grade line would fit one
  line if the Mark earned button moved; not tried.
- G8 open: check the calmer pane on the other trophies with long steps and many cites (the cover fits).
- More sources for the one-source guides once new guides publish (Push Square, KeenGamer could not be read).
- Bring the shots under 210 KiB (less text in view, or fewer rows) without losing the cover's required parts.
- A "Next up" pick could weigh time-sensitive strands (Race Against Yago) above plain roadmap order.
- G5 follow-ups: show "cited by n" per source on the cover (guide pane Sources, or the row tag); a filter chip for
  "sources disagree"; a second independent witness for the 136 single-source steps once more guides are readable.
