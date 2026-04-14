Generate the Playwright spec file `tests/parts-bom.spec.ts` for the BOM endpoints.

Read the Context file first (passed as `--input`) — especially the Playwright API rules and the known-good `parts-crud.spec.ts` reference. **Copy its structure.** Same imports, same `describe.serial`, same `beforeAll/afterAll` shape. Only the test bodies differ.

Scope:

- `POST /api/part/` to create an assembly part (`assembly: true`) under QA-ROOT → capture `assemblyId`.
- `POST /api/part/` to create a component part (`component: true, purchaseable: true`) under QA-ROOT → capture `componentId`.
- `POST /api/bom/` with `{part: assemblyId, sub_part: componentId, quantity: 2, reference: 'R1'}` → 201, capture `bomId`.
- `GET /api/bom/?part=${assemblyId}` → 200, list includes the line we just created.
- `GET /api/bom/${bomId}/` → 200, body.quantity == 2.
- `PATCH /api/bom/${bomId}/` with `{quantity: 3}` → 200, body.quantity == 3.
- `DELETE /api/bom/${bomId}/` → 204.
- `afterAll` cleanup: patch both parts to `active: false`, then DELETE both parts. Ignore 404.

Rules:

- Single `test.describe.serial('API-PARTS-BOM bill of materials', ...)` block.
- Module-scoped `let assemblyId: number | undefined, componentId: number | undefined, bomId: number | undefined`.
- Every test title starts with the case ID exactly as it appears in the manual test case file.
- Use `ctx.get / post / patch / delete` — never `ctx.request.*`.
- Do not wrap the file in code fences.

Output: only the TypeScript file, compile-ready.
