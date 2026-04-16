---
title: "API-PARTS-PUT-008 PUT /api/bom/{id}/validate/ validates a BOM line"
side: api
spec: parts-puts
file: submission/automation/api/tests/parts-puts.spec.ts
case-ids: [API-PARTS-PUT-008]
endpoints-hit: 3
tags: [qa, test, automated, api]
generated: 2026-04-16T14:45:16.423Z
---

# API-PARTS-PUT-008 PUT /api/bom/{id}/validate/ validates a BOM line

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-puts.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-puts.spec.ts)
- Case IDs: [[API-PARTS-PUT-008]]

## Endpoints exercised

- [[delete-api-bom-id|DELETE /api/bom/{id}/]]
- [[post-api-bom|POST /api/bom/]]
- [[put-api-bom-id-validate|PUT /api/bom/{id}/validate/]]

## Paired tests on the other side

- [[UI-BOM-002]] — add a BOM line via UI → POST /api/bom/
- [[UI-BOM-DEL-001]] — delete a single BOM row via row-action-menu → DELETE /api/bom/{id}/
