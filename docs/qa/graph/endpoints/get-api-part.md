---
title: "GET /api/part/"
method: GET
path: "/api/part/"
paired: paired
tags: [qa, endpoint, inventree, get, paired]
generated: 2026-04-16T14:45:16.416Z
---

# GET /api/part/



**Coverage status**: `paired`

## UI test cases

[[PARTS-CROSS-FULL-001]], [[PARTS-CROSS-FULL-004]], [[UI-BOM-002]], [[UI-BOM-007]], [[UI-PART-001]], [[UI-PART-002]], [[UI-RECIPE-002]], [[UI-REL-001]]

## API test cases

[[API-PARTS-001]], [[API-PARTS-THUMB-002]], [[API-SMOKE-002]], [[API-SMOKE-004]]

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
- [[API-PARTS-THUMB-002]] — GET /api/part/thumbs/{id}/ retrieves a thumbnail by part id
- [[API-SMOKE-002]] — authed list parts returns 200 + array-ish
- [[API-SMOKE-004]] — schema validator runs against real part list

## Links

- [[index|back to graph index]]
