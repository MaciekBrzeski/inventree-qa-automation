---
title: "API-PARTS-054 PATCH /api/part/999999999/ returns 404"
side: api
spec: parts-negative
file: submission/automation/api/tests/parts-negative.spec.ts
case-ids: [API-PARTS-054]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T13:54:30.895Z
---

# API-PARTS-054 PATCH /api/part/999999999/ returns 404

- Side: **API**
- Spec file: `submission/automation/api/tests/parts-negative.spec.ts`
- Case IDs: [[API-PARTS-054]]

## Endpoints exercised

- [[patch-api-part-id|PATCH /api/part/{id}/]]

## Paired tests on the other side

- UI-ATTR-001 flip assembly flag via UI edit modal → PATCH /api/part/{id}/
- UI-ATTR-002 flip component flag via UI edit modal
- UI-ATTR-003 flip purchaseable flag via UI edit modal
- UI-ATTR-004 flip salable flag via UI edit modal
- UI-ATTR-005 flip trackable flag via UI edit modal
- UI-ATTR-006 flip testable flag via UI edit modal
- UI-ATTR-007 flip virtual flag via UI edit modal
- UI-ATTR-008 flip active flag via UI edit modal
- UI-PART-004 edit the created part via action-menu-part-actions-edit → PATCH
- UI-RECIPE-003 editPartViaUi with a custom mutator → PATCH /api/part/{id}/
- UI-RECIPE-004 togglePartAttributeViaUi(assembly) → PATCH /api/part/{id}/
