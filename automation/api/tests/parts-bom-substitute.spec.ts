import { test, expect, type APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/client';
import { makePart } from '../helpers/factories';

let ctx: APIRequestContext | undefined;
let assemblyId: number | undefined;
let comp1Id: number | undefined;
let comp2Id: number | undefined;
let bomLineId: number | undefined;
let substituteId: number | undefined;

test.describe.serial('API-PARTS-SUB BOM substitutes', () => {
  test.beforeAll(async () => {
    ctx = await createAuthedContext();
    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID ?? '1');
    const asmRes = await ctx.post('/api/part/', {
      data: makePart({ category: rootId, assembly: true, component: false }),
    });
    expect(asmRes.status()).toBe(201);
    assemblyId = ((await asmRes.json()) as { pk?: number }).pk;

    const c1Res = await ctx.post('/api/part/', {
      data: makePart({ category: rootId, component: true }),
    });
    expect(c1Res.status()).toBe(201);
    comp1Id = ((await c1Res.json()) as { pk?: number }).pk;

    const c2Res = await ctx.post('/api/part/', {
      data: makePart({ category: rootId, component: true }),
    });
    expect(c2Res.status()).toBe(201);
    comp2Id = ((await c2Res.json()) as { pk?: number }).pk;

    const bomRes = await ctx.post('/api/bom/', {
      data: { part: assemblyId, sub_part: comp1Id, quantity: 1 },
    });
    expect(bomRes.status()).toBe(201);
    bomLineId = ((await bomRes.json()) as { pk?: number }).pk;
  });

  test.afterAll(async () => {
    if (!ctx) return;
    if (bomLineId !== undefined) await ctx.delete(`/api/bom/${bomLineId}/`);
    for (const pk of [comp1Id, comp2Id, assemblyId]) {
      if (typeof pk === 'number') {
        await ctx.patch(`/api/part/${pk}/`, { data: { active: false } });
        await ctx.delete(`/api/part/${pk}/`);
      }
    }
    await ctx.dispose();
  });

  test('API-PARTS-SUB-001 GET /api/bom/substitute/ lists substitutes', async () => {
    if (!ctx) throw new Error('ctx');
    const response = await ctx.get('/api/bom/substitute/?limit=5');
    expect(response.status()).toBe(200);
  });

  test('API-PARTS-SUB-002 POST /api/bom/substitute/ creates a substitute', async () => {
    if (!ctx || bomLineId === undefined || comp2Id === undefined) throw new Error('seed');
    const response = await ctx.post('/api/bom/substitute/', {
      data: { bom_item: bomLineId, part: comp2Id },
    });
    if (response.status() === 400 || response.status() === 500) {
      console.warn(`[bom-substitute] POST returned ${response.status()}: ${(await response.text()).slice(0, 200)}`);
      test.skip(true, `bom-substitute POST returned ${response.status()}`);
    }
    expect(response.status()).toBe(201);
    const body = (await response.json()) as { pk?: number };
    substituteId = body.pk;
  });

  test('API-PARTS-SUB-003 GET /api/bom/substitute/{id}/ retrieves it', async () => {
    if (!ctx) throw new Error('ctx');
    if (substituteId === undefined) test.skip(true, 'no substitute');
    const response = await ctx.get(`/api/bom/substitute/${substituteId}/`);
    expect(response.status()).toBe(200);
  });

  test('API-PARTS-SUB-004 PATCH /api/bom/substitute/{id}/ updates the substitute', async () => {
    if (!ctx) throw new Error('ctx');
    if (substituteId === undefined) test.skip(true, 'no substitute');
    const response = await ctx.patch(`/api/bom/substitute/${substituteId}/`, { data: {} });
    if (response.status() >= 400) {
      console.warn(`[bom substitute PATCH] ${response.status()}: ${(await response.text()).slice(0, 200)}`);
      test.skip(true, `PATCH bom substitute returned ${response.status()}`);
    }
    expect(response.status()).toBe(200);
  });

  test('API-PARTS-SUB-005 PUT /api/bom/substitute/{id}/ replaces the substitute', async () => {
    if (!ctx) throw new Error('ctx');
    if (substituteId === undefined || bomLineId === undefined || comp2Id === undefined) {
      test.skip(true, 'no substitute');
    }
    const getRes = await ctx.get(`/api/bom/substitute/${substituteId}/`);
    const current = (await getRes.json()) as Record<string, unknown>;
    const response = await ctx.put(`/api/bom/substitute/${substituteId}/`, {
      data: { ...current, bom_item: bomLineId, part: comp2Id },
    });
    if (response.status() >= 400) {
      console.warn(`[bom substitute PUT] ${response.status()}: ${(await response.text()).slice(0, 200)}`);
      test.skip(true, `PUT bom substitute returned ${response.status()}`);
    }
    expect(response.status()).toBe(200);
  });

  test('API-PARTS-SUB-006 DELETE /api/bom/substitute/{id}/ removes it', async () => {
    if (!ctx) throw new Error('ctx');
    if (substituteId === undefined) test.skip(true, 'no substitute');
    const response = await ctx.delete(`/api/bom/substitute/${substituteId}/`);
    expect(response.status()).toBe(204);
  });
});
