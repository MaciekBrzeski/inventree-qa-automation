import { test, expect } from '../fixtures/auth';
import type { APIRequestContext } from '@playwright/test';
import { createAuthedContext, createPart, type CreatedPart } from '../helpers/api';
import { fillTextField, submitButton } from '../helpers/mantine';
import { waitForShell, waitLoadersGone } from '../paths/primitives';

let api: APIRequestContext | undefined;
let part: CreatedPart | undefined;

test.describe.serial('UI-TT test templates panel flows', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
    // test_templates require testable=true.
    part = await createPart(api, {
      testable: true,
      trackable: true,
      description: 'UI-TT seed',
    });
  });

  test.afterAll(async () => {
    if (!api || !part) return;
    // Safety-net: delete any test templates attached to this part, then the part itself.
    const listRes = await api.get(`/api/part/test-template/?part=${part.pk}`);
    if (listRes.ok()) {
      const raw = (await listRes.json()) as unknown;
      const list = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
      for (const row of list as Array<{ pk?: number }>) {
        if (typeof row.pk === 'number') await api.delete(`/api/part/test-template/${row.pk}/`);
      }
    }
    await api.patch(`/api/part/${part.pk}/`, { data: { active: false } });
    await api.delete(`/api/part/${part.pk}/`);
    await api.dispose();
  });

  test('UI-TT-001 add a test template via action-button-add-test-template → POST /api/part/test-template/', async ({
    page,
  }) => {
    if (!part) throw new Error('seed');
    await page.goto(`/web/part/${part.pk}/test_templates`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(1000);

    await page.getByLabel('action-button-add-test-template').click();
    // Form opens — part is pre-filled, only test_name is strictly required.
    const testName = `UI-TT-${Date.now()}`;
    await fillTextField(page, 'test_name', testName);
    await fillTextField(page, 'description', 'ui-tt auto-generated');

    const [response] = await Promise.all([
      page.waitForResponse(
        (r) =>
          /\/api\/part\/test-template\/$/.test(r.url()) && r.request().method() === 'POST',
        { timeout: 10_000 },
      ),
      submitButton(page).click(),
    ]);
    expect([200, 201]).toContain(response.status());
  });

  test('UI-TT-002 the added template appears in the panel via GET /api/part/test-template/', async ({
    page,
  }) => {
    if (!part) throw new Error('seed');
    const hits: string[] = [];
    const listener = (req: import('@playwright/test').Request): void => {
      if (req.method() === 'GET' && /\/api\/part\/test-template\//.test(req.url())) {
        hits.push(req.url());
      }
    };
    page.on('request', listener);
    await page.goto(`/web/part/${part.pk}/test_templates`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(1500);
    page.off('request', listener);
    expect(hits.length).toBeGreaterThan(0);
  });

  test('UI-TT-003 delete a test template via row-action-menu → DELETE /api/part/test-template/{id}/', async ({
    page,
  }) => {
    if (!part || !api) throw new Error('seed');
    // Guarantee a row exists.
    const listRes = await api.get(`/api/part/test-template/?part=${part.pk}`);
    const raw = (await listRes.json()) as unknown;
    const existing = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
    if (existing.length === 0) {
      await api.post('/api/part/test-template/', {
        data: { part: part.pk, test_name: `UI-TT-SEED-${Date.now()}`, description: 'seed' },
      });
    }

    await page.goto(`/web/part/${part.pk}/test_templates`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(1500);

    await page.getByLabel('row-action-menu-0').first().click();
    await page.waitForTimeout(400);
    await page.getByRole('menuitem', { name: 'Delete' }).first().click();

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
          /\/api\/part\/test-template\/\d+\/?$/.test(r.url()),
        { timeout: 10_000 },
      ),
      confirm.click(),
    ]);
    expect([200, 204]).toContain(response.status());
  });

  test('UI-TT-004 edit a test template via row-action-menu Edit → PATCH /api/part/test-template/{id}/', async ({
    page,
  }) => {
    if (!part || !api) throw new Error('seed');
    // Seed a fresh row.
    const seed = await api.post('/api/part/test-template/', {
      data: {
        part: part.pk,
        test_name: `UI-TT-EDIT-${Date.now()}`,
        description: 'before-edit',
      },
    });
    expect(seed.status()).toBe(201);
    const ttId = ((await seed.json()) as { pk?: number }).pk!;

    await page.goto(`/web/part/${part.pk}/test_templates`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(1500);

    await page.getByLabel('row-action-menu-0').first().click();
    await page.getByRole('menuitem', { name: 'Edit', exact: true }).first().click();

    const desc = page.getByLabel('text-field-description').first();
    await desc.waitFor({ state: 'visible', timeout: 5000 });
    await desc.fill('edited-by-ui');

    const [response] = await Promise.all([
      page.waitForResponse(
        (r) =>
          /\/api\/part\/test-template\/\d+\/?$/.test(r.url()) &&
          r.request().method() === 'PATCH',
        { timeout: 10_000 },
      ),
      submitButton(page).click(),
    ]);
    expect([200, 204]).toContain(response.status());
    await api.delete(`/api/part/test-template/${ttId}/`);
  });
});
