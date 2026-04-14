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
  return JSON.parse(await fs.readFile(STATE_PATH, 'utf8')) as CrudState;
}

async function deleteAllMatching(
  page: import('@playwright/test').Page,
  listPath: string,
  search: string,
  deletePath: (pk: number) => string,
  deactivateFirst: boolean,
): Promise<number> {
  const listResponse = await page.request.get(`${listPath}?search=${encodeURIComponent(search)}`);
  if (!listResponse.ok()) return 0;
  const raw = (await listResponse.json()) as unknown;
  const list = Array.isArray(raw)
    ? raw
    : ((raw as { results?: unknown[] }).results ?? []);
  let n = 0;
  for (const entry of list as Array<{ pk?: number }>) {
    if (typeof entry.pk !== 'number') continue;
    const path = deletePath(entry.pk);
    if (deactivateFirst) {
      await page.request.patch(path, { data: { active: false } });
    }
    const r = await page.request.delete(path);
    if (r.status() === 204 || r.status() === 404) n += 1;
  }
  return n;
}

test.describe.serial('UI-CLEANUP teardown at end of suite', () => {
  test('UI-CLEANUP-001 delete the UI-created part (if any)', async ({ page }) => {
    const state = await readState();
    if (!state.partName) test.skip(true, 'no part to clean up');
    const removed = await deleteAllMatching(
      page,
      '/api/part/',
      state.sessionTag,
      (pk) => `/api/part/${pk}/`,
      true,
    );
    expect(removed).toBeGreaterThanOrEqual(0);
  });

  test('UI-CLEANUP-002 delete the UI-created category (if any)', async ({ page }) => {
    const state = await readState();
    if (!state.categoryName) test.skip(true, 'no category to clean up');
    const removed = await deleteAllMatching(
      page,
      '/api/part/category/',
      state.sessionTag,
      (pk) => `/api/part/category/${pk}/`,
      false,
    );
    expect(removed).toBeGreaterThanOrEqual(0);
  });

  test('UI-CLEANUP-003 clear the state file', async () => {
    await fs.rm(STATE_PATH, { force: true });
  });
});
