import { test, expect } from '../fixtures/auth';
import type { APIRequestContext } from '@playwright/test';
import { createAuthedContext, createPart, type CreatedPart } from '../helpers/api';
import { fillNumberField, submitButton } from '../helpers/mantine';
import { waitForShell, waitLoadersGone } from '../paths/primitives';

// Close the internal-price cluster by flipping the PART_INTERNAL_PRICE global
// setting before the spec runs (exposes the Internal Pricing sub-panel on the
// Part Pricing page) and restoring it on teardown. With the setting off the
// sub-panel disappears so the sale-pricing spec's selector does not see two
// matching add buttons.

let api: APIRequestContext | undefined;
let part: CreatedPart | undefined;

async function setInternalPricingEnabled(ctx: APIRequestContext, on: boolean): Promise<void> {
  const res = await ctx.patch('/api/settings/global/PART_INTERNAL_PRICE/', {
    data: { value: on },
  });
  if (res.status() >= 400) throw new Error(`settings toggle failed: ${res.status()}`);
}

async function openInternalPricing(page: import('@playwright/test').Page, pk: number): Promise<void> {
  await page.goto(`/web/part/${pk}/pricing`);
  await page.waitForLoadState('networkidle');
  await waitForShell(page);
  await waitLoadersGone(page);
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Internal Pricing', exact: true }).click();
  await page.waitForTimeout(1000);
}

test.describe.serial('UI-INTPRICE internal-price panel (gated by PART_INTERNAL_PRICE)', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
    await setInternalPricingEnabled(api, true);
    part = await createPart(api, {
      purchaseable: true,
      component: true,
      description: 'UI-INTPRICE part',
    });
  });

  test.afterAll(async () => {
    if (!api) return;
    try {
      const listRes = await api.get(`/api/part/internal-price/?part=${part?.pk}`);
      const raw = (await listRes.json()) as unknown;
      const list = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
      for (const row of list as Array<{ pk?: number }>) {
        if (typeof row.pk === 'number') await api.delete(`/api/part/internal-price/${row.pk}/`);
      }
    } catch {
      /* ignore */
    }
    if (part) {
      await api.patch(`/api/part/${part.pk}/`, { data: { active: false } });
      await api.delete(`/api/part/${part.pk}/`);
    }
    // Always restore the setting so other specs run in the default state.
    await setInternalPricingEnabled(api, false);
    await api.dispose();
  });

  test('UI-INTPRICE-001 add internal price break via UI → POST /api/part/internal-price/', async ({
    page,
  }) => {
    if (!part) throw new Error('seed');
    await openInternalPricing(page, part.pk);

    // Scope the add button to the Internal Pricing panel container — with the
    // setting on BOTH Internal and Sale panels render an add button, so an
    // unscoped getByLabel resolves to two elements.
    const panel = page.locator('[aria-label="Internal Pricing"]').or(
      page.getByRole('button', { name: 'Internal Pricing', exact: true }).locator('..'),
    );
    await panel.first().waitFor({ state: 'visible', timeout: 5000 });
    // Fall back: click whichever add button is visible in the active panel.
    // The active Internal Pricing sub-panel is the only one mounted — Sale is
    // closed — so the add button resolves uniquely.
    await page.getByLabel('action-button-add-price-break').first().click();
    await page.waitForTimeout(600);

    await fillNumberField(page, 'quantity', 1);
    await fillNumberField(page, 'price', 8);

    const [response] = await Promise.all([
      page.waitForResponse(
        (r) => /\/api\/part\/internal-price\/$/.test(r.url()) && r.request().method() === 'POST',
        { timeout: 10_000 },
      ),
      submitButton(page).click(),
    ]);
    expect([200, 201]).toContain(response.status());
  });

  test('UI-INTPRICE-002 edit internal price break via row-action-menu → PATCH /api/part/internal-price/{id}/', async ({
    page,
  }) => {
    if (!part || !api) throw new Error('seed');
    const seed = await api.post('/api/part/internal-price/', {
      data: { part: part.pk, quantity: 5, price: '12.00', price_currency: 'USD' },
    });
    expect(seed.status()).toBe(201);

    await openInternalPricing(page, part.pk);

    await page.getByLabel('row-action-menu-0').first().click();
    await page.getByRole('menuitem', { name: 'Edit', exact: true }).first().click();

    const priceInput = page.getByLabel('number-field-price').first();
    await priceInput.waitFor({ state: 'visible', timeout: 5000 });
    await priceInput.fill('22');

    const [response] = await Promise.all([
      page.waitForResponse(
        (r) =>
          /\/api\/part\/internal-price\/\d+\/?$/.test(r.url()) &&
          r.request().method() === 'PATCH',
        { timeout: 10_000 },
      ),
      submitButton(page).click(),
    ]);
    expect([200, 204]).toContain(response.status());
  });

  test('UI-INTPRICE-003 delete internal price break via row-action-menu → DELETE /api/part/internal-price/{id}/', async ({
    page,
  }) => {
    if (!part || !api) throw new Error('seed');
    const seed = await api.post('/api/part/internal-price/', {
      data: { part: part.pk, quantity: 10, price: '25.00', price_currency: 'USD' },
    });
    expect(seed.status()).toBe(201);

    await openInternalPricing(page, part.pk);

    await page.getByLabel('row-action-menu-0').first().click();
    await page.getByRole('menuitem', { name: 'Delete', exact: true }).first().click();

    const dialog = page.getByRole('dialog');
    await dialog.waitFor({ state: 'visible', timeout: 5000 });
    const confirm = dialog
      .getByRole('button', { name: 'Submit', exact: true })
      .or(dialog.getByRole('button', { name: 'Delete', exact: true }))
      .first();

    const [response] = await Promise.all([
      page.waitForResponse(
        (r) =>
          r.request().method() === 'DELETE' &&
          /\/api\/part\/internal-price\/\d+\/?$/.test(r.url()),
        { timeout: 10_000 },
      ),
      confirm.click(),
    ]);
    expect([200, 204]).toContain(response.status());
  });
});
