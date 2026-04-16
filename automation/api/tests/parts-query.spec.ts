import { test, expect, type APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/client';
import { makePart } from '../helpers/factories';

// Parameterised (data-driven) variant of the query suite. The PDF requirement
// "Demonstrate data-driven or parameterised testing where appropriate" is
// satisfied here: one cases table + one `for` loop that emits a stable
// `API-PARTS-<ID>` test per row. Each row specifies the URL, the per-row
// assertion, and the expected status.

type QueryCase = {
  id: string;
  title: string;
  url: () => string;
  // Returns void or throws via expect — runs after the request lands.
  assert: (list: unknown[], raw: unknown) => void;
  status?: number;
};

let ctx: APIRequestContext | undefined;
const createdIds: number[] = [];
let assemblyName: string | undefined;

function unwrap(body: unknown): unknown[] {
  if (Array.isArray(body)) return body;
  const results = (body as { results?: unknown[] }).results;
  return Array.isArray(results) ? results : [];
}

test.describe.serial('API-PARTS parts query (parameterised)', () => {
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

  const cases: QueryCase[] = [
    {
      id: 'API-PARTS-006',
      title: 'list with limit=2',
      url: () => '/api/part/?limit=2',
      assert: (list) => {
        expect(list.length).toBeLessThanOrEqual(2);
      },
    },
    {
      id: 'API-PARTS-007',
      title: 'list with limit=1 offset=1',
      url: () => '/api/part/?limit=1&offset=1',
      assert: (list) => {
        expect(list.length).toBeLessThanOrEqual(1);
      },
    },
    {
      id: 'API-PARTS-008',
      title: 'filter by category',
      url: () => `/api/part/?category=${Number(process.env.INVENTREE_QA_ROOT_ID)}&limit=50`,
      assert: (list) => {
        const rootId = Number(process.env.INVENTREE_QA_ROOT_ID);
        expect(list.length).toBeGreaterThan(0);
        for (const p of list as Array<{ category?: number }>) {
          expect(p.category).toBe(rootId);
        }
      },
    },
    {
      id: 'API-PARTS-009',
      title: 'filter assembly=true returns the seeded assembly',
      url: () => '/api/part/?assembly=true&limit=100',
      assert: (list) => {
        const match = (list as Array<{ name?: string; assembly?: boolean }>).find(
          (p) => p.name === assemblyName,
        );
        expect(match).toBeDefined();
        expect(match?.assembly).toBe(true);
      },
    },
    {
      id: 'API-PARTS-010',
      title: 'search by name substring',
      url: () => `/api/part/?search=${encodeURIComponent(assemblyName!.slice(0, 12))}&limit=10`,
      assert: (list) => {
        const needle = assemblyName!.slice(0, 12);
        expect((list as Array<{ name?: string }>).some((p) => p.name?.includes(needle))).toBe(true);
      },
    },
    {
      id: 'API-PARTS-011',
      title: 'ordering by name asc',
      url: () => '/api/part/?ordering=name&limit=10',
      assert: (list) => {
        const names = (list as Array<{ name?: string }>).map((p) => p.name ?? '');
        const sorted = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).toEqual(sorted);
      },
    },
    {
      id: 'API-PARTS-012',
      title: 'filter active=false returns the seeded inactive part',
      url: () => '/api/part/?active=false&limit=100',
      assert: (list) => {
        const inactiveIds = createdIds.slice(-1);
        const match = (list as Array<{ pk?: number; active?: boolean }>).find(
          (p) => typeof p.pk === 'number' && inactiveIds.includes(p.pk),
        );
        expect(match).toBeDefined();
        expect(match?.active).toBe(false);
      },
    },
  ];

  for (const c of cases) {
    test(`${c.id} ${c.title}`, async () => {
      if (!ctx) throw new Error('ctx');
      const response = await ctx.get(c.url());
      expect(response.status()).toBe(c.status ?? 200);
      const raw = await response.json();
      c.assert(unwrap(raw), raw);
    });
  }
});
