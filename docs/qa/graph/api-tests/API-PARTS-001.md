---
title: "API-PARTS-001 list parts"
side: api
spec: parts-crud
file: submission/automation/api/tests/parts-crud.spec.ts
case-ids: [API-PARTS-001]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T20:24:42.871Z
---

# API-PARTS-001 list parts

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-crud.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-crud.spec.ts)
- Case IDs: [[API-PARTS-001]]

## Endpoints exercised

- [[get-api-part|GET /api/part/]]

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
