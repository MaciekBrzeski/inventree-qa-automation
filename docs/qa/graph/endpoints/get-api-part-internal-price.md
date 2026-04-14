---
title: "GET /api/part/internal-price/"
method: GET
path: "/api/part/internal-price/"
paired: paired
tags: [qa, endpoint, inventree, get, paired]
generated: 2026-04-14T21:13:09.839Z
---

# GET /api/part/internal-price/



**Coverage status**: `paired`

## UI test cases

[[UI-INTPRICE-001]], [[UI-INTPRICE-002]], [[UI-INTPRICE-003]]

## API test cases

[[API-PARTS-PRICE-001]]

## UI spec titles (automated, captured via `page.on("request")`)

- [[UI-INTPRICE-001]] — add internal price break via UI → POST /api/part/internal-price/
- [[UI-INTPRICE-002]] — edit internal price break via row-action-menu → PATCH /api/part/internal-price/{id}/
- [[UI-INTPRICE-003]] — delete internal price break via row-action-menu → DELETE /api/part/internal-price/{id}/

## API spec titles (automated, inferred from spec file scope)

- [[API-PARTS-PRICE-001]] — GET /api/part/internal-price/ list returns 200

## Links

- [[index|back to graph index]]
