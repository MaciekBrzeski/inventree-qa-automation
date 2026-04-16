---
title: "Coverage — Part CRUD"
area: part-crud
tags: [qa, coverage, area]
generated: 2026-04-16T14:45:17.086Z
---

# Part CRUD

Create, read, update, delete a Part via both UI and API flows. Includes explicit edit (PATCH) and the active-toggle-before-delete workaround for INV-PARTS-001.

## Headline

- Endpoints in scope: **68**
- Endpoints hit by at least one automated test: **32**
- Coverage ratio: **47.1%**
- Automated UI tests in this area: **16**
- Automated API tests in this area: **15**
- Manual UI test cases matched: **30**
- Manual API test cases matched: **34**
- Bugs filed in this area: **2**

## Automated tests

### UI

- **UI-PART-001 navigate to parts panel and open Add menu** `UI-PART-001` — `b-parts-create.spec.ts` → `GET /api/part/category/{id}/`, `GET /api/part/`
- **UI-PART-002 create a new part via the Add menu → Create Part modal** `UI-PART-002` — `b-parts-create.spec.ts` → `GET /api/part/category/{id}/`, `GET /api/part/`, `POST /api/part/`
- **UI-PART-003 created part is searchable via API** `UI-PART-003` — `b-parts-create.spec.ts`
- **UI-PART-004 edit the created part via action-menu-part-actions-edit → PATCH** `UI-PART-004` — `b-parts-create.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`, `PATCH /api/part/{id}/`
- **UI-DELETE-001 delete the UI-created part via the page action menu** `UI-DELETE-001` — `y-parts-ui-delete.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`, `DELETE /api/part/{id}/`
- **UI-DELETE-002 delete the UI-created category via the page action menu** `UI-DELETE-002` — `y-parts-ui-delete.spec.ts` → `GET /api/part/category/{id}/`, `DELETE /api/part/category/{id}/`
- **UI-CLEANUP-001 delete the UI-created part (if any)** `UI-CLEANUP-001` — `z-parts-cleanup.spec.ts`
- **UI-CLEANUP-002 delete the UI-created category (if any)** `UI-CLEANUP-002` — `z-parts-cleanup.spec.ts`
- **UI-CLEANUP-003 clear the state file** `UI-CLEANUP-003` — `z-parts-cleanup.spec.ts`
- **UI-RECIPE-001 createCategoryViaUi → POST /api/part/category/** `UI-RECIPE-001` — `g-parts-recipes.spec.ts` → `GET /api/part/category/`, `POST /api/part/category/`
- **UI-RECIPE-002 createPartViaUi → POST /api/part/ (under QA-ROOT)** `UI-RECIPE-002` — `g-parts-recipes.spec.ts` → `GET /api/part/category/{id}/`, `GET /api/part/`, `POST /api/part/`
- **UI-RECIPE-003 editPartViaUi with a custom mutator → PATCH /api/part/{id}/** `UI-RECIPE-003` — `g-parts-recipes.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`, `PATCH /api/part/{id}/`
- **UI-RECIPE-004 togglePartAttributeViaUi(assembly) → PATCH /api/part/{id}/** `UI-RECIPE-004` — `g-parts-recipes.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`, `PATCH /api/part/{id}/`
- **UI-RECIPE-005 renameCategoryViaUi → PATCH /api/part/category/{id}/** `UI-RECIPE-005` — `g-parts-recipes.spec.ts` → `GET /api/part/category/{id}/`, `PATCH /api/part/category/{id}/`
- **UI-RECIPE-006 deleteCategoryViaUi → DELETE /api/part/category/{id}/** `UI-RECIPE-006` — `g-parts-recipes.spec.ts` → `GET /api/part/category/{id}/`, `DELETE /api/part/category/{id}/`
- **UI-RECIPE-007 deleteInactivePartViaUi → DELETE /api/part/{id}/** `UI-RECIPE-007` — `g-parts-recipes.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`, `DELETE /api/part/{id}/`

### API

- **API-PARTS-001 list parts** `API-PARTS-001` — `parts-crud.spec.ts` → `GET /api/part/`
- **API-PARTS-002 create part** `API-PARTS-002` — `parts-crud.spec.ts` → `POST /api/part/`
- **API-PARTS-003 retrieve part** `API-PARTS-003` — `parts-crud.spec.ts` → `GET /api/part/{id}/`
- **API-PARTS-004 update part** `API-PARTS-004` — `parts-crud.spec.ts` → `PATCH /api/part/{id}/`
- **API-PARTS-005 delete part** `API-PARTS-005` — `parts-crud.spec.ts` → `PATCH /api/part/{id}/`, `DELETE /api/part/{id}/`
- **API-PARTS-PUT-001 PUT /api/part/{id}/ replaces the part** `API-PARTS-PUT-001` — `parts-puts.spec.ts` → `GET /api/part/{id}/`, `PUT /api/part/{id}/`
- **API-PARTS-PUT-002 PUT /api/part/category/{id}/ replaces the category** `API-PARTS-PUT-002` — `parts-puts.spec.ts` → `POST /api/part/category/`, `GET /api/part/category/{id}/`, `PUT /api/part/category/{id}/`
- **API-PARTS-PUT-003 PUT /api/part/related/{id}/ replaces a related link** `API-PARTS-PUT-003` — `parts-puts.spec.ts` → `POST /api/part/related/`, `GET /api/part/related/{id}/`, `PUT /api/part/related/{id}/`, `DELETE /api/part/related/{id}/`
- **API-PARTS-PUT-004 PUT /api/part/internal-price/{id}/ replaces an internal price break** `API-PARTS-PUT-004` — `parts-puts.spec.ts` → `POST /api/part/internal-price/`, `GET /api/part/internal-price/{id}/`, `PUT /api/part/internal-price/{id}/`, `DELETE /api/part/internal-price/{id}/`
- **API-PARTS-PUT-005 PUT /api/part/sale-price/{id}/ replaces a sale price break** `API-PARTS-PUT-005` — `parts-puts.spec.ts` → `POST /api/part/sale-price/`, `GET /api/part/sale-price/{id}/`, `PUT /api/part/sale-price/{id}/`, `DELETE /api/part/sale-price/{id}/`
- **API-PARTS-PUT-006 PUT /api/part/test-template/{id}/ replaces a test template** `API-PARTS-PUT-006` — `parts-puts.spec.ts` → `POST /api/part/test-template/`, `GET /api/part/test-template/{id}/`, `PUT /api/part/test-template/{id}/`, `DELETE /api/part/test-template/{id}/`
- **API-PARTS-PUT-007 PUT /api/bom/{id}/ replaces a BOM line** `API-PARTS-PUT-007` — `parts-puts.spec.ts` → `POST /api/bom/`, `GET /api/bom/{id}/`, `PUT /api/bom/{id}/`, `DELETE /api/bom/{id}/`
- **API-PARTS-PUT-008 PUT /api/bom/{id}/validate/ validates a BOM line** `API-PARTS-PUT-008` — `parts-puts.spec.ts` → `POST /api/bom/`, `PUT /api/bom/{id}/validate/`, `DELETE /api/bom/{id}/`
- **API-PARTS-PUT-009 PUT /api/part/{id}/bom-validate/ marks full BOM as validated** `API-PARTS-PUT-009` — `parts-puts.spec.ts` → `PUT /api/part/{id}/bom-validate/`
- **API-PARTS-PUT-010 PUT /api/part/{id}/pricing/ triggers pricing recalc** `API-PARTS-PUT-010` — `parts-puts.spec.ts` → `PUT /api/part/{id}/pricing/`

## Endpoints in scope

| endpoint | status |
|---|---|
| `DELETE /api/part/category/parameters/{id}/` | ❌ missing |
| `DELETE /api/part/category/{id}/` | ✅ covered |
| `DELETE /api/part/internal-price/{id}/` | ✅ covered |
| `DELETE /api/part/related/{id}/` | ✅ covered |
| `DELETE /api/part/sale-price/{id}/` | ✅ covered |
| `DELETE /api/part/stocktake/` | ❌ missing |
| `DELETE /api/part/stocktake/{id}/` | ❌ missing |
| `DELETE /api/part/test-template/{id}/` | ✅ covered |
| `DELETE /api/part/{id}/` | ✅ covered |
| `GET /api/part/` | ✅ covered |
| `GET /api/part/category/` | ✅ covered |
| `GET /api/part/category/parameters/` | ❌ missing |
| `GET /api/part/category/parameters/{id}/` | ❌ missing |
| `GET /api/part/category/tree/` | ❌ missing |
| `GET /api/part/category/{id}/` | ✅ covered |
| `GET /api/part/internal-price/` | ❌ missing |
| `GET /api/part/internal-price/{id}/` | ✅ covered |
| `GET /api/part/related/` | ❌ missing |
| `GET /api/part/related/{id}/` | ✅ covered |
| `GET /api/part/sale-price/` | ❌ missing |
| `GET /api/part/sale-price/{id}/` | ✅ covered |
| `GET /api/part/stocktake/` | ❌ missing |
| `GET /api/part/stocktake/{id}/` | ❌ missing |
| `GET /api/part/test-template/` | ❌ missing |
| `GET /api/part/test-template/{id}/` | ✅ covered |
| `GET /api/part/thumbs/` | ❌ missing |
| `GET /api/part/thumbs/{id}/` | ❌ missing |
| `GET /api/part/{id}/` | ✅ covered |
| `GET /api/part/{id}/bom-validate/` | ❌ missing |
| `GET /api/part/{id}/pricing/` | ❌ missing |
| `GET /api/part/{id}/requirements/` | ✅ covered |
| `GET /api/part/{id}/serial-numbers/` | ✅ covered |
| `PATCH /api/part/` | ❌ missing |
| `PATCH /api/part/category/` | ❌ missing |
| `PATCH /api/part/category/parameters/{id}/` | ❌ missing |
| `PATCH /api/part/category/{id}/` | ✅ covered |
| `PATCH /api/part/internal-price/{id}/` | ❌ missing |
| `PATCH /api/part/related/{id}/` | ❌ missing |
| `PATCH /api/part/sale-price/{id}/` | ❌ missing |
| `PATCH /api/part/stocktake/{id}/` | ❌ missing |
| `PATCH /api/part/test-template/{id}/` | ❌ missing |
| `PATCH /api/part/thumbs/{id}/` | ❌ missing |
| `PATCH /api/part/{id}/` | ✅ covered |
| `PATCH /api/part/{id}/bom-validate/` | ❌ missing |
| `PATCH /api/part/{id}/pricing/` | ❌ missing |
| `POST /api/part/` | ✅ covered |
| `POST /api/part/category/` | ✅ covered |
| `POST /api/part/category/parameters/` | ❌ missing |
| `POST /api/part/internal-price/` | ✅ covered |
| `POST /api/part/related/` | ✅ covered |
| `POST /api/part/sale-price/` | ✅ covered |
| `POST /api/part/stocktake/` | ❌ missing |
| `POST /api/part/stocktake/generate/` | ❌ missing |
| `POST /api/part/test-template/` | ✅ covered |
| `POST /api/part/{id}/bom-copy/` | ❌ missing |
| `PUT /api/part/` | ❌ missing |
| `PUT /api/part/category/` | ❌ missing |
| `PUT /api/part/category/parameters/{id}/` | ❌ missing |
| `PUT /api/part/category/{id}/` | ✅ covered |
| `PUT /api/part/internal-price/{id}/` | ✅ covered |
| `PUT /api/part/related/{id}/` | ✅ covered |
| `PUT /api/part/sale-price/{id}/` | ✅ covered |
| `PUT /api/part/stocktake/{id}/` | ❌ missing |
| `PUT /api/part/test-template/{id}/` | ✅ covered |
| `PUT /api/part/thumbs/{id}/` | ❌ missing |
| `PUT /api/part/{id}/` | ✅ covered |
| `PUT /api/part/{id}/bom-validate/` | ✅ covered |
| `PUT /api/part/{id}/pricing/` | ✅ covered |

## Related bugs

- [[bugs/INV-PARTS-001-delete-active-part|INV-PARTS-001]]
- [[bugs/INV-PARTS-003-category-not-required|INV-PARTS-003]]

## Manual test cases

### UI (30)

- `UI-PARTS-001` Create a part with minimal required fields *(P1)*
- `UI-PARTS-002` Create a part with description and category *(P1)*
- `UI-PARTS-003` Duplicate an existing part as a new revision *(P1)*
- `UI-PARTS-006` Create part with initial stock *(P2)*
- `UI-PARTS-007` Create purchaseable part with supplier data *(P2)*
- `UI-PARTS-008` Duplicate an existing part (standard) *(P2)*
- `UI-PARTS-011` Create a new stock item *(P1)*
- `UI-PARTS-015` Assign a part to a category during creation *(P1)*
- `UI-PARTS-017` Move a part to a different category *(P2)*
- `UI-PARTS-039` Edit a parameter on a part from the Parts list *(P2)*
- `UI-PARTS-043` Validate that adding a duplicate parameter name fails *(P3)*
- `UI-PARTS-045` Mark part as Template and create a Variant *(P1)*
- `UI-PARTS-049` Negative: Attempt to create a circular template relationship *(P3)*
- `UI-PARTS-050` Negative: Attempt to create a duplicate IPN for a Variant *(P3)*
- `UI-PARTS-051` Negative: Attempt to create an inactive part as a Variant *(P3)*
- `UI-PARTS-052` Negative: Attempt to create a circular revision for a Template part *(P3)*
- `UI-PARTS-053` Create a part revision from the Parts list *(P1)*
- `UI-PARTS-057` Create a template part and attempt to create a revision *(P3)*
- `UI-PARTS-058` Create a variant part and attempt to create a revision *(P1)*
- `UI-PARTS-059` Attempt to create a circular reference revision *(P3)*
- `UI-PARTS-060` Attempt to create a duplicate IPN revision *(P3)*
- `UI-PARTS-061` Attempt to create a part with a duplicate IPN *(P2)*
- `UI-PARTS-062` Attempt to edit a locked part *(P2)*
- `UI-PARTS-064` Attempt to create a part with a circular revision reference *(P2)*
- `UI-PARTS-065` Attempt to create a part with an invalid units string *(P2)*
- `UI-PARTS-066` Attempt to create a part with a unique code constraint violation *(P2)*
- `UI-PARTS-067` Attempt to create a part with missing required fields *(P2)*
- `UI-PARTS-068` Attempt to create a part as a read-only user *(P2)*
- `UI-PARTS-069` Attempt to edit a part as a read-only user *(P2)*
- `UI-PARTS-070` Attempt to delete a part as a read-only user *(P2)*

### API (34)

- `API-PARTS-001` List parts *(P1)*
- `API-PARTS-002` Create part *(P1)*
- `API-PARTS-003` Retrieve part *(P1)*
- `API-PARTS-004` Update part *(P1)*
- `API-PARTS-005` Delete part *(P1)*
- `API-PARTS-021` Create a new category *(P1)*
- `API-PARTS-023` Retrieve a specific category *(P1)*
- `API-PARTS-024` Rename and reparent a category *(P1)*
- `API-PARTS-025` Delete a category *(P1)*
- `API-PARTS-027` Create a child category under an existing parent *(P2)*
- `API-PARTS-029` Create a category with duplicate name at the same level *(P2)*
- `API-PARTS-030` Create a category with missing name *(P2)*
- `API-PARTS-032` Delete a category with child categories *(P3)*
- `API-PARTS-034` Create a new category parameter template *(P3)*
- `API-PARTS-035` Delete a category parameter template *(P3)*
- `API-PARTS-037` Create a new BOM line for an assembly part *(P1)*
- `API-PARTS-040` Delete a specific BOM line *(P1)*
- `API-PARTS-042` Create a substitute BOM line *(P2)*
- `API-PARTS-045` Delete a specific substitute BOM line *(P2)*
- `API-PARTS-046` Create a BOM line with invalid reference *(P3)*
- `API-PARTS-047` Create a BOM line with zero quantity *(P3)*
- `API-PARTS-050` Create a substitute BOM line with invalid original part *(P3)*
- `API-PARTS-051` Attempt to create a part with missing required fields *(P2)*
- `API-PARTS-053` Attempt to delete a non-existent part *(P2)*
- `API-PARTS-054` Attempt to create a category with missing required fields *(P2)*
- `API-PARTS-056` Attempt to delete a non-existent category *(P2)*
- `API-PARTS-057` Attempt to create a BOM line with missing required fields *(P2)*
- `API-PARTS-059` Attempt to delete a non-existent BOM line *(P2)*
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
