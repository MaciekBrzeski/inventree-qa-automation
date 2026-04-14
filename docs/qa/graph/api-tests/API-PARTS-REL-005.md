---
title: "API-PARTS-REL-005 DELETE /api/part/related/{id}/ removes the link"
side: api
spec: parts-related
file: submission/automation/api/tests/parts-related.spec.ts
case-ids: [API-PARTS-REL-005]
endpoints-hit: 2
tags: [qa, test, automated, api]
generated: 2026-04-14T13:54:30.896Z
---

# API-PARTS-REL-005 DELETE /api/part/related/{id}/ removes the link

- Side: **API**
- Spec file: `submission/automation/api/tests/parts-related.spec.ts`
- Case IDs: [[API-PARTS-REL-005]]

## Endpoints exercised

- [[delete-api-part-related-id|DELETE /api/part/related/{id}/]]
- [[get-api-part-related-id|GET /api/part/related/{id}/]]

## Paired tests on the other side

- UI-REL-002 delete the related-parts link via row-action-menu → DELETE /api/part/related/{id}/
- UI-REL-003 edit the related-parts note via row-action-menu Edit → PATCH /api/part/related/{id}/
