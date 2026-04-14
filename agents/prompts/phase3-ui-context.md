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
