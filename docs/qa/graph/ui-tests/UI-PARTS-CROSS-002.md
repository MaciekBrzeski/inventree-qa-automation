---
title: "UI-PARTS-CROSS-002 action buttons on the seeded part detail are reachable"
side: ui
spec: cross-flow
file: submission/automation/ui/tests/cross-flow.spec.ts
case-ids: [UI-PARTS-CROSS-002]
endpoints-hit: 4
tags: [qa, test, automated, ui]
generated: 2026-04-14T13:54:30.892Z
---

# UI-PARTS-CROSS-002 action buttons on the seeded part detail are reachable

- Side: **UI**
- Spec file: `submission/automation/ui/tests/cross-flow.spec.ts`
- Case IDs: [[UI-PARTS-CROSS-002]]

## Endpoints exercised

- [[get-api-part-category-id|GET /api/part/category/{id}/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]

## Paired tests on the other side

- API-PARTS-003 retrieve part
- API-PARTS-020 retrieve a category
- API-PARTS-025 DELETE /api/part/category/{id}/ removes the child category
- API-PARTS-050 GET /api/part/999999999/ returns 404
- API-PARTS-051 GET /api/part/category/999999999/ returns 404
- API-PARTS-PUT-001 PUT /api/part/{id}/ replaces the part
- API-PARTS-PUT-002 PUT /api/part/category/{id}/ replaces the category
- API-PARTS-READS-001 GET /api/part/{id}/requirements/ returns 200
- API-PARTS-READS-002 GET /api/part/{id}/serial-numbers/ returns 200
