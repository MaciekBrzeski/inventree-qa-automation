---
title: "POST /api/part/"
method: POST
path: "/api/part/"
paired: paired
tags: [qa, endpoint, inventree, post, paired]
generated: 2026-04-14T21:13:09.837Z
---

# POST /api/part/



**Coverage status**: `paired`

## UI test cases

[[PARTS-CROSS-FULL-001]], [[UI-PART-002]], [[UI-RECIPE-002]]

## API test cases

[[API-PARTS-002]], [[API-PARTS-052]], [[API-PARTS-053]], [[API-PARTS-BOM-001]], [[API-PARTS-BOM-002]], [[API-PARTS-BV-004]]

## UI spec titles (automated, captured via `page.on("request")`)

- [[UI-PART-002]] — create a new part via the Add menu → Create Part modal
- [[UI-PARTS-CROSS-FULL-001]] — create the part via Add menu → POST /api/part/
- [[UI-RECIPE-002]] — createPartViaUi → POST /api/part/ (under QA-ROOT)

## API spec titles (automated, inferred from spec file scope)

- [[API-PARTS-002]] — create part
- [[API-PARTS-052]] — POST /api/part/ with empty payload returns 400
- [[API-PARTS-053]] — POST /api/part/ with name only actually succeeds
- [[API-PARTS-BOM-001]] — create assembly part
- [[API-PARTS-BOM-002]] — create component part
- [[API-PARTS-BV-004]] — POST /api/part/{id}/bom-copy/ copies BOM from another assembly

## Links

- [[index|back to graph index]]
