---
title: "UI-EXTRA-003 rename the created category via UI → PATCH /api/part/category/{id}/"
side: ui
spec: d-parts-extra-ui
file: submission/automation/ui/tests/d-parts-extra-ui.spec.ts
case-ids: [UI-EXTRA-003]
endpoints-hit: 2
tags: [qa, test, automated, ui]
generated: 2026-04-16T14:45:16.419Z
---

# UI-EXTRA-003 rename the created category via UI → PATCH /api/part/category/{id}/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/d-parts-extra-ui.spec.ts)
- Case IDs: [[UI-EXTRA-003]]

## Endpoints exercised

- [[get-api-part-category-id|GET /api/part/category/{id}/]]
- [[patch-api-part-category-id|PATCH /api/part/category/{id}/]]

## Paired tests on the other side

- [[API-PARTS-020]] — retrieve a category
- [[API-PARTS-021]] — rename a category via PATCH
- [[API-PARTS-025]] — DELETE /api/part/category/{id}/ removes the child category
- [[API-PARTS-PUT-002]] — PUT /api/part/category/{id}/ replaces the category
