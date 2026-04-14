import type { FullConfig } from '@playwright/test';
import { createAuthedContext, fetchToken } from './helpers/client';

const QA_ROOT_NAME = process.env.INVENTREE_QA_ROOT ?? 'QA-ROOT';

async function ensureCategory(name: string): Promise<number> {
  const ctx = await createAuthedContext();
  const listResponse = await ctx.get(`/api/part/category/?search=${encodeURIComponent(name)}`);
  if (!listResponse.ok()) {
    throw new Error(`category list failed: ${listResponse.status()} ${await listResponse.text()}`);
  }
  const rawList = (await listResponse.json()) as unknown;
  const list = Array.isArray(rawList)
    ? rawList
    : Array.isArray((rawList as { results?: unknown[] }).results)
      ? ((rawList as { results: unknown[] }).results as unknown[])
      : [];
  for (const entry of list) {
    if (typeof entry === 'object' && entry && (entry as { name?: unknown }).name === name) {
      const pk = (entry as { pk?: number }).pk;
      if (typeof pk === 'number') {
        await ctx.dispose();
        return pk;
      }
    }
  }
  const createResponse = await ctx.post('/api/part/category/', {
    data: { name, parent: null, description: 'QA baseline root category' },
  });
  if (!createResponse.ok()) {
    throw new Error(`category create failed: ${createResponse.status()} ${await createResponse.text()}`);
  }
  const created = (await createResponse.json()) as { pk?: number };
  await ctx.dispose();
  if (typeof created.pk !== 'number') {
    throw new Error(`category create returned no pk: ${JSON.stringify(created)}`);
  }
  return created.pk;
}

export default async function globalSetup(_: FullConfig) {
  const token = await fetchToken();
  process.env.INVENTREE_TOKEN = token;
  const rootId = await ensureCategory(QA_ROOT_NAME);
  process.env.INVENTREE_QA_ROOT_ID = String(rootId);
  console.log(`[global-setup] token=${token.slice(0, 12)}… root=${QA_ROOT_NAME}(${rootId})`);
}
