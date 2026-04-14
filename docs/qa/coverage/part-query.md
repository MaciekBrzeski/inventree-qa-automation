---
title: "Coverage — Part list, filter, search, pagination"
area: part-query
tags: [qa, coverage, area]
generated: 2026-04-14T21:13:10.252Z
---

# Part list, filter, search, pagination

`GET /api/part/` with various query parameters: limit, offset, category, active, assembly, search, ordering.

## Headline

- Endpoints in scope: **68**
- Endpoints hit by at least one automated test: **1**
- Coverage ratio: **1.5%**
- Automated UI tests in this area: **0**
- Automated API tests in this area: **7**
- Manual UI test cases matched: **5**
- Manual API test cases matched: **19**
- Bugs filed in this area: **0**

## Automated tests

### API

- **API-PARTS-006 list with limit** `API-PARTS-006` — `parts-query.spec.ts` → `GET /api/part/`
- **API-PARTS-007 list with offset** `API-PARTS-007` — `parts-query.spec.ts` → `GET /api/part/`
- **API-PARTS-008 filter by category** `API-PARTS-008` — `parts-query.spec.ts` → `GET /api/part/`
- **API-PARTS-009 filter by assembly=true returns the seeded assembly** `API-PARTS-009` — `parts-query.spec.ts` → `GET /api/part/`
- **API-PARTS-010 search by name substring** `API-PARTS-010` — `parts-query.spec.ts` → `GET /api/part/`
- **API-PARTS-011 ordering by name asc** `API-PARTS-011` — `parts-query.spec.ts` → `GET /api/part/`
- **API-PARTS-012 filter by active=false returns the seeded inactive part** `API-PARTS-012` — `parts-query.spec.ts` → `GET /api/part/`

## Endpoints in scope

| endpoint | status |
|---|---|
| `DELETE /api/part/category/parameters/{id}/` | ❌ missing |
| `DELETE /api/part/category/{id}/` | ❌ missing |
| `DELETE /api/part/internal-price/{id}/` | ❌ missing |
| `DELETE /api/part/related/{id}/` | ❌ missing |
| `DELETE /api/part/sale-price/{id}/` | ❌ missing |
| `DELETE /api/part/stocktake/` | ❌ missing |
| `DELETE /api/part/stocktake/{id}/` | ❌ missing |
| `DELETE /api/part/test-template/{id}/` | ❌ missing |
| `DELETE /api/part/{id}/` | ❌ missing |
| `GET /api/part/` | ✅ covered |
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
| `PATCH /api/part/` | ❌ missing |
| `PATCH /api/part/category/` | ❌ missing |
| `PATCH /api/part/category/parameters/{id}/` | ❌ missing |
| `PATCH /api/part/category/{id}/` | ❌ missing |
| `PATCH /api/part/internal-price/{id}/` | ❌ missing |
| `PATCH /api/part/related/{id}/` | ❌ missing |
| `PATCH /api/part/sale-price/{id}/` | ❌ missing |
| `PATCH /api/part/stocktake/{id}/` | ❌ missing |
| `PATCH /api/part/test-template/{id}/` | ❌ missing |
| `PATCH /api/part/thumbs/{id}/` | ❌ missing |
| `PATCH /api/part/{id}/` | ❌ missing |
| `PATCH /api/part/{id}/bom-validate/` | ❌ missing |
| `PATCH /api/part/{id}/pricing/` | ❌ missing |
| `POST /api/part/` | ❌ missing |
| `POST /api/part/category/` | ❌ missing |
| `POST /api/part/category/parameters/` | ❌ missing |
| `POST /api/part/internal-price/` | ❌ missing |
| `POST /api/part/related/` | ❌ missing |
| `POST /api/part/sale-price/` | ❌ missing |
| `POST /api/part/stocktake/` | ❌ missing |
| `POST /api/part/stocktake/generate/` | ❌ missing |
| `POST /api/part/test-template/` | ❌ missing |
| `POST /api/part/{id}/bom-copy/` | ❌ missing |
| `PUT /api/part/` | ❌ missing |
| `PUT /api/part/category/` | ❌ missing |
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

## Manual test cases

### UI (5)

- `UI-PARTS-018` Filter parts list by category *(P1)*
- `UI-PARTS-037` Add a parameter to a part from the Parts list *(P1)*
- `UI-PARTS-039` Edit a parameter on a part from the Parts list *(P2)*
- `UI-PARTS-040` Remove a parameter from a part from the Parts list *(P2)*
- `UI-PARTS-053` Create a part revision from the Parts list *(P1)*

### API (19)

- `API-PARTS-001` List parts *(P1)*
- `API-PARTS-006` List parts by category and active status *(P1)*
- `API-PARTS-007` Search for parts by name/IPN/description *(P1)*
- `API-PARTS-008` Paginate part list with limit and offset *(P1)*
- `API-PARTS-009` Order parts by name *(P1)*
- `API-PARTS-010` List parts by category and inactive status *(P1)*
- `API-PARTS-011` List parts by category and assembly status *(P1)*
- `API-PARTS-012` List parts by category and component status *(P1)*
- `API-PARTS-013` List parts by category and purchaseable status *(P1)*
- `API-PARTS-014` List parts by category and salable status *(P1)*
- `API-PARTS-015` List parts by category and virtual status *(P1)*
- `API-PARTS-016` List parts by category and trackable status *(P1)*
- `API-PARTS-017` List parts by category and in-stock status *(P1)*
- `API-PARTS-018` List parts by category and template status *(P1)*
- `API-PARTS-019` Order parts by name in descending order *(P1)*
- `API-PARTS-020` Paginate part list with limit=0 (should return an error) *(P3)*
- `API-PARTS-022` List all categories *(P1)*
- `API-PARTS-036` List BOM lines for an assembly part *(P1)*
- `API-PARTS-043` List all substitute BOM lines for an assembly part *(P2)*

## Links

- [[coverage-index|Back to coverage index]]
- [[whole-process|Whole-process narrative]]
- [[graph/index|Endpoint graph]]
