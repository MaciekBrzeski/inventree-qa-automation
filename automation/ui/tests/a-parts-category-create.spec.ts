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

test.describe.serial('UI-CATEGORY create via UI', () => {
  test('UI-CATEGORY-001 navigate to the subcategories panel', async ({ page }) => {
    await page.goto('/web/part/category/index/subcategories');
    await expect(page.getByLabel('action-button-add-part-category')).toBeVisible({
      timeout: 15_000,
    });
  });

  test('UI-CATEGORY-002 open the Add Part Category modal and submit a new category', async ({
    page,
  }) => {
    const state = await readState();
    const name = `${state.sessionTag}-cat`;
    state.categoryName = name;

    await page.goto('/web/part/category/index/subcategories');
    const addBtn = page.getByLabel('action-button-add-part-category');
    await addBtn.waitFor({ state: 'visible', timeout: 15_000 });
    await addBtn.click();

    // Mantine modal opens. Name field is the first visible text input with a "Name" label.
    const nameField = page.locator('input[name="name"]').first();
    await nameField.waitFor({ state: 'visible', timeout: 10_000 });
    await nameField.fill(name);

    // Submit the form.
    const submit = page.getByRole('button', { name: 'Submit' }).first();
    await submit.click();

    // Modal closes on success. A notification toast usually shows, and the table refreshes.
    await page.waitForTimeout(1500);

    await writeState(state);
  });

  test('UI-CATEGORY-003 created category is searchable via API (recorder-captured)', async ({
    page,
  }) => {
    const state = await readState();
    expect(state.categoryName).toBeTruthy();
    // Use page.request so the call is in the same browser context and gets captured
    // by the per-test recorder fixture.
    const response = await page.request.get(
      `/api/part/category/?search=${encodeURIComponent(state.categoryName!)}`,
    );
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const list = Array.isArray(body)
      ? body
      : ((body as { results?: unknown[] }).results ?? []);
    expect(list.length).toBeGreaterThan(0);
  });
});
