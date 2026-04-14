Generate **API manual test cases** for the BOM endpoints.

Scope (ground in retrieved OpenAPI notes only):
- `GET /api/bom/` — list BOM lines.
- `POST /api/bom/` — create a BOM line.
- `GET /api/bom/{id}/` — retrieve.
- `PATCH /api/bom/{id}/` — update.
- `DELETE /api/bom/{id}/` — delete.
- `GET /api/bom/{id}/validate/` or `POST /api/bom/{id}/validate/` — BOM validation, if in context.
- `POST /api/bom/substitute/` — BOM substitute line, if in context.

Next free IDs: **API-PARTS-046 through API-PARTS-060**.

Output: ONLY the markdown table, API case format.

Rules:
- Preconditions typically include: an assembly part `<assembly_id>` and a component part `<component_id>`.
- Happy path: add a BOM line with quantity, reference, optional notes; retrieve it; update the quantity; delete the line.
- Validation behaviour: `POST /api/bom/{id}/validate/` — only include cases if that endpoint is in the retrieved context.
- Substitutes: include only if `POST /api/bom/substitute/` is in the retrieved context.
- If a sub-area (validation, substitute) is not in context, emit `NEED_CONTEXT: <sub-area>` after the table.
- Priorities: P1 CRUD on a BOM line. P2 validation + substitutes. P3 edge cases (invalid references, zero quantity).
- Tags: `bom`, `assembly`, plus `substitute` / `validate` when applicable.
