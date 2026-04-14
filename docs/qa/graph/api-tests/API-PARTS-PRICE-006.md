---
title: "API-PARTS-PRICE-006 GET /api/part/sale-price/ list returns 200"
side: api
spec: parts-pricing
file: submission/automation/api/tests/parts-pricing.spec.ts
case-ids: [API-PARTS-PRICE-006]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T21:13:09.848Z
---

# API-PARTS-PRICE-006 GET /api/part/sale-price/ list returns 200

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-pricing.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-pricing.spec.ts)
- Case IDs: [[API-PARTS-PRICE-006]]

## Endpoints exercised

- [[get-api-part-sale-price|GET /api/part/sale-price/]]

## Paired tests on the other side

- BASELINE-003 pricing panel with internal + sale breaks
- [[UI-PRECALC-001]] — click Refresh in pricing-actions menu → PATCH /api/part/{id}/pricing/
- [[UI-PRICE-001]] — add a sale price break via UI → POST /api/part/sale-price/
- [[UI-PRICE-002]] — edit a sale price break via row-action-menu Edit → PATCH /api/part/sale-price/{id}/
- [[UI-PRICE-003]] — delete a sale price break via row-action-menu Delete → DELETE /api/part/sale-price/{id}/
- [[UI-TAB-004]] — pricing tab → GET /api/part/{id}/pricing/
