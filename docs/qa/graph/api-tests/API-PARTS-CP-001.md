---
title: "API-PARTS-CP-001 GET /api/part/category/parameters/ lists templates"
side: api
spec: parts-category-parameters
file: submission/automation/api/tests/parts-category-parameters.spec.ts
case-ids: [API-PARTS-CP-001]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T21:13:09.847Z
---

# API-PARTS-CP-001 GET /api/part/category/parameters/ lists templates

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-category-parameters.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-category-parameters.spec.ts)
- Case IDs: [[API-PARTS-CP-001]]

## Endpoints exercised

- [[get-api-part-category-parameters|GET /api/part/category/parameters/]]

## Paired tests on the other side

- [[UI-CPAR-001]] — add a category parameter via UI → POST /api/part/category/parameters/
- [[UI-CPAR-002]] — edit a category parameter via row-action-menu Edit → PATCH /api/part/category/parameters/{id}/
- [[UI-CPAR-003]] — delete a category parameter via row-action-menu Delete → DELETE /api/part/category/parameters/{id}/
