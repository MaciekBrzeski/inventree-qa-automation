---
name: api-ui-gap
description: >
  Measures API path coverage from UI tests. Runs the UI Playwright suite with a network
  request recorder, then cross-references captured requests against the filtered OpenAPI
  schema at submission/data/openapi-parts.filtered.json. Emits a gap report with covered
  vs uncovered endpoints, and proposes ui-explore seeds for each gap.
  Use when the user says "check API coverage from UI", "find coverage gaps",
  "which endpoints are not exercised by UI", or invokes /api-ui-gap.
---

# api-ui-gap — UI→API coverage diff

## Purpose

Manual and API tests prove each endpoint individually. UI tests prove user journeys. The
two rarely agree: some journeys in the UI go through a different subset of endpoints than
the docs list, and many API endpoints are never exercised via any user journey at all.

This skill answers: **which endpoints in the OpenAPI schema are touched by at least one
UI test, and which aren't?** For each gap, it proposes a starting point for
[`ui-explore`](../ui-explore/SKILL.md) so the next iteration has a chance of covering it.

## Algorithm

```
1. Start InvenTree + ollama (preconditions).
2. Collect all templated endpoints from openapi-parts.filtered.json (method+path).
3. Run the full UI suite under a tracing wrapper that, for every test, installs a
   page.on('request') listener and writes {method, url} entries to a per-test JSON.
4. After the suite, concatenate all captured requests.
5. Normalise: strip query string, collapse numeric segments to {id} templates.
6. Build a Map<endpoint, Set<testName>> of covered endpoints.
7. Diff against the OpenAPI set to produce `covered`, `uncovered`, `dead` (requests
   observed but not in OpenAPI — shadow paths / undocumented endpoints).
8. For each uncovered endpoint, suggest a seed: match the path prefix against a heuristic
   table (`/api/part/<id>/` → `/web/part/<id>`, `/api/bom/` → `/web/part/<assembly-id>`,
   `/api/part/category/` → `/web/partcategory`, etc.).
9. Emit `coverage.md`.
```

## Inputs

| input | default | notes |
|---|---|---|
| `schema` | `submission/data/openapi-parts.filtered.json` | the ground-truth endpoint set |
| `uiProject` | `submission/automation/ui` | where to run Playwright |
| `recorder` | `submission/agents/recorder/network.ts` | the request listener + writer |
| `outDir` | `submission/data/api-ui-gap` | output dir |
| `heuristics` | embedded table | uncovered→seed suggestion |

## Heuristic table (starting point)

| uncovered API prefix | suggested UI seed | rationale |
|---|---|---|
| `/api/part/` (list / detail) | `/web/part`, `/web/part/<pk>` | parts list and detail views |
| `/api/part/category/` | `/web/part`, `/web/partcategory/<pk>` | category tree + category detail |
| `/api/bom/` | `/web/part/<assembly-pk>` + click BOM tab | BOM lives under assembly part detail |
| `/api/part/parameter/` | `/web/part/<pk>` + click Parameters tab | parameter panel |
| `/api/part/stocktake/` | `/web/part/<pk>` + click Stock → Stocktake | stocktake panel |
| `/api/part/test-template/` | `/web/part/<pk>` + click Test templates | test template panel |
| `/api/part/thumbs/` | `/web/part/<pk>` — image upload flow | image panel |

Extend the table as new endpoints appear.

## Output

```
submission/data/api-ui-gap/
├── coverage.md              # the headline report
├── per-test-requests.json   # test → [requests]
├── covered.txt              # sorted list "METHOD path" for the UI-covered set
├── uncovered.txt            # sorted list of OpenAPI endpoints with no UI hit
├── dead.txt                 # requests observed that don't map to any OpenAPI entry
└── seeds.json               # [{endpoint, seed, rationale}, ...]
```

## Invocation

```
cd submission/automation/ui
npx playwright test --reporter=list     # runs under the recorder fixture
cd ../../agents/rag
npx tsx api-ui-gap.ts                   # reads the recorder output + OpenAPI, emits coverage.md
```

## Iteration pattern

- **Round 1**: run the gap check. Read `coverage.md`.
- **Round 2**: pick the top-3 uncovered endpoints. Feed their suggested seeds into
  `ui-explore` as `SEED_ROUTES=...` env and re-run.
- **Round 3**: re-run the gap check; confirm the same endpoints are now covered (the
  explorer's snapshots prove it because the request recorder is still active during the
  UI suite).
- Stop when the uncovered set is stable across two consecutive rounds, or when the remaining
  uncovered endpoints are intentionally out-of-scope for UI (e.g. pure data-science
  endpoints like `/api/part/test-template/` that have no UI affordance).

## Consumers

- `submission/README.md` → add coverage numbers to the "How it covered" section during
  Phase 4 packaging.
- `docs/qa/bugs/` → if an endpoint is in `dead.txt` (observed but undocumented), that's a
  candidate for a new bug report — the OpenAPI schema is out of date.
