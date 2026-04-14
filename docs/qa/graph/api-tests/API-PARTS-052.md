---
title: "API-PARTS-052 POST /api/part/ with empty payload returns 400"
side: api
spec: parts-negative
file: submission/automation/api/tests/parts-negative.spec.ts
case-ids: [API-PARTS-052]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T15:01:44.845Z
---

# API-PARTS-052 POST /api/part/ with empty payload returns 400

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-negative.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-negative.spec.ts)
- Case IDs: [[API-PARTS-052]]

## Endpoints exercised

- [[post-api-part|POST /api/part/]]

## Paired tests on the other side

- [[UI-PART-002]] — create a new part via the Add menu → Create Part modal
- [[UI-PARTS-CROSS-FULL-001]] — create the part via Add menu → POST /api/part/
- [[UI-RECIPE-002]] — createPartViaUi → POST /api/part/ (under QA-ROOT)
