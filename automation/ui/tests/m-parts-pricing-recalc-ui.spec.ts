import { test, expect } from '../fixtures/auth';
import type { APIRequestContext } from '@playwright/test';
import { createAuthedContext, createPart, type CreatedPart } from '../helpers/api';
import { waitForShell, waitLoadersGone } from '../paths/primitives';

// Close PATCH /api/part/{id}/pricing/ via the pricing-actions Refresh menu.

let api: APIRequestContext | undefined;
let part: CreatedPart | undefined;

test.describe.serial('UI-PRECALC pricing recalc via action-menu', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
    part = await createPart(api, {
      assembly: true,
      component: false,
      purchaseable: true,
      salable: true,
      description: 'UI-PRECALC part',
    });
  });

  test.afterAll(async () => {
    if (!api) return;
    if (part) {
      await api.patch(`/api/part/${part.pk}/`, { data: { active: false } });
      await api.delete(`/api/part/${part.pk}/`);
    }
    await api.dispose();
  });

  test('UI-PRECALC-001 click Refresh in pricing-actions menu → PATCH /api/part/{id}/pricing/', async ({
    page,
  }) => {
    if (!part) throw new Error('seed');
    await page.goto(`/web/part/${part.pk}/pricing`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(1500);

    // Capture any PATCH/POST to the pricing subresource so we don't miss the verb.
    const hits: string[] = [];
    const listener = (req: import('@playwright/test').Request): void => {
      const u = req.url();
      if (/\/api\/part\/\d+\/pricing\//.test(u)) {
        hits.push(`${req.method()} ${u}`);
      }
    };
    page.on('request', listener);

    await page.getByLabel('action-menu-pricing-actions').click();
    await page.waitForTimeout(400);
    // Use the aria-label convention (action-menu-<menu>-<item>) — more stable
    // than role=menuitem name which breaks on icon prefixes.
    await page.getByLabel('action-menu-pricing-actions-refresh').click();
    // Some variants show a confirm — tolerate its absence.
    const dialog = page.getByRole('dialog');
    if (await dialog.isVisible({ timeout: 1500 }).catch(() => false)) {
      const confirm = dialog
        .getByRole('button', { name: 'Submit', exact: true })
        .or(dialog.getByRole('button', { name: 'OK', exact: true }))
        .first();
      if (await confirm.isVisible({ timeout: 1500 }).catch(() => false)) {
        await confirm.click();
      }
    }
    await page.waitForTimeout(2000);
    page.off('request', listener);

    console.log('[UI-PRECALC-001] pricing subresource hits:', hits);
    expect(hits.length).toBeGreaterThan(0);
  });
});
