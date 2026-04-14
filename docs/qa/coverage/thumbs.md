---
title: "Coverage — Thumbnails"
area: thumbs
tags: [qa, coverage, area]
generated: 2026-04-14T13:54:31.289Z
---

# Thumbnails

`/api/part/thumbs/` read endpoints. PATCH / PUT paths are blocked on image file upload and remain unpaired.

## Headline

- Endpoints in scope: **4**
- Endpoints hit by at least one automated test: **2**
- Coverage ratio: **50.0%**
- Automated UI tests in this area: **0**
- Automated API tests in this area: **2**
- Manual UI test cases matched: **0**
- Manual API test cases matched: **0**
- Bugs filed in this area: **0**

## Automated tests

### API

- **API-PARTS-THUMB-001 GET /api/part/thumbs/ lists thumbnails** `API-PARTS-THUMB-001` — `parts-thumbs.spec.ts` → `GET /api/part/thumbs/`
- **API-PARTS-THUMB-002 GET /api/part/thumbs/{id}/ retrieves a thumbnail by part id** `API-PARTS-THUMB-002` — `parts-thumbs.spec.ts` → `GET /api/part/`, `GET /api/part/thumbs/{id}/`

## Endpoints in scope

| endpoint | status |
|---|---|
| `GET /api/part/thumbs/` | ✅ covered |
| `GET /api/part/thumbs/{id}/` | ✅ covered |
| `PATCH /api/part/thumbs/{id}/` | ❌ missing |
| `PUT /api/part/thumbs/{id}/` | ❌ missing |

## Links

- [[coverage-index|Back to coverage index]]
- [[whole-process|Whole-process narrative]]
- [[graph/index|Endpoint graph]]
