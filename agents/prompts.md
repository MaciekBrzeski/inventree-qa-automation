# Agent prompts — consolidated index

Every prompt used to drive qa-gemma (Ollama alias) during the generation phases. The per-phase files below live under `agents/prompts/` and are reproduced here end-to-end so reviewers see one continuous narrative. The system instructions that wrap every call are in `agents/system-instructions.md`.

Running log of every call with retrieved chunks, prompt preview, and response is appended continuously to `../docs/qa/prompts-journal.md`.

Tooling:
- Orchestrator: Claude Code (Opus 4.6)
- Bulk generator: `qa-gemma` → `FROM qwen2.5-coder:7b` on Ollama (pivoted from gemma4:26b for VRAM)
- Embeddings: `nomic-embed-text`
- Driver: `agents/rag/query.ts`

---

## phase1-ui-attributes

Generate UI manual test cases for **Part Attributes** in the InvenTree Parts module.

Scope (ground in retrieved context only):
- Boolean attribute toggles on a Part: Virtual, Template, Assembly, Component, Testable, Trackable, Purchaseable, Salable, Active.
- Each toggle changes visibility of related features (e.g. Assembly enables BOM tab, Purchaseable enables Supplier data, Trackable enables serial tracking, Virtual suppresses stock).
- Locked parts: a locked part cannot have its attributes changed.
- Active / inactive parts.

Next free IDs: **UI-PARTS-029 through UI-PARTS-040**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- One case per meaningful attribute-related behavior, not one per toggle existence.
- P1 = Assembly toggle enables BOM tab; Virtual hides stock; Purchaseable enables supplier data; Active/Inactive toggle. P2 = Trackable, Testable, Salable. P3 = Template boolean (covered in templates area), Component.
- Tags: `attribute`, plus the specific attribute name.
- If context is missing for a specific attribute's side-effect, emit `NEED_CONTEXT: side-effects of <attribute>`.

---

## phase1-ui-categories

Generate UI manual test cases for **Part Categories** in the InvenTree Parts module.

Scope (ground in retrieved context only):
- Part Category is a hierarchical tree used to group parts.
- A category page displays a list of all parts under that category, plus a list of sub-categories.
- Moving a part between categories.
- Structural category (configuration controlled).
- Browsing, filtering parts by category.

Next free IDs: **UI-PARTS-019 through UI-PARTS-028**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- Ground every step in retrieved context. If a flow is not supported, emit `NEED_CONTEXT: <what>`.
- P1 = browsing category, viewing parts under a category, assigning part to category at creation. P2 = sub-categories, moving a part. P3 = edge cases.
- Tags: `category`, `tree`, `filter`.

---

## phase1-ui-creation

Generate UI manual test cases for the **Creating Parts** area of the InvenTree Parts module.

Scope (based on retrieved context):
- Manual creation via the Parts view → Add Parts dropdown → new part form.
- Duplicating an existing part as a revision (Part detail → three-dot menu → Duplicate Part → set Revision Of + Revision).
- Form fields: name, IPN, description, category, Initial Stock (if setting enabled), Supplier Data (if Purchaseable).
- Required vs optional fields.
- Navigation outcomes: redirect to the new part's detail page.
- Validation errors on missing required fields.

Next free IDs: **UI-PARTS-001 through UI-PARTS-015**. Use as many as you need, do not exceed.

Output: ONLY the markdown table, with the exact columns from system-instructions.md — no prose, no headers, no commentary. Start directly with the table header line `| ID | Title | Preconditions | Steps | Expected | Priority | Tags |`.

Constraints:
- Every test must be grounded in the retrieved context. Do not invent fields, menus, or buttons that are not mentioned.
- If you need a step that the context does not support, emit `NEED_CONTEXT: <what>` on its own line instead of that case.
- Priorities: core happy-path creation = P1. Duplicate-as-revision flow = P1. Optional supplier/initial-stock toggles = P2. Validation errors = P2. Edge cases = P3.
- Tags should include at least one of: `create`, `duplicate`, `revision`, `validation`, `supplier`, `stock`.

