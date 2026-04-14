---
title: "UI-BOM-004 bulk-delete BOM lines via Select all + action-button-delete-selected-records"
side: ui
spec: h-parts-bom-ui
file: submission/automation/ui/tests/h-parts-bom-ui.spec.ts
case-ids: [UI-BOM-004]
endpoints-hit: 6
tags: [qa, test, automated, ui]
generated: 2026-04-14T20:24:42.869Z
---

# UI-BOM-004 bulk-delete BOM lines via Select all + action-button-delete-selected-records

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/h-parts-bom-ui.spec.ts)
- Case IDs: [[UI-BOM-004]]

## Endpoints exercised

- [[delete-api-bom|DELETE /api/bom/]]
- [[get-api-bom|GET /api/bom/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-bom-validate|GET /api/part/{id}/bom-validate/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-050]] — GET /api/part/999999999/ returns 404
- [[API-PARTS-BOM-004]] — list BOM lines
- [[API-PARTS-BULK-004]] — DELETE /api/bom/ rejects non-list
- [[API-PARTS-BV-001]] — GET /api/part/{id}/bom-validate/ returns 200 for assembly
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-READS-004]] — GET /api/part/{id}/bom-validate/ returns 200 for assembly
