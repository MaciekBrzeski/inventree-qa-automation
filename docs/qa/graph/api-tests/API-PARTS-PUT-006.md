---
title: "API-PARTS-PUT-006 PUT /api/part/test-template/{id}/ replaces a test template"
side: api
spec: parts-puts
file: submission/automation/api/tests/parts-puts.spec.ts
case-ids: [API-PARTS-PUT-006]
endpoints-hit: 4
tags: [qa, test, automated, api]
generated: 2026-04-16T14:45:16.423Z
---

# API-PARTS-PUT-006 PUT /api/part/test-template/{id}/ replaces a test template

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-puts.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-puts.spec.ts)
- Case IDs: [[API-PARTS-PUT-006]]

## Endpoints exercised

- [[delete-api-part-test-template-id|DELETE /api/part/test-template/{id}/]]
- [[get-api-part-test-template-id|GET /api/part/test-template/{id}/]]
- [[post-api-part-test-template|POST /api/part/test-template/]]
- [[put-api-part-test-template-id|PUT /api/part/test-template/{id}/]]

## Paired tests on the other side

- [[UI-TT-001]] — add a test template via action-button-add-test-template → POST /api/part/test-template/
- [[UI-TT-003]] — delete a test template via row-action-menu → DELETE /api/part/test-template/{id}/
- [[UI-TT-004]] — edit a test template via row-action-menu Edit → PATCH /api/part/test-template/{id}/
