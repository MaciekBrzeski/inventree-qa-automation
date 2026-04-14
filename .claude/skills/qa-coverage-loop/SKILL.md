---
name: qa-coverage-loop
description: >
  Unified QA workflow that (1) analyzes current test coverage by running the three
  doc generators, (2) picks the highest-leverage uncovered area, (3) drafts a new
  spec using the primitives/recipes library, (4) runs the full suite to verify,
  (5) regenerates all coverage documentation and the retrospective baseline.
  Use when the user says "expand coverage", "next pass", "add tests for gaps",
  "close the gaps", "iterate coverage", or invokes /qa-coverage-loop.
---

# qa-coverage-loop — the validated end-to-end QA expansion loop

This skill is the **composition** of every workflow primitive built during phases 5–8
of the hackathon. It turns "find gaps → write tests → verify → document" into a
single repeatable loop that any future session can resume from exactly where the last
one stopped.

## When to invoke

- "Expand coverage"
- "Close the gaps"
- "Next pass"
- "Find uncovered areas"
- "Iterate on UI tests"
- "Grow the suite"

Any request that means "make coverage higher without breaking what exists."

## The loop — 6 phases

### Phase 1 — Analyze the current state

Run all three doc generators. They are idempotent: they wipe + rewrite their output
dirs, so stale notes never linger.

```bash
cd submission/agents/rag
npx tsx build-test-graph.ts        # docs/qa/graph/ — endpoint ↔ test pairing
npx tsx analyze-ui-paths.ts         # docs/qa/ui-paths/ — click-sequence tree
npx tsx build-coverage-docs.ts      # docs/qa/coverage/ — feature-area view
```

Then read the **coverage index** first because it's the highest-level view:

```
docs/qa/coverage/coverage-index.md
```

It shows every feature area with:

- endpoints in scope
- covered / total (ratio)
- automated UI test count
- automated API test count
- matching manual case count
- bugs filed

Open any area that has a low ratio. That's your target.

### Phase 2 — Identify the highest-leverage gap

Open `docs/qa/graph/index.md` and look at the **api-only** bucket. These are endpoints
hit by an API test but never by a UI test. Each one is a candidate for a new UI spec.

Rank the gaps by cluster size:

```bash
python3 <<'PY'
import re
path = 'submission/data/api-ui-gap/uncovered.txt'
try:
    lines = [l.strip() for l in open(path).readlines() if l.strip()]
    from collections import Counter
    groups = Counter()
    for line in lines:
        # Group by resource (first 3 path segments)
        m = re.match(r'\w+ (/api/[^/]+(?:/[^/]+)?)', line)
        if m:
            groups[m.group(1)] += 1
    for k, v in groups.most_common():
        print(f"{v:3d}  {k}")
except FileNotFoundError:
    print("run api-ui-gap.ts first")
PY
```

The biggest cluster is the highest-value single-spec target: one new spec file can
close 4–10 endpoints if the cluster has a shared add/list/delete pattern.

**Avoid** these clusters (will stay api-only by SPA design):

- **PUT variants** — the SPA always uses PATCH, never PUT.
- **Bulk collection PUT/PATCH** — SPA sends individual requests, not lists.
- **`/api/part/stocktake/*` writes** — blocked by [[bugs/INV-PARTS-005-stocktake-post-500|INV-PARTS-005]].
- **`/api/part/thumbs/*` writes** — require `page.setInputFiles(...)` image upload.

### Phase 3 — Probe the UI flow

If the target cluster has never been touched by a UI test, you don't know the click
chain yet. Write a throwaway probe spec to discover:

1. **Navigate** to the panel: `/web/part/<pk>/<panel>` or `/web/part/category/<pk>/<panel>`.
2. **Dump** the `action-button-*` / `action-menu-*` aria-labels visible on that page.
3. If a menu is involved, **open it** and dump the `role="menuitem"` children.
4. If a form modal is involved, **open it** and dump the `related-field-*`, `text-field-*`,
   `number-field-*`, `boolean-field-*` children.
5. **Delete the probe file** once you have the labels.

Template for a probe:

