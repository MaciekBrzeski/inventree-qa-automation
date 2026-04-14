---
title: "UI-PARTS-CROSS-FULL-002 add a parameter via the Parameters tab → POST /api/part/parameter/"
side: ui
spec: z1-cross-flow-full-ui
file: submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts
case-ids: [PARTS-CROSS-FULL-002]
endpoints-hit: 3
tags: [qa, test, automated, ui]
generated: 2026-04-14T20:24:42.870Z
---

# UI-PARTS-CROSS-FULL-002 add a parameter via the Parameters tab → POST /api/part/parameter/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/z1-cross-flow-full-ui.spec.ts)
- Case IDs: [[PARTS-CROSS-FULL-002]]

## Endpoints exercised

- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-050]] — GET /api/part/999999999/ returns 404
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
