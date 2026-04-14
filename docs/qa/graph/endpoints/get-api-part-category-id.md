---
title: "GET /api/part/category/{id}/"
method: GET
path: "/api/part/category/{id}/"
paired: paired
tags: [qa, endpoint, inventree, get, paired]
generated: 2026-04-14T13:54:30.890Z
---

# GET /api/part/category/{id}/



**Coverage status**: `paired`

## UI test cases

[[PARTS-CROSS-FULL-001]], [[PARTS-CROSS-FULL-004]], [[UI-ATTR-001]], [[UI-ATTR-002]], [[UI-ATTR-003]], [[UI-ATTR-004]], [[UI-ATTR-005]], [[UI-ATTR-006]], [[UI-ATTR-007]], [[UI-ATTR-008]], [[UI-CATEGORY-002]], [[UI-DELETE-001]], [[UI-DELETE-002]], [[UI-EXTRA-003]], [[UI-PART-001]], [[UI-PART-002]], [[UI-PART-004]], [[UI-PARTS-CROSS-001]], [[UI-PARTS-CROSS-002]], [[UI-PARTS-DETAIL-001]], [[UI-PARTS-DETAIL-002]], [[UI-PARTS-DETAIL-003]], [[UI-PARTS-DETAIL-004]], [[UI-PARTS-DETAIL-005]], [[UI-RECIPE-002]], [[UI-RECIPE-003]], [[UI-RECIPE-004]], [[UI-RECIPE-005]], [[UI-RECIPE-006]], [[UI-RECIPE-007]], [[UI-SMOKE-003]]

## API test cases

[[API-PARTS-020]], [[API-PARTS-025]], [[API-PARTS-051]], [[API-PARTS-PUT-002]]

## UI spec titles (automated, captured via `page.on("request")`)

- UI-ATTR-001 flip assembly flag via UI edit modal → PATCH /api/part/{id}/
- UI-ATTR-002 flip component flag via UI edit modal
- UI-ATTR-003 flip purchaseable flag via UI edit modal
- UI-ATTR-004 flip salable flag via UI edit modal
- UI-ATTR-005 flip trackable flag via UI edit modal
- UI-ATTR-006 flip testable flag via UI edit modal
- UI-ATTR-007 flip virtual flag via UI edit modal
- UI-ATTR-008 flip active flag via UI edit modal
- UI-CATEGORY-002 open the Add Part Category modal and submit a new category
- UI-DELETE-001 delete the UI-created part via the page action menu
- UI-DELETE-002 delete the UI-created category via the page action menu
- UI-EXTRA-003 rename the created category via UI → PATCH /api/part/category/{id}/
- UI-PART-001 navigate to parts panel and open Add menu
- UI-PART-002 create a new part via the Add menu → Create Part modal
- UI-PART-004 edit the created part via action-menu-part-actions-edit → PATCH
- UI-PARTS-CROSS-001 API-seeded part renders on its detail page
- UI-PARTS-CROSS-002 action buttons on the seeded part detail are reachable
- UI-PARTS-CROSS-FULL-001 create the part via Add menu → POST /api/part/
- UI-PARTS-CROSS-FULL-004 verify the part appears in the QA-ROOT category view
- UI-PARTS-DETAIL-001 detail page document title contains the part IPN
- UI-PARTS-DETAIL-002 open-in-admin action button is visible
- UI-PARTS-DETAIL-003 subscribe-to-notifications action button is visible
- UI-PARTS-DETAIL-004 barcode actions menu trigger is visible
- UI-PARTS-DETAIL-005 breadcrumb shows parts root segment
- UI-RECIPE-002 createPartViaUi → POST /api/part/ (under QA-ROOT)
- UI-RECIPE-003 editPartViaUi with a custom mutator → PATCH /api/part/{id}/
- UI-RECIPE-004 togglePartAttributeViaUi(assembly) → PATCH /api/part/{id}/
- UI-RECIPE-005 renameCategoryViaUi → PATCH /api/part/category/{id}/
- UI-RECIPE-006 deleteCategoryViaUi → DELETE /api/part/category/{id}/
- UI-RECIPE-007 deleteInactivePartViaUi → DELETE /api/part/{id}/
- UI-SMOKE-003 part detail by id opens and shows action buttons

## API spec titles (automated, inferred from spec file scope)

- API-PARTS-020 retrieve a category
- API-PARTS-025 DELETE /api/part/category/{id}/ removes the child category
- API-PARTS-051 GET /api/part/category/999999999/ returns 404
- API-PARTS-PUT-002 PUT /api/part/category/{id}/ replaces the category

## Links

- [[index|back to graph index]]
