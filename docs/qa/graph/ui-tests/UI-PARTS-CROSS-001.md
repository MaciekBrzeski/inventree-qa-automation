---
title: "UI-PARTS-CROSS-001 API-seeded part renders on its detail page"
side: ui
spec: cross-flow
file: submission/automation/ui/tests/cross-flow.spec.ts
case-ids: [UI-PARTS-CROSS-001]
endpoints-hit: 4
tags: [qa, test, automated, ui]
generated: 2026-04-14T21:13:09.842Z
---

# UI-PARTS-CROSS-001 API-seeded part renders on its detail page

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/cross-flow.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/cross-flow.spec.ts)
- Case IDs: [[UI-PARTS-CROSS-001]]

## Endpoints exercised

- [[get-api-part-category-id|GET /api/part/category/{id}/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-020]] — retrieve a category
- [[API-PARTS-025]] — DELETE /api/part/category/{id}/ removes the child category
- [[API-PARTS-050]] — GET /api/part/999999999/ returns 404
- [[API-PARTS-051]] — GET /api/part/category/999999999/ returns 404
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-PUT-002]] — PUT /api/part/category/{id}/ replaces the category
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
