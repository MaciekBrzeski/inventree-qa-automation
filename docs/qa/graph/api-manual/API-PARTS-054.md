---
title: "Attempt to create a category with missing required fields"
id: API-PARTS-054
side: api
priority: P2
tags: [qa, test, manual, api]
generated: 2026-04-14T21:13:09.854Z
---

# API-PARTS-054 — Attempt to create a category with missing required fields

## Preconditions

authenticated as admin

## Steps

_(none)_

## Expected

_(none)_

## Tags

validation

## Automated by

- [`submission/automation/api/tests/parts-negative.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-negative.spec.ts) — API-PARTS-054 PATCH /api/part/999999999/ returns 404

## Endpoints touched via the automated sibling(s)

- [[patch-api-part-id|PATCH /api/part/{id}/]]
