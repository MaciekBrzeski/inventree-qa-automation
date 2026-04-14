---
title: "API-PARTS-THUMB-002 GET /api/part/thumbs/{id}/ retrieves a thumbnail by part id"
side: api
spec: parts-thumbs
file: submission/automation/api/tests/parts-thumbs.spec.ts
case-ids: [API-PARTS-THUMB-002]
endpoints-hit: 2
tags: [qa, test, automated, api]
generated: 2026-04-14T21:13:09.849Z
---

# API-PARTS-THUMB-002 GET /api/part/thumbs/{id}/ retrieves a thumbnail by part id

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-thumbs.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-thumbs.spec.ts)
- Case IDs: [[API-PARTS-THUMB-002]]

## Endpoints exercised

- [[get-api-part|GET /api/part/]]
- [[get-api-part-thumbs-id|GET /api/part/thumbs/{id}/]]

## Paired tests on the other side

- BASELINE-006 parts list at QA-ROOT
- [[UI-BOM-002]] — add a BOM line via UI → POST /api/bom/
- [[UI-BOM-007]] — add a BOM substitute via row-action-menu Edit Substitutes → POST /api/bom/substitute/
- [[UI-PART-001]] — navigate to parts panel and open Add menu
- [[UI-PART-002]] — create a new part via the Add menu → Create Part modal
- [[UI-PARTS-CROSS-FULL-001]] — create the part via Add menu → POST /api/part/
- [[UI-PARTS-CROSS-FULL-004]] — verify the part appears in the QA-ROOT category view
- [[UI-RECIPE-002]] — createPartViaUi → POST /api/part/ (under QA-ROOT)
- [[UI-REL-001]] — create a related-parts link via action-button-add-related-part → POST /api/part/related/
