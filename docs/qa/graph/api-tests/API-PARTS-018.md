---
title: "API-PARTS-018 list categories"
side: api
spec: parts-category
file: submission/automation/api/tests/parts-category.spec.ts
case-ids: [API-PARTS-018]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T20:24:42.871Z
---

# API-PARTS-018 list categories

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-category.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-category.spec.ts)
- Case IDs: [[API-PARTS-018]]

## Endpoints exercised

- [[get-api-part-category|GET /api/part/category/]]

## Paired tests on the other side

- BASELINE-007 subcategory panel at root
- [[UI-CATEGORY-001]] — navigate to the subcategories panel
- [[UI-CATEGORY-002]] — open the Add Part Category modal and submit a new category
- [[UI-RECIPE-001]] — createCategoryViaUi → POST /api/part/category/
