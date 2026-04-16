---
title: "UI-INTPRICE-003 delete internal price break via row-action-menu → DELETE /api/part/internal-price/{id}/"
side: ui
spec: n-parts-internal-pricing-ui
file: submission/automation/ui/tests/n-parts-internal-pricing-ui.spec.ts
case-ids: [UI-INTPRICE-003]
endpoints-hit: 6
tags: [qa, test, automated, ui]
generated: 2026-04-16T14:45:16.420Z
---

# UI-INTPRICE-003 delete internal price break via row-action-menu → DELETE /api/part/internal-price/{id}/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/n-parts-internal-pricing-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/n-parts-internal-pricing-ui.spec.ts)
- Case IDs: [[UI-INTPRICE-003]]

## Endpoints exercised

- [[delete-api-part-internal-price-id|DELETE /api/part/internal-price/{id}/]]
- [[get-api-part-internal-price|GET /api/part/internal-price/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-pricing|GET /api/part/{id}/pricing/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-PRICE-001]] — GET /api/part/internal-price/ list returns 200
- [[API-PARTS-PRICE-005]] — DELETE /api/part/internal-price/{id}/ removes the price break
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-PUT-004]] — PUT /api/part/internal-price/{id}/ replaces an internal price break
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-READS-003]] — GET /api/part/{id}/pricing/ returns 200
