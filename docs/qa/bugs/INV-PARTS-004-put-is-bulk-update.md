---
title: "INV-PARTS-004 — PUT /api/part/ is an undocumented bulk-update endpoint"
id: INV-PARTS-004
status: open
severity: low
priority: P3
kind: documentation-gap
component: InvenTree / Parts API
found-by: agent-generated negative test (API-PARTS-057)
reported-at: 2026-04-13
tags: [bug, inventree, parts, api, put, bulk, documentation, agent-found]
---

# INV-PARTS-004 — PUT /api/part/ is an undocumented bulk-update endpoint

## Summary

A reasonable assumption, and the one made by our generated manual test case `API-PARTS-057`, is that `PUT /api/part/` (on the collection, not a specific id) is either undefined or returns `405 Method Not Allowed` / `404 Not Found`. DRF's default ViewSet convention is to expose PUT only on detail paths.

In reality, InvenTree exposes `PUT /api/part/` as a **bulk-update endpoint**. Sending a non-list body such as `{}` returns:

```
HTTP/1.1 400 Bad Request
Content-Type: application/json

{"non_field_errors":"List of items must be provided for bulk operation"}
```

…which confirms the endpoint exists and expects a JSON array. This behaviour is not mentioned in the `openapi-parts.filtered.json` snapshot we pulled from `/api/schema/?format=json`, nor in the scraped docs at `docs.inventree.org/en/stable/part/`.

## Environment

- InvenTree: version `1.3.0`, apiVersion `477`.
- Endpoint: `PUT /api/part/`.
- Auth: Token auth, admin user.

## Steps to reproduce

```http
PUT /api/part/
Authorization: Token inv-<admin-token>
Content-Type: application/json

{}
```

Expected (our original assumption): `404` or `405`.

Actual: `400` with `{"non_field_errors":"List of items must be provided for bulk operation"}`.

To confirm the endpoint exists at all, retry with a list — expected: `200` with updated parts (not verified here; the bulk-update contract is undocumented).

## Impact

- **Severity: low.** The endpoint works for its intended purpose; the bug is a missing public contract.
- **Consequence for API consumers**: clients looking at the OpenAPI spec (either via the schema endpoint or via `docs.inventree.org`) cannot discover this endpoint. They will either not use it (missing a useful feature) or use it through trial and error, without knowing the exact payload shape.
- **Consequence for negative testing**: automated tests that try `PUT /foo/` to prove "not allowed" will get a confusing 400 instead, and may silently assert the wrong error code.
- **Consequence for security review**: a bulk-update endpoint on a high-value resource deserves explicit documentation so reviewers can check authz semantics (is every id in the submitted list individually authorised? rate-limited? what happens on partial failure?).

## Proposed fixes (in order of preference)

1. **Best**: document the bulk-update endpoint in the OpenAPI schema. DRF's `drf-spectacular` can surface custom actions via `@extend_schema(methods=["PUT"], request=..., responses=...)` on the ViewSet.
2. Add a corresponding section to `docs.inventree.org/en/stable/part/` describing the payload shape, required fields per item, permission requirements, and partial-failure behaviour.
3. If the bulk endpoint was not meant to be public, route it under an explicit path like `POST /api/part/bulk-update/` and return `405` on `PUT /api/part/`.

## Workaround applied in this repo

`submission/automation/api/tests/parts-negative.spec.ts::API-PARTS-057` now asserts the real behaviour: status `400` and a `non_field_errors` body that contains the word `bulk`. The title documents the surprise: "PUT /api/part/ on collection expects a bulk list and returns 400".

We have **not** written a positive-path test exercising a real bulk PUT payload — that is a separate follow-up once the contract is known.

## Evidence

- `curl -X PUT http://inventree.localhost/api/part/ -H "Authorization: Token inv-..." -d '{}'` → HTTP 400, body `{"non_field_errors":"List of items must be provided for bulk operation"}`. Reproduced in the Phase 2 transcript.
- `submission/automation/api/tests/parts-negative.spec.ts:91` — the automated assertion.

## Related

- [[INV-PARTS-002-openapi-required-drift]] — same class of OpenAPI-vs-runtime mismatch.
- [[INV-PARTS-003-category-not-required]] — another case of the spec under-describing real behaviour.
- `submission/data/openapi-parts.filtered.json` — the schema snapshot that does not include the PUT action on the collection.

## Timeline

- **2026-04-13** — discovered when the agent-generated test first ran and expected 404/405. Test rewritten to pin the real 400+bulk behaviour, bug filed.
