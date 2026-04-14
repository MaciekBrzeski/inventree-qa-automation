---
title: "GET /api/part/"
method: GET
path: "/api/part/"
paired: paired
tags: [qa, endpoint, inventree, get, paired]
generated: 2026-04-14T21:13:09.837Z
---

# GET /api/part/



**Coverage status**: `paired`

## UI test cases

[[PARTS-CROSS-FULL-001]], [[PARTS-CROSS-FULL-004]], [[UI-BOM-002]], [[UI-BOM-007]], [[UI-PART-001]], [[UI-PART-002]], [[UI-RECIPE-002]], [[UI-REL-001]]

## API test cases

[[API-PARTS-001]], [[API-PARTS-006]], [[API-PARTS-007]], [[API-PARTS-008]], [[API-PARTS-009]], [[API-PARTS-010]], [[API-PARTS-011]], [[API-PARTS-012]], [[API-PARTS-048]], [[API-PARTS-049]], [[API-PARTS-THUMB-002]], [[API-SMOKE-002]], [[API-SMOKE-004]]

## UI spec titles (automated, captured via `page.on("request")`)

- BASELINE-006 parts list at QA-ROOT
- [[UI-BOM-002]] — add a BOM line via UI → POST /api/bom/
- [[UI-BOM-007]] — add a BOM substitute via row-action-menu Edit Substitutes → POST /api/bom/substitute/
- [[UI-PART-001]] — navigate to parts panel and open Add menu
- [[UI-PART-002]] — create a new part via the Add menu → Create Part modal
- [[UI-PARTS-CROSS-FULL-001]] — create the part via Add menu → POST /api/part/
- [[UI-PARTS-CROSS-FULL-004]] — verify the part appears in the QA-ROOT category view
- [[UI-RECIPE-002]] — createPartViaUi → POST /api/part/ (under QA-ROOT)
- [[UI-REL-001]] — create a related-parts link via action-button-add-related-part → POST /api/part/related/

## API spec titles (automated, inferred from spec file scope)

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

## Links

- [[index|back to graph index]]
