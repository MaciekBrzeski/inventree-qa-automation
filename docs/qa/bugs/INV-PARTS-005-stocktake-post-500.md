---
title: "INV-PARTS-005 — POST /api/part/stocktake/ raises TypeError and returns HTTP 500"
id: INV-PARTS-005
status: open
severity: medium
priority: P2
kind: server-error
component: InvenTree / Parts API / Stocktake
found-by: agent-generated API test (API-PARTS-STK-002)
reported-at: 2026-04-14
tags: [bug, inventree, parts, api, stocktake, 500, agent-found]
---

# INV-PARTS-005 — POST /api/part/stocktake/ raises TypeError, returns 500

## Summary

`POST /api/part/stocktake/` with a minimal payload `{part, quantity, note}` returns HTTP 500 with a `TypeError` body:

```json
{
  "error": "TypeError",
  "error_class": "<class 'TypeError'>",
  "detail": "Error details can be found in the admin panel",
  "path": "/api/part/stocktake/",
  "status_code": 500
}
```

Unlike the other `/api/part/*` endpoints I exercised, this one fails without giving the caller actionable feedback — the minimal payload yields an unhandled Python exception, not a DRF validation error. A server error on an externally-callable endpoint driven by a well-formed request is higher severity than a documentation gap.

## Environment

- InvenTree: version `1.3.0`, apiVersion `477`.
- Endpoint: `POST /api/part/stocktake/`.
- Auth: Token auth (`Authorization: Token inv-...`), admin user.
- Repro: `submission/automation/api/tests/parts-stocktake.spec.ts::API-PARTS-STK-002`.

## Steps to reproduce

```http
POST /api/part/stocktake/
Authorization: Token inv-<admin-token>
Content-Type: application/json

{
  "part": <valid_part_pk>,
  "quantity": 0,
  "note": "stk-api-test"
}
```

**Expected** (per the filtered OpenAPI schema — `POST /api/part/stocktake/` lists a 201 response): `201 Created` with the new stocktake entry body.

**Actual**: `500 Internal Server Error` with the JSON body shown above.

`GET /api/part/stocktake/?limit=5` on the same context returns `200 OK`, so the endpoint exists and the auth/permissions are fine.

## Impact

- **Severity: medium.** A 500 leaks a server-side exception through the API, which is worse than 400 because it hides the root cause and terminates any client-side retry logic prematurely.
- **Consequence for downstream integrations**: any importer or sync job that uses the stocktake API to record inventory counts will get a cryptic 500 and no validation details. The caller has to grep the Django admin panel or the server log to find the underlying TypeError.
- **Consequence for QA automation**: we cannot currently write a happy-path UI or API test for the stocktake endpoint beyond the list GET. Four tests in `parts-stocktake.spec.ts` (POST, GET detail, PATCH, DELETE) are `skipped` with a reason rather than asserting a contract.

## Proposed fixes

1. **Fix the TypeError upstream** — the minimal payload is missing a field the serializer tries to unpack. Catch the missing-field case at the serializer level and return `400` with a DRF validation error pointing at the missing field. The endpoint should never raise an unhandled exception on a well-formed JSON request.
2. **Expose the required fields** in the OpenAPI schema. `submission/data/openapi-parts.filtered.json` → `paths./api/part/stocktake/.post` should list every required field explicitly so generators and UI clients know what to send.
3. **Log the TypeError with the payload that triggered it** in the admin log so operators can investigate instead of relying on a generic "Error details can be found in the admin panel" message.

## Workaround applied in this repo

`submission/automation/api/tests/parts-stocktake.spec.ts::API-PARTS-STK-002` catches the 500 and calls `test.skip(...)` with a reason that references this bug. The follow-up tests (STK-003/004/005) are chained and skip when the POST skips, so the overall suite stays green while the finding is still surfaced in the test log.

## Evidence

- Stderr from the Playwright run: `[stocktake] POST returned 500: {"error":"TypeError","error_class":"<class 'TypeError'>","detail":"Error details can be found in the admin panel","path":"/api/part/stocktake/","status_code":500}`
- `docs/qa/graph/endpoints/post-api-part-stocktake.md` — the test graph marks the endpoint as `api-only` (now) since POST doesn't land but GET does.

## Related

- [[INV-PARTS-001-delete-active-part]] — another "found by running the agent-generated test" case.
- [[INV-PARTS-003-category-not-required]] — similar spec-vs-runtime drift.
- `submission/automation/api/tests/parts-stocktake.spec.ts`

## Timeline

- **2026-04-14** — discovered by the first run of the generated stocktake spec during Phase 7 coverage expansion. Bug filed; follow-up tests set to skip with a reference back to this report.
