---
title: "BASELINE-002 BOM panel with one populated row"
side: ui
spec: 0-baseline-seeded
file: submission/automation/ui/tests/0-baseline-seeded.spec.ts
case-ids: []
endpoints-hit: 5
tags: [qa, test, automated, ui]
generated: 2026-04-16T14:45:16.418Z
---

# BASELINE-002 BOM panel with one populated row

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/0-baseline-seeded.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/0-baseline-seeded.spec.ts)
- Case IDs: _(no case IDs in title)_

## Endpoints exercised

- [[get-api-bom|GET /api/bom/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-bom-validate|GET /api/part/{id}/bom-validate/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-BOM-004]] — list BOM lines
- [[API-PARTS-BV-001]] — GET /api/part/{id}/bom-validate/ returns 200 for assembly
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-READS-004]] — GET /api/part/{id}/bom-validate/ returns 200 for assembly
