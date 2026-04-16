---
title: "UI-BOM-005 edit a BOM row via row-action-menu Edit → PATCH /api/bom/{id}/"
side: ui
spec: h-parts-bom-ui
file: submission/automation/ui/tests/h-parts-bom-ui.spec.ts
case-ids: [UI-BOM-005]
endpoints-hit: 7
tags: [qa, test, automated, ui]
generated: 2026-04-16T14:45:16.420Z
---

# UI-BOM-005 edit a BOM row via row-action-menu Edit → PATCH /api/bom/{id}/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/h-parts-bom-ui.spec.ts)
- Case IDs: [[UI-BOM-005]]

## Endpoints exercised

- [[get-api-bom|GET /api/bom/]]
- [[get-api-bom-id|GET /api/bom/{id}/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-bom-validate|GET /api/part/{id}/bom-validate/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]
- [[patch-api-bom-id|PATCH /api/bom/{id}/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-BOM-004]] — list BOM lines
- [[API-PARTS-BOM-005]] — retrieve BOM line
- [[API-PARTS-BOM-006]] — update BOM line
- [[API-PARTS-BV-001]] — GET /api/part/{id}/bom-validate/ returns 200 for assembly
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-PUT-007]] — PUT /api/bom/{id}/ replaces a BOM line
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-READS-004]] — GET /api/part/{id}/bom-validate/ returns 200 for assembly
