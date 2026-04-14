---
title: "API-PARTS-PUT-004 PUT /api/part/internal-price/{id}/ replaces an internal price break"
side: api
spec: parts-puts
file: submission/automation/api/tests/parts-puts.spec.ts
case-ids: [API-PARTS-PUT-004]
endpoints-hit: 4
tags: [qa, test, automated, api]
generated: 2026-04-14T21:13:09.848Z
---

# API-PARTS-PUT-004 PUT /api/part/internal-price/{id}/ replaces an internal price break

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-puts.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-puts.spec.ts)
- Case IDs: [[API-PARTS-PUT-004]]

## Endpoints exercised

- [[delete-api-part-internal-price-id|DELETE /api/part/internal-price/{id}/]]
- [[get-api-part-internal-price-id|GET /api/part/internal-price/{id}/]]
- [[post-api-part-internal-price|POST /api/part/internal-price/]]
- [[put-api-part-internal-price-id|PUT /api/part/internal-price/{id}/]]

## Paired tests on the other side

- [[UI-INTPRICE-001]] — add internal price break via UI → POST /api/part/internal-price/
- [[UI-INTPRICE-002]] — edit internal price break via row-action-menu → PATCH /api/part/internal-price/{id}/
- [[UI-INTPRICE-003]] — delete internal price break via row-action-menu → DELETE /api/part/internal-price/{id}/
