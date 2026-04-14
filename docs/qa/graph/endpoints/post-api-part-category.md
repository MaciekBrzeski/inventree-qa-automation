---
title: "POST /api/part/category/"
method: POST
path: "/api/part/category/"
paired: paired
tags: [qa, endpoint, inventree, post, paired]
generated: 2026-04-14T13:54:30.890Z
---

# POST /api/part/category/



**Coverage status**: `paired`

## UI test cases

[[UI-CATEGORY-002]], [[UI-RECIPE-001]]

## API test cases

[[API-PARTS-019]], [[API-PARTS-022]], [[API-PARTS-024]], [[API-PARTS-056]], [[API-PARTS-PUT-002]]

## UI spec titles (automated, captured via `page.on("request")`)

- UI-CATEGORY-002 open the Add Part Category modal and submit a new category
- UI-RECIPE-001 createCategoryViaUi → POST /api/part/category/

## API spec titles (automated, inferred from spec file scope)

- API-PARTS-019 create category under QA-ROOT
- API-PARTS-022 create a child category (hierarchy)
- API-PARTS-024 POST with empty name returns 400
- API-PARTS-056 POST /api/part/category/ with empty name returns 400
- API-PARTS-PUT-002 PUT /api/part/category/{id}/ replaces the category

## Links

- [[index|back to graph index]]