---

## phase1-ui-negative

Generate **negative** UI manual test cases for the InvenTree Parts module.

Scope (ground in retrieved context only):
- Duplicate IPN rejection.
- Attempting to edit a locked part.
- Attempting to set an inactive part on a new stock transaction (if the flow is in context).
- Circular revision reference.
- Invalid units string.
- Unique code / name constraints.
- Missing required fields.
- Unauthorized write attempts (e.g. read-only user).

Next free IDs: **UI-PARTS-071 through UI-PARTS-080**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- Ground every failure mode in something the retrieved docs explicitly state (e.g. "cannot be changed", "must be unique", "locked"). Do not invent validation behavior.
- If a negative scenario is not supported by the context, emit `NEED_CONTEXT: <scenario>` and skip it.
- P2 for most negative tests, P3 for deep edge cases. Tags include `negative` plus a specific tag.

---

## phase1-ui-parameters

Generate UI manual test cases for **Part Parameters** in the InvenTree Parts module.

Scope (ground in retrieved context only):
- Parameters are typed metadata attached to a Part via a Parameter Template.
- Parameter Template has name, units.
- Adding, editing, removing parameters on a Part.
- Template parts may propagate parameters to variants.

Next free IDs: **UI-PARTS-047 through UI-PARTS-054**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- Ground every step. If context does not show a UI flow for creating a Parameter Template separately from using it, emit `NEED_CONTEXT: parameter template creation UI`.
- P1 = add parameter to part, view parameters on detail. P2 = edit, remove, template propagation. P3 = validation.
- Tags: `parameters`.

---

## phase1-ui-revisions

Generate UI manual test cases for **Part Revisions** in the InvenTree Parts module.

Scope (ground in retrieved context only):
- Revisions are created via Duplicate Part with a "Revision Of" link and a "Revision" number.
- Navigating between revisions of the same part.
- Viewing revision history for a part.
- Revision numbering uniqueness per parent.

Next free IDs: **UI-PARTS-063 through UI-PARTS-070**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- P1 = create a revision (if not already covered in creation area — focus on the revision-specific outcomes), navigate between revisions. P2 = revision number validation, list all revisions. P3 = edge cases.
- Tags: `revision`.

---

## phase1-ui-tabs

Generate UI manual test cases for **Part detail views and tabs** in the InvenTree Parts module.

Scope (ground in retrieved context only):
- Part detail page layout: header actions, tabs.
- Tabs commonly visible for a Part: Stock, Variants, Allocations, Bill of Materials, Used In, Builds, Suppliers, Purchase Orders, Sales Orders, Tests, Related Parts, Attachments, Notes, Pricing.
- Behavior when a tab is empty vs populated.
- Navigating between tabs preserves part context.

Next free IDs: **UI-PARTS-009 through UI-PARTS-018**. Use as many as context supports.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- Only test tabs/actions present in the retrieved context. If a tab is mentioned but not the actions it supports, emit `NEED_CONTEXT: actions for <tab>` on its own line instead of inventing.
- P1 = Stock tab + BOM tab (for assembly parts) + navigating to detail. P2 = Variants, Suppliers, Pricing. P3 = Attachments, Notes.
- Tags: `detail`, `tabs`, plus specific tab name.

---

## phase1-ui-templates

Generate UI manual test cases for **Template and Variant parts** in the InvenTree Parts module.

Scope (ground in retrieved context only):
- A Template part can have Variant children.
- Template's total stock aggregates all variant stock.
- Creating a variant under a template.
- Viewing variants of a template.
- Cannot have circular template relationships.

Next free IDs: **UI-PARTS-055 through UI-PARTS-062**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- P1 = mark part as Template, create a Variant, view variants tab. P2 = aggregate stock display, unmark template. P3 = negative/circular.
- Tags: `template`, `variant`.

---

## phase1-ui-units

Generate UI manual test cases for **Units of Measure** on Parts in the InvenTree Parts module.

