import { test, expect, type APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/client';
import { makePart } from '../helpers/factories';

let ctx: APIRequestContext | undefined;
const createdIds: number[] = [];
let assemblyName: string | undefined;

test.describe.serial('API-PARTS parts query', () => {
  test.beforeAll(async () => {
    ctx = await createAuthedContext();
    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID);
    const seeds = [
      makePart({ category: rootId, assembly: true, component: false }),
      makePart({ category: rootId, assembly: false, component: true, purchaseable: true }),
      makePart({ category: rootId, active: false }),
    ];
    assemblyName = seeds[0]!.name;
    for (const seed of seeds) {
      const response = await ctx.post('/api/part/', { data: seed });
      expect(response.status()).toBe(201);
      const body = (await response.json()) as { pk?: number };
      if (typeof body.pk === 'number') createdIds.push(body.pk);
    }
  });

  test.afterAll(async () => {
    if (!ctx) return;
    for (const id of [...createdIds].reverse()) {
      await ctx.patch(`/api/part/${id}/`, { data: { active: false } });
      await ctx.delete(`/api/part/${id}/`);
    }
    await ctx.dispose();
  });

  function unwrap(body: unknown): unknown[] {
    if (Array.isArray(body)) return body;
    const results = (body as { results?: unknown[] }).results;
    return Array.isArray(results) ? results : [];
  }

  test('API-PARTS-006 list with limit', async () => {
    if (!ctx) throw new Error('ctx');
    const response = await ctx.get('/api/part/?limit=2');
    expect(response.status()).toBe(200);
    const list = unwrap(await response.json());
    expect(list.length).toBeLessThanOrEqual(2);
  });

  test('API-PARTS-007 list with offset', async () => {
    if (!ctx) throw new Error('ctx');
    const response = await ctx.get('/api/part/?limit=1&offset=1');
    expect(response.status()).toBe(200);
    const list = unwrap(await response.json());
    expect(list.length).toBeLessThanOrEqual(1);
  });

  test('API-PARTS-008 filter by category', async () => {
    if (!ctx) throw new Error('ctx');
    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID);
    const response = await ctx.get(`/api/part/?category=${rootId}&limit=50`);
    expect(response.status()).toBe(200);
    const list = unwrap(await response.json()) as Array<{ category?: number }>;
    expect(list.length).toBeGreaterThan(0);
    for (const p of list) expect(p.category).toBe(rootId);
  });

  test('API-PARTS-009 filter by assembly=true returns the seeded assembly', async () => {
    if (!ctx) throw new Error('ctx');
    const response = await ctx.get('/api/part/?assembly=true&limit=100');
    expect(response.status()).toBe(200);
    const list = unwrap(await response.json()) as Array<{ name?: string; assembly?: boolean }>;
    const match = list.find((p) => p.name === assemblyName);
    expect(match).toBeDefined();
    expect(match?.assembly).toBe(true);
  });

  test('API-PARTS-010 search by name substring', async () => {
    if (!ctx) throw new Error('ctx');
    expect(assemblyName).toBeDefined();
    const needle = assemblyName!.slice(0, 12);
    const response = await ctx.get(`/api/part/?search=${encodeURIComponent(needle)}&limit=10`);
    expect(response.status()).toBe(200);
    const list = unwrap(await response.json()) as Array<{ name?: string }>;
    expect(list.some((p) => p.name?.includes(needle))).toBe(true);
  });

  test('API-PARTS-011 ordering by name asc', async () => {
    if (!ctx) throw new Error('ctx');
    const response = await ctx.get('/api/part/?ordering=name&limit=10');
    expect(response.status()).toBe(200);
    const list = unwrap(await response.json()) as Array<{ name?: string }>;
    const names = list.map((p) => p.name ?? '');
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  test('API-PARTS-012 filter by active=false returns the seeded inactive part', async () => {
    if (!ctx) throw new Error('ctx');
    const response = await ctx.get('/api/part/?active=false&limit=100');
    expect(response.status()).toBe(200);
    const list = unwrap(await response.json()) as Array<{ pk?: number; active?: boolean }>;
    const inactiveIds = createdIds.slice(-1);
    const match = list.find((p) => typeof p.pk === 'number' && inactiveIds.includes(p.pk));
    expect(match).toBeDefined();
    expect(match?.active).toBe(false);
  });
});
