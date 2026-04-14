---
title: "UI-EXTRA-001 navigate to Part Pricing tab → GET /api/part/{id}/pricing/"
side: ui
spec: d-parts-extra-ui
file: submission/automation/ui/tests/d-parts-extra-ui.spec.ts
case-ids: [UI-EXTRA-001]
endpoints-hit: 4
tags: [qa, test, automated, ui]
generated: 2026-04-14T20:24:42.868Z
---

# UI-EXTRA-001 navigate to Part Pricing tab → GET /api/part/{id}/pricing/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/d-parts-extra-ui.spec.ts)
- Case IDs: [[UI-EXTRA-001]]

## Endpoints exercised

- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-pricing|GET /api/part/{id}/pricing/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-050]] — GET /api/part/999999999/ returns 404
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-READS-003]] — GET /api/part/{id}/pricing/ returns 200
