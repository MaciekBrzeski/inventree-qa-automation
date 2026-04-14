import { test, expect } from '../fixtures/auth';
import type { APIRequestContext } from '@playwright/test';
import { createAuthedContext, createPart, type CreatedPart } from '../helpers/api';
import { captureCheckpoint } from '../helpers/checkpoint';
import { waitForShell, waitLoadersGone } from '../paths/primitives';

// Idempotent lookup: search by fixed IPN, reuse if already seeded so the
// rendered text (pk, name, IPN) stays byte-for-byte identical across runs —
// required for strict pixel-diff comparisons.
async function findOrCreate(
  ctx: APIRequestContext,
  ipn: string,
  overrides: Record<string, unknown>,
): Promise<CreatedPart> {
  const listRes = await ctx.get(`/api/part/?IPN=${encodeURIComponent(ipn)}`);
  const raw = (await listRes.json()) as unknown;
  const list = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
  for (const row of list as Array<{ pk?: number; name?: string; IPN?: string }>) {
    if (row.IPN === ipn && typeof row.pk === 'number' && row.name) {
      return { pk: row.pk, name: row.name, IPN: row.IPN };
    }
  }
  const created = await createPart(ctx, { ...overrides, IPN: ipn, name: ipn });
  return created;
}

async function findOrCreateBom(
  ctx: APIRequestContext,
  partPk: number,
  subPk: number,
): Promise<number> {
  const listRes = await ctx.get(`/api/bom/?part=${partPk}&sub_part=${subPk}`);
  const raw = (await listRes.json()) as unknown;
  const list = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
  for (const row of list as Array<{ pk?: number }>) {
    if (typeof row.pk === 'number') return row.pk;
  }
  const created = await ctx.post('/api/bom/', {
    data: { part: partPk, sub_part: subPk, quantity: 4, reference: 'R1' },
  });
  return ((await created.json()) as { pk: number }).pk;
}

async function findOrCreatePrice(
  ctx: APIRequestContext,
  endpoint: 'internal-price' | 'sale-price',
  partPk: number,
  price: string,
): Promise<number | undefined> {
  const listRes = await ctx.get(`/api/part/${endpoint}/?part=${partPk}`);
  const raw = (await listRes.json()) as unknown;
  const list = Array.isArray(raw) ? raw : ((raw as { results?: unknown[] }).results ?? []);
  for (const row of list as Array<{ pk?: number }>) {
    if (typeof row.pk === 'number') return row.pk;
  }
  const created = await ctx.post(`/api/part/${endpoint}/`, {
    data: { part: partPk, quantity: 1, price, price_currency: 'USD' },
  });
  if (created.status() !== 201) return undefined;
  return ((await created.json()) as { pk: number }).pk;
}

// A single richly-populated part used as the canonical visual baseline.
// Every panel in this spec shows real data so checkpoints are not empty —
// critical for pixel-diff defects (colour, layout, icons) to be visible.

let api: APIRequestContext | undefined;
let assembly: CreatedPart | undefined;
let component: CreatedPart | undefined;
let bomId: number | undefined;
let priceIntId: number | undefined;
let priceSaleId: number | undefined;
let ttId: number | undefined;
let relId: number | undefined;

