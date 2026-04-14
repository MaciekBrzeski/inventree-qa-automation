---
title: "API-PARTS-BOM-001 create assembly part"
side: api
spec: parts-bom
file: submission/automation/api/tests/parts-bom.spec.ts
case-ids: [API-PARTS-BOM-001]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T21:13:09.846Z
---

# API-PARTS-BOM-001 create assembly part

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-bom.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-bom.spec.ts)
- Case IDs: [[API-PARTS-BOM-001]]

## Endpoints exercised

- [[post-api-part|POST /api/part/]]

## Paired tests on the other side

- [[UI-PART-002]] — create a new part via the Add menu → Create Part modal
- [[UI-PARTS-CROSS-FULL-001]] — create the part via Add menu → POST /api/part/
- [[UI-RECIPE-002]] — createPartViaUi → POST /api/part/ (under QA-ROOT)
