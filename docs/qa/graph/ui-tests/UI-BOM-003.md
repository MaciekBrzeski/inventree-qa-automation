---
title: "UI-BOM-003 trigger Validate BOM via UI → /api/part/{id}/bom-validate/ or /api/bom/{id}/validate/"
side: ui
spec: h-parts-bom-ui
file: submission/automation/ui/tests/h-parts-bom-ui.spec.ts
case-ids: [UI-BOM-003]
endpoints-hit: 5
tags: [qa, test, automated, ui]
generated: 2026-04-14T13:54:30.893Z
---

# UI-BOM-003 trigger Validate BOM via UI → /api/part/{id}/bom-validate/ or /api/bom/{id}/validate/

- Side: **UI**
- Spec file: `submission/automation/ui/tests/h-parts-bom-ui.spec.ts`
- Case IDs: [[UI-BOM-003]]

## Endpoints exercised

- [[get-api-bom|GET /api/bom/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-bom-validate|GET /api/part/{id}/bom-validate/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]

## Paired tests on the other side

- API-PARTS-003 retrieve part
- API-PARTS-050 GET /api/part/999999999/ returns 404
- API-PARTS-BOM-004 list BOM lines
- API-PARTS-BV-001 GET /api/part/{id}/bom-validate/ returns 200 for assembly
- API-PARTS-PUT-001 PUT /api/part/{id}/ replaces the part
- API-PARTS-READS-001 GET /api/part/{id}/requirements/ returns 200
- API-PARTS-READS-002 GET /api/part/{id}/serial-numbers/ returns 200
- API-PARTS-READS-004 GET /api/part/{id}/bom-validate/ returns 200 for assembly
