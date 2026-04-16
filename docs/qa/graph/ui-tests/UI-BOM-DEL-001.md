---
title: "UI-BOM-DEL-001 delete a single BOM row via row-action-menu → DELETE /api/bom/{id}/"
side: ui
spec: o-parts-bom-row-delete-ui
file: submission/automation/ui/tests/o-parts-bom-row-delete-ui.spec.ts
case-ids: [UI-BOM-DEL-001]
endpoints-hit: 6
tags: [qa, test, automated, ui]
generated: 2026-04-16T14:45:16.420Z
---

# UI-BOM-DEL-001 delete a single BOM row via row-action-menu → DELETE /api/bom/{id}/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/o-parts-bom-row-delete-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/o-parts-bom-row-delete-ui.spec.ts)
- Case IDs: [[UI-BOM-DEL-001]]

## Endpoints exercised

- [[delete-api-bom-id|DELETE /api/bom/{id}/]]
- [[get-api-bom|GET /api/bom/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-bom-validate|GET /api/part/{id}/bom-validate/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-BOM-004]] — list BOM lines
- [[API-PARTS-BOM-007]] — delete BOM line
- [[API-PARTS-BV-001]] — GET /api/part/{id}/bom-validate/ returns 200 for assembly
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-PUT-007]] — PUT /api/bom/{id}/ replaces a BOM line
- [[API-PARTS-PUT-008]] — PUT /api/bom/{id}/validate/ validates a BOM line
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-READS-004]] — GET /api/part/{id}/bom-validate/ returns 200 for assembly
