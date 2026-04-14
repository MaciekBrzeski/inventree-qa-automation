---
title: "Retrospective — ui-explore + api-ui-gap skill loop (Phase 5 + 6)"
tags: [qa, hackathon, retrospective, skills, ui-explore, api-ui-gap]
created: 2026-04-14
---

# Retrospective — ui-explore + api-ui-gap skill loop

Period: the discovery-driven UI exploration iterations through the end of the Phase 6 plan execution, landing at **11 / 83 (13.3 %)** UI→API coverage with all four HTTP verbs exercised from real Mantine-rendered flows.

## What the loop produced

- **Two first-class reusable skills** — `ui-explore` (DFS discovery walker) and `api-ui-gap` (coverage diff against OpenAPI). Both have `SKILL.md` definitions under `.claude/skills/`.
- **Four categories of scripts** that compose into a closed loop:
  1. `submission/automation/ui/tests/_explore.spec.ts` — the walker.
  2. `submission/automation/ui/fixtures/auth.ts` — auto-recording fixture that captures every page-scoped API call, merges across runs.
  3. `submission/agents/rag/api-ui-gap.ts` — OpenAPI diff + gap report.
  4. `submission/agents/rag/ui-api-correlation.ts` — click→API correlation report + auto-generated correlation spec template.
- **Five directed UI specs** that together exercise full Create / Read / Update / Delete on two entities (category, part) from the Mantine `/web/` app: `a-parts-category-create`, `b-parts-create` (incl. edit), `y-parts-ui-delete`, `z-parts-cleanup`, plus `_explore` itself.
- **Two "accidentally discovered" InvenTree findings** that became bug reports only because a generated/directed test hit them:
  - `INV-PARTS-001` — DELETE refused on active parts (discovered by API repair loop, reconfirmed by UI delete flaky).
  - State quirk: Delete menu item is rendered with `data-disabled="true"` when the part is active, so even the UI path needs a `PATCH active=false` + page reload before the menu item is clickable.

## What worked

### Discovery → directed handoff is the winning pattern

Neither pure exploration nor pure directed specs alone produce good coverage. The loop that works:

1. **Discover** with the walker at wide breadth.
2. **Spot high-value targets** in `click-to-api.jsonl` — specifically any click that triggered a POST, PATCH, or DELETE.
3. **Write a directed spec** that replays just that one chain with explicit selectors.
4. **Retire the discovery** — don't keep the walker's auto-clicks around. They're brittle, state-dependent, and slow.

This is exactly how `POST /api/part/category/` landed: the walker clicked `action-button-add-part-category` → Submit in a depth-2 descent, the correlation log captured the chain, then `a-parts-category-create.spec.ts` was written as a hand-crafted directed test based on that finding.

### Auto-merge of `per-test-requests.json` across runs

Small addition, massive impact. Before: each `npx playwright test` invocation overwrote the file, so the union of coverage across different seed configurations was impossible to compute. After: successive runs accumulate, and the gap analyzer reports the union.

### OpenAPI filter is the right denominator

