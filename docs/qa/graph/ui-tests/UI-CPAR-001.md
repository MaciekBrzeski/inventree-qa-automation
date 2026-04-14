---
title: "UI-CPAR-001 add a category parameter via UI → POST /api/part/category/parameters/"
side: ui
spec: l-parts-category-parameters-ui
file: submission/automation/ui/tests/l-parts-category-parameters-ui.spec.ts
case-ids: [UI-CPAR-001]
endpoints-hit: 3
tags: [qa, test, automated, ui]
generated: 2026-04-14T21:13:09.844Z
---

# UI-CPAR-001 add a category parameter via UI → POST /api/part/category/parameters/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/l-parts-category-parameters-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/l-parts-category-parameters-ui.spec.ts)
- Case IDs: [[UI-CPAR-001]]

## Endpoints exercised

- [[get-api-part-category-parameters|GET /api/part/category/parameters/]]
- [[get-api-part-category-id|GET /api/part/category/{id}/]]
- [[post-api-part-category-parameters|POST /api/part/category/parameters/]]

## Paired tests on the other side

- [[API-PARTS-020]] — retrieve a category
- [[API-PARTS-025]] — DELETE /api/part/category/{id}/ removes the child category
- [[API-PARTS-051]] — GET /api/part/category/999999999/ returns 404
- [[API-PARTS-CP-001]] — GET /api/part/category/parameters/ lists templates
- [[API-PARTS-CP-002]] — POST /api/part/category/parameters/ creates a category parameter
- [[API-PARTS-PUT-002]] — PUT /api/part/category/{id}/ replaces the category
