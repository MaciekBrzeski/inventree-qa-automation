---
title: "API-PARTS-021 rename a category via PATCH"
side: api
spec: parts-category
file: submission/automation/api/tests/parts-category.spec.ts
case-ids: [API-PARTS-021]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T15:01:44.844Z
---

# API-PARTS-021 rename a category via PATCH

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-category.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-category.spec.ts)
- Case IDs: [[API-PARTS-021]]

## Endpoints exercised

- [[patch-api-part-category-id|PATCH /api/part/category/{id}/]]

## Paired tests on the other side

- [[UI-EXTRA-003]] — rename the created category via UI → PATCH /api/part/category/{id}/
- [[UI-RECIPE-005]] — renameCategoryViaUi → PATCH /api/part/category/{id}/
