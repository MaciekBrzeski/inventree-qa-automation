---
title: "UI-RECIPE-006 deleteCategoryViaUi → DELETE /api/part/category/{id}/"
side: ui
spec: g-parts-recipes
file: submission/automation/ui/tests/g-parts-recipes.spec.ts
case-ids: [UI-RECIPE-006]
endpoints-hit: 2
tags: [qa, test, automated, ui]
generated: 2026-04-16T14:45:16.419Z
---

# UI-RECIPE-006 deleteCategoryViaUi → DELETE /api/part/category/{id}/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/g-parts-recipes.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/g-parts-recipes.spec.ts)
- Case IDs: [[UI-RECIPE-006]]

## Endpoints exercised

- [[delete-api-part-category-id|DELETE /api/part/category/{id}/]]
- [[get-api-part-category-id|GET /api/part/category/{id}/]]

## Paired tests on the other side

- [[API-PARTS-020]] — retrieve a category
- [[API-PARTS-025]] — DELETE /api/part/category/{id}/ removes the child category
- [[API-PARTS-PUT-002]] — PUT /api/part/category/{id}/ replaces the category
