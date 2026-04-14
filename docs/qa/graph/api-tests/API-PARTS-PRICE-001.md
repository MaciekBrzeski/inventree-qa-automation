---
title: "API-PARTS-PRICE-001 GET /api/part/internal-price/ list returns 200"
side: api
spec: parts-pricing
file: submission/automation/api/tests/parts-pricing.spec.ts
case-ids: [API-PARTS-PRICE-001]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T21:13:09.848Z
---

# API-PARTS-PRICE-001 GET /api/part/internal-price/ list returns 200

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-pricing.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-pricing.spec.ts)
- Case IDs: [[API-PARTS-PRICE-001]]

## Endpoints exercised

- [[get-api-part-internal-price|GET /api/part/internal-price/]]

## Paired tests on the other side

- [[UI-INTPRICE-001]] — add internal price break via UI → POST /api/part/internal-price/
- [[UI-INTPRICE-002]] — edit internal price break via row-action-menu → PATCH /api/part/internal-price/{id}/
- [[UI-INTPRICE-003]] — delete internal price break via row-action-menu → DELETE /api/part/internal-price/{id}/
