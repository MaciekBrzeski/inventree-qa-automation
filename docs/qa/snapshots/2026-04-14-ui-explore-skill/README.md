---
title: Snapshot 2026-04-14 — ui-explore + api-ui-gap skills operational
tags: [qa, hackathon, snapshot, coverage]
created: 2026-04-14
---

# Snapshot 2026-04-14 — end of Phase 5 + Phase 6 iteration

Frozen state of the metrics + data produced during the ui-explore and api-ui-gap skill development loop, captured immediately after the full-suite run that brought coverage to **11 / 83 (13.3 %)** with all four HTTP verbs exercised via real UI flows.

## Test suite headline

| project | tests | passed | skipped | failed | wall-clock |
|---|---:|---:|---:|---:|---:|
| API (Playwright `automation/api`) | 40 | 40 | 0 | 0 | 2.7 s |
| UI (Playwright `automation/ui`) | 33 | 33 | 0 | 0 | 2.7 min |

Includes the discovery walker (`_explore.spec.ts`) which clicked 80 elements across the run and wrote 17 correlation entries to `click-to-api.jsonl`.

## Coverage files

| file | what it is |
|---|---|
| `api-ui-gap-coverage.md` | markdown report from `submission/agents/rag/api-ui-gap.ts` — full covered / uncovered / dead breakdown with suggested seeds |
| `covered.txt` | 11 endpoints hit by the UI suite (all 4 verbs represented) |
| `uncovered.txt` | 72 endpoints in the filtered schema with no UI hit |
| `dead.txt` | 15 endpoints outside `/api/part\|/api/bom` that the SPA calls (auth, user, settings, notifications, icons, etc.) |
| `ui-explore-coverage.md` | the per-run discovery report from `submission/automation/ui/tests/_explore.spec.ts` |
| `ui-api-correlation.md` | click→API observed mappings extracted by `submission/agents/rag/ui-api-correlation.ts` |
| `gemma-stats.md` | cumulative qa-gemma generation stats across all phases |

## Verbs now exercised via UI

```
POST  /api/part/                      (tests/b-parts-create.spec.ts)
POST  /api/part/category/             (tests/a-parts-category-create.spec.ts)
PATCH /api/part/{id}/                 (tests/b-parts-create.spec.ts UI-PART-004)
DELETE /api/part/{id}/                (tests/y-parts-ui-delete.spec.ts UI-DELETE-001)
DELETE /api/part/category/{id}/       (tests/y-parts-ui-delete.spec.ts UI-DELETE-002)
```

All five write operations fire from real user clicks in the InvenTree Mantine UI, not from out-of-band API seed contexts. `page.on('request')` is the source of truth.

## Bugs discovered along the way

See `docs/qa/bugs/`:

- `INV-PARTS-001` — `DELETE /api/part/{id}/` returns 400 on active parts (found by API repair loop, confirmed by UI flaky-delete in this iteration)
- `INV-PARTS-002` — OpenAPI `required` includes `category_name` but `PartBrief` responses omit it
- `INV-PARTS-003` — `POST /api/part/` succeeds with only `{name}` despite UX implying `category` is required
- `INV-PARTS-004` — `PUT /api/part/` is an undocumented bulk-update endpoint returning 400 with a `non_field_errors` payload

## Related notes

- [[retrospective-phase5-6-ui-explore]] — analysis of what worked, what didn't, and what to improve next
- [[implementation-plan]] (Phase 5+6 sections)
- [[design-notes]] — running log
