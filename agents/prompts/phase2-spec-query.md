Generate the Playwright spec file `tests/parts-query.spec.ts` for list, filter, search, and pagination on `GET /api/part/`.

Read the Context file first (passed as `--input`) — especially the Playwright API rules and the known-good `parts-crud.spec.ts` reference. **Copy its structure.** Same imports, same `describe.serial`, same `beforeAll/afterAll` shape. Only the test bodies differ.

Scope and implementation guidance:

- Use a single `test.describe.serial('API-PARTS parts query', ...)` block.
- `beforeAll`:
  - Create the authed context.
  - Seed three parts under `QA-ROOT`: one with `assembly: true`, one with `component: true, purchaseable: true`, one with `active: false`. Capture all three ids into a `createdIds: number[]` array at module scope.
- `afterAll`:
  - For each created id: PATCH `{active: false}` (to bypass the DELETE-on-active constraint documented in `docs/qa/bugs/INV-PARTS-001-delete-active-part.md`), then DELETE. Ignore 404.
  - Dispose the context.
- Cases to produce:
  1. `API-PARTS-006 list with limit` — `GET /api/part/?limit=2` → 200, response has ≤2 results.
  2. `API-PARTS-007 list with offset` — `GET /api/part/?limit=1&offset=1` → 200, 1 result.
  3. `API-PARTS-008 filter by category` — `GET /api/part/?category=${rootId}` → 200, every returned part has `category == rootId`.
  4. `API-PARTS-009 filter by assembly=true` — at least one of the results is the assembly part we seeded.
  5. `API-PARTS-010 search by name substring` — `GET /api/part/?search=<first-6-chars-of-seeded-name>` → 200, results include the seeded part.
  6. `API-PARTS-011 ordering by name asc` — `GET /api/part/?ordering=name&limit=5` → 200, response is sorted ascending by `name`.
  7. `API-PARTS-012 filter by active=false` — returns the inactive seeded part.

- Use `createAuthedContext` once and reuse it for every step. Do not create new contexts per test.
- Every response must be status 200 and parseable as JSON.
- Use the DRF paginated shape: `Array.isArray(body) ? body : body.results`.
- Do not schema-validate individual list responses (many DRF list endpoints return a paginator wrapper that our validator won't match); only assert status and shape.

Output: only the TypeScript file, compile-ready, no prose, no markdown fences.
