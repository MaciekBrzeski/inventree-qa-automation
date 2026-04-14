---
title: "Paginate part list with limit=0 (should return an error)"
id: API-PARTS-020
side: api
priority: P3
tags: [qa, test, manual, api]
generated: 2026-04-14T15:01:44.849Z
---

# API-PARTS-020 — Paginate part list with limit=0 (should return an error)

## Preconditions

logged in as admin; category 5 exists

## Steps

_(none)_

## Expected

_(none)_

## Tags

query, filter, pagination

## Automated by

- [`submission/automation/api/tests/parts-category.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-category.spec.ts) — API-PARTS-020 retrieve a category

## Endpoints touched via the automated sibling(s)

- [[get-api-part-category-id|GET /api/part/category/{id}/]]
