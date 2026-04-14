---
title: "Coverage — Part attributes (boolean toggles)"
area: part-attributes
tags: [qa, coverage, area]
generated: 2026-04-14T20:24:43.273Z
---

# Part attributes (boolean toggles)

Virtual, Template, Assembly, Component, Trackable, Testable, Purchaseable, Salable, Active/Inactive — one test per flag, each flipping the boolean via the Edit modal and asserting the PATCH landed.

## Headline

- Endpoints in scope: **13**
- Endpoints hit by at least one automated test: **4**
- Coverage ratio: **30.8%**
- Automated UI tests in this area: **8**
- Automated API tests in this area: **0**
- Manual UI test cases matched: **13**
- Manual API test cases matched: **8**
- Bugs filed in this area: **0**

## Automated tests

### UI

- **UI-ATTR-001 flip assembly flag via UI edit modal → PATCH /api/part/{id}/** `UI-ATTR-001` — `f-parts-attributes.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`, `PATCH /api/part/{id}/`
- **UI-ATTR-002 flip component flag via UI edit modal** `UI-ATTR-002` — `f-parts-attributes.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`, `PATCH /api/part/{id}/`
- **UI-ATTR-003 flip purchaseable flag via UI edit modal** `UI-ATTR-003` — `f-parts-attributes.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`, `PATCH /api/part/{id}/`
- **UI-ATTR-004 flip salable flag via UI edit modal** `UI-ATTR-004` — `f-parts-attributes.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`, `PATCH /api/part/{id}/`
- **UI-ATTR-005 flip trackable flag via UI edit modal** `UI-ATTR-005` — `f-parts-attributes.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`, `PATCH /api/part/{id}/`
- **UI-ATTR-006 flip testable flag via UI edit modal** `UI-ATTR-006` — `f-parts-attributes.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`, `PATCH /api/part/{id}/`
- **UI-ATTR-007 flip virtual flag via UI edit modal** `UI-ATTR-007` — `f-parts-attributes.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`, `PATCH /api/part/{id}/`
- **UI-ATTR-008 flip active flag via UI edit modal** `UI-ATTR-008` — `f-parts-attributes.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`, `PATCH /api/part/{id}/`

## Endpoints in scope

| endpoint | status |
|---|---|
| `DELETE /api/part/{id}/` | ❌ missing |
| `GET /api/part/{id}/` | ✅ covered |
| `GET /api/part/{id}/bom-validate/` | ❌ missing |
| `GET /api/part/{id}/pricing/` | ❌ missing |
| `GET /api/part/{id}/requirements/` | ✅ covered |
| `GET /api/part/{id}/serial-numbers/` | ✅ covered |
| `PATCH /api/part/{id}/` | ✅ covered |
| `PATCH /api/part/{id}/bom-validate/` | ❌ missing |
| `PATCH /api/part/{id}/pricing/` | ❌ missing |
| `POST /api/part/{id}/bom-copy/` | ❌ missing |
| `PUT /api/part/{id}/` | ❌ missing |
| `PUT /api/part/{id}/bom-validate/` | ❌ missing |
| `PUT /api/part/{id}/pricing/` | ❌ missing |

## Manual test cases

### UI (13)

- `UI-PARTS-007` Create purchaseable part with supplier data *(P2)*
- `UI-PARTS-019` Toggle Virtual attribute on a Part *(P1)*
- `UI-PARTS-020` Toggle Template attribute on a Part *(P1)*
- `UI-PARTS-021` Toggle Assembly attribute on a Part *(P1)*
- `UI-PARTS-022` Toggle Component attribute on a Part *(P1)*
- `UI-PARTS-023` Toggle Testable attribute on a Part *(P2)*
- `UI-PARTS-024` Toggle Trackable attribute on a Part *(P2)*
- `UI-PARTS-025` Toggle Purchaseable attribute on a Part *(P2)*
- `UI-PARTS-026` Toggle Salable attribute on a Part *(P2)*
- `UI-PARTS-027` Toggle Active/Inactive on a Part *(P1)*
- `UI-PARTS-028` Lock a Part and attempt to change attributes *(P1)*
- `UI-PARTS-029` Unlock a Part and change attributes *(P1)*
- `UI-PARTS-030` Toggle Active/Inactive on a Locked Part *(P1)*

### API (8)

- `API-PARTS-011` List parts by category and assembly status *(P1)*
- `API-PARTS-013` List parts by category and purchaseable status *(P1)*
- `API-PARTS-014` List parts by category and salable status *(P1)*
- `API-PARTS-015` List parts by category and virtual status *(P1)*
- `API-PARTS-016` List parts by category and trackable status *(P1)*
- `API-PARTS-036` List BOM lines for an assembly part *(P1)*
- `API-PARTS-037` Create a new BOM line for an assembly part *(P1)*
- `API-PARTS-043` List all substitute BOM lines for an assembly part *(P2)*

## Links

- [[coverage-index|Back to coverage index]]
- [[whole-process|Whole-process narrative]]
- [[graph/index|Endpoint graph]]
