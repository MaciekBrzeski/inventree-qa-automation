---
title: "Coverage — Cross-functional flow (PDF centrepiece)"
area: cross-flow
tags: [qa, coverage, area]
generated: 2026-04-14T21:13:10.253Z
---

# Cross-functional flow (PDF centrepiece)

End-to-end flow that ties together creation, parameters, stock, and category views — the single required test per the hackathon PDF. Currently covered by API-seed + UI verify; a full click-chain version is on the expansion backlog.

## Headline

- Endpoints in scope: **0**
- Endpoints hit by at least one automated test: **0**
- Coverage ratio: **—%**
- Automated UI tests in this area: **3**
- Automated API tests in this area: **0**
- Manual UI test cases matched: **0**
- Manual API test cases matched: **0**
- Bugs filed in this area: **0**

## Automated tests

### UI

- **UI-PARTS-CROSS-001 API-seeded part renders on its detail page** `UI-PARTS-CROSS-001` — `cross-flow.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`
- **UI-PARTS-CROSS-002 action buttons on the seeded part detail are reachable** `UI-PARTS-CROSS-002` — `cross-flow.spec.ts` → `GET /api/part/{id}/serial-numbers/`, `GET /api/part/{id}/`, `GET /api/part/{id}/requirements/`, `GET /api/part/category/{id}/`
- **UI-PARTS-CROSS-003 navigation to Parts list shows the web shell** `UI-PARTS-CROSS-003` — `cross-flow.spec.ts`

## Links

- [[coverage-index|Back to coverage index]]
- [[whole-process|Whole-process narrative]]
- [[graph/index|Endpoint graph]]