```ts
import { test, expect } from '../fixtures/auth';
import { createAuthedContext, createPart } from '../helpers/api';

test('_probe <panel> add flow', async ({ page }) => {
  test.setTimeout(120_000);
  const api = await createAuthedContext();
  const part = await createPart(api, { /* any flags the panel requires */ });
  await page.goto(`/web/part/${part.pk}/<panel>`);
  await page.waitForLoadState('networkidle');
  await page.getByLabel('navigation-menu').waitFor({ state: 'visible', timeout: 10_000 });
  await page.waitForTimeout(1500);

  // Dump visible action-* labels.
  const actions = await page.evaluate(() => {
    const out: string[] = [];
    document.querySelectorAll('button, [role="button"]').forEach((el) => {
      const r = (el as HTMLElement).getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const l = el.getAttribute('aria-label') ?? '';
      if (l.startsWith('action-')) out.push(l);
    });
    return Array.from(new Set(out)).sort();
  });
  for (const a of actions) console.log(`  ${a}`);

  // Click the add trigger and dump form fields.
  await page.getByLabel('<add-trigger-label>').click();
  await page.waitForTimeout(800);
  const fields = await page.evaluate(() => {
    const out: Array<{ label: string; name: string }> = [];
    const root = document.querySelector('[role="dialog"]') ?? document.body;
    root.querySelectorAll('input, select, textarea').forEach((el) => {
      const r = (el as HTMLElement).getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      out.push({
        label: el.getAttribute('aria-label') ?? '',
        name: (el as HTMLInputElement).name ?? '',
      });
    });
    return out;
  });
  for (const f of fields) console.log(`  ${f.label}  name=${f.name}`);

  await api.patch(`/api/part/${part.pk}/`, { data: { active: false } });
  await api.delete(`/api/part/${part.pk}/`);
  await api.dispose();
  expect(true).toBe(true);
});
```

### Phase 4 — Draft the real spec

Use the existing **primitives + recipes library** (`submission/automation/ui/paths/`).
Prefer composing recipes over writing raw click chains. If no recipe fits, extract
new primitives first (see the retro backlog for extraction candidates).

Recurring patterns that work:

```ts
// Navigation → action menu → menu item → form → submit → capture response
const [response] = await Promise.all([
  page.waitForResponse(
    (r) => /\/api\/<cluster>\/$/.test(r.url()) && r.request().method() === 'POST',
    { timeout: 10_000 },
  ),
  submitButton(page).click(),
]);
expect([200, 201]).toContain(response.status());
```

```ts
// Row-action-menu → Delete → dialog-scoped confirm
await page.getByLabel('row-action-menu-0').first().click();
await page.getByRole('menuitem', { name: 'Delete' }).first().click();
const dialog = page.getByRole('dialog');
await dialog.waitFor({ state: 'visible', timeout: 5000 });
const confirm = dialog
  .getByRole('button', { name: 'Submit', exact: true })
  .or(dialog.getByRole('button', { name: 'Delete', exact: true }))
  .first();
const [response] = await Promise.all([
  page.waitForResponse(
    (r) => r.request().method() === 'DELETE' && /\/api\/<cluster>\/\d+\/?$/.test(r.url()),
    { timeout: 10_000 },
  ),
  confirm.click(),
]);
```

**File naming convention** — alphabetical prefix controls execution order:

| prefix | semantics |
|---|---|
| `a-`..`h-` | setup / happy-path CRUD that creates entities |
| `i-`..`x-` | panel-specific flows using those entities |
| `y-` | UI-driven deletion of the session entities |
| `z-` | API safety-net cleanup |
| `z1-` | cross-functional flows (after all cleanup has a chance to run) |
| `_` | probe / discovery / infrastructure specs (excluded from the coverage reports by the `_`-prefix filter in every analyzer) |

Tests within an area use `.describe.serial(...)` if they share state across cases,
otherwise plain `.describe(...)`.

### Phase 5 — Verify

```bash
cd submission/automation/ui
# Run the new spec in isolation first to see failures quickly.
npx playwright test tests/<your-new-spec>.spec.ts --reporter=list

# Then the full suite.
rm -f submission/data/api-ui-gap/per-test-requests.json submission/data/ui-crud-state.json
npx playwright test --reporter=list
```

**When a locator fails**:

1. Read the error-context.md in `test-results/<test>/`. The resolved locator is printed —
   that tells you what the selector matched vs what you wanted.
