---
title: "UI-RECIPE-001 createCategoryViaUi → POST /api/part/category/"
side: ui
spec: g-parts-recipes
file: submission/automation/ui/tests/g-parts-recipes.spec.ts
case-ids: [UI-RECIPE-001]
endpoints-hit: 2
tags: [qa, test, automated, ui]
generated: 2026-04-16T14:45:16.419Z
---

# UI-RECIPE-001 createCategoryViaUi → POST /api/part/category/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/g-parts-recipes.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/g-parts-recipes.spec.ts)
- Case IDs: [[UI-RECIPE-001]]

## Endpoints exercised

- [[get-api-part-category|GET /api/part/category/]]
- [[post-api-part-category|POST /api/part/category/]]

## Paired tests on the other side

- [[API-PARTS-018]] — list categories
- [[API-PARTS-019]] — create category under QA-ROOT
- [[API-PARTS-022]] — create a child category (hierarchy)
- [[API-PARTS-024]] — POST with empty name returns 400
- [[API-PARTS-PUT-002]] — PUT /api/part/category/{id}/ replaces the category
