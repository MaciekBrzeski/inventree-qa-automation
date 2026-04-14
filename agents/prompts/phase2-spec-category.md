Generate the Playwright spec file `tests/parts-category.spec.ts` for the Part Category endpoints.

Input test cases to automate: the first ~8 cases of the `Part Category` area in `submission/test-cases/api-manual-tests.md` (API-PARTS-018..025 in the merged numbering, but you should use the IDs exactly as they appear in that file).

Follow every rule in the toolkit section below.

Scope:

- List categories (`GET /api/part/category/`).
- Create a category under QA-ROOT (`POST /api/part/category/` with `parent: Number(process.env.INVENTREE_QA_ROOT_ID)`).
- Retrieve the created category.
- Update it (rename via PATCH).
- Create a child category under the one you just created (hierarchy).
- Fetch the tree endpoint `GET /api/part/category/tree/` and assert that the created category and child are both present.
- Delete the child first, then the parent.
- One 400 case: POST with an empty name → expect 400.

Use `test.describe.serial` because the cases share state. Track created ids in an array `const cleanup: number[] = [];` and in `afterAll` DELETE them in reverse order, ignoring 404 errors.

Use `makeCategory({ parent: ... })` for payloads.

Output: only the TypeScript file, compile-ready, no prose.
