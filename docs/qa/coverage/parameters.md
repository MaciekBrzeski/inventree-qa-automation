---
title: "Coverage — Parameters & parameter templates"
area: parameters
tags: [qa, coverage, area]
generated: 2026-04-16T14:45:17.087Z
---

# Parameters & parameter templates

Part parameters and category parameter templates. UI flow available via `action-menu-add-parameters-create-parameter` → form → Submit; API covers category parameter templates (part-parameter endpoint is outside the filtered schema).

## Headline

- Endpoints in scope: **6**
- Endpoints hit by at least one automated test: **5**
- Coverage ratio: **83.3%**
- Automated UI tests in this area: **10**
- Automated API tests in this area: **5**
- Manual UI test cases matched: **16**
- Manual API test cases matched: **4**
- Bugs filed in this area: **0**

## Automated tests

### UI

- **UI-TAB-001 parameters tab → some /api/part/ fetch on the current part** `UI-TAB-001` — `e-parts-tabs.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`
- **UI-TAB-002 bom tab → GET /api/bom/** `UI-TAB-002` — `e-parts-tabs.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/{id}/bom-validate/`, `GET /api/bom/`
- **UI-TAB-003 related parts tab → GET /api/part/related/** `UI-TAB-003` — `e-parts-tabs.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/related/`
- **UI-TAB-004 pricing tab → GET /api/part/{id}/pricing/** `UI-TAB-004` — `e-parts-tabs.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/{id}/pricing/`, `GET /api/part/sale-price/`
- **UI-TAB-005 stock tab → GET /api/stock/ or /api/part/{id}/requirements/** `UI-TAB-005` — `e-parts-tabs.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`
- **UI-TAB-006 test_templates tab → GET /api/part/test-template/** `UI-TAB-006` — `e-parts-tabs.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/test-template/`
- **UI-TAB-007 suppliers tab → GET /api/company/part/ or similar** `UI-TAB-007` — `e-parts-tabs.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`
- **UI-TAB-008 purchase_orders tab → any /api/ fetch** `UI-TAB-008` — `e-parts-tabs.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`
- **UI-TAB-009 allocations tab → any /api/ fetch** `UI-TAB-009` — `e-parts-tabs.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`
- **UI-TAB-010 attachments tab → any /api/ fetch** `UI-TAB-010` — `e-parts-tabs.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`

### API

- **API-PARTS-CP-001 GET /api/part/category/parameters/ lists templates** `API-PARTS-CP-001` — `parts-category-parameters.spec.ts` → `GET /api/part/category/parameters/`
- **API-PARTS-CP-002 POST /api/part/category/parameters/ creates a category parameter** `API-PARTS-CP-002` — `parts-category-parameters.spec.ts` → `POST /api/part/category/parameters/`
- **API-PARTS-CP-003 GET /api/part/category/parameters/{id}/ retrieves it** `API-PARTS-CP-003` — `parts-category-parameters.spec.ts` → `GET /api/part/category/parameters/{id}/`
- **API-PARTS-CP-004 PATCH /api/part/category/parameters/{id}/ updates default_value** `API-PARTS-CP-004` — `parts-category-parameters.spec.ts` → `PATCH /api/part/category/parameters/{id}/`
- **API-PARTS-CP-005 DELETE /api/part/category/parameters/{id}/ removes it** `API-PARTS-CP-005` — `parts-category-parameters.spec.ts` → `DELETE /api/part/category/parameters/{id}/`

## Endpoints in scope

| endpoint | status |
|---|---|
| `DELETE /api/part/category/parameters/{id}/` | ✅ covered |
| `GET /api/part/category/parameters/` | ✅ covered |
| `GET /api/part/category/parameters/{id}/` | ✅ covered |
| `PATCH /api/part/category/parameters/{id}/` | ✅ covered |
| `POST /api/part/category/parameters/` | ✅ covered |
| `PUT /api/part/category/parameters/{id}/` | ❌ missing |

## Manual test cases

### UI (16)

- `UI-PARTS-020` Toggle Template attribute on a Part *(P1)*
- `UI-PARTS-037` Add a parameter to a part from the Parts list *(P1)*
- `UI-PARTS-038` View parameters on a part detail page *(P1)*
- `UI-PARTS-039` Edit a parameter on a part from the Parts list *(P2)*
- `UI-PARTS-040` Remove a parameter from a part from the Parts list *(P2)*
- `UI-PARTS-041` Add a parameter template and propagate it to variants *(P2)*
- `UI-PARTS-042` Add a parameter using a parameter template on a variant part *(P2)*
- `UI-PARTS-043` Validate that adding a duplicate parameter name fails *(P3)*
- `UI-PARTS-044` Validate that adding a parameter with invalid units fails *(P3)*
- `UI-PARTS-045` Mark part as Template and create a Variant *(P1)*
- `UI-PARTS-046` View variants of a Template part *(P1)*
- `UI-PARTS-047` Aggregate stock display for a Template part *(P2)*
- `UI-PARTS-048` Unmark a Template part *(P2)*
- `UI-PARTS-049` Negative: Attempt to create a circular template relationship *(P3)*
- `UI-PARTS-052` Negative: Attempt to create a circular revision for a Template part *(P3)*
- `UI-PARTS-057` Create a template part and attempt to create a revision *(P3)*

### API (4)

- `API-PARTS-018` List parts by category and template status *(P1)*
- `API-PARTS-033` Retrieve category parameter templates *(P3)*
- `API-PARTS-034` Create a new category parameter template *(P3)*
- `API-PARTS-035` Delete a category parameter template *(P3)*

## Links

- [[coverage-index|Back to coverage index]]
- [[whole-process|Whole-process narrative]]
- [[graph/index|Endpoint graph]]
