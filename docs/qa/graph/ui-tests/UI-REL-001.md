---
title: "UI-REL-001 create a related-parts link via action-button-add-related-part → POST /api/part/related/"
side: ui
spec: j-parts-related-ui
file: submission/automation/ui/tests/j-parts-related-ui.spec.ts
case-ids: [UI-REL-001]
endpoints-hit: 6
tags: [qa, test, automated, ui]
generated: 2026-04-14T15:01:44.843Z
---

# UI-REL-001 create a related-parts link via action-button-add-related-part → POST /api/part/related/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/j-parts-related-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/j-parts-related-ui.spec.ts)
- Case IDs: [[UI-REL-001]]

## Endpoints exercised

- [[get-api-part|GET /api/part/]]
- [[get-api-part-related|GET /api/part/related/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]
- [[post-api-part-related|POST /api/part/related/]]

## Paired tests on the other side

- [[API-PARTS-001]] — list parts
- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-006]] — list with limit
- [[API-PARTS-007]] — list with offset
- [[API-PARTS-008]] — filter by category
- [[API-PARTS-009]] — filter by assembly=true returns the seeded assembly
- [[API-PARTS-010]] — search by name substring
- [[API-PARTS-011]] — ordering by name asc
- [[API-PARTS-012]] — filter by active=false returns the seeded inactive part
- [[API-PARTS-048]] — GET /api/part/ with no Authorization returns 401
- [[API-PARTS-049]] — GET /api/part/ with invalid token returns 401
- [[API-PARTS-050]] — GET /api/part/999999999/ returns 404
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-PUT-003]] — PUT /api/part/related/{id}/ replaces a related link
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-REL-001]] — POST /api/part/related/ creates a related link
- [[API-PARTS-REL-002]] — GET /api/part/related/ lists the created link
- [[API-PARTS-THUMB-002]] — GET /api/part/thumbs/{id}/ retrieves a thumbnail by part id
- [[API-SMOKE-002]] — authed list parts returns 200 + array-ish
- [[API-SMOKE-004]] — schema validator runs against real part list
