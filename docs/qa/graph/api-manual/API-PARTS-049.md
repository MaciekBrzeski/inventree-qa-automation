---
title: "Validate a BOM line with zero quantity"
id: API-PARTS-049
side: api
priority: P3
tags: [qa, test, manual, api]
generated: 2026-04-14T21:13:09.854Z
---

# API-PARTS-049 — Validate a BOM line with zero quantity

## Preconditions

logged in as admin; assembly part `<assembly_id>` exists; BOM line `<id>` exists

## Steps

_(none)_

## Expected

_(none)_

## Tags

bom, validate

## Automated by

- [`submission/automation/api/tests/parts-negative.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-negative.spec.ts) — API-PARTS-049 GET /api/part/ with invalid token returns 401

## Endpoints touched via the automated sibling(s)

- [[get-api-part|GET /api/part/]]