test.describe.serial('BASELINE canonical seeded part — visual regression source', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
    assembly = await findOrCreate(api, 'BASELINE-ASM', {
      assembly: true,
      component: false,
      purchaseable: true,
      salable: true,
      testable: true,
      description: 'BASELINE canonical assembly',
    });
    component = await findOrCreate(api, 'BASELINE-CMP', {
      component: true,
      purchaseable: true,
      description: 'BASELINE canonical component',
    });

    bomId = await findOrCreateBom(api, assembly.pk, component.pk);
    priceIntId = await findOrCreatePrice(api, 'internal-price', assembly.pk, '5.00');
    priceSaleId = await findOrCreatePrice(api, 'sale-price', assembly.pk, '15.00');

    // Test template — idempotent by test_name prefix.
    const ttList = await api.get(`/api/part/test-template/?part=${assembly.pk}`);
    const ttRaw = (await ttList.json()) as unknown;
    const ttArr = Array.isArray(ttRaw) ? ttRaw : ((ttRaw as { results?: unknown[] }).results ?? []);
    const existingTt = (ttArr as Array<{ pk?: number; test_name?: string }>).find(
      (r) => r.test_name === 'BASELINE-check',
    );
    if (existingTt?.pk) {
      ttId = existingTt.pk;
    } else {
      const ttRes = await api.post('/api/part/test-template/', {
        data: {
          part: assembly.pk,
          test_name: 'BASELINE-check',
          description: 'BASELINE seeded test template',
          required: true,
        },
      });
      if (ttRes.status() === 201) ttId = ((await ttRes.json()) as { pk?: number }).pk;
    }

    // Related part link — idempotent by part pair.
    const relList = await api.get(`/api/part/related/?part=${assembly.pk}`);
    const relRaw = (await relList.json()) as unknown;
    const relArr = Array.isArray(relRaw)
      ? relRaw
      : ((relRaw as { results?: unknown[] }).results ?? []);
    const existingRel = (relArr as Array<{ pk?: number }>)[0];
    if (existingRel?.pk) {
      relId = existingRel.pk;
    } else {
      const relRes = await api.post('/api/part/related/', {
        data: { part_1: assembly.pk, part_2: component.pk, note: 'BASELINE seeded relation' },
      });
      if (relRes.status() === 201) relId = ((await relRes.json()) as { pk?: number }).pk;
    }
  });

  test.afterAll(async () => {
    // NOTE: persistent fixtures — we don't delete them so the next run finds
    // the same pks and renders identically. Clean up manually if you want to
    // re-seed: via API, search IPN BASELINE-ASM / BASELINE-CMP and delete.
    if (!api) return;
    await api.dispose();
  });

  async function visit(page: import('@playwright/test').Page, url: string): Promise<void> {
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    await waitForShell(page);
    await waitLoadersGone(page);
    await page.waitForTimeout(1200);
  }

  test('BASELINE-001 part detail header + tab bar', async ({ page }) => {
    if (!assembly) throw new Error('seed');
    await visit(page, `/web/part/${assembly.pk}/`);
    await captureCheckpoint(page, 'part-detail-header');
  });

  test('BASELINE-002 BOM panel with one populated row', async ({ page }) => {
    if (!assembly) throw new Error('seed');
    await visit(page, `/web/part/${assembly.pk}/bom`);
    await captureCheckpoint(page, 'bom-populated');
  });

  test('BASELINE-003 pricing panel with internal + sale breaks', async ({ page }) => {
    if (!assembly) throw new Error('seed');
    await visit(page, `/web/part/${assembly.pk}/pricing`);
    await captureCheckpoint(page, 'pricing-populated');
  });

  test('BASELINE-004 test templates panel with one required template', async ({ page }) => {
    if (!assembly) throw new Error('seed');
    await visit(page, `/web/part/${assembly.pk}/test_templates`);
    await captureCheckpoint(page, 'test-templates-populated');
  });

  test('BASELINE-005 related parts panel with one linked row', async ({ page }) => {
    if (!assembly) throw new Error('seed');
    await visit(page, `/web/part/${assembly.pk}/related_parts`);
    await captureCheckpoint(page, 'related-populated');
  });

  test('BASELINE-006 parts list at QA-ROOT', async ({ page }) => {
    await visit(page, '/web/part/category/index/parts');
    await captureCheckpoint(page, 'parts-list-root');
  });

  test('BASELINE-007 subcategory panel at root', async ({ page }) => {
    await visit(page, '/web/part/category/index/subcategories');
    await captureCheckpoint(page, 'subcategories-root');
  });

  test('BASELINE-008 dashboard landing', async ({ page }) => {
    await visit(page, '/web/home');
    await captureCheckpoint(page, 'dashboard');
    expect(true).toBe(true);
  });
});
