---
title: "Attempt to create a part with missing required fields"
id: API-PARTS-051
side: api
priority: P2
tags: [qa, test, manual, api]
generated: 2026-04-14T20:24:42.877Z
---

# API-PARTS-051 — Attempt to create a part with missing required fields

## Preconditions

authenticated as admin

## Steps

_(none)_

## Expected

_(none)_

## Tags

validation

## Automated by

- [`submission/automation/api/tests/parts-negative.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-negative.spec.ts) — API-PARTS-051 GET /api/part/category/999999999/ returns 404

## Endpoints touched via the automated sibling(s)

- [[get-api-part-category-id|GET /api/part/category/{id}/]]
