import { test, expect } from '../fixtures/auth';
import type { APIRequestContext } from '@playwright/test';
import { createAuthedContext, createPart, type CreatedPart } from '../helpers/api';
import { fillRelatedField, fillTextField, submitButton } from '../helpers/mantine';
import { waitForShell, waitLoadersGone } from '../paths/primitives';

let api: APIRequestContext | undefined;
let partA: CreatedPart | undefined;
let partB: CreatedPart | undefined;

test.describe.serial('UI-REL related-parts panel flows', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
    const stamp = Date.now();
    partA = await createPart(api, { description: `UI-REL-A-${stamp}` });
    partB = await createPart(api, { description: `UI-REL-B-${stamp}` });
  });

  test.afterAll(async () => {
    if (!api) return;
    // Clean up any related links referencing partA.
    try {
      const listRes = await api.get(`/api/part/related/?part=${partA?.pk}`);
      const raw = (await listRes.json()) as unknown;
      const list = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
      for (const row of list as Array<{ pk?: number }>) {
        if (typeof row.pk === 'number') await api.delete(`/api/part/related/${row.pk}/`);
      }
    } catch {
      /* ignore */
    }
    for (const p of [partA, partB]) {
      if (p) {
        await api.patch(`/api/part/${p.pk}/`, { data: { active: false } });
        await api.delete(`/api/part/${p.pk}/`);
      }
    }
    await api.dispose();
  });

  test('UI-REL-001 create a related-parts link via action-button-add-related-part → POST /api/part/related/', async ({
    page,
  }) => {
    if (!partA || !partB) throw new Error('seed');
    await page.goto(`/web/part/${partA.pk}/related_parts`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(1000);

    await page.getByLabel('action-button-add-related-part').click();
    // Mantine combobox search for partB by IPN fragment.
    await fillRelatedField(page, 'part_2', partB.IPN.slice(-10));
    await fillTextField(page, 'note', 'ui-rel-note');

    const [response] = await Promise.all([
      page.waitForResponse(
        (r) => /\/api\/part\/related\/$/.test(r.url()) && r.request().method() === 'POST',
        { timeout: 10_000 },
      ),
      submitButton(page).click(),
    ]);
    expect([200, 201]).toContain(response.status());
  });

  test('UI-REL-002 delete the related-parts link via row-action-menu → DELETE /api/part/related/{id}/', async ({
    page,
  }) => {
    if (!partA || !api) throw new Error('seed');
    // Guarantee at least one row exists.
    const listCheck = await api.get(`/api/part/related/?part=${partA.pk}`);
    const listBody = (await listCheck.json()) as unknown;
    const existing = Array.isArray(listBody)
      ? listBody
      : ((listBody as { results?: unknown[] }).results ?? []);
    if (existing.length === 0 && partB) {
      await api.post('/api/part/related/', {
        data: { part_1: partA.pk, part_2: partB.pk, note: 'seed' },
      });
    }

    await page.goto(`/web/part/${partA.pk}/related_parts`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(1500);

    // Open the first row's action menu and click its Delete item.
    await page.getByLabel('row-action-menu-0').first().click();
    await page.waitForTimeout(400);
    await page.getByRole('menuitem', { name: 'Delete' }).first().click();

    // Confirm dialog. Scope to dialog to avoid matching the trigger itself.
    const dialog = page.getByRole('dialog');
    await dialog.waitFor({ state: 'visible', timeout: 5000 });
    const confirm = dialog
      .getByRole('button', { name: 'Submit', exact: true })
      .or(dialog.getByRole('button', { name: 'Delete', exact: true }))
      .first();

    const [response] = await Promise.all([
      page.waitForResponse(
        (r) =>
          r.request().method() === 'DELETE' && /\/api\/part\/related\/\d+\/?$/.test(r.url()),
        { timeout: 10_000 },
      ),
      confirm.click(),
    ]);
    expect([200, 204]).toContain(response.status());
  });

  test('UI-REL-003 edit the related-parts note via row-action-menu Edit → PATCH /api/part/related/{id}/', async ({
    page,
  }) => {
    if (!partA || !partB || !api) throw new Error('seed');
    const seed = await api.post('/api/part/related/', {
      data: { part_1: partA.pk, part_2: partB.pk, note: 'before-edit' },
    });
    expect(seed.status()).toBe(201);
    const relId = ((await seed.json()) as { pk?: number }).pk!;

    await page.goto(`/web/part/${partA.pk}/related_parts`);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(1500);

    await page.getByLabel('row-action-menu-0').first().click();
    await page.getByRole('menuitem', { name: 'Edit', exact: true }).first().click();

    const note = page.getByLabel('text-field-note').first();
    await note.waitFor({ state: 'visible', timeout: 5000 });
    await note.fill('edited-by-ui');

    const submit = page.getByRole('button', { name: 'Submit' }).first();
    const [response] = await Promise.all([
      page.waitForResponse(
        (r) =>
          /\/api\/part\/related\/\d+\/?$/.test(r.url()) && r.request().method() === 'PATCH',
        { timeout: 10_000 },
      ),
      submit.click(),
    ]);
    expect([200, 204]).toContain(response.status());
    await api.delete(`/api/part/related/${relId}/`);
  });
});
