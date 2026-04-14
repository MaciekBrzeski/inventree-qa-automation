Generate **API manual test cases** for the InvenTree Parts **CRUD** endpoints.

Scope (ground in retrieved OpenAPI notes only):
- `GET /api/part/` — list parts.
- `POST /api/part/` — create part.
- `GET /api/part/{id}/` — retrieve part.
- `PATCH /api/part/{id}/` — update part.
- `DELETE /api/part/{id}/` — delete part.

Next free IDs: **API-PARTS-001 through API-PARTS-015**.

Output: ONLY a markdown table, starting with the header row from `system-instructions.md` API format:

```
| ID | Endpoint | Method | Title | Preconditions | Payload | Expected Status | Expected Body | Priority | Tags |
```

Rules:
- Every row must cite an endpoint that exists in the retrieved OpenAPI context. If you need a field that isn't in the context, emit `NEED_CONTEXT: <field>` after the table and skip that case.
- `Payload`: inline JSON or `—`. Keep small. Use placeholders like `<existing_category_id>` when a real value isn't known.
- `Expected Status`: exact numeric code.
- `Expected Body`: key assertions only. Use `<br>` to separate multiple. `—` if not applicable.
- Priorities: P1 = happy-path create/get/list/update/delete. P2 = optional fields, partial update. P3 = edge cases.
- Tags: include `crud` plus method-specific like `list`, `create`, `update`, `delete`.
- Authentication: assume every case uses Token auth. Do not repeat it in Preconditions unless it matters for the assertion.
- Partial output is allowed and encouraged. Produce every case you can ground.
