---
title: "API-PARTS-PUT-007 PUT /api/bom/{id}/ replaces a BOM line"
side: api
spec: parts-puts
file: submission/automation/api/tests/parts-puts.spec.ts
case-ids: [API-PARTS-PUT-007]
endpoints-hit: 4
tags: [qa, test, automated, api]
generated: 2026-04-14T21:13:09.848Z
---

# API-PARTS-PUT-007 PUT /api/bom/{id}/ replaces a BOM line

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-puts.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-puts.spec.ts)
- Case IDs: [[API-PARTS-PUT-007]]

## Endpoints exercised

- [[delete-api-bom-id|DELETE /api/bom/{id}/]]
- [[get-api-bom-id|GET /api/bom/{id}/]]
- [[post-api-bom|POST /api/bom/]]
- [[put-api-bom-id|PUT /api/bom/{id}/]]

## Paired tests on the other side

- [[UI-BOM-002]] — add a BOM line via UI → POST /api/bom/
- [[UI-BOM-005]] — edit a BOM row via row-action-menu Edit → PATCH /api/bom/{id}/
