import { test, expect } from '../fixtures/auth';
import type { APIRequestContext } from '@playwright/test';
import { createAuthedContext, createPart, type CreatedPart } from '../helpers/api';
import { waitForShell, waitLoadersGone } from '../paths/primitives';

// Close the bom/substitute DELETE gap: the Edit Substitutes dialog on a BOM
// row exposes an `action-button-remove-this-row` icon per substitute. Opening
// the dialog also fires GET /api/bom/substitute/?bom_item=<id> which closes
// the GET list endpoint in the same pass.

let api: APIRequestContext | undefined;
let assembly: CreatedPart | undefined;
let component: CreatedPart | undefined;
let substitutePart: CreatedPart | undefined;

test.describe.serial('UI-SUBSTITUTE bom substitute delete via row dialog', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
    assembly = await createPart(api, {
      assembly: true,
      component: false,
      description: 'UI-SUBSTITUTE assembly',
    });
    component = await createPart(api, {
      component: true,
      purchaseable: true,
      description: 'UI-SUBSTITUTE component',
    });
    substitutePart = await createPart(api, {
      component: true,
      purchaseable: true,
      description: 'UI-SUBSTITUTE alt',
    });
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
    } catch {
      /* ignore */
    }
    for (const p of [substitutePart, component, assembly]) {
      if (p) {
        await api.patch(`/api/part/${p.pk}/`, { data: { active: false } });
        await api.delete(`/api/part/${p.pk}/`);
      }
    }
    await api.dispose();
  });

  test('UI-SUBSTITUTE-001 delete an existing BOM substitute via Edit Substitutes dialog → DELETE /api/bom/substitute/{id}/', async ({
    page,
  }) => {
    if (!assembly || !component || !substitutePart || !api) throw new Error('seed');
    // Fresh BOM line + substitute per test.
    const bomRes = await api.post('/api/bom/', {
      data: { part: assembly.pk, sub_part: component.pk, quantity: 1 },
    });
    expect(bomRes.status()).toBe(201);
    const bomId = ((await bomRes.json()) as { pk?: number }).pk!;

    const subRes = await api.post('/api/bom/substitute/', {
      data: { bom_item: bomId, part: substitutePart.pk },
    });
    expect(subRes.status()).toBe(201);

    await page.goto(`/web/part/${assembly.pk}/bom`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(1200);

    await page.getByLabel('row-action-menu-0').first().click();
    await page
      .getByRole('menuitem', { name: 'Edit Substitutes', exact: true })
      .first()
      .click();

    // Wait for the dialog + the substitute row + its remove icon to render.
    const dialog = page.getByRole('dialog');
    await dialog.waitFor({ state: 'visible', timeout: 5000 });
    const removeBtn = dialog.getByLabel('action-button-remove-this-row').first();
    await removeBtn.waitFor({ state: 'visible', timeout: 5000 });

    const [response] = await Promise.all([
      page.waitForResponse(
        (r) =>
          r.request().method() === 'DELETE' &&
          /\/api\/bom\/substitute\/\d+\/?$/.test(r.url()),
        { timeout: 10_000 },
      ),
      removeBtn.click(),
    ]);
    expect([200, 204]).toContain(response.status());

    // Close dialog + clean up the BOM line for the next run.
    await page.keyboard.press('Escape');
    await api.delete(`/api/bom/${bomId}/`);
  });
});
