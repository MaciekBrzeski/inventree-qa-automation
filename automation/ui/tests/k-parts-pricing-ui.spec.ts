import { test, expect } from '../fixtures/auth';
import type { APIRequestContext } from '@playwright/test';
import { createAuthedContext, createPart, type CreatedPart } from '../helpers/api';
import { fillNumberField, submitButton } from '../helpers/mantine';
import { waitForShell, waitLoadersGone } from '../paths/primitives';

let api: APIRequestContext | undefined;
let part: CreatedPart | undefined;

async function openSalePricing(page: import('@playwright/test').Page, pk: number): Promise<void> {
  await page.goto(`/web/part/${pk}/pricing`);
  await page.waitForLoadState('networkidle');
  await waitForShell(page);
  await waitLoadersGone(page);
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Sale Pricing', exact: true }).click();
  await page.waitForTimeout(1000);
}

test.describe.serial('UI-PRICE pricing panel sale-price flows', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
    part = await createPart(api, {
      purchaseable: true,
      salable: true,
      component: true,
      description: 'UI-PRICE part',
    });
  });

  test.afterAll(async () => {
    if (!api) return;
    try {
      const listRes = await api.get(`/api/part/sale-price/?part=${part?.pk}`);
      const raw = (await listRes.json()) as unknown;
      const list = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
      for (const row of list as Array<{ pk?: number }>) {
        if (typeof row.pk === 'number') await api.delete(`/api/part/sale-price/${row.pk}/`);
      }
    } catch {
      /* ignore */
    }
    if (part) {
      await api.patch(`/api/part/${part.pk}/`, { data: { active: false } });
      await api.delete(`/api/part/${part.pk}/`);
    }
    await api.dispose();
  });

  test('UI-PRICE-001 add a sale price break via UI → POST /api/part/sale-price/', async ({
    page,
  }) => {
    if (!part) throw new Error('seed');
    await openSalePricing(page, part.pk);

    await page.getByLabel('action-button-add-price-break').click();
    await page.waitForTimeout(600);

    await fillNumberField(page, 'quantity', 1);
    await fillNumberField(page, 'price', 10);

    const [response] = await Promise.all([
      page.waitForResponse(
        (r) => /\/api\/part\/sale-price\/$/.test(r.url()) && r.request().method() === 'POST',
        { timeout: 10_000 },
      ),
      submitButton(page).click(),
    ]);
    expect([200, 201]).toContain(response.status());
  });

  test('UI-PRICE-002 edit a sale price break via row-action-menu Edit → PATCH /api/part/sale-price/{id}/', async ({
    page,
  }) => {
    if (!part || !api) throw new Error('seed');
    const seed = await api.post('/api/part/sale-price/', {
      data: { part: part.pk, quantity: 5, price: '15.00', price_currency: 'USD' },
    });
    expect(seed.status()).toBe(201);
    const priceId = ((await seed.json()) as { pk?: number }).pk!;

    await openSalePricing(page, part.pk);

    await page.getByLabel('row-action-menu-0').first().click();
    await page.getByRole('menuitem', { name: 'Edit', exact: true }).first().click();

    const priceInput = page.getByLabel('number-field-price').first();
    await priceInput.waitFor({ state: 'visible', timeout: 5000 });
    await priceInput.fill('25');

    const [response] = await Promise.all([
      page.waitForResponse(
        (r) =>
          /\/api\/part\/sale-price\/\d+\/?$/.test(r.url()) && r.request().method() === 'PATCH',
        { timeout: 10_000 },
      ),
      submitButton(page).click(),
    ]);
    expect([200, 204]).toContain(response.status());
    await api.delete(`/api/part/sale-price/${priceId}/`);
  });

  test('UI-PRICE-003 delete a sale price break via row-action-menu Delete → DELETE /api/part/sale-price/{id}/', async ({
    page,
  }) => {
    if (!part || !api) throw new Error('seed');
    const seed = await api.post('/api/part/sale-price/', {
      data: { part: part.pk, quantity: 10, price: '30.00', price_currency: 'USD' },
    });
    expect(seed.status()).toBe(201);

    await openSalePricing(page, part.pk);

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
          /\/api\/part\/sale-price\/\d+\/?$/.test(r.url()),
        { timeout: 10_000 },
      ),
      confirm.click(),
    ]);
    expect([200, 204]).toContain(response.status());
  });
});
