---
title: "Coverage — Bill of Materials (BOM)"
area: bom
tags: [qa, coverage, area]
generated: 2026-04-14T15:01:45.260Z
---

# Bill of Materials (BOM)

BOM line CRUD on assembly parts, BOM substitutes, BOM validation (per-row and per-assembly), BOM copy between assemblies.

## Headline

- Endpoints in scope: **19**
- Endpoints hit by at least one automated test: **15**
- Coverage ratio: **78.9%**
- Automated UI tests in this area: **0**
- Automated API tests in this area: **17**
- Manual UI test cases matched: **1**
- Manual API test cases matched: **19**
- Bugs filed in this area: **0**

## Automated tests

### API

- **API-PARTS-BOM-001 create assembly part** `API-PARTS-BOM-001` — `parts-bom.spec.ts` → `POST /api/part/`
- **API-PARTS-BOM-002 create component part** `API-PARTS-BOM-002` — `parts-bom.spec.ts` → `POST /api/part/`
- **API-PARTS-BOM-003 create BOM line** `API-PARTS-BOM-003` — `parts-bom.spec.ts` → `POST /api/bom/`
- **API-PARTS-BOM-004 list BOM lines** `API-PARTS-BOM-004` — `parts-bom.spec.ts` → `GET /api/bom/`
- **API-PARTS-BOM-005 retrieve BOM line** `API-PARTS-BOM-005` — `parts-bom.spec.ts` → `GET /api/bom/{id}/`
- **API-PARTS-BOM-006 update BOM line** `API-PARTS-BOM-006` — `parts-bom.spec.ts` → `PATCH /api/bom/{id}/`
- **API-PARTS-BOM-007 delete BOM line** `API-PARTS-BOM-007` — `parts-bom.spec.ts` → `DELETE /api/bom/{id}/`
- **API-PARTS-SUB-001 GET /api/bom/substitute/ lists substitutes** `API-PARTS-SUB-001` — `parts-bom-substitute.spec.ts` → `GET /api/bom/substitute/`
- **API-PARTS-SUB-002 POST /api/bom/substitute/ creates a substitute** `API-PARTS-SUB-002` — `parts-bom-substitute.spec.ts` → `POST /api/bom/substitute/`
- **API-PARTS-SUB-003 GET /api/bom/substitute/{id}/ retrieves it** `API-PARTS-SUB-003` — `parts-bom-substitute.spec.ts` → `GET /api/bom/substitute/{id}/`
- **API-PARTS-SUB-004 PATCH /api/bom/substitute/{id}/ updates the substitute** `API-PARTS-SUB-004` — `parts-bom-substitute.spec.ts` → `PATCH /api/bom/substitute/{id}/`
- **API-PARTS-SUB-005 PUT /api/bom/substitute/{id}/ replaces the substitute** `API-PARTS-SUB-005` — `parts-bom-substitute.spec.ts` → `GET /api/bom/substitute/{id}/`, `PUT /api/bom/substitute/{id}/`
- **API-PARTS-SUB-006 DELETE /api/bom/substitute/{id}/ removes it** `API-PARTS-SUB-006` — `parts-bom-substitute.spec.ts` → `DELETE /api/bom/substitute/{id}/`
- **API-PARTS-BV-001 GET /api/part/{id}/bom-validate/ returns 200 for assembly** `API-PARTS-BV-001` — `parts-bom-validate.spec.ts` → `GET /api/part/{id}/bom-validate/`
- **API-PARTS-BV-002 PATCH /api/part/{id}/bom-validate/ marks BOM as validated** `API-PARTS-BV-002` — `parts-bom-validate.spec.ts` → `PATCH /api/part/{id}/bom-validate/`
- **API-PARTS-BV-003 PATCH /api/bom/{id}/validate/ marks the row as validated** `API-PARTS-BV-003` — `parts-bom-validate.spec.ts` → `PATCH /api/bom/{id}/validate/`
- **API-PARTS-BV-004 POST /api/part/{id}/bom-copy/ copies BOM from another assembly** `API-PARTS-BV-004` — `parts-bom-validate.spec.ts` → `POST /api/part/`, `POST /api/part/{id}/bom-copy/`, `PATCH /api/part/{id}/`, `DELETE /api/part/{id}/`

## Endpoints in scope

| endpoint | status |
|---|---|
| `DELETE /api/bom/` | ❌ missing |
| `DELETE /api/bom/substitute/{id}/` | ✅ covered |
| `DELETE /api/bom/{id}/` | ✅ covered |
| `GET /api/bom/` | ✅ covered |
| `GET /api/bom/substitute/` | ✅ covered |
| `GET /api/bom/substitute/{id}/` | ✅ covered |
| `GET /api/bom/{id}/` | ✅ covered |
| `GET /api/part/{id}/bom-validate/` | ✅ covered |
| `PATCH /api/bom/substitute/{id}/` | ✅ covered |
| `PATCH /api/bom/{id}/` | ✅ covered |
| `PATCH /api/bom/{id}/validate/` | ✅ covered |
| `PATCH /api/part/{id}/bom-validate/` | ✅ covered |
| `POST /api/bom/` | ✅ covered |
| `POST /api/bom/substitute/` | ✅ covered |
| `POST /api/part/{id}/bom-copy/` | ✅ covered |
| `PUT /api/bom/substitute/{id}/` | ✅ covered |
| `PUT /api/bom/{id}/` | ❌ missing |
| `PUT /api/bom/{id}/validate/` | ❌ missing |
| `PUT /api/part/{id}/bom-validate/` | ❌ missing |

## Manual test cases

### UI (1)

- `UI-PARTS-021` Toggle Assembly attribute on a Part *(P1)*

### API (19)

- `API-PARTS-011` List parts by category and assembly status *(P1)*
- `API-PARTS-036` List BOM lines for an assembly part *(P1)*
- `API-PARTS-037` Create a new BOM line for an assembly part *(P1)*
- `API-PARTS-038` Retrieve a specific BOM line *(P1)*
- `API-PARTS-039` Update a specific BOM line *(P1)*
- `API-PARTS-040` Delete a specific BOM line *(P1)*
- `API-PARTS-041` Validate a specific BOM line *(P2)*
- `API-PARTS-042` Create a substitute BOM line *(P2)*
- `API-PARTS-043` List all substitute BOM lines for an assembly part *(P2)*
- `API-PARTS-044` Retrieve a specific substitute BOM line *(P2)*
- `API-PARTS-045` Delete a specific substitute BOM line *(P2)*
- `API-PARTS-046` Create a BOM line with invalid reference *(P3)*
- `API-PARTS-047` Create a BOM line with zero quantity *(P3)*
- `API-PARTS-048` Validate a BOM line with invalid reference *(P3)*
- `API-PARTS-049` Validate a BOM line with zero quantity *(P3)*
- `API-PARTS-050` Create a substitute BOM line with invalid original part *(P3)*
- `API-PARTS-057` Attempt to create a BOM line with missing required fields *(P2)*
- `API-PARTS-058` Attempt to update a non-existent BOM line *(P2)*
- `API-PARTS-059` Attempt to delete a non-existent BOM line *(P2)*

## Links

- [[coverage-index|Back to coverage index]]
- [[whole-process|Whole-process narrative]]
- [[graph/index|Endpoint graph]]
