---
title: "Coverage — Part category CRUD"
area: category-crud
tags: [qa, coverage, area]
generated: 2026-04-14T21:13:10.252Z
---

# Part category CRUD

Category create, hierarchy, rename, delete, tree fetch, bulk operations, and category parameter templates.

## Headline

- Endpoints in scope: **15**
- Endpoints hit by at least one automated test: **11**
- Coverage ratio: **73.3%**
- Automated UI tests in this area: **10**
- Automated API tests in this area: **13**
- Manual UI test cases matched: **8**
- Manual API test cases matched: **33**
- Bugs filed in this area: **0**

## Automated tests

### UI

- **UI-CATEGORY-001 navigate to the subcategories panel** `UI-CATEGORY-001` — `a-parts-category-create.spec.ts` → `GET /api/part/category/`
- **UI-CATEGORY-002 open the Add Part Category modal and submit a new category** `UI-CATEGORY-002` — `a-parts-category-create.spec.ts` → `GET /api/part/category/`, `POST /api/part/category/`, `GET /api/part/category/{id}/`
- **UI-CATEGORY-003 created category is searchable via API (recorder-captured)** `UI-CATEGORY-003` — `a-parts-category-create.spec.ts`
- **UI-EXTRA-001 navigate to Part Pricing tab → GET /api/part/{id}/pricing/** `UI-EXTRA-001` — `d-parts-extra-ui.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/{id}/pricing/`
- **UI-EXTRA-002 click nav-breadcrumb-action on parts root → GET /api/part/category/tree/** `UI-EXTRA-002` — `d-parts-extra-ui.spec.ts` → `GET /api/part/category/tree/`
- **UI-EXTRA-003 rename the created category via UI → PATCH /api/part/category/{id}/** `UI-EXTRA-003` — `d-parts-extra-ui.spec.ts` → `GET /api/part/category/{id}/`, `PATCH /api/part/category/{id}/`
- **UI-EXTRA-004 navigate to Part BOM tab → GET /api/bom/ via SPA** `UI-EXTRA-004` — `d-parts-extra-ui.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/{id}/bom-validate/`, `GET /api/bom/`
- **UI-EXTRA-005 navigate to Related Parts tab → GET /api/part/related/** `UI-EXTRA-005` — `d-parts-extra-ui.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/related/`
- **UI-DELETE-001 delete the UI-created part via the page action menu** `UI-DELETE-001` — `y-parts-ui-delete.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`, `DELETE /api/part/{id}/`
- **UI-DELETE-002 delete the UI-created category via the page action menu** `UI-DELETE-002` — `y-parts-ui-delete.spec.ts` → `GET /api/part/category/{id}/`, `DELETE /api/part/category/{id}/`

### API

- **API-PARTS-018 list categories** `API-PARTS-018` — `parts-category.spec.ts` → `GET /api/part/category/`
- **API-PARTS-019 create category under QA-ROOT** `API-PARTS-019` — `parts-category.spec.ts` → `POST /api/part/category/`
- **API-PARTS-020 retrieve a category** `API-PARTS-020` — `parts-category.spec.ts` → `GET /api/part/category/{id}/`
- **API-PARTS-021 rename a category via PATCH** `API-PARTS-021` — `parts-category.spec.ts` → `PATCH /api/part/category/{id}/`
- **API-PARTS-022 create a child category (hierarchy)** `API-PARTS-022` — `parts-category.spec.ts` → `POST /api/part/category/`
- **API-PARTS-023 tree endpoint contains the child category** `API-PARTS-023` — `parts-category.spec.ts` → `GET /api/part/category/tree/`
- **API-PARTS-024 POST with empty name returns 400** `API-PARTS-024` — `parts-category.spec.ts` → `POST /api/part/category/`
- **API-PARTS-025 DELETE /api/part/category/{id}/ removes the child category** `API-PARTS-025` — `parts-category.spec.ts` → `DELETE /api/part/category/{id}/`, `GET /api/part/category/{id}/`
- **API-PARTS-CP-001 GET /api/part/category/parameters/ lists templates** `API-PARTS-CP-001` — `parts-category-parameters.spec.ts` → `GET /api/part/category/parameters/`
- **API-PARTS-CP-002 POST /api/part/category/parameters/ creates a category parameter** `API-PARTS-CP-002` — `parts-category-parameters.spec.ts` → `POST /api/part/category/parameters/`
- **API-PARTS-CP-003 GET /api/part/category/parameters/{id}/ retrieves it** `API-PARTS-CP-003` — `parts-category-parameters.spec.ts` → `GET /api/part/category/parameters/{id}/`
- **API-PARTS-CP-004 PATCH /api/part/category/parameters/{id}/ updates default_value** `API-PARTS-CP-004` — `parts-category-parameters.spec.ts` → `PATCH /api/part/category/parameters/{id}/`
- **API-PARTS-CP-005 DELETE /api/part/category/parameters/{id}/ removes it** `API-PARTS-CP-005` — `parts-category-parameters.spec.ts` → `DELETE /api/part/category/parameters/{id}/`

## Endpoints in scope

| endpoint | status |
|---|---|
| `DELETE /api/part/category/parameters/{id}/` | ✅ covered |
| `DELETE /api/part/category/{id}/` | ✅ covered |
| `GET /api/part/category/` | ✅ covered |
| `GET /api/part/category/parameters/` | ✅ covered |
| `GET /api/part/category/parameters/{id}/` | ✅ covered |
| `GET /api/part/category/tree/` | ✅ covered |
| `GET /api/part/category/{id}/` | ✅ covered |
| `PATCH /api/part/category/` | ❌ missing |
| `PATCH /api/part/category/parameters/{id}/` | ✅ covered |
| `PATCH /api/part/category/{id}/` | ✅ covered |
| `POST /api/part/category/` | ✅ covered |
| `POST /api/part/category/parameters/` | ✅ covered |
| `PUT /api/part/category/` | ❌ missing |
| `PUT /api/part/category/parameters/{id}/` | ❌ missing |
| `PUT /api/part/category/{id}/` | ❌ missing |

## Manual test cases

### UI (8)

- `UI-PARTS-002` Create a part with description and category *(P1)*
- `UI-PARTS-009` Verify category breadcrumb navigation *(P1)*
- `UI-PARTS-013` Browse a part category to view contained parts *(P1)*
- `UI-PARTS-014` Verify parts in sub-categories are visible in parent category *(P1)*
- `UI-PARTS-015` Assign a part to a category during creation *(P1)*
- `UI-PARTS-016` View sub-categories within a category *(P2)*
- `UI-PARTS-017` Move a part to a different category *(P2)*
- `UI-PARTS-018` Filter parts list by category *(P1)*

### API (33)

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
- `API-PARTS-021` Create a new category *(P1)*
- `API-PARTS-022` List all categories *(P1)*
- `API-PARTS-023` Retrieve a specific category *(P1)*
- `API-PARTS-024` Rename and reparent a category *(P1)*
- `API-PARTS-025` Delete a category *(P1)*
- `API-PARTS-026` Fetch the category tree *(P2)*
- `API-PARTS-027` Create a child category under an existing parent *(P2)*
- `API-PARTS-028` Move a category to a different parent *(P2)*
- `API-PARTS-029` Create a category with duplicate name at the same level *(P2)*
- `API-PARTS-030` Create a category with missing name *(P2)*
- `API-PARTS-031` Rename a category to an invalid parent ID *(P2)*
- `API-PARTS-032` Delete a category with child categories *(P3)*
- `API-PARTS-033` Retrieve category parameter templates *(P3)*
- `API-PARTS-034` Create a new category parameter template *(P3)*
- `API-PARTS-035` Delete a category parameter template *(P3)*
- `API-PARTS-054` Attempt to create a category with missing required fields *(P2)*
- `API-PARTS-055` Attempt to update a non-existent category *(P2)*
- `API-PARTS-056` Attempt to delete a non-existent category *(P2)*

## Links

- [[coverage-index|Back to coverage index]]
- [[whole-process|Whole-process narrative]]
- [[graph/index|Endpoint graph]]
