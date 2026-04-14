---
title: "UI-INTPRICE-002 edit internal price break via row-action-menu → PATCH /api/part/internal-price/{id}/"
side: ui
spec: n-parts-internal-pricing-ui
file: submission/automation/ui/tests/n-parts-internal-pricing-ui.spec.ts
case-ids: [UI-INTPRICE-002]
endpoints-hit: 7
tags: [qa, test, automated, ui]
generated: 2026-04-14T21:13:09.844Z
---

# UI-INTPRICE-002 edit internal price break via row-action-menu → PATCH /api/part/internal-price/{id}/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/n-parts-internal-pricing-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/n-parts-internal-pricing-ui.spec.ts)
- Case IDs: [[UI-INTPRICE-002]]

## Endpoints exercised

- [[get-api-part-internal-price|GET /api/part/internal-price/]]
- [[get-api-part-internal-price-id|GET /api/part/internal-price/{id}/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-pricing|GET /api/part/{id}/pricing/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]
- [[patch-api-part-internal-price-id|PATCH /api/part/internal-price/{id}/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-050]] — GET /api/part/999999999/ returns 404
- [[API-PARTS-PRICE-001]] — GET /api/part/internal-price/ list returns 200
- [[API-PARTS-PRICE-003]] — GET /api/part/internal-price/{id}/ retrieves the price break
- [[API-PARTS-PRICE-004]] — PATCH /api/part/internal-price/{id}/ updates the quantity
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-PUT-004]] — PUT /api/part/internal-price/{id}/ replaces an internal price break
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-READS-003]] — GET /api/part/{id}/pricing/ returns 200
