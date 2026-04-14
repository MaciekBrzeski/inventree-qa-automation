---
title: "UI-RECIPE-007 deleteInactivePartViaUi → DELETE /api/part/{id}/"
side: ui
spec: g-parts-recipes
file: submission/automation/ui/tests/g-parts-recipes.spec.ts
case-ids: [UI-RECIPE-007]
endpoints-hit: 5
tags: [qa, test, automated, ui]
generated: 2026-04-14T21:13:09.843Z
---

# UI-RECIPE-007 deleteInactivePartViaUi → DELETE /api/part/{id}/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/g-parts-recipes.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/g-parts-recipes.spec.ts)
- Case IDs: [[UI-RECIPE-007]]

## Endpoints exercised

- [[delete-api-part-id|DELETE /api/part/{id}/]]
- [[get-api-part-category-id|GET /api/part/category/{id}/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-005]] — delete part
- [[API-PARTS-020]] — retrieve a category
- [[API-PARTS-025]] — DELETE /api/part/category/{id}/ removes the child category
- [[API-PARTS-050]] — GET /api/part/999999999/ returns 404
- [[API-PARTS-051]] — GET /api/part/category/999999999/ returns 404
- [[API-PARTS-053]] — POST /api/part/ with name only actually succeeds
- [[API-PARTS-055]] — DELETE /api/part/999999999/ returns 404
- [[API-PARTS-BV-004]] — POST /api/part/{id}/bom-copy/ copies BOM from another assembly
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-PUT-002]] — PUT /api/part/category/{id}/ replaces the category
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
