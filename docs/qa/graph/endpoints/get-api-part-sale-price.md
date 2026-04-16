---
title: "GET /api/part/sale-price/"
method: GET
path: "/api/part/sale-price/"
paired: paired
tags: [qa, endpoint, inventree, get, paired]
generated: 2026-04-16T14:45:16.417Z
---

# GET /api/part/sale-price/



**Coverage status**: `paired`

## UI test cases

[[UI-PRECALC-001]], [[UI-PRICE-001]], [[UI-PRICE-002]], [[UI-PRICE-003]], [[UI-TAB-004]]

## API test cases

[[API-PARTS-PRICE-006]]

## UI spec titles (automated, captured via `page.on("request")`)

- BASELINE-003 pricing panel with internal + sale breaks
- [[UI-PRECALC-001]] — click Refresh in pricing-actions menu → PATCH /api/part/{id}/pricing/
- [[UI-PRICE-001]] — add a sale price break via UI → POST /api/part/sale-price/
- [[UI-PRICE-002]] — edit a sale price break via row-action-menu Edit → PATCH /api/part/sale-price/{id}/
- [[UI-PRICE-003]] — delete a sale price break via row-action-menu Delete → DELETE /api/part/sale-price/{id}/
- [[UI-TAB-004]] — pricing tab → GET /api/part/{id}/pricing/

## API spec titles (automated, inferred from spec file scope)

- [[API-PARTS-PRICE-006]] — GET /api/part/sale-price/ list returns 200

## Links

- [[index|back to graph index]]
