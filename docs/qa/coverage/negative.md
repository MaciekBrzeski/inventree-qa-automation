---
title: "Coverage — Negative / auth / bulk"
area: negative
tags: [qa, coverage, area]
generated: 2026-04-16T14:45:17.087Z
---

# Negative / auth / bulk

Auth errors (401/403), not-found (404), validation errors (400), bulk-operation endpoints that require a list payload, method-not-allowed checks. Multiple bugs were filed from this area.

## Headline

- Endpoints in scope: **83**
- Endpoints hit by at least one automated test: **9**
- Coverage ratio: **10.8%**
- Automated UI tests in this area: **3**
- Automated API tests in this area: **8**
- Manual UI test cases matched: **18**
- Manual API test cases matched: **12**
- Bugs filed in this area: **2**

## Automated tests

### UI

- **UI-LOGIN-NEG-001 wrong password does not authenticate** `UI-LOGIN-NEG-001` — `parts-login-negative.spec.ts`
- **UI-LOGIN-NEG-002 username with empty password does not authenticate** `UI-LOGIN-NEG-002` — `parts-login-negative.spec.ts`
- **UI-LOGIN-NEG-003 blank form click does not authenticate** `UI-LOGIN-NEG-003` — `parts-login-negative.spec.ts`

### API

- **${c.id} ${c.title}** — `parts-negative.spec.ts`
- **API-PARTS-053 POST /api/part/ with name only actually succeeds** `API-PARTS-053` — `parts-negative.spec.ts` → `POST /api/part/`, `PATCH /api/part/{id}/`, `DELETE /api/part/{id}/`
- **API-PARTS-057 PUT /api/part/ on collection expects a bulk list and returns 400** `API-PARTS-057` — `parts-negative.spec.ts` → `PUT /api/part/`
- **API-PARTS-BULK-001 PATCH /api/part/ rejects non-list** `API-PARTS-BULK-001` — `parts-bulk.spec.ts` → `PATCH /api/part/`
- **API-PARTS-BULK-002 PATCH /api/part/category/ rejects non-list** `API-PARTS-BULK-002` — `parts-bulk.spec.ts` → `PATCH /api/part/category/`
- **API-PARTS-BULK-003 PUT /api/part/category/ rejects non-list** `API-PARTS-BULK-003` — `parts-bulk.spec.ts` → `PUT /api/part/category/`
- **API-PARTS-BULK-004 DELETE /api/bom/ rejects non-list** `API-PARTS-BULK-004` — `parts-bulk.spec.ts` → `DELETE /api/bom/`
- **API-PARTS-BULK-005 DELETE /api/part/stocktake/ rejects non-list** `API-PARTS-BULK-005` — `parts-bulk.spec.ts` → `DELETE /api/part/stocktake/`

## Endpoints in scope

| endpoint | status |
|---|---|
| `DELETE /api/bom/` | ✅ covered |
| `DELETE /api/bom/substitute/{id}/` | ❌ missing |
| `DELETE /api/bom/{id}/` | ❌ missing |
| `DELETE /api/part/category/parameters/{id}/` | ❌ missing |
| `DELETE /api/part/category/{id}/` | ❌ missing |
| `DELETE /api/part/internal-price/{id}/` | ❌ missing |
| `DELETE /api/part/related/{id}/` | ❌ missing |
| `DELETE /api/part/sale-price/{id}/` | ❌ missing |
| `DELETE /api/part/stocktake/` | ✅ covered |
| `DELETE /api/part/stocktake/{id}/` | ❌ missing |
| `DELETE /api/part/test-template/{id}/` | ❌ missing |
| `DELETE /api/part/{id}/` | ✅ covered |
| `GET /api/bom/` | ❌ missing |
| `GET /api/bom/substitute/` | ❌ missing |
| `GET /api/bom/substitute/{id}/` | ❌ missing |
| `GET /api/bom/{id}/` | ❌ missing |
| `GET /api/part/` | ❌ missing |
| `GET /api/part/category/` | ❌ missing |
| `GET /api/part/category/parameters/` | ❌ missing |
| `GET /api/part/category/parameters/{id}/` | ❌ missing |
| `GET /api/part/category/tree/` | ❌ missing |
| `GET /api/part/category/{id}/` | ❌ missing |
| `GET /api/part/internal-price/` | ❌ missing |
| `GET /api/part/internal-price/{id}/` | ❌ missing |
| `GET /api/part/related/` | ❌ missing |
| `GET /api/part/related/{id}/` | ❌ missing |
| `GET /api/part/sale-price/` | ❌ missing |
| `GET /api/part/sale-price/{id}/` | ❌ missing |
| `GET /api/part/stocktake/` | ❌ missing |
| `GET /api/part/stocktake/{id}/` | ❌ missing |
| `GET /api/part/test-template/` | ❌ missing |
| `GET /api/part/test-template/{id}/` | ❌ missing |
| `GET /api/part/thumbs/` | ❌ missing |
| `GET /api/part/thumbs/{id}/` | ❌ missing |
| `GET /api/part/{id}/` | ❌ missing |
| `GET /api/part/{id}/bom-validate/` | ❌ missing |
| `GET /api/part/{id}/pricing/` | ❌ missing |
| `GET /api/part/{id}/requirements/` | ❌ missing |
| `GET /api/part/{id}/serial-numbers/` | ❌ missing |
| `PATCH /api/bom/substitute/{id}/` | ❌ missing |
| `PATCH /api/bom/{id}/` | ❌ missing |
| `PATCH /api/bom/{id}/validate/` | ❌ missing |
| `PATCH /api/part/` | ✅ covered |
| `PATCH /api/part/category/` | ✅ covered |
| `PATCH /api/part/category/parameters/{id}/` | ❌ missing |
| `PATCH /api/part/category/{id}/` | ❌ missing |
| `PATCH /api/part/internal-price/{id}/` | ❌ missing |
| `PATCH /api/part/related/{id}/` | ❌ missing |
| `PATCH /api/part/sale-price/{id}/` | ❌ missing |
| `PATCH /api/part/stocktake/{id}/` | ❌ missing |
| `PATCH /api/part/test-template/{id}/` | ❌ missing |
| `PATCH /api/part/thumbs/{id}/` | ❌ missing |
| `PATCH /api/part/{id}/` | ✅ covered |
| `PATCH /api/part/{id}/bom-validate/` | ❌ missing |
| `PATCH /api/part/{id}/pricing/` | ❌ missing |
| `POST /api/bom/` | ❌ missing |
| `POST /api/bom/substitute/` | ❌ missing |
| `POST /api/part/` | ✅ covered |
| `POST /api/part/category/` | ❌ missing |
| `POST /api/part/category/parameters/` | ❌ missing |
| `POST /api/part/internal-price/` | ❌ missing |
| `POST /api/part/related/` | ❌ missing |
| `POST /api/part/sale-price/` | ❌ missing |
| `POST /api/part/stocktake/` | ❌ missing |
| `POST /api/part/stocktake/generate/` | ❌ missing |
| `POST /api/part/test-template/` | ❌ missing |
| `POST /api/part/{id}/bom-copy/` | ❌ missing |
| `PUT /api/bom/substitute/{id}/` | ❌ missing |
| `PUT /api/bom/{id}/` | ❌ missing |
| `PUT /api/bom/{id}/validate/` | ❌ missing |
| `PUT /api/part/` | ✅ covered |
| `PUT /api/part/category/` | ✅ covered |
| `PUT /api/part/category/parameters/{id}/` | ❌ missing |
| `PUT /api/part/category/{id}/` | ❌ missing |
| `PUT /api/part/internal-price/{id}/` | ❌ missing |
| `PUT /api/part/related/{id}/` | ❌ missing |
| `PUT /api/part/sale-price/{id}/` | ❌ missing |
| `PUT /api/part/stocktake/{id}/` | ❌ missing |
| `PUT /api/part/test-template/{id}/` | ❌ missing |
| `PUT /api/part/thumbs/{id}/` | ❌ missing |
| `PUT /api/part/{id}/` | ❌ missing |
| `PUT /api/part/{id}/bom-validate/` | ❌ missing |
| `PUT /api/part/{id}/pricing/` | ❌ missing |

