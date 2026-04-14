---
title: "BASELINE-001 part detail header + tab bar"
side: ui
spec: 0-baseline-seeded
file: submission/automation/ui/tests/0-baseline-seeded.spec.ts
case-ids: []
endpoints-hit: 4
tags: [qa, test, automated, ui]
generated: 2026-04-14T20:24:42.867Z
---

# BASELINE-001 part detail header + tab bar

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/0-baseline-seeded.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/0-baseline-seeded.spec.ts)
- Case IDs: _(no case IDs in title)_

## Endpoints exercised

- [[get-api-part-category-id|GET /api/part/category/{id}/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-020]] — retrieve a category
- [[API-PARTS-025]] — DELETE /api/part/category/{id}/ removes the child category
- [[API-PARTS-050]] — GET /api/part/999999999/ returns 404
- [[API-PARTS-051]] — GET /api/part/category/999999999/ returns 404
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-PUT-002]] — PUT /api/part/category/{id}/ replaces the category
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
