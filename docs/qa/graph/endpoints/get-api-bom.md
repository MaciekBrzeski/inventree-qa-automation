---
title: "GET /api/bom/"
method: GET
path: "/api/bom/"
paired: paired
tags: [qa, endpoint, inventree, get, paired]
generated: 2026-04-14T13:54:30.885Z
---

# GET /api/bom/



**Coverage status**: `paired`

## UI test cases

[[UI-BOM-001]], [[UI-BOM-002]], [[UI-BOM-003]], [[UI-BOM-004]], [[UI-BOM-005]], [[UI-BOM-006]], [[UI-BOM-007]], [[UI-EXTRA-004]], [[UI-TAB-002]]

## API test cases

[[API-PARTS-BOM-004]]

## UI spec titles (automated, captured via `page.on("request")`)

- UI-BOM-001 open the BOM panel and see the Add BOM Items action menu
- UI-BOM-002 add a BOM line via UI → POST /api/bom/
- UI-BOM-003 trigger Validate BOM via UI → /api/part/{id}/bom-validate/ or /api/bom/{id}/validate/
- UI-BOM-004 bulk-delete BOM lines via Select all + action-button-delete-selected-records
- UI-BOM-005 edit a BOM row via row-action-menu Edit → PATCH /api/bom/{id}/
- UI-BOM-006 click Validate BOM Line row action → PATCH /api/bom/{id}/validate/ or /api/part/{id}/bom-validate/
- UI-BOM-007 add a BOM substitute via row-action-menu Edit Substitutes → POST /api/bom/substitute/
- UI-EXTRA-004 navigate to Part BOM tab → GET /api/bom/ via SPA
- UI-TAB-002 bom tab → GET /api/bom/

## API spec titles (automated, inferred from spec file scope)

- API-PARTS-BOM-004 list BOM lines

## Links

- [[index|back to graph index]]
