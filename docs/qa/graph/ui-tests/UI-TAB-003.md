---
title: "UI-TAB-003 related parts tab → GET /api/part/related/"
side: ui
spec: e-parts-tabs
file: submission/automation/ui/tests/e-parts-tabs.spec.ts
case-ids: [UI-TAB-003]
endpoints-hit: 4
tags: [qa, test, automated, ui]
generated: 2026-04-16T14:45:16.419Z
---

# UI-TAB-003 related parts tab → GET /api/part/related/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/e-parts-tabs.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/e-parts-tabs.spec.ts)
- Case IDs: [[UI-TAB-003]]

## Endpoints exercised

- [[get-api-part-related|GET /api/part/related/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-REL-002]] — GET /api/part/related/ lists the created link
