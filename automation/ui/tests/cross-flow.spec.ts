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
    // The page title is set by the SPA to "Part: <IPN> | <name>" — wait for it.
    await partDetailPage.expectTitleContains(seededPart.IPN);
    expect(await page.title()).toContain(seededPart.name);
  });

  test('UI-PARTS-CROSS-002 action buttons on the seeded part detail are reachable', async ({
    partDetailPage,
  }) => {
    if (!seededPart) throw new Error('no seed');
    await partDetailPage.gotoById(seededPart.pk);
    await expect(partDetailPage.openInAdminButton).toBeVisible({ timeout: 10_000 });
    await expect(partDetailPage.barcodeActionsMenu).toBeVisible();
  });

  test('UI-PARTS-CROSS-003 navigation to Parts list shows the web shell', async ({
    partsListPage,
    page,
  }) => {
    await partsListPage.goto();
    await partsListPage.expectLoaded();
    expect(await page.title()).toBe('Parts');
  });
});