2. Common fixes:
   - **`getByRole('button', { name: 'Delete' })` matches a trigger icon** — scope it to
     `page.getByRole('dialog').getByRole('button', { name: 'Delete', exact: true })`.
   - **Menu item not clickable** (`data-disabled="true"`) — the entity is in a state
     that blocks the action (e.g. active part can't be deleted per INV-PARTS-001).
     Deactivate via API + `page.reload()` before the menu click.
   - **`waitForResponse` timeout** — the endpoint path in the regex doesn't match the
     real SPA request. Swap for a diagnostic listener that logs every POST to `/api/`,
     rerun, fix the regex.

### Phase 6 — Document

Every code change triggers the docs regeneration:

```bash
cd submission/agents/rag
npx tsx api-ui-gap.ts              # gap report
npx tsx build-test-graph.ts         # endpoint ↔ test graph
npx tsx analyze-ui-paths.ts         # click-path tree
npx tsx build-coverage-docs.ts      # feature-area coverage
```

Open `docs/qa/graph/index.md` and confirm the bucket moved in the right direction:

| bucket | desired direction |
|---|---|
| **paired** | ↑ |
| **unpaired** | ↓ |
| **api-only** | → or ↓ (only ↓ if you closed an existing api-only gap) |
| **ui-only** | should stay 0 — if non-zero, an API test was deleted |

If the change is significant (a new skill, a new spec class, a new primitive family),
**append to the retrospective** at `docs/qa/retrospective-phase5-6-ui-explore.md` —
"what worked / what didn't / friction log / next leverage" — and update
[[minimum-test-list-expanded]] with the new `[x]` statuses.

## Counter-patterns to refuse

- **Writing a spec without running the doc generators first** — you'll duplicate work
  or target a gap that another spec already closes.
- **Adding a raw click chain when a recipe exists** — the primitives library is the
  source of truth for reusable navigation. Always compose.
- **Writing auto-generated specs into the running suite** — `ui-api-correlation.ts`
  produces a reference spec, but it is too brittle for the suite (React Query cache,
  pagination state, chain false positives). Use it as discovery input only.
- **Seeding write operations via `createAuthedContext` and calling that "coverage"** —
  those requests are NOT captured by `page.on('request')` and do NOT move the paired
  count. Only SPA-initiated fetches count.
- **Physical file reorganisation** — the coverage docs drive the view via a hardcoded
  `AREAS` map in `build-coverage-docs.ts`. Edit the map instead of moving files.

## Related skills

This skill **composes** two lower-level skills:

- [[../ui-explore/SKILL|ui-explore]] — discovery walker that produces `click-to-api.jsonl`
  used by the correlation analyzer and the path tree.
- [[../api-ui-gap/SKILL|api-ui-gap]] — the recorder fixture + gap analyzer that
  produce the headline paired count.

Run the sub-skills directly when you want their individual artefacts; run this one
when you want the whole loop.

## Artefacts touched by one loop iteration

```
# Written / rewritten by the scripts in this skill:
docs/qa/coverage/           # feature-area notes
docs/qa/graph/              # endpoint + test nodes
docs/qa/ui-paths/           # click-sequence tree
submission/data/api-ui-gap/ # covered.txt, uncovered.txt, dead.txt, coverage.md, seeds.json

# Written by the test author:
submission/automation/ui/tests/<area>.spec.ts
submission/automation/api/tests/<area>.spec.ts

# Optionally updated during the loop:
submission/automation/ui/paths/primitives.ts    # when a new reusable step emerges
submission/automation/ui/paths/recipes.ts       # when a new endpoint family needs a recipe
submission/agents/rag/build-coverage-docs.ts    # AREAS map when a new cluster appears
docs/qa/retrospective-phase5-6-ui-explore.md    # append new friction + wins
docs/qa/minimum-test-list-expanded.md           # flip [ ] → [x] for closed items
docs/qa/bugs/INV-PARTS-###.md                   # when the loop uncovers a real bug
```

## One-shot invocation (for a future session)

When a future Claude Code session sees this skill trigger, the first actions should be:

1. `ls submission/automation/{ui,api}/tests/*.spec.ts | wc -l` — sanity: how many specs exist?
2. `npx playwright test --reporter=dot` — is the baseline green?
3. Run all four doc generators (phase 1).
4. Read `docs/qa/coverage/coverage-index.md` + `docs/qa/graph/index.md`.
5. Pick the biggest non-blocked api-only cluster.
6. Probe → draft → verify → document.
7. Commit (if the user authorises).

The skill is idempotent: re-running it on an already-covered codebase produces no
destructive changes — it just regenerates docs and reports zero progress.
