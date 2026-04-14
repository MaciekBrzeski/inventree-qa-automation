---
title: "Coverage — Related parts"
area: related-parts
tags: [qa, coverage, area]
generated: 2026-04-14T20:24:43.274Z
---

# Related parts

CRUD on `/api/part/related/`. UI flow uses `action-button-add-related-part` on the Related Parts tab (draft parked as `_draft-c-parts-related.spec.ts.skip` due to Mantine combobox locator work).

## Headline

- Endpoints in scope: **6**
- Endpoints hit by at least one automated test: **5**
- Coverage ratio: **83.3%**
- Automated UI tests in this area: **15**
- Automated API tests in this area: **5**
- Manual UI test cases matched: **0**
- Manual API test cases matched: **0**
- Bugs filed in this area: **0**

## Automated tests

### UI

- **UI-EXTRA-001 navigate to Part Pricing tab → GET /api/part/{id}/pricing/** `UI-EXTRA-001` — `d-parts-extra-ui.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/{id}/pricing/`
- **UI-EXTRA-002 click nav-breadcrumb-action on parts root → GET /api/part/category/tree/** `UI-EXTRA-002` — `d-parts-extra-ui.spec.ts` → `GET /api/part/category/tree/`
- **UI-EXTRA-003 rename the created category via UI → PATCH /api/part/category/{id}/** `UI-EXTRA-003` — `d-parts-extra-ui.spec.ts` → `GET /api/part/category/{id}/`, `PATCH /api/part/category/{id}/`
- **UI-EXTRA-004 navigate to Part BOM tab → GET /api/bom/ via SPA** `UI-EXTRA-004` — `d-parts-extra-ui.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/{id}/bom-validate/`, `GET /api/bom/`
- **UI-EXTRA-005 navigate to Related Parts tab → GET /api/part/related/** `UI-EXTRA-005` — `d-parts-extra-ui.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/related/`
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

- **API-PARTS-REL-001 POST /api/part/related/ creates a related link** `API-PARTS-REL-001` — `parts-related.spec.ts` → `POST /api/part/related/`
- **API-PARTS-REL-002 GET /api/part/related/ lists the created link** `API-PARTS-REL-002` — `parts-related.spec.ts` → `GET /api/part/related/`
- **API-PARTS-REL-003 GET /api/part/related/{id}/ retrieves the link by id** `API-PARTS-REL-003` — `parts-related.spec.ts` → `GET /api/part/related/{id}/`
- **API-PARTS-REL-004 PATCH /api/part/related/{id}/ updates the note** `API-PARTS-REL-004` — `parts-related.spec.ts` → `PATCH /api/part/related/{id}/`
- **API-PARTS-REL-005 DELETE /api/part/related/{id}/ removes the link** `API-PARTS-REL-005` — `parts-related.spec.ts` → `DELETE /api/part/related/{id}/`, `GET /api/part/related/{id}/`

## Endpoints in scope

| endpoint | status |
|---|---|
| `DELETE /api/part/related/{id}/` | ✅ covered |
| `GET /api/part/related/` | ✅ covered |
| `GET /api/part/related/{id}/` | ✅ covered |
| `PATCH /api/part/related/{id}/` | ✅ covered |
| `POST /api/part/related/` | ✅ covered |
| `PUT /api/part/related/{id}/` | ❌ missing |

## Links

- [[coverage-index|Back to coverage index]]
- [[whole-process|Whole-process narrative]]
- [[graph/index|Endpoint graph]]
