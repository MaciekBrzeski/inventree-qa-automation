---
title: "API-PARTS-PRICE-010 DELETE /api/part/sale-price/{id}/ removes the sale price break"
side: api
spec: parts-pricing
file: submission/automation/api/tests/parts-pricing.spec.ts
case-ids: [API-PARTS-PRICE-010]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T21:13:09.848Z
---

# API-PARTS-PRICE-010 DELETE /api/part/sale-price/{id}/ removes the sale price break

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-pricing.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-pricing.spec.ts)
- Case IDs: [[API-PARTS-PRICE-010]]

## Endpoints exercised

- [[delete-api-part-sale-price-id|DELETE /api/part/sale-price/{id}/]]

## Paired tests on the other side

- [[UI-PRICE-003]] — delete a sale price break via row-action-menu Delete → DELETE /api/part/sale-price/{id}/
