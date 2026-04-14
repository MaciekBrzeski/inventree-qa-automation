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