Coverage against the full 264-endpoint InvenTree schema would be meaningless (we're not testing auth, settings, news, etc.). Filtering to `/api/part|/api/bom` — 83 endpoints — keeps the number honest and the suggested seeds actionable.

### Per-click `page.on('request')` correlation

A short-lived listener around each click window produces deterministic "this click fires that endpoint" mappings without needing trace files or replay infrastructure. 17 correlations captured across 80 clicks in one run; 2 of them were stable enough to auto-generate passing spec templates.

### `action-{button,menu}-<slug>-<action>` is InvenTree's locator convention

Once the pattern was recognised, finding new triggers became mechanical. `action-menu-add-parts` → `action-menu-add-parts-create-part`. `action-menu-part-actions` → `action-menu-part-actions-edit` / `action-menu-part-actions-delete`. Every probe found the right label within one or two evaluate() dumps.

## What didn't work

### Auto-generated correlation tests are brittle

The `ui-api-correlation.ts` analyzer emits a Playwright spec from the JSONL. On the first attempt, 13 of 13 generated tests **failed** when run in isolation. Root causes:

- **Stateless clicks re-use cache.** React Query caches `/api/part/category/` for the session; clicking "Category Details" tab a second time is a no-op, but the walker recorded an API call because it happened to be the first click. The generator reproduces the click but the cache is cold and nothing fires.
- **Pagination buttons are stateful.** Clicking "1" only fetches when currently on page ≥ 2. The recorder couldn't distinguish "always fires X" from "fires X only in context Y".
- **Chain ancestry has false positives.** The walker attached `row-action-menu-0` as an ancestor to nav/tab clicks that were already visible before the row menu opened, because enumerate() saw them in the after-snap too. The fix ("only mark as descendant if absent from before-enum") helped but didn't eliminate false chains.

The generator was eventually filtered down to **only** emit tests whose target is `Submit` AND has an ancestor chain. That's 0 passing auto-generated tests right now, because the filter is strict and the data thin.

**Lesson**: auto-generated correlation tests are a *discovery artefact*, not a shipping test suite. Keep the markdown report, keep the analyzer, but don't check the generated `.spec.ts` file into the running suite. Use it as a reference when hand-writing directed specs.

### Action-menu drill-down needed content-hash keying

The first-pass DFS dedup keyed by `route::label`. When an action menu opened, the newly-visible menu items hashed into the same keyspace as the menu trigger itself — `visited.has()` rejected them. Fix: add a stripped content hash (`contentKey`) to the dedup key so menu-open and menu-closed are two different namespaces. Works, but the "strip volatile bits" regex is a never-ending game of whack-a-mole — every new Mantine auto-id breaks dedup.

**Lesson**: the real fix is semantic — track which elements became visible by comparing before/after DOM snapshots, not by hashing. My current implementation does both: hash for the key, before/after diff for the descendant marker. The hash is belt-and-braces.

### Separate APIRequestContext isn't captured

`createAuthedContext` uses `request.newContext(...)` which is a separate context from the page. Requests through it are **not** seen by `page.on('request')` and do not count toward coverage. That's the correct semantic — we don't want our API seed calls to falsely inflate UI coverage — but it's a footgun when you forget. Several of my early test iterations seeded via `createAuthedContext`, ran clean, then the gap report said coverage didn't move, and I spent time wondering why.

**Lesson**: document the fixture/context distinction prominently in the helper file's docstring, and in `.claude/skills/api-ui-gap/SKILL.md`. Currently only mentioned in passing.

### DFS walker drifts away from seeds

With `popBack()` LIFO order, when a productive click produces many children, the walker dives into the newest one, then the newest one's newest one, and so on. After 20–30 clicks it's three subtrees deep from the original seed and no longer touches the intended exploration area. My "backtrack if depth ≥ MAX_DEPTH" only fires at leaves, not at drift.

**Lesson**: need a hybrid — depth-limited DFS within a "phase" bounded to the current seed, then pop back to the seed stack and continue. Or: time-slice exploration — every N clicks, hard-reset to the next seed.

### Spotlight keyboard shortcut doesn't respond to `page.keyboard.press('Control+K')`

The Mantine Spotlight has a keyboard trigger that fires in the real browser but not programmatically through Playwright's keyboard API. I tried twice and gave up. The `open-spotlight` button in the top bar works but doesn't open the spotlight — it's a decoy icon. This meant the entire "search for action by name" path was blocked and I had to discover every button via DOM enumeration.

**Lesson**: file a bug report against InvenTree or Mantine. Add to the `ui-explore` skill doc that Spotlight isn't programmatically reachable.

### Auto-generated specs needed heavy hand-fixing

Similar story for Gemma-generated Phase 2/3 specs: they need so much post-processing that it's faster to hand-write. The code fence wrapping, the `ctx.request.*` hallucinations, the truncated mid-string output. Gemma-generated *test cases* (markdown tables) are fine because review is cheap; Gemma-generated *executable code* has too many ways to be wrong.

**Lesson**: keep Gemma in the loop for case generation and for *reviewing* human-written specs against a checklist. Don't ask it to emit runnable spec files end-to-end.

## Friction log — things that cost time

- **CSRF on `page.request.post`**: took an iteration to realise that page.request shares the session cookie but not the CSRF header, so POST/PATCH/DELETE return 403. Workaround was to use `createAuthedContext` (token auth) for probe-only setup, but then coverage doesn't count. The right pattern is "UI clicks the form → real SPA fetch fires → listener records it".
- **`/web/partcategory/<pk>` vs `/web/part/category/<pk>/details`**: two different route patterns for the same entity. The first renders an empty shell, the second the full detail page. Found only by comparing explorer snapshots.
- **React Query cache** invalidating reproducibility — re-running the same test returns a different covered set because the browser context carries state across tests in the same worker. Disposing the browser context per spec would fix it but costs startup time per test.
- **Chromium rebuild on each `npx playwright install chromium`** — slow and keeps printing "OS not officially supported" warnings. Not a real problem, just noise.
- **Ollama runner stuck** after switching models — required `sudo systemctl restart ollama`. The vision-variant gemma4:e4b caused it. Stopped using e4b.

## Concrete improvements (ordered by leverage)

### 1. Coverage phase runner

Build a single entry script `submission/scripts/coverage-loop.ts` that:

1. Deletes `per-test-requests.json` to start clean.
2. Runs the UI suite (`npx playwright test`).
3. Runs `api-ui-gap.ts`.
4. If there are uncovered endpoints whose `seeds.json` entry points to a route we haven't yet explored, run `_explore.spec.ts` with those seeds.
5. Re-run the UI suite (merge mode picks up new data).
6. Re-run `api-ui-gap.ts`.
7. Stop when two consecutive iterations don't grow the covered set.

Would remove the manual "cd here, run that, inspect this, cd there" friction.

### 2. Stable test data per spec

Every UI CRUD spec currently creates its own session-tagged entities. Problem: every run re-creates, delaying the SPA by ~400ms per create. Fix: a one-shot `global-setup.ts` that creates a `UI-FIXTURE-*` category + an assembly with a BOM line + some stock, and a `global-teardown.ts` that cleans them up. Specs reference those fixed entities. Walker and correlation specs both benefit.

### 3. Phase-based exploration, not raw DFS

Replace the flat DFS with a phase runner:

```
for seed in seeds:
  explore(seed, max_clicks=BUDGET_PER_PHASE)
  reset to login
```

Where `explore()` does its own budget-bounded DFS anchored at the seed and hard-resets to it whenever drift exceeds `MAX_DEPTH`. Current explorer drifts across phases and loses focus.

### 4. Better correlation filtering — "stable API triggers"

Instead of filtering by *candidate name* (the current regex-based NOISY_LABEL / NOISY_TEXT approach), filter by *observed behaviour*: only emit a correlation test if the same click was observed to trigger the same API call in ≥ 2 runs AND never triggered 0 calls. Requires the cumulative log, which we now have.

### 5. Per-test browser context for deterministic coverage

Switch `playwright.config.ts` to `use: { storageState: ..., ...newContextPerTest: true }` so every test starts with a cold React Query cache. Slightly slower, but then coverage is deterministic and re-running the same suite always reports the same covered set.

### 6. Pipe the gap report into the correlation generator

Right now the correlation analyzer is agnostic to which endpoints are covered vs uncovered. It should be biased: *preferentially emit correlation specs for uncovered endpoints*. A click that triggers a covered endpoint is less interesting than one that triggers an uncovered one — because the latter, if hand-ported, immediately improves coverage.

### 7. `api-ui-gap.ts` should output a trend

Currently a point-in-time report. Should also append a row to a `trend.csv` with `{timestamp, covered, uncovered, ratio}` so we can graph coverage over time during the hackathon demo.

### 8. Click chain replay as a fixture

The correlation generator's chain replay logic (click ancestor → fill name → click target) should live in a reusable fixture (e.g. `fixtures/click-chain.ts`) so hand-written specs can import it and express "replay chain X" in one line instead of four locator operations.

### 9. Skill definitions should include a "how to iterate" section with concrete commands

Both `SKILL.md` files currently describe the algorithm but not the exact commands to run each iteration. Add a bash block:

```bash
# Iteration N
rm -f submission/data/api-ui-gap/per-test-requests.json
cd submission/automation/ui && npx playwright test
cd ../../agents/rag && npx tsx api-ui-gap.ts
cat ../../data/api-ui-gap/coverage.md
```

### 10. Save this retro itself as input to future planning

The retro at `docs/qa/snapshots/2026-04-14-ui-explore-skill/` is frozen state. Next planning session should read it before deciding what to iterate on — the "what didn't work" list is the most valuable part.

## Baseline metrics for next iteration

Start from these numbers; the target is measurable improvement without adding brittleness:

| metric | current | next target |
|---|---:|---:|
| endpoints covered | 11 | 20 |
| coverage ratio | 13.3 % | 24 % |
| POST covered | 2 | 3 |
| PATCH covered | 1 | 3 |
| DELETE covered | 2 | 3 |
| UI tests in suite | 33 | 40 |
| Flaky tests | 0 | 0 |
| Bugs in `docs/qa/bugs/` | 4 | ≥ 5 |
| Explorer walks retained (`click-to-api.jsonl` lines) | ~20 | ≥ 100 cumulative |

Every number should move up (or stay at 0 for flakes) in the next iteration. If something regresses, the loop should stop and investigate before merging.
