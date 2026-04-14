---
title: "UI-TAB-005 stock tab → GET /api/stock/ or /api/part/{id}/requirements/"
side: ui
spec: e-parts-tabs
file: submission/automation/ui/tests/e-parts-tabs.spec.ts
case-ids: [UI-TAB-005]
endpoints-hit: 3
tags: [qa, test, automated, ui]
generated: 2026-04-14T20:24:42.868Z
---

# UI-TAB-005 stock tab → GET /api/stock/ or /api/part/{id}/requirements/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/e-parts-tabs.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/e-parts-tabs.spec.ts)
- Case IDs: [[UI-TAB-005]]

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
