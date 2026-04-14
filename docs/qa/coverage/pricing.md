---
title: "Coverage — Pricing (internal + sale price)"
area: pricing
tags: [qa, coverage, area]
generated: 2026-04-14T13:54:31.289Z
---

# Pricing (internal + sale price)

Internal price breaks, sale price breaks, per-part pricing recalculation. Full CRUD on `/api/part/internal-price/` and `/api/part/sale-price/`.

## Headline

- Endpoints in scope: **15**
- Endpoints hit by at least one automated test: **12**
- Coverage ratio: **80.0%**
- Automated UI tests in this area: **15**
- Automated API tests in this area: **11**
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

- **API-PARTS-PRICE-001 GET /api/part/internal-price/ list returns 200** `API-PARTS-PRICE-001` — `parts-pricing.spec.ts` → `GET /api/part/internal-price/`
- **API-PARTS-PRICE-002 POST /api/part/internal-price/ creates a price break** `API-PARTS-PRICE-002` — `parts-pricing.spec.ts` → `POST /api/part/internal-price/`
- **API-PARTS-PRICE-003 GET /api/part/internal-price/{id}/ retrieves the price break** `API-PARTS-PRICE-003` — `parts-pricing.spec.ts` → `GET /api/part/internal-price/{id}/`
- **API-PARTS-PRICE-004 PATCH /api/part/internal-price/{id}/ updates the quantity** `API-PARTS-PRICE-004` — `parts-pricing.spec.ts` → `PATCH /api/part/internal-price/{id}/`
- **API-PARTS-PRICE-005 DELETE /api/part/internal-price/{id}/ removes the price break** `API-PARTS-PRICE-005` — `parts-pricing.spec.ts` → `DELETE /api/part/internal-price/{id}/`
- **API-PARTS-PRICE-006 GET /api/part/sale-price/ list returns 200** `API-PARTS-PRICE-006` — `parts-pricing.spec.ts` → `GET /api/part/sale-price/`
- **API-PARTS-PRICE-007 POST /api/part/sale-price/ creates a sale price break** `API-PARTS-PRICE-007` — `parts-pricing.spec.ts` → `POST /api/part/sale-price/`
- **API-PARTS-PRICE-008 GET /api/part/sale-price/{id}/ retrieves the sale price break** `API-PARTS-PRICE-008` — `parts-pricing.spec.ts` → `GET /api/part/sale-price/{id}/`
- **API-PARTS-PRICE-009 PATCH /api/part/sale-price/{id}/ updates the quantity** `API-PARTS-PRICE-009` — `parts-pricing.spec.ts` → `PATCH /api/part/sale-price/{id}/`
- **API-PARTS-PRICE-010 DELETE /api/part/sale-price/{id}/ removes the sale price break** `API-PARTS-PRICE-010` — `parts-pricing.spec.ts` → `DELETE /api/part/sale-price/{id}/`
- **API-PARTS-PRICE-011 PATCH /api/part/{id}/pricing/ triggers pricing recalc** `API-PARTS-PRICE-011` — `parts-pricing.spec.ts` → `PATCH /api/part/{id}/pricing/`

## Endpoints in scope

| endpoint | status |
|---|---|
| `DELETE /api/part/internal-price/{id}/` | ✅ covered |
| `DELETE /api/part/sale-price/{id}/` | ✅ covered |
| `GET /api/part/internal-price/` | ✅ covered |
| `GET /api/part/internal-price/{id}/` | ✅ covered |
| `GET /api/part/sale-price/` | ✅ covered |
| `GET /api/part/sale-price/{id}/` | ✅ covered |
| `GET /api/part/{id}/pricing/` | ✅ covered |
| `PATCH /api/part/internal-price/{id}/` | ✅ covered |
| `PATCH /api/part/sale-price/{id}/` | ✅ covered |
| `PATCH /api/part/{id}/pricing/` | ✅ covered |
| `POST /api/part/internal-price/` | ✅ covered |
| `POST /api/part/sale-price/` | ✅ covered |
| `PUT /api/part/internal-price/{id}/` | ❌ missing |
| `PUT /api/part/sale-price/{id}/` | ❌ missing |
| `PUT /api/part/{id}/pricing/` | ❌ missing |

## Links

- [[coverage-index|Back to coverage index]]
- [[whole-process|Whole-process narrative]]
- [[graph/index|Endpoint graph]]
