---
title: "API-PARTS-PRICE-005 DELETE /api/part/internal-price/{id}/ removes the price break"
side: api
spec: parts-pricing
file: submission/automation/api/tests/parts-pricing.spec.ts
case-ids: [API-PARTS-PRICE-005]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T21:13:09.848Z
---

# API-PARTS-PRICE-005 DELETE /api/part/internal-price/{id}/ removes the price break

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-pricing.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-pricing.spec.ts)
- Case IDs: [[API-PARTS-PRICE-005]]

## Endpoints exercised

- [[delete-api-part-internal-price-id|DELETE /api/part/internal-price/{id}/]]

## Paired tests on the other side

- [[UI-INTPRICE-003]] — delete internal price break via row-action-menu → DELETE /api/part/internal-price/{id}/