Scope (ground in retrieved context only):
- Physical units (mass, length, etc.) assigned to a Part.
- Unit validation: rejecting invalid unit strings.
- Supplier Part Units: how a supplier's pack size relates to the base part's unit of measure.
- Conversion from supplier pack to part stock quantity.

Next free IDs: **UI-PARTS-041 through UI-PARTS-046**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- If the retrieved context does not name a specific unit string or conversion example, do not invent one — use generic placeholders referenced in the docs.
- P1 = setting a valid unit on a part. P2 = invalid unit rejection, supplier pack conversion. P3 = edge cases.
- Tags: `units`, `validation`.

---

## phase2-api-bom

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

---

## phase2-api-category

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

---

## phase2-api-crud

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

---

## phase2-api-negative

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

---

## phase2-api-query

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

---

## phase2-spec-bom

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

---

## phase2-spec-category

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

---

## phase2-spec-context

# Context for spec generation — READ THIS FIRST

## Toolkit (helpers you can import)

```ts
// helpers/client.ts
import { createAuthedContext, createAnonContext, fetchToken } from '../helpers/client';
// createAuthedContext(): Promise<APIRequestContext>  -- cached Token auth
// createAnonContext(): Promise<APIRequestContext>    -- no auth, no args
// fetchToken(): Promise<string>                      -- cached

// helpers/schema.ts
import { validateResponse } from '../helpers/schema';
// validateResponse(path, method, status, body): { ok, errors? }

// helpers/factories.ts
import { makePart, makeCategory, type PartInput, type CategoryInput } from '../helpers/factories';
// makePart(overrides?: Partial<PartInput>): PartInput    -- unique name + IPN each call
// makeCategory(overrides?: Partial<CategoryInput>): CategoryInput

// Environment wired by global-setup.ts
process.env.INVENTREE_QA_ROOT_ID  // numeric id of the QA-ROOT category, as string
process.env.INVENTREE_TOKEN       // admin token
```

## Playwright APIRequestContext rules — CRITICAL

- Import type: `import { test, expect, type APIRequestContext } from '@playwright/test';`
- Method calls: `ctx.get(url)`, `ctx.post(url, { data })`, `ctx.patch(url, { data })`, `ctx.delete(url)`.
- **NEVER** `ctx.request(...)`. There is no `.request` property on `APIRequestContext`.
- Response body: `const body = await response.json();`
- Response status: `response.status()` is a method, not a property.

## InvenTree API quirks learned so far

- `DELETE /api/part/{id}/` returns **400** on an active part. You must `PATCH {active: false}` first, then DELETE. Apply this in every `afterAll` cleanup that deletes parts.
- Parts use `pk`, not `id`, in response bodies.
- List endpoints may return either a bare array or a DRF paginator wrapper `{count, next, previous, results}`. Always unwrap:
  ```ts
  const list = Array.isArray(body) ? body : (body as { results?: unknown[] }).results ?? [];
  ```

## Reference: a known-good working spec file

This is `tests/parts-crud.spec.ts`, which compiles, runs, and passes 5/5 against the live InvenTree. **Copy its patterns exactly** — same imports, same describe.serial shape, same cleanup approach.

