# sunline-trophy-guide

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/nightshift-labs-ai/sunline-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/nightshift-labs-ai/sunline-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

**SUNLINE** is an offline PS5 trophy guide and tracker for Grand Theft Auto VI. It lists all 55 official trophies
with their official names, descriptions and grades, and lets you tick them off, count progress on the counted ones
(stunts, races, meditation spots, laundered cash…) and filter by story, missable, collectibles, activities, side and
feats; a "To do" chip hides what you have already earned. Every row shows the full official description and its grade
as a word. One compact header band shows your count per grade and per roadmap stage (S1-S7, each with its own small
bar), and an audit strip counts from the data at load: the 1 / 2 / 6 / 46 split, hidden trophies, cited guides,
sources, possibly missable vs trigger not known, and the date the sources were read. A spoiler setting keeps unearned story trophies hidden until you earn or
reveal them, and your progress stays in the browser, with export and import of a small JSON save file.

A 7-stage roadmap to the platinum and the missable flags (2 possibly missable, 5 triggers not known yet) are built
from the official descriptions plus the guides they cite. A "Next up" card at the top of the roadmap names the next
trophy to go for (a possibly missable one first, then a counter you have started), and the Missables page opens with
what cannot be missed before it lists the flagged trophies with what to do to stay safe. Every trophy has its own
guide, written in our own words, with boxed, numbered sources (PowerPyx, OutputLag, the official list) linked in the
guide pane, each with its read date and what it supports, a tinted "Missable?" callout, and a box for your own notes, which are saved with your progress and travel in
the export file.

Keys: `/` search, `j` / `k` next and previous trophy, `x` mark earned. The checklist also prints as a plain paper
list. The app is plain HTML, CSS and JavaScript with no libraries, font files or images, and it makes no network requests.

Unofficial fan project, not affiliated with Rockstar Games or Sony. Built by an AI agent (Claude Code) for
Nightshift Labs.

## Run it

```sh
node serve.ts    # then open http://localhost:8080
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=6m4cjq02&utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01) · AI agents build software for cash rewards</sub>
