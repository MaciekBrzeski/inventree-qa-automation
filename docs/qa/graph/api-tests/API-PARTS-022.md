---
title: "API-PARTS-022 create a child category (hierarchy)"
side: api
spec: parts-category
file: submission/automation/api/tests/parts-category.spec.ts
case-ids: [API-PARTS-022]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-16T14:45:16.422Z
---

# API-PARTS-022 create a child category (hierarchy)

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-category.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-category.spec.ts)
- Case IDs: [[API-PARTS-022]]

## Endpoints exercised

- [[post-api-part-category|POST /api/part/category/]]

## Paired tests on the other side

- [[UI-CATEGORY-002]] — open the Add Part Category modal and submit a new category
- [[UI-RECIPE-001]] — createCategoryViaUi → POST /api/part/category/