```ts
import { test, expect, type APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/client';
import { validateResponse } from '../helpers/schema';
import { makePart, type PartInput } from '../helpers/factories';

let ctx: APIRequestContext | undefined;
let partId: number | undefined;
let createdInput: PartInput | undefined;

test.describe.serial('API-PARTS parts CRUD', () => {
  test.beforeAll(async () => {
    ctx = await createAuthedContext();
  });

  test.afterAll(async () => {
    if (ctx && partId !== undefined) {
      await ctx.patch(`/api/part/${partId}/`, { data: { active: false } });
      const r = await ctx.delete(`/api/part/${partId}/`);
      if (r.status() !== 204 && r.status() !== 404) {
        console.error(`[cleanup] unexpected ${r.status()} on DELETE part/${partId}/`);
      }
      partId = undefined;
    }
    if (ctx) await ctx.dispose();
  });

  test('API-PARTS-001 list parts', async () => {
    if (!ctx) throw new Error('ctx not initialised');
    const response = await ctx.get('/api/part/?limit=5');
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const isArray = Array.isArray(body);
    const hasResults =
      typeof body === 'object' && body !== null && Array.isArray((body as { results?: unknown[] }).results);
    expect(isArray || hasResults).toBe(true);
  });

  test('API-PARTS-002 create part', async () => {
    if (!ctx) throw new Error('ctx not initialised');
    const categoryId = Number(process.env.INVENTREE_QA_ROOT_ID);
    expect(Number.isFinite(categoryId)).toBe(true);
    createdInput = makePart({ category: categoryId });
    const response = await ctx.post('/api/part/', { data: createdInput });
    expect(response.status()).toBe(201);
    const body = (await response.json()) as { pk?: number; name?: string; IPN?: string };
    expect(body.name).toBe(createdInput.name);
    expect(body.IPN).toBe(createdInput.IPN);
    expect(typeof body.pk).toBe('number');
    partId = body.pk;
  });

  test('API-PARTS-003 retrieve part', async () => {
    if (!ctx || partId === undefined || !createdInput) throw new Error('no part from prior step');
    const response = await ctx.get(`/api/part/${partId}/`);
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { name?: string; IPN?: string };
    expect(body.name).toBe(createdInput.name);
    expect(body.IPN).toBe(createdInput.IPN);
  });

  test('API-PARTS-005 delete part', async () => {
    if (!ctx || partId === undefined) throw new Error('no part from prior step');
    const deactivate = await ctx.patch(`/api/part/${partId}/`, { data: { active: false } });
    expect(deactivate.status()).toBe(200);
    const response = await ctx.delete(`/api/part/${partId}/`);
    expect(response.status()).toBe(204);
    partId = undefined;
  });
});
```

## Output format — STRICT

- Produce **only** the TypeScript file contents.
- **No** triple-backtick code fences at the top or bottom of the file. The output is a `.ts` file, not a markdown block.
- **No** prose before or after the imports.
- **No** "```typescript" wrapper. **No** "```" anywhere unless it's inside a multi-line template literal, which you should not use.
- Start the output with `import { ...` directly.
- End the output with the final closing `});` of the describe block.

---

## phase2-spec-crud

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

---

## phase2-spec-negative

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

---

## phase2-spec-query

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

---

## phase2-spec-toolkit

## Toolkit available in every API spec file

The specs live in `submission/automation/api/tests/`. They use these helpers (already implemented and typechecked):

```ts
// helpers/client.ts
import { createAuthedContext, createAnonContext, fetchToken } from '../helpers/client';
// createAuthedContext() → Promise<APIRequestContext> with Authorization: Token ... header.
// createAnonContext()   → Promise<APIRequestContext> with no auth.
// fetchToken()          → Promise<string>, cached.

// helpers/schema.ts
import { validateResponse, type ValidateResult } from '../helpers/schema';
// validateResponse(path, method, status, body) → { ok, tpl?, errors? }
// Validates a response body against the OpenAPI schema for that path+method+status.
// `path` is the literal path hit (with real ids substituted); the resolver matches it
// against templated paths like /api/part/{id}/.

// helpers/factories.ts
import { makePart, makeCategory, type PartInput, type CategoryInput } from '../helpers/factories';
// makePart(overrides?)      → PartInput with unique name + IPN.
// makeCategory(overrides?)  → CategoryInput with unique name.

// Environment (wired by global-setup.ts)
process.env.INVENTREE_QA_ROOT_ID  // numeric id of the QA-ROOT category, as string
process.env.INVENTREE_TOKEN       // the admin token, as string
```

### Rules for every spec you generate

