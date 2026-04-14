Generate the Playwright spec file `tests/parts-crud.spec.ts` for the InvenTree Parts CRUD test cases.

Input test cases to automate: the `Parts CRUD` area of `submission/test-cases/api-manual-tests.md`. Those cases are:

- API-PARTS-001 GET /api/part/ — list parts
- API-PARTS-002 POST /api/part/ — create part
- API-PARTS-003 GET /api/part/{id}/ — retrieve part (depends on the part created above)
- API-PARTS-004 PATCH /api/part/{id}/ — update part
- API-PARTS-005 DELETE /api/part/{id}/ — delete part

Follow every rule in the toolkit section below.

Implementation guidance:

- Use a single `test.describe.serial('API-PARTS parts CRUD', ...)` block, because cases 002→005 share a part lifecycle.
- Store the created part id in a `let partId: number | undefined;` at the describe scope.
- 001 does NOT depend on the created part — it just lists.
- 002 creates via `makePart({ category: Number(process.env.INVENTREE_QA_ROOT_ID) })`, captures `body.pk` into `partId`, asserts status 201, validates schema, asserts name/IPN match the input.
- 003 gets `/api/part/${partId}/`, asserts 200 + name matches.
- 004 patches `/api/part/${partId}/` with `{ description: 'updated-by-qa' }`, asserts 200 + description updated.
- 005 deletes `/api/part/${partId}/`, asserts 204, then sets `partId = undefined` so cleanup is skipped.
- `afterAll`: if `partId` is still set (e.g. a mid-way failure), attempt to DELETE it and ignore 404.

The output should be a clean, complete, compile-ready TypeScript file. No test case should import or reference anything other than the toolkit helpers.
