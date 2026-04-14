---
title: "UI-CATEGORY-002 open the Add Part Category modal and submit a new category"
side: ui
spec: a-parts-category-create
file: submission/automation/ui/tests/a-parts-category-create.spec.ts
case-ids: [UI-CATEGORY-002]
endpoints-hit: 3
tags: [qa, test, automated, ui]
generated: 2026-04-14T13:54:30.891Z
---

# UI-CATEGORY-002 open the Add Part Category modal and submit a new category

- Side: **UI**
- Spec file: `submission/automation/ui/tests/a-parts-category-create.spec.ts`
- Case IDs: [[UI-CATEGORY-002]]

## Endpoints exercised

- [[get-api-part-category|GET /api/part/category/]]
- [[get-api-part-category-id|GET /api/part/category/{id}/]]
- [[post-api-part-category|POST /api/part/category/]]

## Paired tests on the other side

- API-PARTS-018 list categories
- API-PARTS-019 create category under QA-ROOT
- API-PARTS-020 retrieve a category
- API-PARTS-022 create a child category (hierarchy)
- API-PARTS-024 POST with empty name returns 400
- API-PARTS-025 DELETE /api/part/category/{id}/ removes the child category
- API-PARTS-051 GET /api/part/category/999999999/ returns 404
- API-PARTS-056 POST /api/part/category/ with empty name returns 400
- API-PARTS-PUT-002 PUT /api/part/category/{id}/ replaces the category
