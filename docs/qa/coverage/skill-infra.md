---
title: "Coverage — Agent skill infrastructure"
area: skill-infra
tags: [qa, coverage, area]
generated: 2026-04-14T21:13:10.253Z
---

# Agent skill infrastructure

Not production tests — the discovery walker (`_explore.spec.ts`) and the DOM snapshot harness (`_snapshot.spec.ts`) that power the `ui-explore` and `api-ui-gap` Claude skills.

## Headline

- Endpoints in scope: **0**
- Endpoints hit by at least one automated test: **0**
- Coverage ratio: **—%**
- Automated UI tests in this area: **2**
- Automated API tests in this area: **0**
- Manual UI test cases matched: **0**
- Manual API test cases matched: **0**
- Bugs filed in this area: **0**

## Automated tests

### UI

- **_EXPLORE discovery walker** — `_explore.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`, `GET /api/part/category/`
- **_SNAPSHOT capture key InvenTree pages** — `_snapshot.spec.ts`

## Links

- [[coverage-index|Back to coverage index]]
- [[whole-process|Whole-process narrative]]
- [[graph/index|Endpoint graph]]
