---
title: "Coverage — Smoke & navigation"
area: smoke-and-nav
tags: [qa, coverage, area]
generated: 2026-04-16T14:45:17.086Z
---

# Smoke & navigation

Login, authenticated shell, main navigation drawer, breadcrumbs, global search. Baseline that every other area depends on.

## Headline

- Endpoints in scope: **83**
- Endpoints hit by at least one automated test: **5**
- Coverage ratio: **6.0%**
- Automated UI tests in this area: **16**
- Automated API tests in this area: **4**
- Manual UI test cases matched: **3**
- Manual API test cases matched: **0**
- Bugs filed in this area: **0**

## Automated tests

### UI

- **UI-SMOKE-001 login as admin lands on authenticated shell** `UI-SMOKE-001` — `smoke.spec.ts`
- **UI-SMOKE-002 parts list page loads with expected title** `UI-SMOKE-002` — `smoke.spec.ts`
- **UI-SMOKE-003 part detail by id opens and shows action buttons** `UI-SMOKE-003` — `smoke.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`
- **UI-PARTS-NAV-001 navigation menu button is visible on the authenticated shell** `UI-PARTS-NAV-001` — `parts-navigation.spec.ts`
- **UI-PARTS-NAV-002 top-level nav shows Dashboard, Parts, Stock, Manufacturing, Purchasing, Sales** `UI-PARTS-NAV-002` — `parts-navigation.spec.ts`
- **UI-PARTS-NAV-003 breadcrumb action button is visible on parts list** `UI-PARTS-NAV-003` — `parts-navigation.spec.ts`
- **UI-PARTS-NAV-004 global search button is reachable** `UI-PARTS-NAV-004` — `parts-navigation.spec.ts`
- **UI-PARTS-NAV-005 notifications button is visible** `UI-PARTS-NAV-005` — `parts-navigation.spec.ts`
- **UI-PARTS-DETAIL-001 detail page document title contains the part IPN** `UI-PARTS-DETAIL-001` — `parts-detail-actions.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`
- **UI-PARTS-DETAIL-002 open-in-admin action button is visible** `UI-PARTS-DETAIL-002` — `parts-detail-actions.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`
- **UI-PARTS-DETAIL-003 subscribe-to-notifications action button is visible** `UI-PARTS-DETAIL-003` — `parts-detail-actions.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`
- **UI-PARTS-DETAIL-004 barcode actions menu trigger is visible** `UI-PARTS-DETAIL-004` — `parts-detail-actions.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`
- **UI-PARTS-DETAIL-005 breadcrumb shows parts root segment** `UI-PARTS-DETAIL-005` — `parts-detail-actions.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`
- **UI-LOGIN-NEG-001 wrong password does not authenticate** `UI-LOGIN-NEG-001` — `parts-login-negative.spec.ts`
- **UI-LOGIN-NEG-002 username with empty password does not authenticate** `UI-LOGIN-NEG-002` — `parts-login-negative.spec.ts`
- **UI-LOGIN-NEG-003 blank form click does not authenticate** `UI-LOGIN-NEG-003` — `parts-login-negative.spec.ts`

### API

- **API-SMOKE-001 GET /api/ returns InvenTree banner** `API-SMOKE-001` — `smoke.spec.ts`
- **API-SMOKE-002 authed list parts returns 200 + array-ish** `API-SMOKE-002` — `smoke.spec.ts` → `GET /api/part/`
- **API-SMOKE-003 QA-ROOT category resolved in global setup** `API-SMOKE-003` — `smoke.spec.ts`
- **API-SMOKE-004 schema validator runs against real part list** `API-SMOKE-004` — `smoke.spec.ts` → `GET /api/part/`

## Endpoints in scope

| endpoint | status |
|---|---|
| `DELETE /api/bom/` | ❌ missing |
| `DELETE /api/bom/substitute/{id}/` | ❌ missing |
| `DELETE /api/bom/{id}/` | ❌ missing |
| `DELETE /api/part/category/parameters/{id}/` | ❌ missing |
| `DELETE /api/part/category/{id}/` | ❌ missing |
| `DELETE /api/part/internal-price/{id}/` | ❌ missing |
| `DELETE /api/part/related/{id}/` | ❌ missing |
| `DELETE /api/part/sale-price/{id}/` | ❌ missing |
| `DELETE /api/part/stocktake/` | ❌ missing |
| `DELETE /api/part/stocktake/{id}/` | ❌ missing |
| `DELETE /api/part/test-template/{id}/` | ❌ missing |
| `DELETE /api/part/{id}/` | ❌ missing |
| `GET /api/bom/` | ❌ missing |
| `GET /api/bom/substitute/` | ❌ missing |
| `GET /api/bom/substitute/{id}/` | ❌ missing |
| `GET /api/bom/{id}/` | ❌ missing |
| `GET /api/part/` | ✅ covered |
| `GET /api/part/category/` | ❌ missing |
| `GET /api/part/category/parameters/` | ❌ missing |
| `GET /api/part/category/parameters/{id}/` | ❌ missing |
| `GET /api/part/category/tree/` | ❌ missing |
| `GET /api/part/category/{id}/` | ✅ covered |
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
| `GET /api/part/{id}/` | ✅ covered |
| `GET /api/part/{id}/bom-validate/` | ❌ missing |
| `GET /api/part/{id}/pricing/` | ❌ missing |
| `GET /api/part/{id}/requirements/` | ✅ covered |
| `GET /api/part/{id}/serial-numbers/` | ✅ covered |
| `PATCH /api/bom/substitute/{id}/` | ❌ missing |
| `PATCH /api/bom/{id}/` | ❌ missing |
| `PATCH /api/bom/{id}/validate/` | ❌ missing |
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
| `POST /api/bom/` | ❌ missing |
| `POST /api/bom/substitute/` | ❌ missing |
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
| `PUT /api/bom/substitute/{id}/` | ❌ missing |
| `PUT /api/bom/{id}/` | ❌ missing |
| `PUT /api/bom/{id}/validate/` | ❌ missing |
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

### UI (3)

- `UI-PARTS-009` Verify category breadcrumb navigation *(P1)*
- `UI-PARTS-010` Navigate between part detail tabs *(P1)*
- `UI-PARTS-054` Navigate between revisions of a part *(P1)*

## Links

- [[coverage-index|Back to coverage index]]
- [[whole-process|Whole-process narrative]]
- [[graph/index|Endpoint graph]]