1. Import from `@playwright/test`: `import { test, expect } from '@playwright/test';`
2. **Test title starts with the case ID**: `test('API-PARTS-001 list parts', async () => { ... })`. Non-negotiable.
3. Create the authed context once per `test.describe` via `test.beforeAll`, store it in a `let ctx: APIRequestContext | undefined;` at the module level or in a fixture, dispose in `afterAll`. If a test needs anon, create inline via `createAnonContext`.
4. Use `makePart()` / `makeCategory()` for payloads — never hand-roll names or IPNs. Always spread the factory output into the request.
5. **Always clean up** created entities in `test.afterEach`. Record created IDs in an array, DELETE them in reverse order. Ignore 404 during cleanup (case may have already deleted).
6. **Assert with `expect`**: status via `expect(response.status()).toBe(...)`, body via `const body = await response.json(); expect(body.X).toBe(Y)`.
7. **Schema-validate** every 2xx response on the main endpoint under test via `validateResponse`. Example:
   ```ts
   const result = validateResponse('/api/part/', 'post', 201, body);
   expect(result.ok, `schema errors: ${JSON.stringify(result.errors)}`).toBe(true);
   ```
8. **No hard-coded IDs**. Read the QA-ROOT category id from `process.env.INVENTREE_QA_ROOT_ID`. Parse with `Number(process.env.INVENTREE_QA_ROOT_ID)`.
9. **No `test.skip`, no `test.fixme`, no `waitForTimeout`**.
10. Prefer `test.describe.serial` for suites that mutate shared state, so tests run sequentially.

### Output format

Produce **only the TypeScript spec file contents** — no prose, no markdown fence unless it's a single opening/closing triple backtick around the whole file. No explanatory header comment. Start with the imports directly.

---

## phase3-ui-context

# Context for UI spec generation — READ THIS FIRST

## Toolkit

```ts
// fixtures/auth.ts — import `test` and `expect` from here, NOT from '@playwright/test'.
import { test, expect } from '../fixtures/auth';
// The fixture logs in once and reuses storageState across all tests.
// It injects `loginPage`, `partsListPage`, `partDetailPage` — instantiated Page Objects.

// pages/LoginPage.ts
class LoginPage {
  usernameInput: Locator;       // page.getByLabel('login-username')
  passwordInput: Locator;       // page.getByLabel('login-password')
  submitButton: Locator;        // page.getByRole('button', { name: 'Log In' })
  hamburgerMenu: Locator;       // inherited from BasePage
  async goto(): Promise<void>;  // page.goto('/')
  async login(user: string, pass: string): Promise<void>;
}

// pages/PartsListPage.ts
class PartsListPage {
  categoryPanel: Locator;       // page.getByLabel('partcategory')
  async goto(): Promise<void>;  // page.goto('/web/part')
  async expectLoaded(): Promise<void>;  // waits until document.title === 'Parts'
}

// pages/PartDetailPage.ts
class PartDetailPage {
  openInAdminButton: Locator;       // page.getByLabel('action-button-open-in-admin-interface')
  subscribeButton: Locator;         // page.getByLabel('action-button-subscribe-to-notifications')
  barcodeActionsMenu: Locator;      // page.getByLabel('action-menu-barcode-actions')
  async gotoById(pk: number): Promise<void>;           // page.goto(`/web/part/${pk}`)
  async expectTitleContains(s: string): Promise<void>; // asserts document.title
}

// pages/BasePage.ts — shared across all pages
class BasePage {
  hamburgerMenu: Locator;            // page.getByLabel('navigation-menu')
  globalSearchButton: Locator;       // page.getByLabel('open-search')
  spotlightButton: Locator;          // page.getByLabel('open-spotlight')
  notifications: Locator;            // page.getByLabel('open-notifications')
  breadcrumbSegment(slug: string): Locator;  // '[aria-label^="breadcrumb-"][aria-label$="-<slug>"]'
}

// helpers/api.ts — import for any UI test that needs to seed data via API first.
import { createAuthedContext, createPart, deletePart, type CreatedPart } from '../helpers/api';
// createPart(ctx): Promise<{pk, name, IPN}>
// deletePart(ctx, pk): disables then deletes (InvenTree rejects DELETE on active parts).
```

## Playwright rules — CRITICAL

