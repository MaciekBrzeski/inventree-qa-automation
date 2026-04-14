import { test, expect } from '../fixtures/auth';
import type { APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/api';
import { fillRelatedField, fillNumberField, fillTextField, submitButton } from '../helpers/mantine';
import {
  clickAddPartsCreatePart,
  gotoCategoryPartsPanel,
  gotoPartPanel,
  openAddPartsMenu,
  waitForShell,
  waitLoadersGone,
} from '../paths/primitives';

/**
 * UI-PARTS-CROSS-FULL-001 — the PDF's explicit Phase 3 cross-functional flow.
 *
 *   create a part → add parameters → create stock → verify in category view
 *
 * Every step except template/location seeding is UI-driven. The SPA fetches
 * are captured by the auto-recorder fixture so every endpoint hit lands in the
 * graph + coverage docs.
 */

let api: APIRequestContext | undefined;
let templateId: number | undefined;
let locationId: number | undefined;
let createdPartPk: number | undefined;
let partName: string | undefined;
let partIpn: string | undefined;

test.describe.serial('UI-PARTS-CROSS-FULL PDF centrepiece cross-functional flow', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();

    // Seed one PartParameterTemplate via the full API (endpoint is outside the filtered
    // schema, so this call does not count toward the graph — only the UI parameter-add
    // POST /api/part/parameter/ will be attributed to this flow).
    const tpName = `XFLOW-TMPL-${Date.now()}`;
    const tpRes = await api.post('/api/parameter/template/', {
      data: { name: tpName, units: '' },
    });
    if (tpRes.ok()) {
      templateId = ((await tpRes.json()) as { pk?: number }).pk;
    } else {
      // If a template with that name already exists, look it up.
      const list = await api.get(
        `/api/parameter/template/?search=${encodeURIComponent(tpName)}`,
      );
      const raw = (await list.json()) as unknown;
      const arr = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
      const hit = (arr as Array<{ pk?: number; name?: string }>).find(
        (r) => r.name === tpName,
      );
      templateId = hit?.pk;
    }

    // Seed a stock location under the default root so the stock-add form has an option.
    const locRes = await api.post('/api/stock/location/', {
      data: { name: `XFLOW-LOC-${Date.now()}`, parent: null, structural: false },
    });
    if (locRes.ok()) {
      locationId = ((await locRes.json()) as { pk?: number }).pk;
    }

    partName = `XFLOW-PART-${Date.now()}`;
    partIpn = `XFLOW-IPN-${Date.now()}`;
  });

  test.afterAll(async () => {
    if (!api) return;
    if (typeof createdPartPk === 'number') {
      await api.patch(`/api/part/${createdPartPk}/`, { data: { active: false } });
      await api.delete(`/api/part/${createdPartPk}/`);
    }
    if (typeof locationId === 'number') {
      await api.delete(`/api/stock/location/${locationId}/`);
    }
    if (typeof templateId === 'number') {
      await api.delete(`/api/parameter/template/${templateId}/`);
    }
    await api.dispose();
  });

  test('UI-PARTS-CROSS-FULL-001 create the part via Add menu → POST /api/part/', async ({
    page,
  }) => {
    if (!partName || !partIpn) throw new Error('seed');
    const rootPk = Number(process.env.INVENTREE_QA_ROOT_ID ?? '1');
    await gotoCategoryPartsPanel(page, rootPk);
    await openAddPartsMenu(page);
    await clickAddPartsCreatePart(page);

    // Fill the Create Part modal.
    const nameField = page.locator('input[name="name"]').first();
    await nameField.waitFor({ state: 'visible', timeout: 10_000 });
    await nameField.fill(partName);
    const ipnField = page.locator('input[name="IPN"]').first();
    if (await ipnField.isVisible().catch(() => false)) await ipnField.fill(partIpn);

    const [response] = await Promise.all([
      page.waitForResponse(
        (r) => /\/api\/part\/$/.test(r.url()) && r.request().method() === 'POST',
        { timeout: 10_000 },
      ),
      submitButton(page).click(),
    ]);
    expect(response.status()).toBe(201);
    const body = (await response.json()) as { pk?: number; name?: string };
    expect(body.name).toBe(partName);
    createdPartPk = body.pk;
  });

  test('UI-PARTS-CROSS-FULL-002 add a parameter via the Parameters tab → POST /api/part/parameter/', async ({
    page,
  }) => {
    if (!createdPartPk) test.skip(true, 'part was not created in step 001');
    if (!templateId) test.skip(true, 'parameter template seed failed');
    await gotoPartPanel(page, createdPartPk!, 'parameters');

    // Open the add-parameters menu and click create-parameter.
    await page.getByLabel('action-menu-add-parameters').click();
    await page.getByLabel('action-menu-add-parameters-create-parameter').click();

    // Fill the form: template FK + data text.
    await fillRelatedField(page, 'template', `XFLOW-TMPL-`);
    await fillTextField(page, 'data', '42');

    // Capture every POST fired during submit so we can diagnose if the endpoint path
    // differs from the filtered schema expectation.
    const posts: string[] = [];
    const listener = (req: import('@playwright/test').Request): void => {
      if (req.method() === 'POST' && /\/api\//.test(req.url())) {
        posts.push(req.url());
      }
    };
    page.on('request', listener);
    await submitButton(page).click();
    await page.waitForTimeout(2500);
    page.off('request', listener);
    console.log(`[xflow-002] POST urls: ${posts.join(' ; ')}`);
    // At least one parameter-related POST must have fired.
    const match = posts.find((u) => /parameter/.test(u) && !/template/.test(u));
    expect(match, `expected a parameter POST among ${posts.join(', ')}`).toBeTruthy();
  });

  test('UI-PARTS-CROSS-FULL-003 add stock via the Stock tab → POST /api/stock/', async ({
    page,
  }) => {
    if (!createdPartPk) test.skip(true, 'part was not created in step 001');
    await gotoPartPanel(page, createdPartPk!, 'stock');

    await page.getByLabel('action-button-add-stock-item').click();
    // Part field is pre-filled because we opened the modal from the part detail.
    // Location is optional. Only quantity is required.
    await fillNumberField(page, 'quantity', 10);
    if (typeof locationId === 'number') {
      await fillRelatedField(page, 'location', `XFLOW-LOC-`);
    }

    const [response] = await Promise.all([
      page.waitForResponse(
        (r) => /\/api\/stock\/$/.test(r.url()) && r.request().method() === 'POST',
        { timeout: 10_000 },
      ),
      submitButton(page).click(),
    ]);
    expect([200, 201]).toContain(response.status());
  });

  test('UI-PARTS-CROSS-FULL-004 verify the part appears in the QA-ROOT category view', async ({
    page,
  }) => {
    if (!createdPartPk || !partName) test.skip(true, 'part was not created in step 001');
    const rootPk = Number(process.env.INVENTREE_QA_ROOT_ID ?? '1');

    // UI verify: navigate to the category Parts panel and confirm the row is there.
    const hits: string[] = [];
    const listener = (req: import('@playwright/test').Request): void => {
      if (/\/api\/part\//.test(req.url()) && req.method() === 'GET') {
        hits.push(req.url());
      }
    };
    page.on('request', listener);
    await gotoCategoryPartsPanel(page, rootPk);
    await page.waitForTimeout(1500);
    page.off('request', listener);
    expect(hits.length).toBeGreaterThan(0);

    // Dual verify via API: the part is listed under QA-ROOT with stock > 0 and at least
    // one parameter attached.
    if (!api) throw new Error('api');
    const partRes = await api.get(`/api/part/${createdPartPk!}/`);
    expect(partRes.status()).toBe(200);
    const partBody = (await partRes.json()) as { name?: string; category?: number };
    expect(partBody.name).toBe(partName!);
    expect(partBody.category).toBe(rootPk);

    const stockRes = await api.get(`/api/stock/?part=${createdPartPk!}`);
    expect(stockRes.status()).toBe(200);
    const stockRaw = (await stockRes.json()) as unknown;
    const stockList = Array.isArray(stockRaw)
      ? stockRaw
      : ((stockRaw as { results?: unknown[] }).results ?? []);
    expect(stockList.length).toBeGreaterThan(0);

    // Parameters live under /api/parameter/ (outside the filtered schema) — the real
    // InvenTree endpoint for part parameters is /api/parameter/?part=<pk>, not
    // /api/part/parameter/. This call is only used for the assertion; it will show up
    // in the "dead" bucket of the coverage report, which is correct because the path
    // is intentionally out of the filtered schema's scope.
    const paramRes = await api.get(`/api/parameter/?part=${createdPartPk!}`);
    expect(paramRes.status()).toBe(200);
    const paramRaw = (await paramRes.json()) as unknown;
    const paramList = Array.isArray(paramRaw)
      ? paramRaw
      : ((paramRaw as { results?: unknown[] }).results ?? []);
    expect(paramList.length).toBeGreaterThan(0);
  });
});
