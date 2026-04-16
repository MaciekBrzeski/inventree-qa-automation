---
title: "API-PARTS-REL-002 GET /api/part/related/ lists the created link"
side: api
spec: parts-related
file: submission/automation/api/tests/parts-related.spec.ts
case-ids: [API-PARTS-REL-002]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-16T14:45:16.423Z
---

# API-PARTS-REL-002 GET /api/part/related/ lists the created link

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-related.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-related.spec.ts)
- Case IDs: [[API-PARTS-REL-002]]

## Endpoints exercised

- [[get-api-part-related|GET /api/part/related/]]

## Paired tests on the other side

- BASELINE-005 related parts panel with one linked row
- [[UI-EXTRA-005]] — navigate to Related Parts tab → GET /api/part/related/
- [[UI-REL-001]] — create a related-parts link via action-button-add-related-part → POST /api/part/related/
- [[UI-REL-002]] — delete the related-parts link via row-action-menu → DELETE /api/part/related/{id}/
- [[UI-REL-003]] — edit the related-parts note via row-action-menu Edit → PATCH /api/part/related/{id}/
- [[UI-TAB-003]] — related parts tab → GET /api/part/related/
