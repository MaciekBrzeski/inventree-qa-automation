---
title: "API-PARTS-PRICE-011 PATCH /api/part/{id}/pricing/ triggers pricing recalc"
side: api
spec: parts-pricing
file: submission/automation/api/tests/parts-pricing.spec.ts
case-ids: [API-PARTS-PRICE-011]
endpoints-hit: 1
tags: [qa, test, automated, api]
generated: 2026-04-14T21:13:09.848Z
---

# API-PARTS-PRICE-011 PATCH /api/part/{id}/pricing/ triggers pricing recalc

- Side: **API**
- Spec file: [`submission/automation/api/tests/parts-pricing.spec.ts`](https://github.com/MaciekBrzeski/inventree-qa-automation/blob/main/automation/api/tests/parts-pricing.spec.ts)
- Case IDs: [[API-PARTS-PRICE-011]]

## Endpoints exercised

- [[patch-api-part-id-pricing|PATCH /api/part/{id}/pricing/]]

## Paired tests on the other side

- [[UI-PRECALC-001]] — click Refresh in pricing-actions menu → PATCH /api/part/{id}/pricing/
