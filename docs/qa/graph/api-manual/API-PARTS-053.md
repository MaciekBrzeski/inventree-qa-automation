---
title: "Attempt to delete a non-existent part"
id: API-PARTS-053
side: api
priority: P2
tags: [qa, test, manual, api]
generated: 2026-04-14T13:54:30.901Z
---

# API-PARTS-053 — Attempt to delete a non-existent part

## Preconditions

authenticated as admin

## Steps

_(none)_

## Expected

_(none)_

## Tags

not-found

## Automated by

- `submission/automation/api/tests/parts-negative.spec.ts` — API-PARTS-053 POST /api/part/ with name only actually succeeds

## Endpoints touched via the automated sibling(s)

- [[delete-api-part-id|DELETE /api/part/{id}/]]
- [[patch-api-part-id|PATCH /api/part/{id}/]]
- [[post-api-part|POST /api/part/]]
