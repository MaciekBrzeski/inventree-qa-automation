import { test, expect } from '../fixtures/auth';
import type { APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/api';
import { fillRelatedField, fillTextField, submitButton } from '../helpers/mantine';
import { waitForShell, waitLoadersGone } from '../paths/primitives';

// Close the category-parameter cluster: POST / PATCH / DELETE via the
// Category Parameters tab on a category detail page. The add form requires
// a pre-existing parameter template (/api/parameter/template/) which we
// seed idempotently by name.

const TEMPLATE_NAME = 'UI-CPAR-template';

let api: APIRequestContext | undefined;
let templatePk: number | undefined;
let categoryPk: number | undefined;

async function ensureTemplate(ctx: APIRequestContext): Promise<number> {
  const list = await ctx.get(`/api/parameter/template/?name=${encodeURIComponent(TEMPLATE_NAME)}`);
  const raw = (await list.json()) as unknown;
  const arr = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
  for (const r of arr as Array<{ pk?: number; name?: string }>) {
    if (r.name === TEMPLATE_NAME && typeof r.pk === 'number') return r.pk;
  }
  const created = await ctx.post('/api/parameter/template/', {
    data: { name: TEMPLATE_NAME, units: '' },
  });
  if (created.status() !== 201) throw new Error(`template create failed: ${created.status()}`);
  return ((await created.json()) as { pk: number }).pk;
}

async function ensureCategory(ctx: APIRequestContext): Promise<number> {
  // Use a dedicated test category so we don't pollute QA-ROOT.
  const list = await ctx.get(`/api/part/category/?search=UI-CPAR-CAT`);
  const raw = (await list.json()) as unknown;
  const arr = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
  for (const r of arr as Array<{ pk?: number; name?: string }>) {
    if (r.name === 'UI-CPAR-CAT' && typeof r.pk === 'number') return r.pk;
  }
  const rootId = Number(process.env.INVENTREE_QA_ROOT_ID ?? '1');
  const created = await ctx.post('/api/part/category/', {
    data: { name: 'UI-CPAR-CAT', parent: rootId, description: 'UI category-parameter tests' },
  });
  if (created.status() !== 201) throw new Error(`category create failed: ${created.status()}`);
  return ((await created.json()) as { pk: number }).pk;
}

test.describe.serial('UI-CPAR category parameters panel flows', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
    templatePk = await ensureTemplate(api);
    categoryPk = await ensureCategory(api);
    // Clean up any leftover category-parameters from previous runs so the
    // tests start from a known empty state.
    const listRes = await api.get(`/api/part/category/parameters/?category=${categoryPk}`);
    const raw = (await listRes.json()) as unknown;
    const list = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
    for (const row of list as Array<{ pk?: number }>) {
      if (typeof row.pk === 'number') await api.delete(`/api/part/category/parameters/${row.pk}/`);
    }
  });

  test.afterAll(async () => {
    if (!api) return;
    // Leave the template + category in place so subsequent runs are idempotent.
    await api.dispose();
  });

  async function openParametersTab(page: import('@playwright/test').Page): Promise<void> {
    if (!categoryPk) throw new Error('seed');
    await page.goto(`/web/part/category/${categoryPk}/details`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(1200);
    await page.getByRole('tab', { name: 'Category Parameters', exact: true }).click();
    await page.waitForTimeout(1500);
  }

  test('UI-CPAR-001 add a category parameter via UI → POST /api/part/category/parameters/', async ({
    page,
  }) => {
    await openParametersTab(page);

    await page.getByLabel('action-button-add-category-parameter').click();
    await page.waitForTimeout(600);

    await fillRelatedField(page, 'template', TEMPLATE_NAME);
    await fillTextField(page, 'default_value', 'ui-default');

    const [response] = await Promise.all([
      page.waitForResponse(
        (r) =>
          /\/api\/part\/category\/parameters\/$/.test(r.url()) &&
          r.request().method() === 'POST',
        { timeout: 10_000 },
      ),
      submitButton(page).click(),
    ]);
    expect([200, 201]).toContain(response.status());
  });

  test('UI-CPAR-002 edit a category parameter via row-action-menu Edit → PATCH /api/part/category/parameters/{id}/', async ({
    page,
  }) => {
    if (!api || !categoryPk || !templatePk) throw new Error('seed');
    // Ensure at least one row exists — if UI-CPAR-001 already added one, reuse it.
    const listRes = await api.get(`/api/part/category/parameters/?category=${categoryPk}`);
    const raw = (await listRes.json()) as unknown;
    const list = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
    if (list.length === 0) {
      await api.post('/api/part/category/parameters/', {
        data: { category: categoryPk, parameter_template: templatePk, default_value: 'seed' },
      });
    }

    await openParametersTab(page);

    await page.getByLabel('row-action-menu-0').first().click();
    await page.getByRole('menuitem', { name: 'Edit', exact: true }).first().click();

    const valueInput = page.getByLabel('text-field-default_value').first();
    await valueInput.waitFor({ state: 'visible', timeout: 5000 });
    await valueInput.fill('ui-edited');

    const [response] = await Promise.all([
      page.waitForResponse(
        (r) =>
          /\/api\/part\/category\/parameters\/\d+\/?$/.test(r.url()) &&
          r.request().method() === 'PATCH',
        { timeout: 10_000 },
      ),
      submitButton(page).click(),
    ]);
    expect([200, 204]).toContain(response.status());
  });

  test('UI-CPAR-003 delete a category parameter via row-action-menu Delete → DELETE /api/part/category/parameters/{id}/', async ({
    page,
  }) => {
    if (!api || !categoryPk || !templatePk) throw new Error('seed');
    // Ensure at least one row to delete.
    const listRes = await api.get(`/api/part/category/parameters/?category=${categoryPk}`);
    const raw = (await listRes.json()) as unknown;
    const list = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
    if (list.length === 0) {
      await api.post('/api/part/category/parameters/', {
        data: { category: categoryPk, parameter_template: templatePk, default_value: 'to-delete' },
      });
    }

    await openParametersTab(page);

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
          /\/api\/part\/category\/parameters\/\d+\/?$/.test(r.url()),
        { timeout: 10_000 },
      ),
      confirm.click(),
    ]);
    expect([200, 204]).toContain(response.status());
  });
});