- `import { test, expect } from '../fixtures/auth';` — do **not** import from `@playwright/test` directly, or you'll bypass storageState.
- Test titles start with `UI-PARTS-###` exactly as in `submission/test-cases/ui-manual-tests.md`.
- Never `page.waitForTimeout`. Prefer `expect(locator).toBeVisible()`, `page.waitForLoadState('networkidle')`, or `page.waitForFunction`.
- `page.title()` is a method, not a property — `await page.title()`.
- Page Objects do **not** contain assertions. Assertions live in the test.
- For per-test state, prefer seeding via `createAuthedContext()` + `createPart()`, and clean up in `afterAll`.

## InvenTree SPA learnings

- The React SPA lives under `/web/`. Routes: `/web/part` (parts list), `/web/part/<pk>` (part detail), `/web/partcategory` (categories), `/web/partcategory/<pk>` (category detail).
- Login form fields use `aria-label="login-username"` and `login-password`. Submit button text: `Log In`.
- Global nav buttons have visible text: `Dashboard`, `Parts`, `Stock`, `Manufacturing`, `Purchasing`, `Sales`.
- Action buttons on part detail use the pattern `action-button-<name>` or `action-menu-<name>` via `aria-label`.
- Breadcrumbs use `aria-label="breadcrumb-<index>-<slug>"` like `breadcrumb-0-parts`, `breadcrumb-1-qa-root`.
- Panel tabs on category detail use `aria-label="panel-tabs-partcategory"` with individual tabs `panel-tab-partcategory-<key>` and nav panels `nav-panel-partcategory-<key>` (e.g. `details`, `parts`, `subcategories`).
- Mantine Spotlight (Ctrl+K) does **not** reliably open from a programmatic `keyboard.press('Control+K')` — the button `getByLabel('open-spotlight')` is the correct trigger.

## Reference: a known-good working UI spec file

This is `tests/cross-flow.spec.ts`. It compiles, runs, and passes 3/3. Copy its structure.

```ts
import { test, expect } from '../fixtures/auth';
import {
  createAuthedContext,
  createPart,
  deletePart,
  type CreatedPart,
} from '../helpers/api';
import type { APIRequestContext } from '@playwright/test';

let api: APIRequestContext | undefined;
let seededPart: CreatedPart | undefined;

test.describe('UI-PARTS-CROSS cross-functional flow', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
    seededPart = await createPart(api, {
      name: `QA-CROSS-${Date.now()}`,
      IPN: `QA-CROSS-${Date.now()}`,
    });
  });

  test.afterAll(async () => {
    if (api && seededPart) {
      await deletePart(api, seededPart.pk);
    }
    if (api) await api.dispose();
  });

  test('UI-PARTS-CROSS-001 API-seeded part renders on its detail page', async ({
    partDetailPage,
    page,
  }) => {
    if (!seededPart) throw new Error('no seed');
    await partDetailPage.gotoById(seededPart.pk);
    await partDetailPage.expectTitleContains(seededPart.IPN);
    expect(await page.title()).toContain(seededPart.name);
  });
});
```

## Output format — STRICT

- Produce **only** the TypeScript file contents.
- **No** triple-backtick code fences at the top or bottom. The output is a `.ts` file, not a markdown block.
- **No** prose before or after the imports.
- Start with `import { ...` directly.
- End with the final closing `});` of the describe block.

---

## phase3-ui-detail-actions

Generate the Playwright spec file `tests/parts-detail-actions.spec.ts` covering the action buttons on the Part detail page.

Read the Context file first. Copy the structure of `cross-flow.spec.ts` — seed a part via API in `beforeAll`, navigate via `partDetailPage`, clean up in `afterAll`.

Scope:

- `UI-PARTS-DETAIL-001 detail page document title contains the part IPN` — via `partDetailPage.expectTitleContains(seededPart.IPN)`.
- `UI-PARTS-DETAIL-002 open-in-admin action button is visible` — `partDetailPage.openInAdminButton`.
- `UI-PARTS-DETAIL-003 subscribe-to-notifications action button is visible` — `partDetailPage.subscribeButton`.
- `UI-PARTS-DETAIL-004 barcode actions menu trigger is visible` — `partDetailPage.barcodeActionsMenu`.
- `UI-PARTS-DETAIL-005 breadcrumb shows parts root segment` — assert `page.getByLabel('breadcrumb-0-parts')` is visible.

