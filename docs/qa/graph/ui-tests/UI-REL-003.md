---
title: "UI-REL-003 edit the related-parts note via row-action-menu Edit → PATCH /api/part/related/{id}/"
side: ui
spec: j-parts-related-ui
file: submission/automation/ui/tests/j-parts-related-ui.spec.ts
case-ids: [UI-REL-003]
endpoints-hit: 6
tags: [qa, test, automated, ui]
generated: 2026-04-14T15:01:44.843Z
---

# UI-REL-003 edit the related-parts note via row-action-menu Edit → PATCH /api/part/related/{id}/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/j-parts-related-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/j-parts-related-ui.spec.ts)
- Case IDs: [[UI-REL-003]]

## Endpoints exercised

- [[get-api-part-related|GET /api/part/related/]]
- [[get-api-part-related-id|GET /api/part/related/{id}/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]
- [[patch-api-part-related-id|PATCH /api/part/related/{id}/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-050]] — GET /api/part/999999999/ returns 404
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-PUT-003]] — PUT /api/part/related/{id}/ replaces a related link
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-REL-002]] — GET /api/part/related/ lists the created link
- [[API-PARTS-REL-003]] — GET /api/part/related/{id}/ retrieves the link by id
- [[API-PARTS-REL-004]] — PATCH /api/part/related/{id}/ updates the note
- [[API-PARTS-REL-005]] — DELETE /api/part/related/{id}/ removes the link
