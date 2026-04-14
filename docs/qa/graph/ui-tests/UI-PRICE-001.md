---
title: "UI-PRICE-001 add a sale price break via UI → POST /api/part/sale-price/"
side: ui
spec: k-parts-pricing-ui
file: submission/automation/ui/tests/k-parts-pricing-ui.spec.ts
case-ids: [UI-PRICE-001]
endpoints-hit: 6
tags: [qa, test, automated, ui]
generated: 2026-04-14T13:54:30.893Z
---

# UI-PRICE-001 add a sale price break via UI → POST /api/part/sale-price/

- Side: **UI**
- Spec file: `submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`
- Case IDs: [[UI-PRICE-001]]

## Endpoints exercised

- [[get-api-part-sale-price|GET /api/part/sale-price/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-pricing|GET /api/part/{id}/pricing/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]
- [[post-api-part-sale-price|POST /api/part/sale-price/]]

## Paired tests on the other side

- API-PARTS-003 retrieve part
- API-PARTS-050 GET /api/part/999999999/ returns 404
- API-PARTS-PRICE-006 GET /api/part/sale-price/ list returns 200
- API-PARTS-PRICE-007 POST /api/part/sale-price/ creates a sale price break
- API-PARTS-PUT-001 PUT /api/part/{id}/ replaces the part
- API-PARTS-PUT-005 PUT /api/part/sale-price/{id}/ replaces a sale price break
- API-PARTS-READS-001 GET /api/part/{id}/requirements/ returns 200
- API-PARTS-READS-002 GET /api/part/{id}/serial-numbers/ returns 200
- API-PARTS-READS-003 GET /api/part/{id}/pricing/ returns 200
