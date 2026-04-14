---
title: "UI-BOM-006 click Validate BOM Line row action → PATCH /api/bom/{id}/validate/ or /api/part/{id}/bom-validate/"
side: ui
spec: h-parts-bom-ui
file: submission/automation/ui/tests/h-parts-bom-ui.spec.ts
case-ids: [UI-BOM-006]
endpoints-hit: 6
tags: [qa, test, automated, ui]
generated: 2026-04-14T21:13:09.843Z
---

# UI-BOM-006 click Validate BOM Line row action → PATCH /api/bom/{id}/validate/ or /api/part/{id}/bom-validate/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/h-parts-bom-ui.spec.ts)
- Case IDs: [[UI-BOM-006]]

## Endpoints exercised

- [[get-api-bom|GET /api/bom/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-bom-validate|GET /api/part/{id}/bom-validate/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]
- [[patch-api-bom-id-validate|PATCH /api/bom/{id}/validate/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-050]] — GET /api/part/999999999/ returns 404
- [[API-PARTS-BOM-004]] — list BOM lines
- [[API-PARTS-BV-001]] — GET /api/part/{id}/bom-validate/ returns 200 for assembly
- [[API-PARTS-BV-003]] — PATCH /api/bom/{id}/validate/ marks the row as validated
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-READS-004]] — GET /api/part/{id}/bom-validate/ returns 200 for assembly
