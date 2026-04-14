---
title: "Create a substitute BOM line with invalid original part"
id: API-PARTS-050
side: api
priority: P3
tags: [qa, test, manual, api]
generated: 2026-04-14T20:24:42.877Z
---

# API-PARTS-050 — Create a substitute BOM line with invalid original part

## Preconditions

logged in as admin; assembly part `<assembly_id>` exists

## Steps

_(none)_

## Expected

_(none)_

## Tags

bom, substitute

## Automated by

- [`submission/automation/api/tests/parts-negative.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-negative.spec.ts) — API-PARTS-050 GET /api/part/999999999/ returns 404

## Endpoints touched via the automated sibling(s)

- [[get-api-part-id|GET /api/part/{id}/]]
