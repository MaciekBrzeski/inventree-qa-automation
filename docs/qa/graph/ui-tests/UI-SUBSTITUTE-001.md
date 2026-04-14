---
title: "UI-SUBSTITUTE-001 delete an existing BOM substitute via Edit Substitutes dialog → DELETE /api/bom/substitute/{id}/"
side: ui
spec: l-parts-bom-substitute-delete-ui
file: submission/automation/ui/tests/l-parts-bom-substitute-delete-ui.spec.ts
case-ids: [UI-SUBSTITUTE-001]
endpoints-hit: 6
tags: [qa, test, automated, ui]
generated: 2026-04-14T21:13:09.844Z
---

# UI-SUBSTITUTE-001 delete an existing BOM substitute via Edit Substitutes dialog → DELETE /api/bom/substitute/{id}/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/l-parts-bom-substitute-delete-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/l-parts-bom-substitute-delete-ui.spec.ts)
- Case IDs: [[UI-SUBSTITUTE-001]]

## Endpoints exercised

- [[delete-api-bom-substitute-id|DELETE /api/bom/substitute/{id}/]]
- [[get-api-bom|GET /api/bom/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-bom-validate|GET /api/part/{id}/bom-validate/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-050]] — GET /api/part/999999999/ returns 404
- [[API-PARTS-BOM-004]] — list BOM lines
- [[API-PARTS-BV-001]] — GET /api/part/{id}/bom-validate/ returns 200 for assembly
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-READS-004]] — GET /api/part/{id}/bom-validate/ returns 200 for assembly
- [[API-PARTS-SUB-006]] — DELETE /api/bom/substitute/{id}/ removes it
