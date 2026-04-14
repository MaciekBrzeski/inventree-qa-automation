import { test, expect } from '@playwright/test';
import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';
import { createAuthedContext, createPart, deletePart, type CreatedPart } from '../helpers/api';

const SNAPSHOT_DIR = resolve(__dirname, '../../../data/dom-snapshots');
const USERNAME = process.env.INVENTREE_USER ?? 'admin';
const PASSWORD = process.env.INVENTREE_PASS ?? 'changeme';

async function waitLoadersGone(page: import('@playwright/test').Page, timeout = 15_000): Promise<void> {
  await page
    .waitForFunction(
      () => {
        const loaders = Array.from(document.querySelectorAll('.mantine-Loader-root'));
        // A loader is "active" if it's in the DOM and not explicitly hidden.
        return loaders.every((l) => {
          const el = l as HTMLElement;
          if (el.hidden) return true;
          const style = window.getComputedStyle(el);
          return style.display === 'none' || style.visibility === 'hidden';
        });
      },
      null,
      { timeout },
    )
    .catch(() => {
      // Best-effort: if a loader persists past timeout, continue and snap what we have.
    });
}

async function snap(page: import('@playwright/test').Page, name: string): Promise<void> {
  await fs.mkdir(SNAPSHOT_DIR, { recursive: true });
  await waitLoadersGone(page);
  const html = await page.content();
  await fs.writeFile(resolve(SNAPSHOT_DIR, `${name}.html`), html, 'utf8');
  await page.screenshot({ path: resolve(SNAPSHOT_DIR, `${name}.png`), fullPage: true });
}

test('_SNAPSHOT capture key InvenTree pages', async ({ page, browser }) => {
  test.setTimeout(240_000);

  // Seed a real part so detail page has content.
  const api = await createAuthedContext();
  let seeded: CreatedPart | undefined;
  try {
    seeded = await createPart(api, { description: 'snapshot seed', assembly: true });
  } catch (e) {
    console.error('seed failed:', (e as Error).message);
  }

  const ctx = await browser.newContext({
    baseURL: process.env.INVENTREE_URL ?? 'http://inventree.localhost',
  });
  const p = await ctx.newPage();

  // 01 — Login page (unauth).
  await p.goto('/');
  await p.waitForLoadState('networkidle');
  await p.getByLabel('login-username').waitFor({ state: 'visible' });
  await snap(p, '01-login');

  // 02 — Authenticated shell right after login. Wait for the hamburger + something
  // substantive on the landing page (category panel or dashboard card).
  await p.getByLabel('login-username').fill(USERNAME);
  await p.getByLabel('login-password').fill(PASSWORD);
  await p.getByRole('button', { name: 'Log In' }).click();
  await p.getByLabel('navigation-menu').waitFor({ state: 'visible', timeout: 15_000 });
  await p.waitForLoadState('networkidle');
  await snap(p, '02-shell');

  // 03 — Parts list. Wait for the category panel label that appears only after the tree loads.
  await p.goto('/web/part');
  await p.waitForLoadState('networkidle');
  await p.getByLabel('partcategory').first().waitFor({ state: 'visible', timeout: 15_000 });
  // The category tree renders rows after a second XHR — wait for any row anchor inside the panel.
  await p.waitForFunction(
    () =>
      !!document.querySelector('[aria-label="partcategory"]') &&
      (document.querySelector('[aria-label="partcategory"]')?.textContent ?? '').length > 30,
    null,
    { timeout: 15_000 },
  ).catch(() => {});
  await snap(p, '03-parts-list');

  // 04 — Part detail for the seeded part. Wait for the action buttons.
  if (seeded) {
    await p.goto(`/web/part/${seeded.pk}`);
    await p.waitForLoadState('networkidle');
    await p
      .getByLabel('action-button-open-in-admin-interface')
      .waitFor({ state: 'visible', timeout: 15_000 });
    // Extra nudge: wait for the document title to be populated with the IPN.
    await p.waitForFunction(
      (ipn) => document.title.includes(ipn),
      seeded.IPN,
      { timeout: 10_000 },
    ).catch(() => {});
    await snap(p, '04-part-detail');
  }

  // 05 — QA-ROOT category detail. Navigation + a plain waitFor on the hamburger is enough
  // to prove we landed on a valid authenticated page — we don't know a unique label for this
  // route, and the point of the snapshot is to grab whatever the SPA rendered, not to assert.
  try {
    const res = await api.get('/api/part/category/?search=QA-ROOT');
    const body = (await res.json()) as unknown;
    const arr = Array.isArray(body) ? body : ((body as { results?: unknown[] }).results ?? []);
    const qa = (arr as Array<{ pk?: number; name?: string }>).find((c) => c.name === 'QA-ROOT');
    if (qa && typeof qa.pk === 'number') {
      await p.goto(`/web/partcategory/${qa.pk}`);
      await p.waitForLoadState('networkidle');
      await p.getByLabel('navigation-menu').waitFor({ state: 'visible', timeout: 10_000 });
      // One extra tick for the detail card to paint.
      await p.waitForFunction(() => document.body.innerText.length > 200, null, { timeout: 10_000 }).catch(() => {});
      await snap(p, '05-category-detail-qa-root');
    }
  } catch (e) {
    console.error('category detail snapshot skipped:', (e as Error).message);
  }

  // 06 — Hamburger drawer open, showing top-level navigation.
  await p.goto('/web/part');
  await p.waitForLoadState('networkidle');
  await p.getByLabel('navigation-menu').click();
  await p.getByRole('button', { name: 'Dashboard' }).first().waitFor({ state: 'visible', timeout: 5000 });
  await snap(p, '06-nav-drawer-open');

  // 07 — Dump an aria-label + visible-button inventory from the parts list for RAG.
  await p.goto('/web/part');
  await p.waitForLoadState('networkidle');
  await p.getByLabel('partcategory').first().waitFor({ state: 'visible', timeout: 15_000 });
  const inventory = await p.evaluate(() => {
    const out: Array<{ tag: string; label: string; text: string }> = [];
    document.querySelectorAll('button,a[role="button"],[role="menuitem"],[role="tab"]').forEach((el) => {
      out.push({
        tag: el.tagName.toLowerCase(),
        label: el.getAttribute('aria-label') ?? '',
        text: (el.textContent ?? '').trim().slice(0, 60),
      });
    });
    return out;
  });
  await fs.writeFile(
    resolve(SNAPSHOT_DIR, '07-parts-list-buttons.json'),
    JSON.stringify(inventory, null, 2),
    'utf8',
  );

  await ctx.close();

  if (seeded) {
    await deletePart(api, seeded.pk);
  }
  await api.dispose();

  expect(true).toBe(true);
});
