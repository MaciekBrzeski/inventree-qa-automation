---
title: "Validate a BOM line with invalid reference"
id: API-PARTS-048
side: api
priority: P3
tags: [qa, test, manual, api]
generated: 2026-04-14T13:54:30.900Z
---

# API-PARTS-048 — Validate a BOM line with invalid reference

## Preconditions

logged in as admin; assembly part `<assembly_id>` exists; BOM line `<id>` exists

## Steps

_(none)_

## Expected

_(none)_

## Tags

bom, validate

## Automated by

- `submission/automation/api/tests/parts-negative.spec.ts` — API-PARTS-048 GET /api/part/ with no Authorization returns 401

## Endpoints touched via the automated sibling(s)

- [[get-api-part|GET /api/part/]]
