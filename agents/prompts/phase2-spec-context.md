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
