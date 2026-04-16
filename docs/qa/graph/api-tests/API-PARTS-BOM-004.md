---
title: "API-PARTS-BOM-004 list BOM lines"
side: api
spec: parts-bom
file: submission/automation/api/tests/parts-bom.spec.ts
case-ids: [API-PARTS-BOM-004]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-16T14:45:16.422Z
---

# API-PARTS-BOM-004 list BOM lines

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-bom.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-bom.spec.ts)
- Case IDs: [[API-PARTS-BOM-004]]

## Endpoints exercised

- [[get-api-bom|GET /api/bom/]]

## Paired tests on the other side

- BASELINE-002 BOM panel with one populated row
- [[UI-BOM-001]] — open the BOM panel and see the Add BOM Items action menu
- [[UI-BOM-002]] — add a BOM line via UI → POST /api/bom/
- [[UI-BOM-003]] — trigger Validate BOM via UI → /api/part/{id}/bom-validate/ or /api/bom/{id}/validate/
- [[UI-BOM-004]] — bulk-delete BOM lines via Select all + action-button-delete-selected-records
- [[UI-BOM-005]] — edit a BOM row via row-action-menu Edit → PATCH /api/bom/{id}/
- [[UI-BOM-006]] — click Validate BOM Line row action → PATCH /api/bom/{id}/validate/ or /api/part/{id}/bom-validate/
- [[UI-BOM-007]] — add a BOM substitute via row-action-menu Edit Substitutes → POST /api/bom/substitute/
- [[UI-BOM-DEL-001]] — delete a single BOM row via row-action-menu → DELETE /api/bom/{id}/
- [[UI-EXTRA-004]] — navigate to Part BOM tab → GET /api/bom/ via SPA
- [[UI-SUBSTITUTE-001]] — delete an existing BOM substitute via Edit Substitutes dialog → DELETE /api/bom/substitute/{id}/
- [[UI-TAB-002]] — bom tab → GET /api/bom/
