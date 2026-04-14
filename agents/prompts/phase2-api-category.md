Generate **API manual test cases** for the Part Category endpoints.

Scope (ground in retrieved OpenAPI notes only):
- `GET /api/part/category/` — list categories.
- `POST /api/part/category/` — create category.
- `GET /api/part/category/{id}/` — retrieve category.
- `PATCH /api/part/category/{id}/` — update category (rename, reparent).
- `DELETE /api/part/category/{id}/` — delete category.
- `GET /api/part/category/tree/` — tree endpoint, if in context.
- `GET /api/part/category/parameters/` — category parameter templates, if in context.

Next free IDs: **API-PARTS-031 through API-PARTS-045**.

Output: ONLY the markdown table, API case format.

Rules:
- Happy path first: create category, retrieve, update (rename + reparent), delete.
- Hierarchy: creating a child under an existing parent; moving a category to a different parent.
- Tree endpoint: fetching the tree; asserting structure contains both parent and child.
- Validation: missing name, duplicate name at the same level (if docs state uniqueness), invalid parent ID.
- Cascade or protect on delete — only assert behaviour that is in the retrieved docs. If unclear, emit `NEED_CONTEXT: delete cascade behaviour`.
- Priorities: P1 CRUD + tree. P2 hierarchy ops, validation. P3 parameters-related.
- Tags: `category`, `tree`, `hierarchy`, `validation`.
