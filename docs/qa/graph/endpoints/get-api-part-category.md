---
title: "GET /api/part/category/"
method: GET
path: "/api/part/category/"
paired: paired
tags: [qa, endpoint, inventree, get, paired]
generated: 2026-04-14T20:24:42.866Z
---

# GET /api/part/category/



**Coverage status**: `paired`

## UI test cases

[[UI-CATEGORY-001]], [[UI-CATEGORY-002]], [[UI-RECIPE-001]]

## API test cases

[[API-PARTS-018]]

## UI spec titles (automated, captured via `page.on("request")`)

- BASELINE-007 subcategory panel at root
- [[UI-CATEGORY-001]] — navigate to the subcategories panel
- [[UI-CATEGORY-002]] — open the Add Part Category modal and submit a new category
- [[UI-RECIPE-001]] — createCategoryViaUi → POST /api/part/category/

## API spec titles (automated, inferred from spec file scope)

- [[API-PARTS-018]] — list categories

## Links

- [[index|back to graph index]]
