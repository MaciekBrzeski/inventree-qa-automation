---
title: "UI-TT-004 edit a test template via row-action-menu Edit → PATCH /api/part/test-template/{id}/"
side: ui
spec: i-parts-test-template-ui
file: submission/automation/ui/tests/i-parts-test-template-ui.spec.ts
case-ids: [UI-TT-004]
endpoints-hit: 6
tags: [qa, test, automated, ui]
generated: 2026-04-14T20:24:42.869Z
---

# UI-TT-004 edit a test template via row-action-menu Edit → PATCH /api/part/test-template/{id}/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/i-parts-test-template-ui.spec.ts)
- Case IDs: [[UI-TT-004]]

## Endpoints exercised

- [[get-api-part-test-template|GET /api/part/test-template/]]
- [[get-api-part-test-template-id|GET /api/part/test-template/{id}/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]
- [[patch-api-part-test-template-id|PATCH /api/part/test-template/{id}/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-050]] — GET /api/part/999999999/ returns 404
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-PUT-006]] — PUT /api/part/test-template/{id}/ replaces a test template
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-TT-001]] — GET /api/part/test-template/ lists templates
- [[API-PARTS-TT-003]] — GET /api/part/test-template/{id}/ retrieves the template
- [[API-PARTS-TT-004]] — PATCH /api/part/test-template/{id}/ updates description
