---
title: "GET /api/part/test-template/"
method: GET
path: "/api/part/test-template/"
paired: paired
tags: [qa, endpoint, inventree, get, paired]
generated: 2026-04-16T14:45:16.418Z
---

# GET /api/part/test-template/



**Coverage status**: `paired`

## UI test cases

[[UI-TAB-006]], [[UI-TT-001]], [[UI-TT-002]], [[UI-TT-003]], [[UI-TT-004]]

## API test cases

[[API-PARTS-TT-001]]

## UI spec titles (automated, captured via `page.on("request")`)

- BASELINE-004 test templates panel with one required template
- [[UI-TAB-006]] — test_templates tab → GET /api/part/test-template/
- [[UI-TT-001]] — add a test template via action-button-add-test-template → POST /api/part/test-template/
- [[UI-TT-002]] — the added template appears in the panel via GET /api/part/test-template/
- [[UI-TT-003]] — delete a test template via row-action-menu → DELETE /api/part/test-template/{id}/
- [[UI-TT-004]] — edit a test template via row-action-menu Edit → PATCH /api/part/test-template/{id}/

## API spec titles (automated, inferred from spec file scope)

- [[API-PARTS-TT-001]] — GET /api/part/test-template/ lists templates

## Links

- [[index|back to graph index]]
