import { test, expect } from '../fixtures/auth';
import type { APIRequestContext } from '@playwright/test';
import { createAuthedContext, createPart, type CreatedPart } from '../helpers/api';
import { waitForShell, waitLoadersGone } from '../paths/primitives';

// Close DELETE /api/bom/{id}/ (individual row, not bulk).
// Drafted using library examples:
//   good/row-action-menu-delete/substitute-delete (dialog pattern)
//   bad/strict-mode-violation/delete-trigger-match (scope to dialog!)

let api: APIRequestContext | undefined;
let assembly: CreatedPart | undefined;
let component: CreatedPart | undefined;

test.describe.serial('UI-BOM-DEL individual BOM row delete', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
    assembly = await createPart(api, { assembly: true, component: false });
    component = await createPart(api, { component: true, purchaseable: true });
  });

  test.afterAll(async () => {
    if (!api) return;
    try {
      const listRes = await api.get(`/api/bom/?part=${assembly?.pk}`);
      const raw = (await listRes.json()) as unknown;
      const list = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
      for (const row of list as Array<{ pk?: number }>) {
        if (typeof row.pk === 'number') await api.delete(`/api/bom/${row.pk}/`);
      }
    } catch { /* ignore */ }
    for (const p of [component, assembly]) {
      if (p) {
        await api.patch(`/api/part/${p.pk}/`, { data: { active: false } });
        await api.delete(`/api/part/${p.pk}/`);
      }
    }
    await api.dispose();
  });

  test('UI-BOM-DEL-001 delete a single BOM row via row-action-menu → DELETE /api/bom/{id}/', async ({ page }) => {
    if (!assembly || !component || !api) throw new Error('seed');
    const seed = await api.post('/api/bom/', {
      data: { part: assembly.pk, sub_part: component.pk, quantity: 1 },
    });
    expect(seed.status()).toBe(201);

    await page.goto(`/web/part/${assembly.pk}/bom`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(1200);

    await page.getByLabel('row-action-menu-0').first().click();
    await page.getByRole('menuitem', { name: 'Delete', exact: true }).first().click();

    // Library lesson: scope confirm to dialog to avoid strict-mode violation
    // (bad/strict-mode-violation/delete-trigger-match).
    const dialog = page.getByRole('dialog');
    await dialog.waitFor({ state: 'visible', timeout: 5000 });
    const confirm = dialog
      .getByRole('button', { name: 'Submit', exact: true })
      .or(dialog.getByRole('button', { name: 'Delete', exact: true }))
      .first();

    const [response] = await Promise.all([
      page.waitForResponse(
        (r) => r.request().method() === 'DELETE' && /\/api\/bom\/\d+\/?$/.test(r.url()),
        { timeout: 10_000 },
      ),
      confirm.click(),
    ]);
    expect([200, 204]).toContain(response.status());
  });
});
