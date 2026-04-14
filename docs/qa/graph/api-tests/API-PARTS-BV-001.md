---
title: "API-PARTS-BV-001 GET /api/part/{id}/bom-validate/ returns 200 for assembly"
side: api
spec: parts-bom-validate
file: submission/automation/api/tests/parts-bom-validate.spec.ts
case-ids: [API-PARTS-BV-001]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T13:54:30.894Z
---

# API-PARTS-BV-001 GET /api/part/{id}/bom-validate/ returns 200 for assembly

- Side: **API**
- Spec file: `submission/automation/api/tests/parts-bom-validate.spec.ts`
- Case IDs: [[API-PARTS-BV-001]]

## Endpoints exercised

- [[get-api-part-id-bom-validate|GET /api/part/{id}/bom-validate/]]

## Paired tests on the other side

- UI-BOM-001 open the BOM panel and see the Add BOM Items action menu
- UI-BOM-002 add a BOM line via UI → POST /api/bom/
- UI-BOM-003 trigger Validate BOM via UI → /api/part/{id}/bom-validate/ or /api/bom/{id}/validate/
- UI-BOM-004 bulk-delete BOM lines via Select all + action-button-delete-selected-records
- UI-BOM-005 edit a BOM row via row-action-menu Edit → PATCH /api/bom/{id}/
- UI-BOM-006 click Validate BOM Line row action → PATCH /api/bom/{id}/validate/ or /api/part/{id}/bom-validate/
- UI-BOM-007 add a BOM substitute via row-action-menu Edit Substitutes → POST /api/bom/substitute/
- UI-EXTRA-004 navigate to Part BOM tab → GET /api/bom/ via SPA
- UI-TAB-002 bom tab → GET /api/bom/
