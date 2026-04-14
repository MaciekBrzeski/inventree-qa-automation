Generate **API manual test cases** for **listing, filtering, pagination and search** on `GET /api/part/`.

Scope (ground in retrieved OpenAPI notes for `GET /api/part/` only):
- Query parameters exposed on the list endpoint: filters (category, active, assembly, component, purchaseable, salable, virtual, trackable, template, in_stock, name, IPN, search, ordering, limit, offset, etc.).
- Pagination behaviour (limit + offset).
- Text search across name/IPN/description.
- Ordering.

Next free IDs: **API-PARTS-016 through API-PARTS-030**.

Output: ONLY the markdown table, API case format. No prose.

Rules:
- One case per distinct filter/behaviour. Do not enumerate every filter as a separate case — group related ones.
- `Endpoint` column: `/api/part/` (with the query string embedded in `Payload` as `GET params: ?category=5&active=true`).
- `Method`: `GET`.
- `Expected Body`: describe expected count or shape assertions (e.g. "results contain only parts where active=true"). Use relative language — no hard-coded row counts.
- Only cite filter parameters that are listed in the retrieved OpenAPI notes. If a specific filter isn't in the context, emit `NEED_CONTEXT: filter <name>` instead.
- Priorities: P1 = category filter, search, pagination. P2 = boolean filters, ordering. P3 = edge cases (empty results, invalid params).
- Tags: `query`, `filter`, plus specific filter name.
