---
title: "GET /api/part/{id}/pricing/"
method: GET
path: "/api/part/{id}/pricing/"
paired: paired
tags: [qa, endpoint, inventree, get, paired]
generated: 2026-04-14T21:13:09.838Z
---

# GET /api/part/{id}/pricing/



**Coverage status**: `paired`

## UI test cases

[[UI-EXTRA-001]], [[UI-INTPRICE-001]], [[UI-INTPRICE-002]], [[UI-INTPRICE-003]], [[UI-PRECALC-001]], [[UI-PRICE-001]], [[UI-PRICE-002]], [[UI-PRICE-003]], [[UI-TAB-004]]

## API test cases

[[API-PARTS-READS-003]]

## UI spec titles (automated, captured via `page.on("request")`)

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

## API spec titles (automated, inferred from spec file scope)

- [[API-PARTS-READS-003]] — GET /api/part/{id}/pricing/ returns 200

## Links

- [[index|back to graph index]]
