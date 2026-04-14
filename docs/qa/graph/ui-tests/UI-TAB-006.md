---
title: "UI-TAB-006 test_templates tab → GET /api/part/test-template/"
side: ui
spec: e-parts-tabs
file: submission/automation/ui/tests/e-parts-tabs.spec.ts
case-ids: [UI-TAB-006]
endpoints-hit: 4
tags: [qa, test, automated, ui]
generated: 2026-04-14T21:13:09.842Z
---

# UI-TAB-006 test_templates tab → GET /api/part/test-template/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/e-parts-tabs.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/e-parts-tabs.spec.ts)
- Case IDs: [[UI-TAB-006]]

## Endpoints exercised

- [[get-api-part-test-template|GET /api/part/test-template/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-050]] — GET /api/part/999999999/ returns 404
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-TT-001]] — GET /api/part/test-template/ lists templates
