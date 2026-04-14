Generate **negative API manual test cases** for the InvenTree Parts + BOM endpoints.

Scope (ground in retrieved OpenAPI notes only):
- `401 Unauthorized` — missing or invalid token.
- `403 Forbidden` — authenticated but lacking write permission (if the docs expose this).
- `404 Not Found` — unknown part id, unknown category id, unknown BOM line id.
- `400 Bad Request` — payload missing required field, invalid type, invalid enum value.
- `405 Method Not Allowed` — wrong HTTP verb on a collection vs detail path.
- Optional: `409 Conflict` on duplicate IPN if the docs state uniqueness.

Next free IDs: **API-PARTS-061 through API-PARTS-075**.

Output: ONLY the markdown table, API case format.

Rules:
- Every negative case must cite an endpoint present in the retrieved OpenAPI context.
- `Expected Body`: assert the shape of the error response if docs describe one (e.g. DRF's `{"detail": "..."}`). Otherwise leave as `—`.
- Do not invent permission semantics. If the docs do not state that DELETE requires a specific role, do not assert 403.
- Partial output allowed. For each scenario not supported by context, emit `NEED_CONTEXT: <scenario>` after the table.
- Priorities: P2 for most negative tests. P1 only for the most common (401 missing token, 404 unknown id). P3 for deep edge cases.
- Tags: `negative` + specific like `auth`, `validation`, `not-found`, `permissions`, `conflict`.
