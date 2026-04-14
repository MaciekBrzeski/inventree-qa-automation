---
title: "Attempt to delete a non-existent category"
id: API-PARTS-056
side: api
priority: P2
tags: [qa, test, manual, api]
generated: 2026-04-14T13:54:30.901Z
---

# API-PARTS-056 — Attempt to delete a non-existent category

## Preconditions

authenticated as admin

## Steps

_(none)_

## Expected

_(none)_

## Tags

not-found

## Automated by

- `submission/automation/api/tests/parts-negative.spec.ts` — API-PARTS-056 POST /api/part/category/ with empty name returns 400

## Endpoints touched via the automated sibling(s)

- [[post-api-part-category|POST /api/part/category/]]
