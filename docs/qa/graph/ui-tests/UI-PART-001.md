---
title: "UI-PART-001 navigate to parts panel and open Add menu"
side: ui
spec: b-parts-create
file: submission/automation/ui/tests/b-parts-create.spec.ts
case-ids: [UI-PART-001]
endpoints-hit: 2
tags: [qa, test, automated, ui]
generated: 2026-04-14T21:13:09.842Z
---

# UI-PART-001 navigate to parts panel and open Add menu

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/b-parts-create.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/b-parts-create.spec.ts)
- Case IDs: [[UI-PART-001]]

## Endpoints exercised

- [[get-api-part|GET /api/part/]]
- [[get-api-part-category-id|GET /api/part/category/{id}/]]

## Paired tests on the other side

- [[API-PARTS-001]] — list parts
- [[API-PARTS-006]] — list with limit
- [[API-PARTS-007]] — list with offset
- [[API-PARTS-008]] — filter by category
- [[API-PARTS-009]] — filter by assembly=true returns the seeded assembly
- [[API-PARTS-010]] — search by name substring
- [[API-PARTS-011]] — ordering by name asc
- [[API-PARTS-012]] — filter by active=false returns the seeded inactive part
- [[API-PARTS-020]] — retrieve a category
- [[API-PARTS-025]] — DELETE /api/part/category/{id}/ removes the child category
- [[API-PARTS-048]] — GET /api/part/ with no Authorization returns 401
- [[API-PARTS-049]] — GET /api/part/ with invalid token returns 401
- [[API-PARTS-051]] — GET /api/part/category/999999999/ returns 404
- [[API-PARTS-PUT-002]] — PUT /api/part/category/{id}/ replaces the category
- [[API-PARTS-THUMB-002]] — GET /api/part/thumbs/{id}/ retrieves a thumbnail by part id
- [[API-SMOKE-002]] — authed list parts returns 200 + array-ish
- [[API-SMOKE-004]] — schema validator runs against real part list
