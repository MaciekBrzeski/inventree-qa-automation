---
title: "UI-PRICE-002 edit a sale price break via row-action-menu Edit → PATCH /api/part/sale-price/{id}/"
side: ui
spec: k-parts-pricing-ui
file: submission/automation/ui/tests/k-parts-pricing-ui.spec.ts
case-ids: [UI-PRICE-002]
endpoints-hit: 7
tags: [qa, test, automated, ui]
generated: 2026-04-14T20:24:42.869Z
---

# UI-PRICE-002 edit a sale price break via row-action-menu Edit → PATCH /api/part/sale-price/{id}/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/k-parts-pricing-ui.spec.ts)
- Case IDs: [[UI-PRICE-002]]

## Endpoints exercised

- [[get-api-part-sale-price|GET /api/part/sale-price/]]
- [[get-api-part-sale-price-id|GET /api/part/sale-price/{id}/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-pricing|GET /api/part/{id}/pricing/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]
- [[patch-api-part-sale-price-id|PATCH /api/part/sale-price/{id}/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-050]] — GET /api/part/999999999/ returns 404
- [[API-PARTS-PRICE-006]] — GET /api/part/sale-price/ list returns 200
- [[API-PARTS-PRICE-008]] — GET /api/part/sale-price/{id}/ retrieves the sale price break
- [[API-PARTS-PRICE-009]] — PATCH /api/part/sale-price/{id}/ updates the quantity
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-PUT-005]] — PUT /api/part/sale-price/{id}/ replaces a sale price break
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-READS-003]] — GET /api/part/{id}/pricing/ returns 200
