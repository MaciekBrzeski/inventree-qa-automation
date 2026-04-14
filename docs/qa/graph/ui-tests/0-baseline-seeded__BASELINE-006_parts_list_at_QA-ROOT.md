---
title: "BASELINE-006 parts list at QA-ROOT"
side: ui
spec: 0-baseline-seeded
file: submission/automation/ui/tests/0-baseline-seeded.spec.ts
case-ids: []
endpoints-hit: 1
tags: [qa, test, automated, ui]
generated: 2026-04-14T20:24:42.868Z
---

# BASELINE-006 parts list at QA-ROOT

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/0-baseline-seeded.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/0-baseline-seeded.spec.ts)
- Case IDs: _(no case IDs in title)_

## Endpoints exercised

- [[get-api-part|GET /api/part/]]

## Paired tests on the other side

- [[API-PARTS-001]] — list parts
- [[API-PARTS-006]] — list with limit
- [[API-PARTS-007]] — list with offset
- [[API-PARTS-008]] — filter by category
- [[API-PARTS-009]] — filter by assembly=true returns the seeded assembly
- [[API-PARTS-010]] — search by name substring
- [[API-PARTS-011]] — ordering by name asc
- [[API-PARTS-012]] — filter by active=false returns the seeded inactive part
- [[API-PARTS-048]] — GET /api/part/ with no Authorization returns 401
- [[API-PARTS-049]] — GET /api/part/ with invalid token returns 401
- [[API-PARTS-THUMB-002]] — GET /api/part/thumbs/{id}/ retrieves a thumbnail by part id
- [[API-SMOKE-002]] — authed list parts returns 200 + array-ish
- [[API-SMOKE-004]] — schema validator runs against real part list
