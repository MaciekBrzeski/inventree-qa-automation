---
title: "PATCH /api/part/{id}/"
method: PATCH
path: "/api/part/{id}/"
paired: paired
tags: [qa, endpoint, inventree, patch, paired]
generated: 2026-04-16T14:45:16.416Z
---

# PATCH /api/part/{id}/



**Coverage status**: `paired`

## UI test cases

[[UI-ATTR-001]], [[UI-ATTR-002]], [[UI-ATTR-003]], [[UI-ATTR-004]], [[UI-ATTR-005]], [[UI-ATTR-006]], [[UI-ATTR-007]], [[UI-ATTR-008]], [[UI-PART-004]], [[UI-RECIPE-003]], [[UI-RECIPE-004]]

## API test cases

[[API-PARTS-004]], [[API-PARTS-005]], [[API-PARTS-053]], [[API-PARTS-BV-004]]

## UI spec titles (automated, captured via `page.on("request")`)

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

## API spec titles (automated, inferred from spec file scope)

- [[API-PARTS-004]] — update part
- [[API-PARTS-005]] — delete part
- [[API-PARTS-053]] — POST /api/part/ with name only actually succeeds
- [[API-PARTS-BV-004]] — POST /api/part/{id}/bom-copy/ copies BOM from another assembly

## Links

- [[index|back to graph index]]
