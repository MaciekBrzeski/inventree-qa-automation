---
title: "Coverage — Test templates"
area: test-templates
tags: [qa, coverage, area]
generated: 2026-04-14T21:13:10.253Z
---

# Test templates

CRUD on `/api/part/test-template/`. Requires the seed part to be `testable=true`.

## Headline

- Endpoints in scope: **6**
- Endpoints hit by at least one automated test: **5**
- Coverage ratio: **83.3%**
- Automated UI tests in this area: **10**
- Automated API tests in this area: **5**
- Manual UI test cases matched: **1**
- Manual API test cases matched: **0**
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

- **API-PARTS-TT-001 GET /api/part/test-template/ lists templates** `API-PARTS-TT-001` — `parts-test-template.spec.ts` → `GET /api/part/test-template/`
- **API-PARTS-TT-002 POST /api/part/test-template/ creates a test template** `API-PARTS-TT-002` — `parts-test-template.spec.ts` → `POST /api/part/test-template/`
- **API-PARTS-TT-003 GET /api/part/test-template/{id}/ retrieves the template** `API-PARTS-TT-003` — `parts-test-template.spec.ts` → `GET /api/part/test-template/{id}/`
- **API-PARTS-TT-004 PATCH /api/part/test-template/{id}/ updates description** `API-PARTS-TT-004` — `parts-test-template.spec.ts` → `PATCH /api/part/test-template/{id}/`
- **API-PARTS-TT-005 DELETE /api/part/test-template/{id}/ removes the template** `API-PARTS-TT-005` — `parts-test-template.spec.ts` → `DELETE /api/part/test-template/{id}/`

## Endpoints in scope

| endpoint | status |
|---|---|
| `DELETE /api/part/test-template/{id}/` | ✅ covered |
| `GET /api/part/test-template/` | ✅ covered |
| `GET /api/part/test-template/{id}/` | ✅ covered |
| `PATCH /api/part/test-template/{id}/` | ✅ covered |
| `POST /api/part/test-template/` | ✅ covered |
| `PUT /api/part/test-template/{id}/` | ❌ missing |

## Manual test cases

### UI (1)

- `UI-PARTS-023` Toggle Testable attribute on a Part *(P2)*

## Links

- [[coverage-index|Back to coverage index]]
- [[whole-process|Whole-process narrative]]
- [[graph/index|Endpoint graph]]
