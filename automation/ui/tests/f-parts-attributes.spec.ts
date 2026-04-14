import { test, expect } from '../fixtures/auth';
import type { APIRequestContext, Page } from '@playwright/test';
import { createAuthedContext, createPart, deletePart, type CreatedPart } from '../helpers/api';

let api: APIRequestContext | undefined;
let target: CreatedPart | undefined;

async function openEditModal(page: Page, pk: number): Promise<void> {
  await page.goto(`/web/part/${pk}/details`);
  await page.waitForLoadState('networkidle');
  await page.getByLabel('navigation-menu').waitFor({ state: 'visible', timeout: 10_000 });
  await page.waitForTimeout(800);
  await page.getByLabel('action-menu-part-actions').click();
  await page.getByLabel('action-menu-part-actions-edit').click();
  await page.waitForTimeout(800);
}

async function submitAndCapturePatch(page: Page): Promise<number> {
  const [response] = await Promise.all([
    page.waitForResponse(
      (r) => /\/api\/part\/\d+\/?$/.test(r.url()) && r.request().method() === 'PATCH',
      { timeout: 10_000 },
    ),
    page.getByRole('button', { name: 'Submit' }).first().click(),
  ]);
  return response.status();
}

test.describe.serial('UI-ATTR part attribute round-trips via Edit modal', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
    target = await createPart(api, { description: 'UI-ATTR target' });
  });

  test.afterAll(async () => {
    if (api && target) await deletePart(api, target.pk);
    if (api) await api.dispose();
  });

  test('UI-ATTR-001 flip assembly flag via UI edit modal → PATCH /api/part/{id}/', async ({
    page,
  }) => {
    if (!target) throw new Error('seed');
    await openEditModal(page, target.pk);
    // Each boolean flag has aria-label `boolean-field-<name>`. Click to toggle.
    const flag = page.getByLabel('boolean-field-assembly').first();
    await flag.waitFor({ state: 'visible', timeout: 5000 });
    await flag.click();
    const status = await submitAndCapturePatch(page);
    expect([200, 204]).toContain(status);
    // Verify via API readback.
    if (!api) throw new Error('api');
    const r = await api.get(`/api/part/${target.pk}/`);
    expect(((await r.json()) as { assembly?: boolean }).assembly).toBe(true);
  });

  test('UI-ATTR-002 flip component flag via UI edit modal', async ({ page }) => {
    if (!target) throw new Error('seed');
    await openEditModal(page, target.pk);
    const flag = page.getByLabel('boolean-field-component').first();
    await flag.click();
    expect([200, 204]).toContain(await submitAndCapturePatch(page));
  });

  test('UI-ATTR-003 flip purchaseable flag via UI edit modal', async ({ page }) => {
    if (!target) throw new Error('seed');
    await openEditModal(page, target.pk);
    const flag = page.getByLabel('boolean-field-purchaseable').first();
    await flag.click();
    expect([200, 204]).toContain(await submitAndCapturePatch(page));
  });

  test('UI-ATTR-004 flip salable flag via UI edit modal', async ({ page }) => {
    if (!target) throw new Error('seed');
    await openEditModal(page, target.pk);
    const flag = page.getByLabel('boolean-field-salable').first();
    await flag.click();
    expect([200, 204]).toContain(await submitAndCapturePatch(page));
  });

  test('UI-ATTR-005 flip trackable flag via UI edit modal', async ({ page }) => {
    if (!target) throw new Error('seed');
    await openEditModal(page, target.pk);
    const flag = page.getByLabel('boolean-field-trackable').first();
    await flag.click();
    expect([200, 204]).toContain(await submitAndCapturePatch(page));
  });

  test('UI-ATTR-006 flip testable flag via UI edit modal', async ({ page }) => {
    if (!target) throw new Error('seed');
    await openEditModal(page, target.pk);
    const flag = page.getByLabel('boolean-field-testable').first();
    await flag.click();
    expect([200, 204]).toContain(await submitAndCapturePatch(page));
  });

  test('UI-ATTR-007 flip virtual flag via UI edit modal', async ({ page }) => {
    if (!target) throw new Error('seed');
    await openEditModal(page, target.pk);
    const flag = page.getByLabel('boolean-field-virtual').first();
    await flag.click();
    expect([200, 204]).toContain(await submitAndCapturePatch(page));
  });

  test('UI-ATTR-008 flip active flag via UI edit modal', async ({ page }) => {
    if (!target) throw new Error('seed');
    await openEditModal(page, target.pk);
    const flag = page.getByLabel('boolean-field-active').first();
    await flag.click();
    expect([200, 204]).toContain(await submitAndCapturePatch(page));
  });
});
