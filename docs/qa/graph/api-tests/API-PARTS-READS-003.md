---
title: "API-PARTS-READS-003 GET /api/part/{id}/pricing/ returns 200"
side: api
spec: parts-reads
file: submission/automation/api/tests/parts-reads.spec.ts
case-ids: [API-PARTS-READS-003]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-16T14:45:16.423Z
---

# API-PARTS-READS-003 GET /api/part/{id}/pricing/ returns 200

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-reads.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-reads.spec.ts)
- Case IDs: [[API-PARTS-READS-003]]

## Endpoints exercised

- [[get-api-part-id-pricing|GET /api/part/{id}/pricing/]]

## Paired tests on the other side

- BASELINE-003 pricing panel with internal + sale breaks
- [[UI-EXTRA-001]] — navigate to Part Pricing tab → GET /api/part/{id}/pricing/
- [[UI-INTPRICE-001]] — add internal price break via UI → POST /api/part/internal-price/
- [[UI-INTPRICE-002]] — edit internal price break via row-action-menu → PATCH /api/part/internal-price/{id}/
- [[UI-INTPRICE-003]] — delete internal price break via row-action-menu → DELETE /api/part/internal-price/{id}/
- [[UI-PRECALC-001]] — click Refresh in pricing-actions menu → PATCH /api/part/{id}/pricing/
- [[UI-PRICE-001]] — add a sale price break via UI → POST /api/part/sale-price/
- [[UI-PRICE-002]] — edit a sale price break via row-action-menu Edit → PATCH /api/part/sale-price/{id}/
- [[UI-PRICE-003]] — delete a sale price break via row-action-menu Delete → DELETE /api/part/sale-price/{id}/
- [[UI-TAB-004]] — pricing tab → GET /api/part/{id}/pricing/
