---
title: "Coverage — Stocktake"
area: stocktake
tags: [qa, coverage, area]
generated: 2026-04-14T15:01:45.260Z
---

# Stocktake

Part stocktake endpoints. Write path (POST /api/part/stocktake/) is **blocked by INV-PARTS-005** — the server raises a TypeError and returns 500 on the minimal payload. GET list is covered; generate endpoint is probed.

## Headline

- Endpoints in scope: **8**
- Endpoints hit by at least one automated test: **6**
- Coverage ratio: **75.0%**
- Automated UI tests in this area: **0**
- Automated API tests in this area: **6**
- Manual UI test cases matched: **0**
- Manual API test cases matched: **0**
- Bugs filed in this area: **1**

## Automated tests

### API

- **API-PARTS-STK-001 GET /api/part/stocktake/ list returns 200** `API-PARTS-STK-001` — `parts-stocktake.spec.ts` → `GET /api/part/stocktake/`
- **API-PARTS-STK-002 POST /api/part/stocktake/ creates a stocktake entry** `API-PARTS-STK-002` — `parts-stocktake.spec.ts` → `POST /api/part/stocktake/`
- **API-PARTS-STK-003 GET /api/part/stocktake/{id}/ retrieves the entry** `API-PARTS-STK-003` — `parts-stocktake.spec.ts` → `GET /api/part/stocktake/{id}/`
- **API-PARTS-STK-004 PATCH /api/part/stocktake/{id}/ updates the note** `API-PARTS-STK-004` — `parts-stocktake.spec.ts` → `PATCH /api/part/stocktake/{id}/`
- **API-PARTS-STK-005 DELETE /api/part/stocktake/{id}/ removes the entry** `API-PARTS-STK-005` — `parts-stocktake.spec.ts` → `DELETE /api/part/stocktake/{id}/`
- **API-PARTS-STK-GEN-001 POST /api/part/stocktake/generate/ triggers generation** `PARTS-STK-GEN-001` — `parts-stocktake-generate.spec.ts` → `POST /api/part/stocktake/generate/`

## Endpoints in scope

| endpoint | status |
|---|---|
| `DELETE /api/part/stocktake/` | ❌ missing |
| `DELETE /api/part/stocktake/{id}/` | ✅ covered |
| `GET /api/part/stocktake/` | ✅ covered |
| `GET /api/part/stocktake/{id}/` | ✅ covered |
| `PATCH /api/part/stocktake/{id}/` | ✅ covered |
| `POST /api/part/stocktake/` | ✅ covered |
| `POST /api/part/stocktake/generate/` | ✅ covered |
| `PUT /api/part/stocktake/{id}/` | ❌ missing |

## Related bugs

- [[bugs/INV-PARTS-005-stocktake-post-500|INV-PARTS-005]]

## Links

- [[coverage-index|Back to coverage index]]
- [[whole-process|Whole-process narrative]]
- [[graph/index|Endpoint graph]]
