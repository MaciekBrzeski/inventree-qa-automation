---
title: "API-PARTS-TT-001 GET /api/part/test-template/ lists templates"
side: api
spec: parts-test-template
file: submission/automation/api/tests/parts-test-template.spec.ts
case-ids: [API-PARTS-TT-001]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T13:54:30.897Z
---

# API-PARTS-TT-001 GET /api/part/test-template/ lists templates

- Side: **API**
- Spec file: `submission/automation/api/tests/parts-test-template.spec.ts`
- Case IDs: [[API-PARTS-TT-001]]

## Endpoints exercised

- [[get-api-part-test-template|GET /api/part/test-template/]]

## Paired tests on the other side

- UI-TAB-006 test_templates tab → GET /api/part/test-template/
- UI-TT-001 add a test template via action-button-add-test-template → POST /api/part/test-template/
- UI-TT-002 the added template appears in the panel via GET /api/part/test-template/
- UI-TT-003 delete a test template via row-action-menu → DELETE /api/part/test-template/{id}/
- UI-TT-004 edit a test template via row-action-menu Edit → PATCH /api/part/test-template/{id}/
