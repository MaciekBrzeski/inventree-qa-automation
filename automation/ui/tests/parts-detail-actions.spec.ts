import { test, expect } from '../fixtures/auth';
import type { APIRequestContext } from '@playwright/test';
import {
  createAuthedContext,
  createPart,
  deletePart,
  type CreatedPart,
} from '../helpers/api';

let api: APIRequestContext | undefined;
let seededPart: CreatedPart | undefined;

test.describe('UI-PARTS-DETAIL actions', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
    seededPart = await createPart(api, {
      name: `QA-DETAIL-${Date.now()}`,
      IPN: `QA-DETAIL-${Date.now()}`,
    });
  });

  test.afterAll(async () => {
    if (api && seededPart) {
      await deletePart(api, seededPart.pk);
    }
    if (api) await api.dispose();
  });

  test('UI-PARTS-DETAIL-001 detail page document title contains the part IPN', async ({
    partDetailPage,
  }) => {
    if (!seededPart) throw new Error('no seed');
    await partDetailPage.gotoById(seededPart.pk);
    await partDetailPage.expectTitleContains(seededPart.IPN);
  });

  test('UI-PARTS-DETAIL-002 open-in-admin action button is visible', async ({
    partDetailPage,
  }) => {
    if (!seededPart) throw new Error('no seed');
    await partDetailPage.gotoById(seededPart.pk);
    await expect(partDetailPage.openInAdminButton).toBeVisible();
  });

  test('UI-PARTS-DETAIL-003 subscribe-to-notifications action button is visible', async ({
    partDetailPage,
  }) => {
    if (!seededPart) throw new Error('no seed');
    await partDetailPage.gotoById(seededPart.pk);
    await expect(partDetailPage.subscribeButton).toBeVisible();
  });

  test('UI-PARTS-DETAIL-004 barcode actions menu trigger is visible', async ({
    partDetailPage,
  }) => {
    if (!seededPart) throw new Error('no seed');
    await partDetailPage.gotoById(seededPart.pk);
    await expect(partDetailPage.barcodeActionsMenu).toBeVisible();
  });

  test('UI-PARTS-DETAIL-005 breadcrumb shows parts root segment', async ({ page, partDetailPage }) => {
    if (!seededPart) throw new Error('no seed');
    await partDetailPage.gotoById(seededPart.pk);
    await expect(page.getByLabel('breadcrumb-0-parts')).toBeVisible({ timeout: 10_000 });
  });
});
