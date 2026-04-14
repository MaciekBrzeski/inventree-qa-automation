---
title: "API-PARTS-004 update part"
side: api
spec: parts-crud
file: submission/automation/api/tests/parts-crud.spec.ts
case-ids: [API-PARTS-004]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T15:01:44.844Z
---

# API-PARTS-004 update part

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-crud.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-crud.spec.ts)
- Case IDs: [[API-PARTS-004]]

## Endpoints exercised

- [[patch-api-part-id|PATCH /api/part/{id}/]]

## Paired tests on the other side

- [[UI-ATTR-001]] — flip assembly flag via UI edit modal → PATCH /api/part/{id}/
- [[UI-ATTR-002]] — flip component flag via UI edit modal
- [[UI-ATTR-003]] — flip purchaseable flag via UI edit modal
- [[UI-ATTR-004]] — flip salable flag via UI edit modal
- [[UI-ATTR-005]] — flip trackable flag via UI edit modal
- [[UI-ATTR-006]] — flip testable flag via UI edit modal
- [[UI-ATTR-007]] — flip virtual flag via UI edit modal
- [[UI-ATTR-008]] — flip active flag via UI edit modal
- [[UI-PART-004]] — edit the created part via action-menu-part-actions-edit → PATCH
- [[UI-RECIPE-003]] — editPartViaUi with a custom mutator → PATCH /api/part/{id}/
- [[UI-RECIPE-004]] — togglePartAttributeViaUi(assembly) → PATCH /api/part/{id}/
