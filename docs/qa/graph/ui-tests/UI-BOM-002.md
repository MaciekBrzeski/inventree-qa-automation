---
title: "UI-BOM-002 add a BOM line via UI → POST /api/bom/"
side: ui
spec: h-parts-bom-ui
file: submission/automation/ui/tests/h-parts-bom-ui.spec.ts
case-ids: [UI-BOM-002]
endpoints-hit: 7
tags: [qa, test, automated, ui]
generated: 2026-04-16T14:45:16.419Z
---

# UI-BOM-002 add a BOM line via UI → POST /api/bom/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/h-parts-bom-ui.spec.ts)
- Case IDs: [[UI-BOM-002]]

## Endpoints exercised

- [[get-api-bom|GET /api/bom/]]
- [[get-api-part|GET /api/part/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-bom-validate|GET /api/part/{id}/bom-validate/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]
- [[post-api-bom|POST /api/bom/]]

## Paired tests on the other side

- [[API-PARTS-001]] — list parts
- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-BOM-003]] — create BOM line
- [[API-PARTS-BOM-004]] — list BOM lines
- [[API-PARTS-BV-001]] — GET /api/part/{id}/bom-validate/ returns 200 for assembly
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-PUT-007]] — PUT /api/bom/{id}/ replaces a BOM line
- [[API-PARTS-PUT-008]] — PUT /api/bom/{id}/validate/ validates a BOM line
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-READS-004]] — GET /api/part/{id}/bom-validate/ returns 200 for assembly
- [[API-PARTS-THUMB-002]] — GET /api/part/thumbs/{id}/ retrieves a thumbnail by part id
- [[API-SMOKE-002]] — authed list parts returns 200 + array-ish
- [[API-SMOKE-004]] — schema validator runs against real part list
