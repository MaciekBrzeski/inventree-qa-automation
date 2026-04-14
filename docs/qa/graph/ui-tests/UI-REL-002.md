---
title: "UI-REL-002 delete the related-parts link via row-action-menu → DELETE /api/part/related/{id}/"
side: ui
spec: j-parts-related-ui
file: submission/automation/ui/tests/j-parts-related-ui.spec.ts
case-ids: [UI-REL-002]
endpoints-hit: 5
tags: [qa, test, automated, ui]
generated: 2026-04-14T20:24:42.869Z
---

# UI-REL-002 delete the related-parts link via row-action-menu → DELETE /api/part/related/{id}/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/j-parts-related-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/j-parts-related-ui.spec.ts)
- Case IDs: [[UI-REL-002]]

## Endpoints exercised

- [[delete-api-part-related-id|DELETE /api/part/related/{id}/]]
- [[get-api-part-related|GET /api/part/related/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-050]] — GET /api/part/999999999/ returns 404
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-PUT-003]] — PUT /api/part/related/{id}/ replaces a related link
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-REL-002]] — GET /api/part/related/ lists the created link
- [[API-PARTS-REL-005]] — DELETE /api/part/related/{id}/ removes the link
