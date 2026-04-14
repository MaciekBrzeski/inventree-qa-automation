import { test, expect } from '../fixtures/auth';
import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';

const STATE_PATH = resolve(__dirname, '../../../data/ui-crud-state.json');

type CrudState = {
  sessionTag: string;
  categoryName?: string;
  partName?: string;
  partIPN?: string;
};

async function readState(): Promise<CrudState> {
  try {
    return JSON.parse(await fs.readFile(STATE_PATH, 'utf8')) as CrudState;
  } catch {
    return { sessionTag: `UI-CRUD-${Date.now()}` };
  }
}

async function writeState(s: CrudState): Promise<void> {
  await fs.mkdir(resolve(STATE_PATH, '..'), { recursive: true });
  await fs.writeFile(STATE_PATH, JSON.stringify(s, null, 2), 'utf8');
}

test.describe.serial('UI-PART create via UI', () => {
  test('UI-PART-001 navigate to parts panel and open Add menu', async ({ page }) => {
    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID ?? '1');
    await page.goto(`/web/part/category/${rootId}/parts`);
    await page.waitForLoadState('networkidle');
    await expect(page.getByLabel('action-menu-add-parts')).toBeVisible({ timeout: 10_000 });
  });

  test('UI-PART-002 create a new part via the Add menu → Create Part modal', async ({ page }) => {
    const state = await readState();
    state.partName = `${state.sessionTag}-part`;
    state.partIPN = `${state.sessionTag}-IPN`;

    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID ?? '1');
    await page.goto(`/web/part/category/${rootId}/parts`);
    await page.waitForLoadState('networkidle');

    // Open the Add menu dropdown.
    await page.getByLabel('action-menu-add-parts').click();
    // Click the "Create Part" item.
    const createItem = page.getByLabel('action-menu-add-parts-create-part');
    await createItem.waitFor({ state: 'visible', timeout: 5000 });
    await createItem.click();

    // Modal opens. Fill required fields.
    const nameField = page.locator('input[name="name"]').first();
    await nameField.waitFor({ state: 'visible', timeout: 10_000 });
    await nameField.fill(state.partName);

    const ipnField = page.locator('input[name="IPN"]').first();
    if (await ipnField.isVisible().catch(() => false)) {
      await ipnField.fill(state.partIPN);
    }

    // Submit and wait for the POST /api/part/ response.
    const [response] = await Promise.all([
      page.waitForResponse(
        (r) => /\/api\/part\/$/.test(r.url()) && r.request().method() === 'POST',
        { timeout: 10_000 },
      ),
      page.getByRole('button', { name: 'Submit' }).click(),
    ]);
    expect([200, 201]).toContain(response.status());
    await writeState(state);
  });

  test('UI-PART-003 created part is searchable via API', async ({ page }) => {
    const state = await readState();
    if (!state.partName) test.skip(true, 'no part was created in prior step');
    const response = await page.request.get(
      `/api/part/?search=${encodeURIComponent(state.partName!)}`,
    );
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const list = Array.isArray(body)
      ? body
      : ((body as { results?: unknown[] }).results ?? []);
    expect(list.length).toBeGreaterThan(0);
  });

  test('UI-PART-004 edit the created part via action-menu-part-actions-edit → PATCH', async ({
    page,
  }) => {
    const state = await readState();
    if (!state.partName) test.skip(true, 'no part was created in prior step');

    // Find the part pk via page.request (GET is CSRF-exempt).
    const listRes = await page.request.get(
      `/api/part/?search=${encodeURIComponent(state.partName!)}`,
    );
    const listBody = (await listRes.json()) as unknown;
    const list = Array.isArray(listBody)
      ? (listBody as Array<{ pk?: number; name?: string }>)
      : ((listBody as { results?: Array<{ pk?: number; name?: string }> }).results ?? []);
    const pk = list.find((p) => p.name === state.partName)?.pk;
    if (typeof pk !== 'number') test.skip(true, 'cannot resolve part pk');

    await page.goto(`/web/part/${pk}/details`);
    await page.waitForLoadState('networkidle');
    await page.getByLabel('navigation-menu').waitFor({ state: 'visible', timeout: 10_000 });
    await page.waitForTimeout(1000);

    // Open the part actions menu and click Edit.
    await page.getByLabel('action-menu-part-actions').click();
    await page.getByLabel('action-menu-part-actions-edit').click();

    // The edit modal reuses the Part form. Wait for the name input to be populated.
    const descField = page.locator('textarea[name="description"], input[name="description"]').first();
    await descField.waitFor({ state: 'visible', timeout: 10_000 });
    const newDesc = `ui-edit-${Date.now()}`;
    await descField.fill(newDesc);

    // Submit and wait for the PATCH response.
    const [response] = await Promise.all([
      page.waitForResponse(
        (r) => /\/api\/part\/\d+\/?$/.test(r.url()) && r.request().method() === 'PATCH',
        { timeout: 10_000 },
      ),
      page.getByRole('button', { name: 'Submit' }).first().click(),
    ]);
    expect([200, 204]).toContain(response.status());
  });
});
