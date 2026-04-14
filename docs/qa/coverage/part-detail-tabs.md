---
title: "Coverage — Part detail tabs"
area: part-detail-tabs
tags: [qa, coverage, area]
generated: 2026-04-14T20:24:43.273Z
---

# Part detail tabs

Navigation into each panel of the part detail page: BOM, Parameters, Stock, Suppliers, Pricing, Related Parts, Test Templates, Attachments, Notes, etc. Each test asserts the SPA fetched at least one `/api/` call when opening the tab.

## Headline

- Endpoints in scope: **13**
- Endpoints hit by at least one automated test: **5**
- Coverage ratio: **38.5%**
- Automated UI tests in this area: **13**
- Automated API tests in this area: **5**
- Manual UI test cases matched: **7**
- Manual API test cases matched: **0**
- Bugs filed in this area: **1**

## Automated tests

### UI

- **UI-PARTS-CROSS-001 API-seeded part renders on its detail page** `UI-PARTS-CROSS-001` — `cross-flow.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`
- **UI-PARTS-CROSS-002 action buttons on the seeded part detail are reachable** `UI-PARTS-CROSS-002` — `cross-flow.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`
- **UI-PARTS-CROSS-003 navigation to Parts list shows the web shell** `UI-PARTS-CROSS-003` — `cross-flow.spec.ts`
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

- **API-PARTS-READS-001 GET /api/part/{id}/requirements/ returns 200** `API-PARTS-READS-001` — `parts-reads.spec.ts` → `GET /api/part/{id}/requirements/`
- **API-PARTS-READS-002 GET /api/part/{id}/serial-numbers/ returns 200** `API-PARTS-READS-002` — `parts-reads.spec.ts` → `GET /api/part/{id}/serial-numbers/`
- **API-PARTS-READS-003 GET /api/part/{id}/pricing/ returns 200** `API-PARTS-READS-003` — `parts-reads.spec.ts` → `GET /api/part/{id}/pricing/`
- **API-PARTS-READS-004 GET /api/part/{id}/bom-validate/ returns 200 for assembly** `API-PARTS-READS-004` — `parts-reads.spec.ts` → `GET /api/part/{id}/bom-validate/`
- **API-PARTS-READS-005 GET /api/part/category/tree/ returns the category tree** `API-PARTS-READS-005` — `parts-reads.spec.ts` → `GET /api/part/category/tree/`

## Endpoints in scope

| endpoint | status |
|---|---|
| `DELETE /api/part/{id}/` | ❌ missing |
| `GET /api/part/{id}/` | ✅ covered |
| `GET /api/part/{id}/bom-validate/` | ✅ covered |
| `GET /api/part/{id}/pricing/` | ✅ covered |
| `GET /api/part/{id}/requirements/` | ✅ covered |
| `GET /api/part/{id}/serial-numbers/` | ✅ covered |
| `PATCH /api/part/{id}/` | ❌ missing |
| `PATCH /api/part/{id}/bom-validate/` | ❌ missing |
| `PATCH /api/part/{id}/pricing/` | ❌ missing |
| `POST /api/part/{id}/bom-copy/` | ❌ missing |
| `PUT /api/part/{id}/` | ❌ missing |
| `PUT /api/part/{id}/bom-validate/` | ❌ missing |
| `PUT /api/part/{id}/pricing/` | ❌ missing |

## Related bugs

- [[bugs/INV-PARTS-002-openapi-required-drift|INV-PARTS-002]]

## Manual test cases

### UI (7)

- `UI-PARTS-009` Verify category breadcrumb navigation *(P1)*
- `UI-PARTS-010` Navigate between part detail tabs *(P1)*
- `UI-PARTS-013` Browse a part category to view contained parts *(P1)*
- `UI-PARTS-016` View sub-categories within a category *(P2)*
- `UI-PARTS-038` View parameters on a part detail page *(P1)*
- `UI-PARTS-046` View variants of a Template part *(P1)*
- `UI-PARTS-055` View revision history for a part *(P1)*

## Links

- [[coverage-index|Back to coverage index]]
- [[whole-process|Whole-process narrative]]
- [[graph/index|Endpoint graph]]
