---
title: "Attempt to update a non-existent category"
id: API-PARTS-055
side: api
priority: P2
tags: [qa, test, manual, api]
generated: 2026-04-14T15:01:44.850Z
---

# API-PARTS-055 — Attempt to update a non-existent category

## Preconditions

authenticated as admin

## Steps

_(none)_

## Expected

_(none)_

## Tags

not-found

## Automated by

- [`submission/automation/api/tests/parts-negative.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-negative.spec.ts) — API-PARTS-055 DELETE /api/part/999999999/ returns 404

## Endpoints touched via the automated sibling(s)

- [[delete-api-part-id|DELETE /api/part/{id}/]]
