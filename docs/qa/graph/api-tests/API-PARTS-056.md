---
title: "API-PARTS-056 POST /api/part/category/ with empty name returns 400"
side: api
spec: parts-negative
file: submission/automation/api/tests/parts-negative.spec.ts
case-ids: [API-PARTS-056]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T15:01:44.846Z
---

# API-PARTS-056 POST /api/part/category/ with empty name returns 400

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-negative.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-negative.spec.ts)
- Case IDs: [[API-PARTS-056]]

## Endpoints exercised

- [[post-api-part-category|POST /api/part/category/]]

## Paired tests on the other side

- [[UI-CATEGORY-002]] — open the Add Part Category modal and submit a new category
- [[UI-RECIPE-001]] — createCategoryViaUi → POST /api/part/category/
