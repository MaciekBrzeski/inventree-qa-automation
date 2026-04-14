---
name: ui-explore
description: >
  Discovery-driven UI exploration for test automation. Drives a Playwright browser to walk a
  SPA — clicking tabs, action menus, drawer items, dialog triggers — and captures a per-state
  inventory of aria-labels, button texts, roles, and routes into a snapshot directory.
  Use when the user says "explore the UI", "click more parts", "discover clickables",
  "find more test targets", or invokes /ui-explore. Use when a selector inventory needs to
  grow beyond the hand-captured screenshots.
---

# ui-explore — discovery-driven SPA walker

## Purpose

Most modern SPAs hide their interactive surface behind drawer menus, action dropdowns, tab
bars, and modals. A single static snapshot captures maybe 10% of the clickable elements.
**ui-explore** automates a depth-limited walk: click, wait for loader, snap, extract new
aria-labels, repeat until the coverage plateau is reached.

Output is two things:

1. A flat `snapshots/` directory of `<state>.html` + `<state>.png` + an `_inventory.json`
   indexed by page route and trigger. Every file is an anchor a future Playwright spec can
   retrieve.
2. A `coverage.md` report listing: routes visited, unique aria-labels discovered, unique
   button texts, per-state deltas, and a suggested next-step list (elements still
   unexplored from the backlog).

## Inputs

| input | default | notes |
|---|---|---|
| `baseURL` | `$INVENTREE_URL` or `http://inventree.localhost` | the SPA root |
| `seedRoutes` | `['/', '/web/part']` | where the walker starts each session |
| `maxClicks` | 30 | hard cap on total clicks per run — keeps session bounded |
| `maxDepth` | 3 | how many sequential clicks before backtracking |
| `excludeTextRegex` | `/delete|remove|log.?out|sign.?out|reset|drop/i` | destructive labels skipped |
| `excludeLabelRegex` | `/^nav-breadcrumb-action$/` | aria-labels known to be risky |
| `waitForLoadersGone` | `true` | use `.mantine-Loader-root` visibility watcher |

## Algorithm

```
visited: Set<string>        # elementKey = f"{route}::{aria-label or text}"
backlog: Queue<Candidate>
discovered: Map<route, Set<aria-label|text>>

for seed in seedRoutes:
  goto(seed); waitLoadersGone(); snap(seed)
  backlog += enumerateInteractive(page)    # all buttons, tabs, menuitems, expandable rows

while clicks < maxClicks and backlog not empty:
  c = backlog.pop()
  if c.key in visited: continue
  if destructive(c): continue
  visited.add(c.key)

  beforeUrl = page.url()
  beforeMd5 = hash(page.content())
  try:
    click(c, timeout=5s)
  except:
    record(c, "click-failed"); continue

  waitLoadersGone()
  afterUrl = page.url()
  afterMd5 = hash(page.content())

  stateName = slugify(c.key)
  snap(stateName)

  # diff: new aria-labels, new button texts, new route
  newLabels = extractLabels(page) - discovered[currentRoute]
  discovered[currentRoute] += newLabels

  if newLabels.size > 0 or afterUrl != beforeUrl:
    # productive click — recurse
    backlog += enumerateInteractive(page).filter(notVisited)
  else:
    record(c, "no-effect")

  # return to a stable base if we drifted too deep
  if depthFrom(currentSeed) > maxDepth:
    goto(currentSeed); waitLoadersGone()

emit coverage.md
```

## Safety

Exclude destructive triggers by **text AND by aria-label**. Never click anything matching:

- `delete`, `remove`, `log out`, `sign out`, `reset`, `drop`, `clear`, `destroy`
- aria-labels known to side-effect (`action-button-reset-database`, etc.)

Skip modals that require filling a form to close — use `Escape` to dismiss.

Always start from an authenticated storageState so login isn't re-exercised on every seed.

## Output format

```
submission/data/ui-explore/
├── snapshots/
│   ├── 00-seed-home.html
│   ├── 00-seed-home.png
│   ├── 01-click-navigation-menu.html
│   ├── 01-click-navigation-menu.png
│   ├── 02-click-Dashboard.html
│   ├── ...
│   └── _inventory.json   # full labels+text+routes per snapshot
├── coverage.md           # human-readable report
└── run-log.jsonl         # one line per click: {timestamp, route, candidate, effect, ms}
```

## How to invoke

```
# From the project root, run the explorer spec via Playwright:
cd submission/automation/ui
npx playwright test tests/_explore.spec.ts --project=chromium --reporter=list

# Tweak budget via env:
MAX_CLICKS=50 MAX_DEPTH=4 npx playwright test tests/_explore.spec.ts
```

After a run, Claude Code should:

1. Read `submission/data/ui-explore/coverage.md` — it lists the top unexplored aria-labels
   remaining in the backlog.
2. For each new aria-label worth automating, either update `docs/qa/selector-inventory.md`
   and the per-page locator maps in `docs/inventree/ui/*.md` (so Gemma can retrieve them),
   or propose a new spec file name and offer to generate it via the RAG loop.
3. Rerun with a widened `maxClicks` budget once the first pass settles.

## Iteration pattern

The skill is meant to be invoked repeatedly as the UI's surface grows in the model's
mental map:

- **Round 1**: seed routes only. Budget 30 clicks. Discover the top two layers.
- **Round 2**: add the new routes found in Round 1 as explicit seeds. Budget 40.
- **Round 3**: add the modal trigger aria-labels as explicit seeds with a nested walker
  that dismisses with Escape between clicks.

Stop when two consecutive rounds add zero new unique aria-labels.

## Consumers

- `submission/automation/ui/pages/*.ts` — Page Object definitions should be updated whenever
  a new durable aria-label is found.
- `docs/qa/selector-inventory.md` — single source of truth, humans read this.
- `docs/inventree/ui/<slug>.md` — per-page machine-readable locator maps for RAG retrieval.
- The RAG vector store (`submission/agents/rag/vectors.db`) should be rebuilt after the maps
  grow: `cd submission/agents/rag && rm vectors.db chunks.jsonl && npx tsx index.ts`.
