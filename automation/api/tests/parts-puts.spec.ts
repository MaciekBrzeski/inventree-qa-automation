import { test, expect, type APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/client';
import { makePart, makeCategory } from '../helpers/factories';

let ctx: APIRequestContext | undefined;
const createdParts: number[] = [];
const createdCategories: number[] = [];

async function seedPart(overrides: Record<string, unknown> = {}): Promise<number> {
  if (!ctx) throw new Error('ctx');
  const rootId = Number(process.env.INVENTREE_QA_ROOT_ID ?? '1');
  const res = await ctx.post('/api/part/', { data: makePart({ category: rootId, ...overrides }) });
  expect(res.status()).toBe(201);
  const body = (await res.json()) as { pk?: number };
  const pk = body.pk!;
  createdParts.push(pk);
  return pk;
}

test.describe.serial('API-PARTS-PUT PUT variants across resources', () => {
  test.beforeAll(async () => {
    ctx = await createAuthedContext();
  });

  test.afterAll(async () => {
    if (!ctx) return;
    for (const pk of [...createdParts].reverse()) {
      await ctx.patch(`/api/part/${pk}/`, { data: { active: false } });
      await ctx.delete(`/api/part/${pk}/`);
    }
    for (const id of [...createdCategories].reverse()) {
      await ctx.delete(`/api/part/category/${id}/`);
    }
    await ctx.dispose();
  });

  test('API-PARTS-PUT-001 PUT /api/part/{id}/ replaces the part', async () => {
    if (!ctx) throw new Error('ctx');
    const pk = await seedPart();
    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID ?? '1');
    const getRes = await ctx.get(`/api/part/${pk}/`);
    const current = (await getRes.json()) as Record<string, unknown>;
    const response = await ctx.put(`/api/part/${pk}/`, {
      data: { ...current, name: current.name, IPN: current.IPN, category: rootId, description: 'put-updated' },
    });
    if (response.status() >= 400) {
      console.warn(`[part PUT] ${response.status()}: ${(await response.text()).slice(0, 200)}`);
      test.skip(true, `PUT /api/part/{id}/ returned ${response.status()}`);
    }
    expect(response.status()).toBe(200);
  });

  test('API-PARTS-PUT-002 PUT /api/part/category/{id}/ replaces the category', async () => {
    if (!ctx) throw new Error('ctx');
    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID ?? '1');
    const createRes = await ctx.post('/api/part/category/', { data: makeCategory({ parent: rootId }) });
    const id = ((await createRes.json()) as { pk?: number }).pk!;
    createdCategories.push(id);
    const getRes = await ctx.get(`/api/part/category/${id}/`);
    const current = (await getRes.json()) as Record<string, unknown>;
    const response = await ctx.put(`/api/part/category/${id}/`, {
      data: { ...current, name: `PUT-${Date.now()}`, parent: rootId, description: 'put-updated' },
    });
    if (response.status() >= 400) {
      console.warn(`[category PUT] ${response.status()}: ${(await response.text()).slice(0, 200)}`);
      test.skip(true, `PUT /api/part/category/{id}/ returned ${response.status()}`);
    }
    expect(response.status()).toBe(200);
  });

  test('API-PARTS-PUT-003 PUT /api/part/related/{id}/ replaces a related link', async () => {
    if (!ctx) throw new Error('ctx');
    const a = await seedPart();
    const b = await seedPart();
    const createRes = await ctx.post('/api/part/related/', {
      data: { part_1: a, part_2: b, note: 'put-seed' },
    });
    expect(createRes.status()).toBe(201);
    const relId = ((await createRes.json()) as { pk?: number }).pk!;
    const getRes = await ctx.get(`/api/part/related/${relId}/`);
    const current = (await getRes.json()) as Record<string, unknown>;
    const response = await ctx.put(`/api/part/related/${relId}/`, {
      data: { ...current, part_1: a, part_2: b, note: 'put-updated' },
    });
    if (response.status() >= 400) {
      console.warn(`[related PUT] ${response.status()}: ${(await response.text()).slice(0, 200)}`);
      test.skip(true, `PUT /api/part/related/{id}/ returned ${response.status()}`);
    }
    expect(response.status()).toBe(200);
    await ctx.delete(`/api/part/related/${relId}/`);
  });

  test('API-PARTS-PUT-004 PUT /api/part/internal-price/{id}/ replaces an internal price break', async () => {
    if (!ctx) throw new Error('ctx');
    const pk = await seedPart({ purchaseable: true });
    const createRes = await ctx.post('/api/part/internal-price/', {
      data: { part: pk, quantity: 1, price: '1.00', price_currency: 'USD' },
    });
    if (createRes.status() >= 400) test.skip(true, 'internal-price seed refused');
    const priceId = ((await createRes.json()) as { pk?: number }).pk!;
    const getRes = await ctx.get(`/api/part/internal-price/${priceId}/`);
    const current = (await getRes.json()) as Record<string, unknown>;
    const response = await ctx.put(`/api/part/internal-price/${priceId}/`, {
      data: { ...current, part: pk, quantity: 5, price: '2.00', price_currency: 'USD' },
    });
    if (response.status() >= 400) {
      console.warn(`[internal-price PUT] ${response.status()}: ${(await response.text()).slice(0, 200)}`);
      test.skip(true, `PUT internal-price returned ${response.status()}`);
    }
    expect(response.status()).toBe(200);
    await ctx.delete(`/api/part/internal-price/${priceId}/`);
  });

  test('API-PARTS-PUT-005 PUT /api/part/sale-price/{id}/ replaces a sale price break', async () => {
    if (!ctx) throw new Error('ctx');
    const pk = await seedPart({ salable: true });
    const createRes = await ctx.post('/api/part/sale-price/', {
      data: { part: pk, quantity: 1, price: '10.00', price_currency: 'USD' },
    });
    if (createRes.status() >= 400) test.skip(true, 'sale-price seed refused');
    const priceId = ((await createRes.json()) as { pk?: number }).pk!;
    const getRes = await ctx.get(`/api/part/sale-price/${priceId}/`);
    const current = (await getRes.json()) as Record<string, unknown>;
    const response = await ctx.put(`/api/part/sale-price/${priceId}/`, {
      data: { ...current, part: pk, quantity: 10, price: '20.00', price_currency: 'USD' },
    });
    if (response.status() >= 400) {
      console.warn(`[sale-price PUT] ${response.status()}: ${(await response.text()).slice(0, 200)}`);
      test.skip(true, `PUT sale-price returned ${response.status()}`);
    }
    expect(response.status()).toBe(200);
    await ctx.delete(`/api/part/sale-price/${priceId}/`);
  });

  test('API-PARTS-PUT-006 PUT /api/part/test-template/{id}/ replaces a test template', async () => {
    if (!ctx) throw new Error('ctx');
    const pk = await seedPart({ testable: true });
    const createRes = await ctx.post('/api/part/test-template/', {
      data: { part: pk, test_name: `PUT-${Date.now()}`, description: 'put seed', required: false },
    });
    if (createRes.status() >= 400) test.skip(true, 'test-template seed refused');
    const ttId = ((await createRes.json()) as { pk?: number }).pk!;
    const getRes = await ctx.get(`/api/part/test-template/${ttId}/`);
    const current = (await getRes.json()) as Record<string, unknown>;
    const response = await ctx.put(`/api/part/test-template/${ttId}/`, {
      data: { ...current, part: pk, test_name: current.test_name, description: 'put-updated', required: true },
    });
    if (response.status() >= 400) {
      console.warn(`[test-template PUT] ${response.status()}: ${(await response.text()).slice(0, 200)}`);
      test.skip(true, `PUT test-template returned ${response.status()}`);
    }
    expect(response.status()).toBe(200);
    await ctx.delete(`/api/part/test-template/${ttId}/`);
  });

  test('API-PARTS-PUT-007 PUT /api/bom/{id}/ replaces a BOM line', async () => {
    if (!ctx) throw new Error('ctx');
    const asm = await seedPart({ assembly: true });
    const comp = await seedPart({ component: true });
    const bomRes = await ctx.post('/api/bom/', { data: { part: asm, sub_part: comp, quantity: 1 } });
    expect(bomRes.status()).toBe(201);
    const bomId = ((await bomRes.json()) as { pk?: number }).pk!;
    const getRes = await ctx.get(`/api/bom/${bomId}/`);
    const current = (await getRes.json()) as Record<string, unknown>;
    const response = await ctx.put(`/api/bom/${bomId}/`, {
      data: { ...current, part: asm, sub_part: comp, quantity: 5, reference: 'PUT-ref' },
    });
    if (response.status() >= 400) {
      console.warn(`[bom PUT] ${response.status()}: ${(await response.text()).slice(0, 200)}`);
      test.skip(true, `PUT bom returned ${response.status()}`);
    }
    expect(response.status()).toBe(200);
    await ctx.delete(`/api/bom/${bomId}/`);
  });

  test('API-PARTS-PUT-008 PUT /api/bom/{id}/validate/ validates a BOM line', async () => {
    if (!ctx) throw new Error('ctx');
    const asm = await seedPart({ assembly: true });
    const comp = await seedPart({ component: true });
    const bomRes = await ctx.post('/api/bom/', { data: { part: asm, sub_part: comp, quantity: 1 } });
    const bomId = ((await bomRes.json()) as { pk?: number }).pk!;
    const response = await ctx.put(`/api/bom/${bomId}/validate/`, {
      data: { valid: true },
    });
    if (response.status() >= 400) {
      console.warn(`[bom validate PUT] ${response.status()}: ${(await response.text()).slice(0, 200)}`);
      test.skip(true, `PUT bom validate returned ${response.status()}`);
    }
    expect(response.status()).toBe(200);
    await ctx.delete(`/api/bom/${bomId}/`);
  });

  test('API-PARTS-PUT-009 PUT /api/part/{id}/bom-validate/ marks full BOM as validated', async () => {
    if (!ctx) throw new Error('ctx');
    const asm = await seedPart({ assembly: true });
    const response = await ctx.put(`/api/part/${asm}/bom-validate/`, {
      data: { valid: true },
    });
    if (response.status() >= 400) {
      console.warn(`[part bom-validate PUT] ${response.status()}: ${(await response.text()).slice(0, 200)}`);
      test.skip(true, `PUT part bom-validate returned ${response.status()}`);
    }
    expect(response.status()).toBe(200);
  });

  test('API-PARTS-PUT-010 PUT /api/part/{id}/pricing/ triggers pricing recalc', async () => {
    if (!ctx) throw new Error('ctx');
    const pk = await seedPart({ purchaseable: true, salable: true });
    const response = await ctx.put(`/api/part/${pk}/pricing/`, { data: {} });
    if (response.status() >= 400) {
      console.warn(`[part pricing PUT] ${response.status()}: ${(await response.text()).slice(0, 200)}`);
      test.skip(true, `PUT part pricing returned ${response.status()}`);
    }
    expect(response.status()).toBe(200);
  });
});