Rules:

- Single `test.describe('UI-PARTS-DETAIL actions', ...)` block. **No `.serial`** — each test navigates fresh via `partDetailPage.gotoById(seededPart.pk)` in a `beforeEach`.
- `beforeAll`: create one API context and one seeded part.
- `afterAll`: `deletePart(api, seededPart.pk)` + `api.dispose()`.
- All assertions use `await expect(...).toBeVisible()` or `expect(await page.title()).toContain(...)`.

Output: only the TypeScript file, compile-ready, no prose, no fences.

---

## phase3-ui-login-negative

Generate the Playwright spec file `tests/login-negative.spec.ts` — negative paths for the login form.

Read the Context file first.

Scope (each test uses a fresh unauthenticated context via `test.describe` + `test.use({ storageState: { cookies: [], origins: [] } })`):

- `UI-LOGIN-NEG-001 wrong password shows an error` — fill username `admin`, password `wrong-password-xyz`, click Log In, assert the hamburger menu does **not** appear within 4 seconds (i.e. still on the login form). Use a short timeout `.waitFor({ state: 'visible', timeout: 4000 }).catch(() => null)` pattern to avoid long test time.
- `UI-LOGIN-NEG-002 username-only (empty password) does not authenticate` — fill username, leave password empty, click Log In, assert username input is still visible (still on login form).
- `UI-LOGIN-NEG-003 blank form click does not authenticate` — click Log In without filling anything, assert username input is still visible.

Rules:

- `test.describe('UI-LOGIN-NEG login negative paths', () => { test.use({ storageState: { cookies: [], origins: [] } }); ... })`.
- Use the `loginPage` fixture; call `await loginPage.goto()` in each test.
- Do **not** call `loginPage.login(...)` — that helper asserts on successful login. Interact with `loginPage.usernameInput`, `loginPage.passwordInput`, and `loginPage.submitButton` directly.
- Assertions via `await expect(loginPage.usernameInput).toBeVisible()` and similar.
- **Never** use `page.waitForTimeout`. Use `Locator.waitFor({timeout: ...}).catch(() => null)` for negative visibility checks.

Output: only the TypeScript file, compile-ready, no prose, no fences.

---

## phase3-ui-navigation

Generate the Playwright spec file `tests/parts-navigation.spec.ts` covering the global navigation and breadcrumbs of the InvenTree `/web/` SPA.

Read the Context file first (passed as `--input`) — copy the imports and describe structure from the reference spec.

Scope:

- `UI-PARTS-NAV-001 navigation menu button is visible on the authenticated shell` — `getByLabel('navigation-menu')` is visible after hitting `/web/part`.
- `UI-PARTS-NAV-002 top-level nav shows Dashboard, Parts, Stock, Manufacturing, Purchasing, Sales` — each button text is visible on the parts list page.
- `UI-PARTS-NAV-003 breadcrumb action button is visible on parts list` — `getByLabel('nav-breadcrumb-action')`.
- `UI-PARTS-NAV-004 global search button is reachable` — `getByLabel('open-search')` is visible and clickable (click it, assert the page is still on `/web/part`).
- `UI-PARTS-NAV-005 notifications button is visible` — `getByLabel('open-notifications')`.

Rules:

- Use `test.describe('UI-PARTS-NAV global navigation', ...)` (no `.serial` — tests are independent).
- Use the `partsListPage` fixture to navigate to `/web/part` in a `beforeEach`.
- All tests read authenticated state from the shared storageState fixture.
- Use `getByLabel(...)` or `getByRole('button', { name: '<text>' })` — exactly as shown in the context file. No CSS selectors.
- Assertions: `await expect(locator).toBeVisible()`.

Output: only the TypeScript file, compile-ready, no prose, no fences.

