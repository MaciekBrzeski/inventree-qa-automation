---
title: "API-PARTS-025 DELETE /api/part/category/{id}/ removes the child category"
side: api
spec: parts-category
file: submission/automation/api/tests/parts-category.spec.ts
case-ids: [API-PARTS-025]
endpoints-hit: 2
tags: [qa, test, automated, api]
generated: 2026-04-14T13:54:30.895Z
---

# API-PARTS-025 DELETE /api/part/category/{id}/ removes the child category

- Side: **API**
- Spec file: `submission/automation/api/tests/parts-category.spec.ts`
- Case IDs: [[API-PARTS-025]]

## Endpoints exercised

- [[delete-api-part-category-id|DELETE /api/part/category/{id}/]]
- [[get-api-part-category-id|GET /api/part/category/{id}/]]

## Paired tests on the other side

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
