---
title: "GET /api/part/related/"
method: GET
path: "/api/part/related/"
paired: paired
tags: [qa, endpoint, inventree, get, paired]
generated: 2026-04-14T15:01:44.840Z
---

# GET /api/part/related/



**Coverage status**: `paired`

## UI test cases

[[UI-EXTRA-005]], [[UI-REL-001]], [[UI-REL-002]], [[UI-REL-003]], [[UI-TAB-003]]

## API test cases

[[API-PARTS-REL-002]]

## UI spec titles (automated, captured via `page.on("request")`)

- [[UI-EXTRA-005]] — navigate to Related Parts tab → GET /api/part/related/
- [[UI-REL-001]] — create a related-parts link via action-button-add-related-part → POST /api/part/related/
- [[UI-REL-002]] — delete the related-parts link via row-action-menu → DELETE /api/part/related/{id}/
- [[UI-REL-003]] — edit the related-parts note via row-action-menu Edit → PATCH /api/part/related/{id}/
- [[UI-TAB-003]] — related parts tab → GET /api/part/related/

## API spec titles (automated, inferred from spec file scope)

- [[API-PARTS-REL-002]] — GET /api/part/related/ lists the created link

## Links

- [[index|back to graph index]]
