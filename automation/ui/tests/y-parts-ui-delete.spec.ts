import { test, expect } from '../fixtures/auth';
import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';
import { createAuthedContext } from '../helpers/api';
import type { APIRequestContext } from '@playwright/test';

const STATE_PATH = resolve(__dirname, '../../../data/ui-crud-state.json');

type CrudState = {
  sessionTag: string;
  categoryName?: string;
  partName?: string;
  partIPN?: string;
};

async function readState(): Promise<CrudState | null> {
  try {
    return JSON.parse(await fs.readFile(STATE_PATH, 'utf8')) as CrudState;
  } catch {
    return null;
  }
}

async function findPkByName(
  api: APIRequestContext,
  listPath: string,
  name: string,
): Promise<number | null> {
  const r = await api.get(`${listPath}?search=${encodeURIComponent(name)}`);
  if (!r.ok()) return null;
  const raw = (await r.json()) as unknown;
  const list = Array.isArray(raw)
    ? raw
    : ((raw as { results?: unknown[] }).results ?? []);
  for (const entry of list as Array<{ pk?: number; name?: string }>) {
    if (entry.name === name && typeof entry.pk === 'number') return entry.pk;
  }
  return null;
}

test.describe.serial('UI-DELETE UI-driven deletion flows', () => {
  let api: APIRequestContext | undefined;
  test.beforeAll(async () => {
    api = await createAuthedContext();
  });
  test.afterAll(async () => {
    if (api) await api.dispose();
  });

  test('UI-DELETE-001 delete the UI-created part via the page action menu', async ({ page }) => {
    const state = await readState();
    if (!state || !state.partName) test.skip(true, 'no part recorded in state');
    if (!api) throw new Error('no api');
    const partPk = await findPkByName(api, '/api/part/', state!.partName!);
    if (partPk === null) test.skip(true, `part ${state!.partName} not found`);

    await page.goto(`/web/part/${partPk}/details`);
    await page.waitForLoadState('networkidle');
    await page.getByLabel('navigation-menu').waitFor({ state: 'visible', timeout: 10_000 });
    await page.waitForTimeout(1000);

    // Install a request listener to capture the DELETE from the UI flow.
    const deleteHits: string[] = [];
    const onRequest = (req: import('@playwright/test').Request): void => {
      if (req.method() === 'DELETE' && /\/api\/part\/\d+\/?$/.test(req.url())) {
        deleteHits.push(req.url());
      }
    };
    page.on('request', onRequest);

    // InvenTree rejects DELETE on active parts. Deactivate first via API, then RELOAD
    // the page so React re-fetches and the Delete menu item becomes enabled.
    await api.patch(`/api/part/${partPk}/`, { data: { active: false } });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.getByLabel('navigation-menu').waitFor({ state: 'visible', timeout: 10_000 });
    await page.waitForTimeout(500);

    // Open the page-level part action menu, click Delete.
    await page.getByLabel('action-menu-part-actions').click();
    const deleteItem = page.getByLabel('action-menu-part-actions-delete');
    await deleteItem.waitFor({ state: 'visible', timeout: 5000 });
    // Sanity check: the item must be enabled (not data-disabled).
    await expect(deleteItem).toBeEnabled({ timeout: 5000 });
    await deleteItem.click();

    // Confirm modal. Mantine uses a form button usually called "Submit" or "Delete".
    // Try Submit first, fall back to Delete text.
    const confirmBtn = page
      .getByRole('button', { name: 'Submit' })
      .or(page.getByRole('button', { name: 'Delete' }))
      .first();
    await confirmBtn.waitFor({ state: 'visible', timeout: 10_000 });
    await Promise.all([
      page.waitForResponse(
        (r) => /\/api\/part\/\d+\/?$/.test(r.url()) && r.request().method() === 'DELETE',
        { timeout: 10_000 },
      ),
      confirmBtn.click(),
    ]);

    page.off('request', onRequest);
    expect(deleteHits.length).toBeGreaterThan(0);

    // Verify the part is gone via API search.
    const r = await api.get(`/api/part/?search=${encodeURIComponent(state!.partName!)}`);
    const raw = (await r.json()) as unknown;
    const list = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
    expect(list.length).toBe(0);
  });

  test('UI-DELETE-002 delete the UI-created category via the page action menu', async ({ page }) => {
    const state = await readState();
    if (!state || !state.categoryName) test.skip(true, 'no category recorded in state');
    if (!api) throw new Error('no api');
    const catPk = await findPkByName(api, '/api/part/category/', state!.categoryName!);
    if (catPk === null) test.skip(true, `category ${state!.categoryName} not found`);

    await page.goto(`/web/part/category/${catPk}/details`);
    await page.waitForLoadState('networkidle');
    await page.getByLabel('navigation-menu').waitFor({ state: 'visible', timeout: 10_000 });
    await page.waitForTimeout(1000);

    await page.getByLabel('action-menu-category-actions').click();
    await page.getByLabel('action-menu-category-actions-delete').click();

    const confirmBtn = page
      .getByRole('button', { name: 'Submit' })
      .or(page.getByRole('button', { name: 'Delete' }))
      .first();
    await confirmBtn.waitFor({ state: 'visible', timeout: 10_000 });
    const [response] = await Promise.all([
      page.waitForResponse(
        (r) =>
          /\/api\/part\/category\/\d+\/?$/.test(r.url()) && r.request().method() === 'DELETE',
        { timeout: 10_000 },
      ),
      confirmBtn.click(),
    ]);
    expect([204, 200]).toContain(response.status());

    // Verify the category is gone.
    const r = await api.get(
      `/api/part/category/?search=${encodeURIComponent(state!.categoryName!)}`,
    );
    const raw = (await r.json()) as unknown;
    const list = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
    expect(list.length).toBe(0);
  });
});
