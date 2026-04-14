---
title: "List parts by category and component status"
id: API-PARTS-012
side: api
priority: P1
tags: [qa, test, manual, api]
generated: 2026-04-14T15:01:44.849Z
---

# API-PARTS-012 — List parts by category and component status

## Preconditions

logged in as admin; category 5 exists

## Steps

_(none)_

## Expected

_(none)_

## Tags

query, filter, category

## Automated by

- [`submission/automation/api/tests/parts-query.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-query.spec.ts) — API-PARTS-012 filter by active=false returns the seeded inactive part

## Endpoints touched via the automated sibling(s)

- [[get-api-part|GET /api/part/]]
