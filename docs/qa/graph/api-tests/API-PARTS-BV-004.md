---
title: "API-PARTS-BV-004 POST /api/part/{id}/bom-copy/ copies BOM from another assembly"
side: api
spec: parts-bom-validate
file: submission/automation/api/tests/parts-bom-validate.spec.ts
case-ids: [API-PARTS-BV-004]
endpoints-hit: 4
tags: [qa, test, automated, api]
generated: 2026-04-14T13:54:30.894Z
---

# API-PARTS-BV-004 POST /api/part/{id}/bom-copy/ copies BOM from another assembly

- Side: **API**
- Spec file: `submission/automation/api/tests/parts-bom-validate.spec.ts`
- Case IDs: [[API-PARTS-BV-004]]

## Endpoints exercised

- [[delete-api-part-id|DELETE /api/part/{id}/]]
- [[patch-api-part-id|PATCH /api/part/{id}/]]
- [[post-api-part|POST /api/part/]]
- [[post-api-part-id-bom-copy|POST /api/part/{id}/bom-copy/]]

## Paired tests on the other side

- UI-ATTR-001 flip assembly flag via UI edit modal → PATCH /api/part/{id}/
- UI-ATTR-002 flip component flag via UI edit modal
- UI-ATTR-003 flip purchaseable flag via UI edit modal
- UI-ATTR-004 flip salable flag via UI edit modal
- UI-ATTR-005 flip trackable flag via UI edit modal
- UI-ATTR-006 flip testable flag via UI edit modal
- UI-ATTR-007 flip virtual flag via UI edit modal
- UI-ATTR-008 flip active flag via UI edit modal
- UI-DELETE-001 delete the UI-created part via the page action menu
- UI-PART-002 create a new part via the Add menu → Create Part modal
- UI-PART-004 edit the created part via action-menu-part-actions-edit → PATCH
- UI-PARTS-CROSS-FULL-001 create the part via Add menu → POST /api/part/
- UI-RECIPE-002 createPartViaUi → POST /api/part/ (under QA-ROOT)
- UI-RECIPE-003 editPartViaUi with a custom mutator → PATCH /api/part/{id}/
- UI-RECIPE-004 togglePartAttributeViaUi(assembly) → PATCH /api/part/{id}/
- UI-RECIPE-007 deleteInactivePartViaUi → DELETE /api/part/{id}/
