---
title: "UI-TT-001 add a test template via action-button-add-test-template → POST /api/part/test-template/"
side: ui
spec: i-parts-test-template-ui
file: submission/automation/ui/tests/i-parts-test-template-ui.spec.ts
case-ids: [UI-TT-001]
endpoints-hit: 5
tags: [qa, test, automated, ui]
generated: 2026-04-16T14:45:16.420Z
---

# UI-TT-001 add a test template via action-button-add-test-template → POST /api/part/test-template/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/i-parts-test-template-ui.spec.ts)
- Case IDs: [[UI-TT-001]]

## Endpoints exercised

- [[get-api-part-test-template|GET /api/part/test-template/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]
- [[post-api-part-test-template|POST /api/part/test-template/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-PUT-006]] — PUT /api/part/test-template/{id}/ replaces a test template
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-TT-001]] — GET /api/part/test-template/ lists templates
- [[API-PARTS-TT-002]] — POST /api/part/test-template/ creates a test template