## Related bugs

- [[bugs/INV-PARTS-003-category-not-required|INV-PARTS-003]]
- [[bugs/INV-PARTS-004-put-is-bulk-update|INV-PARTS-004]]

## Manual test cases

### UI (18)

- `UI-PARTS-004` Fail creation when name is missing *(P2)*
- `UI-PARTS-005` Fail creation when IPN is missing *(P2)*
- `UI-PARTS-033` Set a compatible supplier part unit *(P2)*
- `UI-PARTS-034` Reject incompatible supplier part unit *(P2)*
- `UI-PARTS-049` Negative: Attempt to create a circular template relationship *(P3)*
- `UI-PARTS-050` Negative: Attempt to create a duplicate IPN for a Variant *(P3)*
- `UI-PARTS-051` Negative: Attempt to create an inactive part as a Variant *(P3)*
- `UI-PARTS-052` Negative: Attempt to create a circular revision for a Template part *(P3)*
- `UI-PARTS-061` Attempt to create a part with a duplicate IPN *(P2)*
- `UI-PARTS-062` Attempt to edit a locked part *(P2)*
- `UI-PARTS-063` Attempt to set an inactive part on a new stock transaction *(P2)*
- `UI-PARTS-064` Attempt to create a part with a circular revision reference *(P2)*
- `UI-PARTS-065` Attempt to create a part with an invalid units string *(P2)*
- `UI-PARTS-066` Attempt to create a part with a unique code constraint violation *(P2)*
- `UI-PARTS-067` Attempt to create a part with missing required fields *(P2)*
- `UI-PARTS-068` Attempt to create a part as a read-only user *(P2)*
- `UI-PARTS-069` Attempt to edit a part as a read-only user *(P2)*
- `UI-PARTS-070` Attempt to delete a part as a read-only user *(P2)*

### API (12)

- `API-PARTS-029` Create a category with duplicate name at the same level *(P2)*
- `API-PARTS-030` Create a category with missing name *(P2)*
- `API-PARTS-031` Rename a category to an invalid parent ID *(P2)*
- `API-PARTS-051` Attempt to create a part with missing required fields *(P2)*
- `API-PARTS-054` Attempt to create a category with missing required fields *(P2)*
- `API-PARTS-057` Attempt to create a BOM line with missing required fields *(P2)*
- `API-PARTS-060` Attempt to create a part with an invalid IPN (duplicate) *(P2)*
- `API-PARTS-061` Attempt to update a part with an invalid IPN (duplicate) *(P2)*
- `API-PARTS-062` Attempt to delete a part with an invalid IPN (duplicate) *(P2)*
- `API-PARTS-063` Attempt to update a part with an invalid IPN (duplicate) *(P2)*
- `API-PARTS-064` Attempt to update a part with an invalid IPN (duplicate) *(P2)*
- `API-PARTS-065` Attempt to delete a part with an invalid IPN (duplicate) *(P2)*

## Links

- [[coverage-index|Back to coverage index]]
- [[whole-process|Whole-process narrative]]
- [[graph/index|Endpoint graph]]
