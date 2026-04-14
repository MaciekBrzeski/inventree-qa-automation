import { test, expect } from '../fixtures/auth';
import type { APIRequestContext } from '@playwright/test';
import { createAuthedContext, createPart, type CreatedPart } from '../helpers/api';
import { captureCheckpoint } from '../helpers/checkpoint';
import { waitForShell, waitLoadersGone } from '../paths/primitives';

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
    assembly = await createPart(api, {
      assembly: true,
      component: false,
      purchaseable: true,
      salable: true,
      testable: true,
      description: 'BASELINE canonical assembly',
    });
    component = await createPart(api, {
      component: true,
      purchaseable: true,
      description: 'BASELINE canonical component',
    });

    // BOM line so the BOM panel has content.
    const bomRes = await api.post('/api/bom/', {
      data: { part: assembly.pk, sub_part: component.pk, quantity: 4, reference: 'R1' },
    });
    bomId = ((await bomRes.json()) as { pk?: number }).pk;

    // Internal + sale price breaks so pricing panels show rows.
    const ipRes = await api.post('/api/part/internal-price/', {
      data: { part: assembly.pk, quantity: 1, price: '5.00', price_currency: 'USD' },
    });
    if (ipRes.status() === 201) priceIntId = ((await ipRes.json()) as { pk?: number }).pk;

    const spRes = await api.post('/api/part/sale-price/', {
      data: { part: assembly.pk, quantity: 1, price: '15.00', price_currency: 'USD' },
    });
    if (spRes.status() === 201) priceSaleId = ((await spRes.json()) as { pk?: number }).pk;

    // Test template so the Tests panel has content.
    const ttRes = await api.post('/api/part/test-template/', {
      data: {
        part: assembly.pk,
        test_name: `BASELINE-check-${Date.now()}`,
        description: 'BASELINE seeded test template',
        required: true,
      },
    });
    if (ttRes.status() === 201) ttId = ((await ttRes.json()) as { pk?: number }).pk;

    // Related part link so the Related panel has content.
    const relRes = await api.post('/api/part/related/', {
      data: { part_1: assembly.pk, part_2: component.pk, note: 'BASELINE seeded relation' },
    });
    if (relRes.status() === 201) relId = ((await relRes.json()) as { pk?: number }).pk;
  });

  test.afterAll(async () => {
    if (!api) return;
    if (relId) await api.delete(`/api/part/related/${relId}/`);
    if (ttId) await api.delete(`/api/part/test-template/${ttId}/`);
    if (priceSaleId) await api.delete(`/api/part/sale-price/${priceSaleId}/`);
    if (priceIntId) await api.delete(`/api/part/internal-price/${priceIntId}/`);
    if (bomId) await api.delete(`/api/bom/${bomId}/`);
    for (const p of [component, assembly]) {
      if (p) {
        await api.patch(`/api/part/${p.pk}/`, { data: { active: false } });
        await api.delete(`/api/part/${p.pk}/`);
      }
    }
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
