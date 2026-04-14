---
title: "API-PARTS-055 DELETE /api/part/999999999/ returns 404"
side: api
spec: parts-negative
file: submission/automation/api/tests/parts-negative.spec.ts
case-ids: [API-PARTS-055]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T13:54:30.895Z
---

# API-PARTS-055 DELETE /api/part/999999999/ returns 404

- Side: **API**
- Spec file: `submission/automation/api/tests/parts-negative.spec.ts`
- Case IDs: [[API-PARTS-055]]

## Endpoints exercised

- [[delete-api-part-id|DELETE /api/part/{id}/]]

## Paired tests on the other side

- UI-DELETE-001 delete the UI-created part via the page action menu
- UI-RECIPE-007 deleteInactivePartViaUi → DELETE /api/part/{id}/
