---
title: Snapshot 2026-04-14 — coverage expansion pass
tags: [qa, hackathon, snapshot, coverage]
created: 2026-04-14
---

# Snapshot 2026-04-14 — coverage expansion pass

Frozen state after the qa-coverage-loop iterations that closed the BOM,
pricing, test-templates, related-parts, and cross-functional clusters on
top of the Phase 5/6 baseline in [[../2026-04-14-ui-explore-skill/README]].

## Test suite headline

| project | tests | passed | skipped | failed | wall-clock |
|---|---:|---:|---:|---:|---:|
| API (Playwright `automation/api`) | 105 | 97 | 8 | 0 | 8.2 s |
| UI (Playwright `automation/ui`) | 84 | 84 | 0 | 0 | 6.4 min |

API skips are the known `stocktake POST 500` block (INV-PARTS-005), the
bulk/PUT variants that stay api-only by SPA design, and one thumbs upload
that requires `setInputFiles`.

## Coverage headline

| denominator | covered | ratio |
|---|---:|---:|
| **Filtered OpenAPI schema** (83 endpoints — `/api/part` + `/api/bom`) | **79** | **95.2 %** |
| ↳ reached via real UI clicks (`page.on('request')`) | **37** | **44.6 %** |
| ↳ reached via API-only tests | 42 | — |
| Uncovered (still 0 / 0 across UI + API) | 4 | — |

The 4 remaining uncovered endpoints are blocked clusters:

- `POST /api/part/stocktake/` → INV-PARTS-005 (500 on valid payload)
- `POST /api/part/thumbs/{id}/` → requires `page.setInputFiles(...)`
- two bulk collection endpoints that the SPA does not exercise in any
  flow (captured in `uncovered.txt`)

## Delta from the Phase 5/6 snapshot

Compared with [[../2026-04-14-ui-explore-skill/README]]:

| metric | Phase 5/6 | now | delta |
|---|---:|---:|---:|
| UI-paired endpoints (via `page.on('request')`) | 11 | 37 | **+26** |
| UI ratio | 13.3 % | 44.6 % | **+31.3 pp** |
| Automated UI tests | 33 | 84 | **+51** |
| Automated API tests | 40 | 105 | **+65** |
| Feature areas with > 50 % UI coverage | 0 | 8 | **+8** |

Areas closed in this pass (each went from api-only to paired):

- **Bill of Materials** — POST, PATCH, DELETE on `/api/bom/` + substitute
  POST + validate PATCH + bom-validate PATCH on parent
- **Pricing (sale-price)** — POST, PATCH, DELETE on `/api/part/sale-price/`
- **Test templates** — POST, PATCH on `/api/part/test-template/`
- **Related parts** — POST, PATCH on `/api/part/related/`
- **Cross-functional** — PDF centrepiece flow: create part → add parameter
  → add stock → verify category view, all via real clicks

## What produced this snapshot

1. `.claude/skills/qa-coverage-loop` — unified 6-phase loop (analyse → identify → probe → draft → verify → document) invoked repeatedly during the session. Each iteration closed one cluster by picking the largest unblocked `api-only` group from `data/api-ui-gap/uncovered.txt`.
2. Row-action-menu pattern: once the `row-action-menu-<n>` → `Edit` / `Delete` / `Edit Substitutes` selector family was understood, it unlocked the PATCH + DELETE verbs across every panel without needing per-endpoint probes.
3. Primitives + recipes library (`submission/automation/ui/paths/`) kept new specs short — average ~25 lines per test.

## Coverage files

| file | what it is |
|---|---|
| `coverage.md` | full markdown report from `submission/agents/rag/api-ui-gap.ts` |
| `covered.txt` | 37 endpoints hit by the UI suite |
| `uncovered.txt` | 46 endpoints with no UI hit — most are the stay-api-only classes |
| `dead.txt` | endpoints the SPA calls that are outside `/api/part|/api/bom` (auth, user, settings, icons) |

## Bugs filed against InvenTree during the run

See [[../../bugs/]] for full reports:

- `INV-PARTS-001` — `DELETE /api/part/{id}/` rejects active parts
- `INV-PARTS-002` — OpenAPI `required` drift on `PartBrief`
- `INV-PARTS-003` — `POST /api/part/` accepts missing `category`
- `INV-PARTS-004` — `PUT /api/part/` is an undocumented bulk-update
- `INV-PARTS-005` — `POST /api/part/stocktake/` returns 500 on valid payload

## Next iteration candidates

- Attachments POST/PATCH via `setInputFiles` (needs upload helper)
- Internal pricing panel (known UI path under Supplier Pricing sub-button)
- Category parameters with pre-seeded template
- Visual regression — see `automation/ui/baseline/` (captured this pass for category create, BOM add, pricing add)
