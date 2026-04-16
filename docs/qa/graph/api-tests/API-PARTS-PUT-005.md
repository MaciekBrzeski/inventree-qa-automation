---
title: "API-PARTS-PUT-005 PUT /api/part/sale-price/{id}/ replaces a sale price break"
side: api
spec: parts-puts
file: submission/automation/api/tests/parts-puts.spec.ts
case-ids: [API-PARTS-PUT-005]
endpoints-hit: 4
tags: [qa, test, automated, api]
generated: 2026-04-16T14:45:16.423Z
---

# API-PARTS-PUT-005 PUT /api/part/sale-price/{id}/ replaces a sale price break

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-puts.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-puts.spec.ts)
- Case IDs: [[API-PARTS-PUT-005]]

## Endpoints exercised

- [[delete-api-part-sale-price-id|DELETE /api/part/sale-price/{id}/]]
- [[get-api-part-sale-price-id|GET /api/part/sale-price/{id}/]]
- [[post-api-part-sale-price|POST /api/part/sale-price/]]
- [[put-api-part-sale-price-id|PUT /api/part/sale-price/{id}/]]

## Paired tests on the other side

- [[UI-PRICE-001]] — add a sale price break via UI → POST /api/part/sale-price/
- [[UI-PRICE-002]] — edit a sale price break via row-action-menu Edit → PATCH /api/part/sale-price/{id}/
- [[UI-PRICE-003]] — delete a sale price break via row-action-menu Delete → DELETE /api/part/sale-price/{id}/
