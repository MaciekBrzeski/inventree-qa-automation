---
title: "DELETE /api/part/{id}/"
method: DELETE
path: "/api/part/{id}/"
paired: paired
tags: [qa, endpoint, inventree, delete, paired]
generated: 2026-04-14T15:01:44.839Z
---

# DELETE /api/part/{id}/



**Coverage status**: `paired`

## UI test cases

[[UI-DELETE-001]], [[UI-RECIPE-007]]

## API test cases

[[API-PARTS-005]], [[API-PARTS-053]], [[API-PARTS-055]], [[API-PARTS-BV-004]]

## UI spec titles (automated, captured via `page.on("request")`)

- [[UI-DELETE-001]] — delete the UI-created part via the page action menu
- [[UI-RECIPE-007]] — deleteInactivePartViaUi → DELETE /api/part/{id}/

## API spec titles (automated, inferred from spec file scope)

- [[API-PARTS-005]] — delete part
- [[API-PARTS-053]] — POST /api/part/ with name only actually succeeds
- [[API-PARTS-055]] — DELETE /api/part/999999999/ returns 404
- [[API-PARTS-BV-004]] — POST /api/part/{id}/bom-copy/ copies BOM from another assembly

## Links

- [[index|back to graph index]]
