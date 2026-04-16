---
title: "UI-CPAR-002 edit a category parameter via row-action-menu Edit → PATCH /api/part/category/parameters/{id}/"
side: ui
spec: l-parts-category-parameters-ui
file: submission/automation/ui/tests/l-parts-category-parameters-ui.spec.ts
case-ids: [UI-CPAR-002]
endpoints-hit: 4
tags: [qa, test, automated, ui]
generated: 2026-04-16T14:45:16.420Z
---

# UI-CPAR-002 edit a category parameter via row-action-menu Edit → PATCH /api/part/category/parameters/{id}/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/l-parts-category-parameters-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/l-parts-category-parameters-ui.spec.ts)
- Case IDs: [[UI-CPAR-002]]

## Endpoints exercised

- [[get-api-part-category-parameters|GET /api/part/category/parameters/]]
- [[get-api-part-category-parameters-id|GET /api/part/category/parameters/{id}/]]
- [[get-api-part-category-id|GET /api/part/category/{id}/]]
- [[patch-api-part-category-parameters-id|PATCH /api/part/category/parameters/{id}/]]

## Paired tests on the other side

- [[API-PARTS-020]] — retrieve a category
- [[API-PARTS-025]] — DELETE /api/part/category/{id}/ removes the child category
- [[API-PARTS-CP-001]] — GET /api/part/category/parameters/ lists templates
- [[API-PARTS-CP-003]] — GET /api/part/category/parameters/{id}/ retrieves it
- [[API-PARTS-CP-004]] — PATCH /api/part/category/parameters/{id}/ updates default_value
- [[API-PARTS-PUT-002]] — PUT /api/part/category/{id}/ replaces the category
