---
title: "Attempt to update a non-existent part"
id: API-PARTS-052
side: api
priority: P2
tags: [qa, test, manual, api]
generated: 2026-04-14T13:54:30.901Z
---

# API-PARTS-052 — Attempt to update a non-existent part

## Preconditions

authenticated as admin

## Steps

_(none)_

## Expected

_(none)_

## Tags

not-found

## Automated by

- `submission/automation/api/tests/parts-negative.spec.ts` — API-PARTS-052 POST /api/part/ with empty payload returns 400

## Endpoints touched via the automated sibling(s)

- [[post-api-part|POST /api/part/]]
