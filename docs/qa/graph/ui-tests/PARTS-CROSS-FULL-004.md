---
title: "UI-PARTS-CROSS-FULL-004 verify the part appears in the QA-ROOT category view"
side: ui
spec: z1-cross-flow-full-ui
file: submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts
case-ids: [PARTS-CROSS-FULL-004]
endpoints-hit: 2
tags: [qa, test, automated, ui]
generated: 2026-04-16T14:45:16.421Z
---

# UI-PARTS-CROSS-FULL-004 verify the part appears in the QA-ROOT category view

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/z1-cross-flow-full-ui.spec.ts)
- Case IDs: [[PARTS-CROSS-FULL-004]]

## Endpoints exercised

- [[get-api-part|GET /api/part/]]
- [[get-api-part-category-id|GET /api/part/category/{id}/]]

## Paired tests on the other side

- [[API-PARTS-001]] — list parts
- [[API-PARTS-020]] — retrieve a category
- [[API-PARTS-025]] — DELETE /api/part/category/{id}/ removes the child category
- [[API-PARTS-PUT-002]] — PUT /api/part/category/{id}/ replaces the category
- [[API-PARTS-THUMB-002]] — GET /api/part/thumbs/{id}/ retrieves a thumbnail by part id
- [[API-SMOKE-002]] — authed list parts returns 200 + array-ish
- [[API-SMOKE-004]] — schema validator runs against real part list
