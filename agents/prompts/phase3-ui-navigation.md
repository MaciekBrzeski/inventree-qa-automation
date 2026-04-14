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
