import { test, expect } from '../fixtures/auth';
import type { APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/api';
import {
  createCategoryViaUi,
  createPartViaUi,
  deleteCategoryViaUi,
  deleteInactivePartViaUi,
  editPartViaUi,
  renameCategoryViaUi,
  togglePartAttributeViaUi,
} from '../paths/recipes';

let api: APIRequestContext | undefined;

test.describe.serial('UI-RECIPES library-driven flows (paths/recipes.ts)', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
  });

  test.afterAll(async () => {
    if (api) await api.dispose();
  });

  test('UI-RECIPE-001 createCategoryViaUi → POST /api/part/category/', async ({ page }) => {
    const name = `RECIPE-CAT-${Date.now()}`;
    const response = await createCategoryViaUi(page, { name });
    expect([200, 201]).toContain(response.status());
    // Cleanup via API so the test is idempotent.
    if (api) {
      const list = await api.get(`/api/part/category/?search=${encodeURIComponent(name)}`);
      const body = (await list.json()) as { results?: Array<{ pk?: number }> };
      for (const row of body.results ?? []) {
        if (typeof row.pk === 'number') await api.delete(`/api/part/category/${row.pk}/`);
      }
    }
  });

  test('UI-RECIPE-002 createPartViaUi → POST /api/part/ (under QA-ROOT)', async ({ page }) => {
    const rootPk = Number(process.env.INVENTREE_QA_ROOT_ID ?? '1');
    const name = `RECIPE-PART-${Date.now()}`;
    const response = await createPartViaUi(page, {
      rootCategoryPk: rootPk,
      name,
      ipn: `RP-${Date.now()}`,
    });
    expect([200, 201]).toContain(response.status());
    // Cleanup.
    if (api) {
      const list = await api.get(`/api/part/?search=${encodeURIComponent(name)}`);
      const body = (await list.json()) as { results?: Array<{ pk?: number }> };
      for (const row of body.results ?? []) {
        if (typeof row.pk === 'number') {
          await api.patch(`/api/part/${row.pk}/`, { data: { active: false } });
          await api.delete(`/api/part/${row.pk}/`);
        }
      }
    }
  });

  test('UI-RECIPE-003 editPartViaUi with a custom mutator → PATCH /api/part/{id}/', async ({
    page,
  }) => {
    if (!api) throw new Error('api');
    // Seed via API so the test targets the UI edit chain only.
    const seedRes = await api.post('/api/part/', {
      data: {
        name: `RECIPE-EDIT-${Date.now()}`,
        IPN: `RE-${Date.now()}`,
        category: Number(process.env.INVENTREE_QA_ROOT_ID ?? '1'),
      },
    });
    const pk = ((await seedRes.json()) as { pk?: number }).pk!;
    try {
      const response = await editPartViaUi(page, pk, async (p) => {
        const desc = p
          .locator('textarea[name="description"], input[name="description"]')
          .first();
        await desc.waitFor({ state: 'visible', timeout: 5000 });
        await desc.fill('recipe-edited');
      });
      expect([200, 204]).toContain(response.status());
    } finally {
      await api.patch(`/api/part/${pk}/`, { data: { active: false } });
      await api.delete(`/api/part/${pk}/`);
    }
  });

  test('UI-RECIPE-004 togglePartAttributeViaUi(assembly) → PATCH /api/part/{id}/', async ({
    page,
  }) => {
    if (!api) throw new Error('api');
    const seedRes = await api.post('/api/part/', {
      data: {
        name: `RECIPE-ATTR-${Date.now()}`,
        IPN: `RA-${Date.now()}`,
        category: Number(process.env.INVENTREE_QA_ROOT_ID ?? '1'),
      },
    });
    const pk = ((await seedRes.json()) as { pk?: number }).pk!;
    try {
      const response = await togglePartAttributeViaUi(page, pk, 'assembly');
      expect([200, 204]).toContain(response.status());
      const readback = await api.get(`/api/part/${pk}/`);
      expect(((await readback.json()) as { assembly?: boolean }).assembly).toBe(true);
    } finally {
      await api.patch(`/api/part/${pk}/`, { data: { active: false } });
      await api.delete(`/api/part/${pk}/`);
    }
  });

  test('UI-RECIPE-005 renameCategoryViaUi → PATCH /api/part/category/{id}/', async ({
    page,
  }) => {
    if (!api) throw new Error('api');
    const rootPk = Number(process.env.INVENTREE_QA_ROOT_ID ?? '1');
    const seedRes = await api.post('/api/part/category/', {
      data: { name: `RECIPE-REN-${Date.now()}`, parent: rootPk },
    });
    const pk = ((await seedRes.json()) as { pk?: number }).pk!;
    try {
      const response = await renameCategoryViaUi(page, pk, `RECIPE-RENAMED-${Date.now()}`);
      expect([200, 204]).toContain(response.status());
    } finally {
      await api.delete(`/api/part/category/${pk}/`);
    }
  });

  test('UI-RECIPE-006 deleteCategoryViaUi → DELETE /api/part/category/{id}/', async ({
    page,
  }) => {
    if (!api) throw new Error('api');
    const rootPk = Number(process.env.INVENTREE_QA_ROOT_ID ?? '1');
    const seedRes = await api.post('/api/part/category/', {
      data: { name: `RECIPE-DEL-${Date.now()}`, parent: rootPk },
    });
    const pk = ((await seedRes.json()) as { pk?: number }).pk!;
    const response = await deleteCategoryViaUi(page, pk);
    expect([200, 204]).toContain(response.status());
  });

  test('UI-RECIPE-007 deleteInactivePartViaUi → DELETE /api/part/{id}/', async ({ page }) => {
    if (!api) throw new Error('api');
    const seedRes = await api.post('/api/part/', {
      data: {
        name: `RECIPE-DELP-${Date.now()}`,
        IPN: `RDP-${Date.now()}`,
        category: Number(process.env.INVENTREE_QA_ROOT_ID ?? '1'),
      },
    });
    const pk = ((await seedRes.json()) as { pk?: number }).pk!;
    // Deactivate + reload is the caller's responsibility per INV-PARTS-001.
    await api.patch(`/api/part/${pk}/`, { data: { active: false } });
    // Reload not strictly needed here because the recipe calls gotoPartDetail fresh.
    const response = await deleteInactivePartViaUi(page, pk);
    expect([200, 204]).toContain(response.status());
  });
});
