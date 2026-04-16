---
title: "UI-PRECALC-001 click Refresh in pricing-actions menu → PATCH /api/part/{id}/pricing/"
side: ui
spec: m-parts-pricing-recalc-ui
file: submission/automation/ui/tests/m-parts-pricing-recalc-ui.spec.ts
case-ids: [UI-PRECALC-001]
endpoints-hit: 6
tags: [qa, test, automated, ui]
generated: 2026-04-16T14:45:16.420Z
---

# UI-PRECALC-001 click Refresh in pricing-actions menu → PATCH /api/part/{id}/pricing/

- Side: **UI**
- Spec file: [`submission/automation/ui/tests/m-parts-pricing-recalc-ui.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/ui/tests/m-parts-pricing-recalc-ui.spec.ts)
- Case IDs: [[UI-PRECALC-001]]

## Endpoints exercised

- [[get-api-part-sale-price|GET /api/part/sale-price/]]
- [[get-api-part-id|GET /api/part/{id}/]]
- [[get-api-part-id-pricing|GET /api/part/{id}/pricing/]]
- [[get-api-part-id-requirements|GET /api/part/{id}/requirements/]]
- [[get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]
- [[patch-api-part-id-pricing|PATCH /api/part/{id}/pricing/]]

## Paired tests on the other side

- [[API-PARTS-003]] — retrieve part
- [[API-PARTS-PRICE-006]] — GET /api/part/sale-price/ list returns 200
- [[API-PARTS-PRICE-011]] — PATCH /api/part/{id}/pricing/ triggers pricing recalc
- [[API-PARTS-PUT-001]] — PUT /api/part/{id}/ replaces the part
- [[API-PARTS-READS-001]] — GET /api/part/{id}/requirements/ returns 200
- [[API-PARTS-READS-002]] — GET /api/part/{id}/serial-numbers/ returns 200
- [[API-PARTS-READS-003]] — GET /api/part/{id}/pricing/ returns 200
