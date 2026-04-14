---
title: "UI-TT-003 delete a test template via row-action-menu → DELETE /api/part/test-template/{id}/"
side: ui
spec: i-parts-test-template-ui
file: submission/automation/ui/tests/i-parts-test-template-ui.spec.ts
case-ids: [UI-TT-003]
endpoints-hit: 5
tags: [qa, test, automated, ui]
generated: 2026-04-14T13:54:30.893Z
---

# UI-TT-003 delete a test template via row-action-menu → DELETE /api/part/test-template/{id}/

- Side: **UI**
- Spec file: `submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`
- Case IDs: [[UI-TT-003]]

## Endpoints exercised

- [[delete-api-part-test-template-id|DELETE /api/part/test-template/{id}/]]
- [[get-api-part-test-template|GET /api/part/test-template/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]

## Paired tests on the other side

- API-PARTS-003 retrieve part
- API-PARTS-050 GET /api/part/999999999/ returns 404
- API-PARTS-PUT-001 PUT /api/part/{id}/ replaces the part
- API-PARTS-PUT-006 PUT /api/part/test-template/{id}/ replaces a test template
- API-PARTS-READS-001 GET /api/part/{id}/requirements/ returns 200
- API-PARTS-READS-002 GET /api/part/{id}/serial-numbers/ returns 200
- API-PARTS-TT-001 GET /api/part/test-template/ lists templates
- API-PARTS-TT-005 DELETE /api/part/test-template/{id}/ removes the template
