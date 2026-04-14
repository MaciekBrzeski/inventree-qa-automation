Generate the Playwright spec file `tests/parts-negative.spec.ts` for negative / auth / validation API cases.

Read the Context file first (passed as `--input`) — especially the Playwright API rules and the known-good `parts-crud.spec.ts` reference. Structure your file like it, minus the shared part-id state: cases here are independent, so use `test.describe` (no `.serial`) and per-test inline contexts where needed.

Scope (each case gets its own `test(...)`; no shared state between cases):

1. `GET /api/part/` with **no Authorization header** → 401 (use `createAnonContext`).
2. `GET /api/part/` with **an invalid token** `Token inv-000000000000000000000000000000000000000000000000-00000000` → 401. (Create an inline context via `request.newContext({ baseURL, extraHTTPHeaders: { Authorization: 'Token inv-...' } })`.)
3. `GET /api/part/999999999/` authed → 404.
4. `GET /api/part/category/999999999/` authed → 404.
5. `POST /api/part/` authed with payload `{}` (missing name/category) → 400 (DRF validation error).
6. `POST /api/part/` authed with payload `{name: 'x'}` (missing required `category`) → 400.
7. `PATCH /api/part/999999999/` authed with `{description: 'nope'}` → 404.
8. `DELETE /api/part/999999999/` authed → 404.
9. `PUT /api/part/` authed (wrong verb on collection) → 405 or 404. Accept either.
10. `POST /api/part/category/` authed with `{name: '', parent: null}` → 400.

Rules:

- Use `test.describe('API-PARTS-NEGATIVE auth and validation', ...)` without `.serial` since cases are independent.
- `beforeAll` creates one shared authed context for the authed cases.
- `afterAll` disposes the authed context.
- Anon and invalid-token cases create their own context inline and dispose after.
- Every test title starts with the case ID exactly as it appears in the manual test case file.
- Use `ctx.get / post / patch / delete` — never `ctx.request.*`.
- No code fences around the file. No prose.

Output: only the TypeScript file, compile-ready.
