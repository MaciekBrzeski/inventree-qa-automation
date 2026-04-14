---
title: "UI-DELETE-002 delete the UI-created category via the page action menu"
side: ui
spec: y-parts-ui-delete
file: submission/automation/ui/tests/y-parts-ui-delete.spec.ts
case-ids: [UI-DELETE-002]
endpoints-hit: 2
tags: [qa, test, automated, ui]
generated: 2026-04-14T20:24:42.870Z
---

# UI-DELETE-002 delete the UI-created category via the page action menu

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/y-parts-ui-delete.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/y-parts-ui-delete.spec.ts)
- Case IDs: [[UI-DELETE-002]]

## Endpoints exercised

- [[delete-api-part-category-id|DELETE /api/part/category/{id}/]]
- [[get-api-part-category-id|GET /api/part/category/{id}/]]

## Paired tests on the other side

- [[API-PARTS-020]] — retrieve a category
- [[API-PARTS-025]] — DELETE /api/part/category/{id}/ removes the child category
- [[API-PARTS-051]] — GET /api/part/category/999999999/ returns 404
- [[API-PARTS-PUT-002]] — PUT /api/part/category/{id}/ replaces the category
