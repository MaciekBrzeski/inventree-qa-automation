import { test, expect } from '../fixtures/auth';
import type { APIRequestContext } from '@playwright/test';
import { createAuthedContext, createPart, type CreatedPart } from '../helpers/api';
import { fillRelatedField, fillNumberField, fillTextField, submitButton } from '../helpers/mantine';
import { waitForShell, waitLoadersGone } from '../paths/primitives';

let api: APIRequestContext | undefined;
let assembly: CreatedPart | undefined;
let component: CreatedPart | undefined;

test.describe.serial('UI-BOM bill of materials panel flows', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
    assembly = await createPart(api, { assembly: true, component: false, description: 'UI-BOM assembly' });
    component = await createPart(api, { component: true, purchaseable: true, description: 'UI-BOM component' });
  });

  test.afterAll(async () => {
    if (!api) return;
    // Clean up any BOM lines pointing at the assembly (safety-net).
    try {
      const listRes = await api.get(`/api/bom/?part=${assembly?.pk}`);
      const raw = (await listRes.json()) as unknown;
      const list = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
      for (const row of list as Array<{ pk?: number }>) {
        if (typeof row.pk === 'number') await api.delete(`/api/bom/${row.pk}/`);
      }
    } catch {
      /* ignore */
    }
    for (const p of [component, assembly]) {
      if (p) {
        await api.patch(`/api/part/${p.pk}/`, { data: { active: false } });
        await api.delete(`/api/part/${p.pk}/`);
      }
    }
    await api.dispose();
  });

  test('UI-BOM-001 open the BOM panel and see the Add BOM Items action menu', async ({
    page,
  }) => {
    if (!assembly) throw new Error('seed');
    await page.goto(`/web/part/${assembly.pk}/bom`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await expect(page.getByLabel('action-menu-add-bom-items')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByLabel('action-button-validate-bom')).toBeVisible();
  });

  test('UI-BOM-002 add a BOM line via UI → POST /api/bom/', async ({ page }) => {
    if (!assembly || !component) throw new Error('seed');
    await page.goto(`/web/part/${assembly.pk}/bom`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(800);

    // Open the Add menu and click "Add BOM Item".
    await page.getByLabel('action-menu-add-bom-items').click();
    await page.getByLabel('action-menu-add-bom-items-add-bom-item').click();

    // Form modal — fill the required fields.
    const searchFragment = component.name.slice(-10);
    await fillRelatedField(page, 'sub_part', searchFragment);
    await fillNumberField(page, 'quantity', 3);
    await fillTextField(page, 'reference', 'R1');

    // Submit and capture the POST /api/bom/
    const [response] = await Promise.all([
      page.waitForResponse(
        (r) => /\/api\/bom\/$/.test(r.url()) && r.request().method() === 'POST',
        { timeout: 10_000 },
      ),
      submitButton(page).click(),
    ]);
    expect([200, 201]).toContain(response.status());
  });

  test('UI-BOM-003 trigger Validate BOM via UI → /api/part/{id}/bom-validate/ or /api/bom/{id}/validate/', async ({
    page,
  }) => {
    if (!assembly) throw new Error('seed');
    await page.goto(`/web/part/${assembly.pk}/bom`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(800);

    const hits: string[] = [];
    const listener = (req: import('@playwright/test').Request): void => {
      const url = req.url();
      if (
        /\/api\/part\/\d+\/bom-validate\//.test(url) ||
        /\/api\/bom\/\d+\/validate\//.test(url)
      ) {
        hits.push(`${req.method()} ${url}`);
      }
    };
    page.on('request', listener);
    await page.getByLabel('action-button-validate-bom').click();
    // The validate button may open a confirm modal — click Submit if present.
    const confirm = page.getByRole('button', { name: 'Submit' });
    if (await confirm.isVisible({ timeout: 3000 }).catch(() => false)) {
      await confirm.click();
    }
    await page.waitForTimeout(1500);
    page.off('request', listener);
    expect(hits.length).toBeGreaterThan(0);
  });

  test('UI-BOM-004 bulk-delete BOM lines via Select all + action-button-delete-selected-records', async ({
    page,
  }) => {
    if (!assembly || !component || !api) throw new Error('seed');
    // Seed a BOM line so the bulk-delete has something to remove.
    const seedRes = await api.post('/api/bom/', {
      data: { part: assembly.pk, sub_part: component.pk, quantity: 1 },
    });
    expect(seedRes.status()).toBe(201);

    await page.goto(`/web/part/${assembly.pk}/bom`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(1500);

    // Tick the "Select all records" checkbox. This enables the delete-selected action.
    const selectAll = page.getByLabel('Select all records').first();
    await selectAll.waitFor({ state: 'visible', timeout: 5000 });
    await selectAll.check();
    await page.waitForTimeout(400);

    // Now click the bulk delete button and accept the confirmation.
    const deleteBtn = page.getByLabel('action-button-delete-selected-records');
    await deleteBtn.waitFor({ state: 'visible', timeout: 5000 });
    const hits: string[] = [];
    const listener = (req: import('@playwright/test').Request): void => {
      if (/\/api\/bom\/\d+\/?$/.test(req.url()) && req.method() === 'DELETE') {
        hits.push(req.url());
      }
    };
    page.on('request', listener);
    await deleteBtn.click();
    // Scope the confirm button to the dialog that opens — avoids matching the trigger icon.
    const dialog = page.getByRole('dialog');
    if (await dialog.isVisible({ timeout: 3000 }).catch(() => false)) {
      const confirm = dialog
        .getByRole('button', { name: 'Submit', exact: true })
        .or(dialog.getByRole('button', { name: 'Delete', exact: true }))
        .first();
      await confirm.waitFor({ state: 'visible', timeout: 5000 });
      await confirm.click();
    }
    await page.waitForTimeout(1800);
    page.off('request', listener);
    // Verify via API that the line is gone.
    const check = await api.get(`/api/bom/?part=${assembly.pk}`);
    const raw = (await check.json()) as unknown;
    const list = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
    expect(list.length).toBe(0);
  });

  test('UI-BOM-005 edit a BOM row via row-action-menu Edit → PATCH /api/bom/{id}/', async ({
    page,
  }) => {
    if (!assembly || !component || !api) throw new Error('seed');
    // Seed a fresh BOM line for this test.
    const seed = await api.post('/api/bom/', {
      data: { part: assembly.pk, sub_part: component.pk, quantity: 2 },
    });
    expect(seed.status()).toBe(201);
    const bomId = ((await seed.json()) as { pk?: number }).pk!;

    await page.goto(`/web/part/${assembly.pk}/bom`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(1500);

    await page.getByLabel('row-action-menu-0').first().click();
    await page.getByRole('menuitem', { name: 'Edit', exact: true }).first().click();

    // Edit modal has the same fields as the Add BOM Item form — bump quantity.
    const qty = page.getByLabel('number-field-quantity').first();
    await qty.waitFor({ state: 'visible', timeout: 5000 });
    await qty.fill('7');

    const [response] = await Promise.all([
      page.waitForResponse(
        (r) => /\/api\/bom\/\d+\/?$/.test(r.url()) && r.request().method() === 'PATCH',
        { timeout: 10_000 },
      ),
      submitButton(page).click(),
    ]);
    expect([200, 204]).toContain(response.status());
    // Cleanup this row before the next test.
    await api.delete(`/api/bom/${bomId}/`);
  });

  test('UI-BOM-006 click Validate BOM Line row action → PATCH /api/bom/{id}/validate/ or /api/part/{id}/bom-validate/', async ({
    page,
  }) => {
    if (!assembly || !component || !api) throw new Error('seed');
    const seed = await api.post('/api/bom/', {
      data: { part: assembly.pk, sub_part: component.pk, quantity: 1 },
    });
    const bomId = ((await seed.json()) as { pk?: number }).pk!;

    await page.goto(`/web/part/${assembly.pk}/bom`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(1500);

    const hits: string[] = [];
    const listener = (req: import('@playwright/test').Request): void => {
      const u = req.url();
      if (
        (/\/api\/bom\/\d+\/validate\//.test(u) ||
          /\/api\/part\/\d+\/bom-validate\//.test(u)) &&
        (req.method() === 'PATCH' || req.method() === 'PUT')
      ) {
        hits.push(`${req.method()} ${u}`);
      }
    };
    page.on('request', listener);
    await page.getByLabel('row-action-menu-0').first().click();
    await page
      .getByRole('menuitem', { name: 'Validate BOM Line', exact: true })
      .first()
      .click();
    // Confirm dialog if present.
    const dialog = page.getByRole('dialog');
    if (await dialog.isVisible({ timeout: 3000 }).catch(() => false)) {
      const confirm = dialog
        .getByRole('button', { name: 'Submit', exact: true })
        .or(dialog.getByRole('button', { name: 'OK', exact: true }))
        .first();
      if (await confirm.isVisible({ timeout: 2000 }).catch(() => false)) {
        await confirm.click();
      }
    }
    await page.waitForTimeout(1800);
    page.off('request', listener);
    expect(hits.length).toBeGreaterThan(0);
    await api.delete(`/api/bom/${bomId}/`);
  });

  test('UI-BOM-007 add a BOM substitute via row-action-menu Edit Substitutes → POST /api/bom/substitute/', async ({
    page,
  }) => {
    if (!assembly || !component || !api) throw new Error('seed');
    // Need a BOM line AND a second component to use as the substitute.
    const seed = await api.post('/api/bom/', {
      data: { part: assembly.pk, sub_part: component.pk, quantity: 1 },
    });
    const bomId = ((await seed.json()) as { pk?: number }).pk!;

    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID ?? '1');
    const sub = await api.post('/api/part/', {
      data: {
        name: `UI-BOM-SUB-${Date.now()}`,
        IPN: `UBS-${Date.now()}`,
        category: rootId,
        component: true,
      },
    });
    const subPk = ((await sub.json()) as { pk?: number }).pk!;

    await page.goto(`/web/part/${assembly.pk}/bom`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(1500);

    await page.getByLabel('row-action-menu-0').first().click();
    await page
      .getByRole('menuitem', { name: 'Edit Substitutes', exact: true })
      .first()
      .click();
    await page.waitForTimeout(1000);

    // Dialog has a related-field-part select + an "Add Substitute" button.
    const partSelect = page.getByLabel('related-field-part').first();
    await partSelect.waitFor({ state: 'visible', timeout: 5000 });
    await partSelect.click();
    await partSelect.fill(`UBS-`);
    await page.waitForTimeout(600);
    await page.getByRole('option').first().click();

    const [response] = await Promise.all([
      page.waitForResponse(
        (r) => /\/api\/bom\/substitute\/?$/.test(r.url()) && r.request().method() === 'POST',
        { timeout: 10_000 },
      ),
      page.getByRole('button', { name: 'Add Substitute', exact: true }).click(),
    ]);
    expect([200, 201]).toContain(response.status());

    // Cleanup
    await page.keyboard.press('Escape');
    await api.delete(`/api/bom/${bomId}/`);
    await api.patch(`/api/part/${subPk}/`, { data: { active: false } });
    await api.delete(`/api/part/${subPk}/`);
  });
});
