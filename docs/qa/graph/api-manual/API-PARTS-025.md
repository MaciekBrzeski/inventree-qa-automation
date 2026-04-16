---
title: "Delete a category"
id: API-PARTS-025
side: api
priority: P1
tags: [qa, test, manual, api]
generated: 2026-04-16T14:45:16.426Z
---

# API-PARTS-025 — Delete a category

## Preconditions

logged in as admin; one category exists

## Steps

_(none)_

## Expected

_(none)_

## Tags

`category`, `crud`

## Automated by

- [`submission/automation/api/tests/parts-category.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-category.spec.ts) — API-PARTS-025 DELETE /api/part/category/{id}/ removes the child category

## Endpoints touched via the automated sibling(s)

- [[delete-api-part-category-id|DELETE /api/part/category/{id}/]]
- [[get-api-part-category-id|GET /api/part/category/{id}/]]
