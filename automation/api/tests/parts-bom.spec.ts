import { test, expect, type APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/client';
import { validateResponse } from '../helpers/schema';
import { makePart, type PartInput } from '../helpers/factories';

let ctx: APIRequestContext | undefined;
let assemblyId: number | undefined;
let componentId: number | undefined;
let bomId: number | undefined;

test.describe.serial('API-PARTS-BOM bill of materials', () => {
  test.beforeAll(async () => {
    ctx = await createAuthedContext();
  });

  test.afterAll(async () => {
    if (ctx && assemblyId !== undefined) {
      await ctx.patch(`/api/part/${assemblyId}/`, { data: { active: false } });
      const r = await ctx.delete(`/api/part/${assemblyId}/`);
      if (r.status() !== 204 && r.status() !== 404) {
        console.error(`[cleanup] unexpected ${r.status()} on DELETE part/${assemblyId}/`);
      }
    }
    if (ctx && componentId !== undefined) {
      await ctx.patch(`/api/part/${componentId}/`, { data: { active: false } });
      const r = await ctx.delete(`/api/part/${componentId}/`);
      if (r.status() !== 204 && r.status() !== 404) {
        console.error(`[cleanup] unexpected ${r.status()} on DELETE part/${componentId}/`);
      }
    }
    if (ctx && bomId !== undefined) {
      const r = await ctx.delete(`/api/bom/${bomId}/`);
      if (r.status() !== 204 && r.status() !== 404) {
        console.error(`[cleanup] unexpected ${r.status()} on DELETE bom/${bomId}/`);
      }
    }
    if (ctx) await ctx.dispose();
  });

  test('API-PARTS-BOM-001 create assembly part', async () => {
    if (!ctx) throw new Error('ctx not initialised');
    const categoryId = Number(process.env.INVENTREE_QA_ROOT_ID);
    expect(Number.isFinite(categoryId)).toBe(true);
    const assemblyInput = makePart({ category: categoryId, assembly: true });
    const response = await ctx.post('/api/part/', { data: assemblyInput });
    expect(response.status()).toBe(201);
    const body = (await response.json()) as { pk?: number; name?: string; IPN?: string };
    expect(body.name).toBe(assemblyInput.name);
    expect(body.IPN).toBe(assemblyInput.IPN);
    expect(typeof body.pk).toBe('number');
    assemblyId = body.pk;
  });

  test('API-PARTS-BOM-002 create component part', async () => {
    if (!ctx) throw new Error('ctx not initialised');
    const categoryId = Number(process.env.INVENTREE_QA_ROOT_ID);
    expect(Number.isFinite(categoryId)).toBe(true);
    const componentInput = makePart({ category: categoryId, component: true, purchaseable: true });
    const response = await ctx.post('/api/part/', { data: componentInput });
    expect(response.status()).toBe(201);
    const body = (await response.json()) as { pk?: number; name?: string; IPN?: string };
    expect(body.name).toBe(componentInput.name);
    expect(body.IPN).toBe(componentInput.IPN);
    expect(typeof body.pk).toBe('number');
    componentId = body.pk;
  });

  test('API-PARTS-BOM-003 create BOM line', async () => {
    if (!ctx || !assemblyId || !componentId) throw new Error('no parts from prior steps');
    const response = await ctx.post('/api/bom/', { data: { part: assemblyId, sub_part: componentId, quantity: 2, reference: 'R1' } });
    expect(response.status()).toBe(201);
    const body = (await response.json()) as { pk?: number; quantity?: number };
    expect(body.quantity).toBe(2);
    bomId = body.pk;
  });

  test('API-PARTS-BOM-004 list BOM lines', async () => {
    if (!ctx || !assemblyId) throw new Error('no parts from prior steps');
    const response = await ctx.get(`/api/bom/?part=${assemblyId}`);
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const list = Array.isArray(body) ? body : (body as { results?: unknown[] }).results ?? [];
    expect(list.some((item: { pk?: number }) => item.pk === bomId)).toBe(true);
  });

  test('API-PARTS-BOM-005 retrieve BOM line', async () => {
    if (!ctx || !bomId) throw new Error('no BOM line from prior step');
    const response = await ctx.get(`/api/bom/${bomId}/`);
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { quantity?: number };
    expect(body.quantity).toBe(2);
  });

  test('API-PARTS-BOM-006 update BOM line', async () => {
    if (!ctx || !bomId) throw new Error('no BOM line from prior step');
    const response = await ctx.patch(`/api/bom/${bomId}/`, { data: { quantity: 3 } });
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { quantity?: number };
    expect(body.quantity).toBe(3);
  });

  test('API-PARTS-BOM-007 delete BOM line', async () => {
    if (!ctx || !bomId) throw new Error('no BOM line from prior step');
    const response = await ctx.delete(`/api/bom/${bomId}/`);
    expect(response.status()).toBe(204);
    bomId = undefined;
  });
});
