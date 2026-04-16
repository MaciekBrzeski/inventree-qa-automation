---
title: "UI-PARTS-CROSS-FULL-001 create the part via Add menu → POST /api/part/"
side: ui
spec: z1-cross-flow-full-ui
file: submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts
case-ids: [PARTS-CROSS-FULL-001]
endpoints-hit: 3
tags: [qa, test, automated, ui]
generated: 2026-04-16T14:45:16.421Z
---

# UI-PARTS-CROSS-FULL-001 create the part via Add menu → POST /api/part/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/z1-cross-flow-full-ui.spec.ts)
- Case IDs: [[PARTS-CROSS-FULL-001]]

## Endpoints exercised

- [[get-api-part|GET /api/part/]]
- [[get-api-part-category-id|GET /api/part/category/{id}/]]
- [[post-api-part|POST /api/part/]]

## Paired tests on the other side

- [[API-PARTS-001]] — list parts
- [[API-PARTS-002]] — create part
- [[API-PARTS-020]] — retrieve a category
- [[API-PARTS-025]] — DELETE /api/part/category/{id}/ removes the child category
- [[API-PARTS-053]] — POST /api/part/ with name only actually succeeds
- [[API-PARTS-BOM-001]] — create assembly part
- [[API-PARTS-BOM-002]] — create component part
- [[API-PARTS-BV-004]] — POST /api/part/{id}/bom-copy/ copies BOM from another assembly
- [[API-PARTS-PUT-002]] — PUT /api/part/category/{id}/ replaces the category
- [[API-PARTS-THUMB-002]] — GET /api/part/thumbs/{id}/ retrieves a thumbnail by part id
- [[API-SMOKE-002]] — authed list parts returns 200 + array-ish
- [[API-SMOKE-004]] — schema validator runs against real part list
