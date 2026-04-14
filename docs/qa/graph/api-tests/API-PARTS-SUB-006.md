---
title: "API-PARTS-SUB-006 DELETE /api/bom/substitute/{id}/ removes it"
side: api
spec: parts-bom-substitute
file: submission/automation/api/tests/parts-bom-substitute.spec.ts
case-ids: [API-PARTS-SUB-006]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T20:24:42.870Z
---

# API-PARTS-SUB-006 DELETE /api/bom/substitute/{id}/ removes it

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-bom-substitute.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-bom-substitute.spec.ts)
- Case IDs: [[API-PARTS-SUB-006]]

## Endpoints exercised

- [[delete-api-bom-substitute-id|DELETE /api/bom/substitute/{id}/]]

## Paired tests on the other side

- [[UI-SUBSTITUTE-001]] — delete an existing BOM substitute via Edit Substitutes dialog → DELETE /api/bom/substitute/{id}/
