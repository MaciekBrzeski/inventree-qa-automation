---
title: "UI-EXTRA-004 navigate to Part BOM tab → GET /api/bom/ via SPA"
side: ui
spec: d-parts-extra-ui
file: submission/automation/ui/tests/d-parts-extra-ui.spec.ts
case-ids: [UI-EXTRA-004]
endpoints-hit: 5
tags: [qa, test, automated, ui]
generated: 2026-04-14T13:54:30.892Z
---

# UI-EXTRA-004 navigate to Part BOM tab → GET /api/bom/ via SPA

- Side: **UI**
- Spec file: `submission/automation/ui/tests/d-parts-extra-ui.spec.ts`
- Case IDs: [[UI-EXTRA-004]]

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
