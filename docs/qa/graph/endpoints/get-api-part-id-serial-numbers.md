---
title: "GET /api/part/{id}/serial-numbers/"
method: GET
path: "/api/part/{id}/serial-numbers/"
paired: paired
tags: [qa, endpoint, inventree, get, paired]
generated: 2026-04-14T13:54:30.889Z
---

# GET /api/part/{id}/serial-numbers/



**Coverage status**: `paired`

## UI test cases

[[PARTS-CROSS-FULL-002]], [[PARTS-CROSS-FULL-003]], [[UI-ATTR-001]], [[UI-ATTR-002]], [[UI-ATTR-003]], [[UI-ATTR-004]], [[UI-ATTR-005]], [[UI-ATTR-006]], [[UI-ATTR-007]], [[UI-ATTR-008]], [[UI-BOM-001]], [[UI-BOM-002]], [[UI-BOM-003]], [[UI-BOM-004]], [[UI-BOM-005]], [[UI-BOM-006]], [[UI-BOM-007]], [[UI-DELETE-001]], [[UI-EXTRA-001]], [[UI-EXTRA-004]], [[UI-EXTRA-005]], [[UI-PART-004]], [[UI-PARTS-CROSS-001]], [[UI-PARTS-CROSS-002]], [[UI-PARTS-DETAIL-001]], [[UI-PARTS-DETAIL-002]], [[UI-PARTS-DETAIL-003]], [[UI-PARTS-DETAIL-004]], [[UI-PARTS-DETAIL-005]], [[UI-PRICE-001]], [[UI-PRICE-002]], [[UI-PRICE-003]], [[UI-RECIPE-003]], [[UI-RECIPE-004]], [[UI-RECIPE-007]], [[UI-REL-001]], [[UI-REL-002]], [[UI-REL-003]], [[UI-SMOKE-003]], [[UI-TAB-001]], [[UI-TAB-002]], [[UI-TAB-003]], [[UI-TAB-004]], [[UI-TAB-005]], [[UI-TAB-006]], [[UI-TAB-007]], [[UI-TAB-008]], [[UI-TAB-009]], [[UI-TAB-010]], [[UI-TT-001]], [[UI-TT-002]], [[UI-TT-003]], [[UI-TT-004]]

## API test cases

[[API-PARTS-READS-002]]

## UI spec titles (automated, captured via `page.on("request")`)

- UI-ATTR-001 flip assembly flag via UI edit modal → PATCH /api/part/{id}/
- UI-ATTR-002 flip component flag via UI edit modal
- UI-ATTR-003 flip purchaseable flag via UI edit modal
- UI-ATTR-004 flip salable flag via UI edit modal
- UI-ATTR-005 flip trackable flag via UI edit modal
- UI-ATTR-006 flip testable flag via UI edit modal
- UI-ATTR-007 flip virtual flag via UI edit modal
- UI-ATTR-008 flip active flag via UI edit modal
- UI-BOM-001 open the BOM panel and see the Add BOM Items action menu
- UI-BOM-002 add a BOM line via UI → POST /api/bom/
- UI-BOM-003 trigger Validate BOM via UI → /api/part/{id}/bom-validate/ or /api/bom/{id}/validate/
- UI-BOM-004 bulk-delete BOM lines via Select all + action-button-delete-selected-records
- UI-BOM-005 edit a BOM row via row-action-menu Edit → PATCH /api/bom/{id}/
- UI-BOM-006 click Validate BOM Line row action → PATCH /api/bom/{id}/validate/ or /api/part/{id}/bom-validate/
- UI-BOM-007 add a BOM substitute via row-action-menu Edit Substitutes → POST /api/bom/substitute/
- UI-DELETE-001 delete the UI-created part via the page action menu
- UI-EXTRA-001 navigate to Part Pricing tab → GET /api/part/{id}/pricing/
- UI-EXTRA-004 navigate to Part BOM tab → GET /api/bom/ via SPA
- UI-EXTRA-005 navigate to Related Parts tab → GET /api/part/related/
- UI-PART-004 edit the created part via action-menu-part-actions-edit → PATCH
- UI-PARTS-CROSS-001 API-seeded part renders on its detail page
- UI-PARTS-CROSS-002 action buttons on the seeded part detail are reachable
- UI-PARTS-CROSS-FULL-002 add a parameter via the Parameters tab → POST /api/part/parameter/
- UI-PARTS-CROSS-FULL-003 add stock via the Stock tab → POST /api/stock/
- UI-PARTS-DETAIL-001 detail page document title contains the part IPN
- UI-PARTS-DETAIL-002 open-in-admin action button is visible
- UI-PARTS-DETAIL-003 subscribe-to-notifications action button is visible
- UI-PARTS-DETAIL-004 barcode actions menu trigger is visible
- UI-PARTS-DETAIL-005 breadcrumb shows parts root segment
- UI-PRICE-001 add a sale price break via UI → POST /api/part/sale-price/
- UI-PRICE-002 edit a sale price break via row-action-menu Edit → PATCH /api/part/sale-price/{id}/
- UI-PRICE-003 delete a sale price break via row-action-menu Delete → DELETE /api/part/sale-price/{id}/
- UI-RECIPE-003 editPartViaUi with a custom mutator → PATCH /api/part/{id}/
- UI-RECIPE-004 togglePartAttributeViaUi(assembly) → PATCH /api/part/{id}/
- UI-RECIPE-007 deleteInactivePartViaUi → DELETE /api/part/{id}/
- UI-REL-001 create a related-parts link via action-button-add-related-part → POST /api/part/related/
- UI-REL-002 delete the related-parts link via row-action-menu → DELETE /api/part/related/{id}/
- UI-REL-003 edit the related-parts note via row-action-menu Edit → PATCH /api/part/related/{id}/
- UI-SMOKE-003 part detail by id opens and shows action buttons
- UI-TAB-001 parameters tab → some /api/part/ fetch on the current part
- UI-TAB-002 bom tab → GET /api/bom/
- UI-TAB-003 related parts tab → GET /api/part/related/
- UI-TAB-004 pricing tab → GET /api/part/{id}/pricing/
- UI-TAB-005 stock tab → GET /api/stock/ or /api/part/{id}/requirements/
- UI-TAB-006 test_templates tab → GET /api/part/test-template/
- UI-TAB-007 suppliers tab → GET /api/company/part/ or similar
- UI-TAB-008 purchase_orders tab → any /api/ fetch
- UI-TAB-009 allocations tab → any /api/ fetch
- UI-TAB-010 attachments tab → any /api/ fetch
- UI-TT-001 add a test template via action-button-add-test-template → POST /api/part/test-template/
- UI-TT-002 the added template appears in the panel via GET /api/part/test-template/
- UI-TT-003 delete a test template via row-action-menu → DELETE /api/part/test-template/{id}/
- UI-TT-004 edit a test template via row-action-menu Edit → PATCH /api/part/test-template/{id}/

## API spec titles (automated, inferred from spec file scope)

- API-PARTS-READS-002 GET /api/part/{id}/serial-numbers/ returns 200

## Links

- [[index|back to graph index]]
