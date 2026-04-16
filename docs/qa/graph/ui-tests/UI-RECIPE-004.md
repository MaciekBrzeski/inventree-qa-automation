---
title: "UI-RECIPE-004 togglePartAttributeViaUi(assembly) → PATCH /api/part/{id}/"
side: ui
spec: g-parts-recipes
file: submission/automation/ui/tests/g-parts-recipes.spec.ts
case-ids: [UI-RECIPE-004]
endpoints-hit: 5
tags: [qa, test, automated, ui]
generated: 2026-04-16T14:45:16.419Z
---

# UI-RECIPE-004 togglePartAttributeViaUi(assembly) → PATCH /api/part/{id}/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/g-parts-recipes.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/g-parts-recipes.spec.ts)
- Case IDs: [[UI-RECIPE-004]]

## Endpoints exercised

- [[get-api-part-category-id|GET /api/part/category/{id}/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]
- [[patch-api-part-id|PATCH /api/part/{id}/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-004]] — update part
- [[API-PARTS-005]] — delete part
- [[API-PARTS-020]] — retrieve a category
- [[API-PARTS-025]] — DELETE /api/part/category/{id}/ removes the child category
- [[API-PARTS-053]] — POST /api/part/ with name only actually succeeds
- [[API-PARTS-BV-004]] — POST /api/part/{id}/bom-copy/ copies BOM from another assembly
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-PUT-002]] — PUT /api/part/category/{id}/ replaces the category
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
