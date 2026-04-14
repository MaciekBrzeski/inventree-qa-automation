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
