---
title: "API-PARTS-BV-003 PATCH /api/bom/{id}/validate/ marks the row as validated"
side: api
spec: parts-bom-validate
file: submission/automation/api/tests/parts-bom-validate.spec.ts
case-ids: [API-PARTS-BV-003]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-16T14:45:16.422Z
---

# API-PARTS-BV-003 PATCH /api/bom/{id}/validate/ marks the row as validated

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-bom-validate.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-bom-validate.spec.ts)
- Case IDs: [[API-PARTS-BV-003]]

## Endpoints exercised

- [[patch-api-bom-id-validate|PATCH /api/bom/{id}/validate/]]

## Paired tests on the other side

- [[UI-BOM-006]] — click Validate BOM Line row action → PATCH /api/bom/{id}/validate/ or /api/part/{id}/bom-validate/
