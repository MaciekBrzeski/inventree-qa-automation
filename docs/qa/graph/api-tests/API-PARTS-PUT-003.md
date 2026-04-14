---
title: "API-PARTS-PUT-003 PUT /api/part/related/{id}/ replaces a related link"
side: api
spec: parts-puts
file: submission/automation/api/tests/parts-puts.spec.ts
case-ids: [API-PARTS-PUT-003]
endpoints-hit: 4
tags: [qa, test, automated, api]
generated: 2026-04-14T20:24:42.872Z
---

# API-PARTS-PUT-003 PUT /api/part/related/{id}/ replaces a related link

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-puts.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-puts.spec.ts)
- Case IDs: [[API-PARTS-PUT-003]]

## Endpoints exercised

- [[delete-api-part-related-id|DELETE /api/part/related/{id}/]]
- [[get-api-part-related-id|GET /api/part/related/{id}/]]
- [[post-api-part-related|POST /api/part/related/]]
- [[put-api-part-related-id|PUT /api/part/related/{id}/]]

## Paired tests on the other side

- [[UI-REL-001]] — create a related-parts link via action-button-add-related-part → POST /api/part/related/
- [[UI-REL-002]] — delete the related-parts link via row-action-menu → DELETE /api/part/related/{id}/
- [[UI-REL-003]] — edit the related-parts note via row-action-menu Edit → PATCH /api/part/related/{id}/
