import { test, expect } from '../fixtures/auth';
import type { Page } from '@playwright/test';
import { promises as fs } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { createAuthedContext, createPart, deletePart, type CreatedPart } from '../helpers/api';

const OUT_DIR = resolve(__dirname, '../../../data/ui-explore');
const SNAPSHOT_DIR = resolve(OUT_DIR, 'snapshots');
const COVERAGE_PATH = resolve(OUT_DIR, 'coverage.md');
const LOG_PATH = resolve(OUT_DIR, 'run-log.jsonl');
const INVENTORY_PATH = resolve(SNAPSHOT_DIR, '_inventory.json');
const CORRELATION_PATH = resolve(OUT_DIR, 'click-to-api.jsonl');

const MAX_CLICKS = parseInt(process.env.MAX_CLICKS ?? '30', 10);
const MAX_DEPTH = parseInt(process.env.MAX_DEPTH ?? '3', 10);
const SEED_ROUTES = (process.env.SEED_ROUTES ?? '/web/part').split(',').map((s) => s.trim());
const USERNAME = process.env.INVENTREE_USER ?? 'admin';
const PASSWORD = process.env.INVENTREE_PASS ?? 'changeme';

const DESTRUCTIVE_TEXT = /delete|remove|log.?out|sign.?out|reset|drop|clear|destroy/i;
const DESTRUCTIVE_LABEL = /reset|delete|destroy|logout|log-out|sign-out/i;

type Candidate = {
  key: string;         // route + '::' + contentKey + '::' + (label || text)
  route: string;
  label: string;
  text: string;
  tag: string;
  depth: number;
  parentKey?: string;  // key of the click that made this candidate visible
  ancestors: Array<{ route: string; candidate: string; label: string; text: string }>;
};

type Effect =
  | 'click-failed'
  | 'no-effect'
  | 'new-labels'
  | 'route-change'
  | 'skipped-destructive'
  | 'skipped-visited'
  | 'skipped-hidden';

type LogEntry = {
  t: string;
  route: string;
  candidate: string;
  effect: Effect;
  newLabels?: number;
  durationMs?: number;
  newRoute?: string;
  error?: string;
};

type InventoryEntry = {
  file: string;
  route: string;
  trigger: string;
  labels: string[];
  buttonTexts: string[];
  urlAfter: string;
  contentHash: string;
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);
}

function md5(s: string): string {
  return createHash('md5').update(s).digest('hex');
}

async function appendLog(entry: LogEntry): Promise<void> {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.appendFile(LOG_PATH, JSON.stringify(entry) + '\n', 'utf8');
}

async function waitLoadersGone(page: Page, timeout = 8000): Promise<void> {
  await page
    .waitForFunction(
      () => {
        const loaders = Array.from(document.querySelectorAll('.mantine-Loader-root'));
        return loaders.every((l) => {
          const el = l as HTMLElement;
          if (el.hidden) return true;
          const st = window.getComputedStyle(el);
          return st.display === 'none' || st.visibility === 'hidden';
        });
      },
      null,
      { timeout },
    )
    .catch(() => {});
}

function contentKey(html: string): string {
  // Strip volatile bits (timestamps, random ids) to keep hash stable across re-renders that
  // don't actually change the interactive surface.
  const stripped = html
    .replace(/\b\d{13,}\b/g, '0')               // millisecond timestamps
    .replace(/\b[a-f0-9]{8,}\b/g, '0')          // hex ids
    .replace(/id="mantine-[^"]+"/g, 'id="m"')   // generated mantine ids
    .replace(/\s+/g, ' ');
  return createHash('md5').update(stripped).digest('hex').slice(0, 8);
}

async function enumerate(page: Page, ck: string): Promise<Array<Omit<Candidate, 'depth' | 'ancestors'>>> {
  const route = new URL(page.url()).pathname;
  const items = await page.evaluate(() => {
    const out: Array<{ tag: string; label: string; text: string }> = [];
    const sel = 'button, a[role="button"], [role="menuitem"], [role="tab"]';
    document.querySelectorAll(sel).forEach((el) => {
      const r = el.getBoundingClientRect();
      const visible = r.width > 0 && r.height > 0 && (el as HTMLElement).offsetParent !== null;
      if (!visible) return;
      out.push({
        tag: el.tagName.toLowerCase(),
        label: el.getAttribute('aria-label') ?? '',
        text: (el.textContent ?? '').trim().slice(0, 60),
      });
    });
    return out;
  });
  return items
    .filter((i) => i.label || i.text)
    .map((i) => ({
      key: `${route}::${ck}::${i.label || i.text}`,
      route,
      label: i.label,
      text: i.text,
      tag: i.tag,
    }));
}

async function snap(page: Page, name: string, inventory: InventoryEntry[]): Promise<void> {
  await fs.mkdir(SNAPSHOT_DIR, { recursive: true });
  await waitLoadersGone(page);
  const html = await page.content();
  await fs.writeFile(resolve(SNAPSHOT_DIR, `${name}.html`), html, 'utf8');
  await page
    .screenshot({ path: resolve(SNAPSHOT_DIR, `${name}.png`), fullPage: true })
    .catch(() => {});

  const labels = Array.from(html.matchAll(/aria-label="([^"]+)"/g), (m) => m[1]!);
  const buttons: string[] = [];
  const btnRegex = /<button\b[^>]*>([\s\S]*?)<\/button>/g;
  let match: RegExpExecArray | null;
  while ((match = btnRegex.exec(html)) !== null) {
    const inner = match[1] ?? '';
    const text = inner.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text && text.length <= 60) buttons.push(text);
  }
  inventory.push({
    file: `${name}.html`,
    route: new URL(page.url()).pathname,
    trigger: name,
    labels: Array.from(new Set(labels)).sort(),
    buttonTexts: Array.from(new Set(buttons)).sort(),
    urlAfter: page.url(),
    contentHash: md5(html),
  });
}

function isDestructive(c: Candidate): boolean {
  if (DESTRUCTIVE_TEXT.test(c.text)) return true;
  if (DESTRUCTIVE_LABEL.test(c.label)) return true;
  return false;
}

async function login(page: Page): Promise<void> {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const user = page.getByLabel('login-username');
  if (await user.isVisible().catch(() => false)) {
    await user.fill(USERNAME);
    await page.getByLabel('login-password').fill(PASSWORD);
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByLabel('navigation-menu').waitFor({ state: 'visible', timeout: 15_000 });
  }
}

async function clickCandidate(page: Page, c: Candidate): Promise<void> {
  // Strategies tried in order: aria-label, tab-by-name, button-by-name, menuitem-by-name, exact text.
  const strategies: Array<() => import('@playwright/test').Locator> = [];
  if (c.label) strategies.push(() => page.getByLabel(c.label, { exact: true }).first());
  if (c.text) {
    strategies.push(() => page.getByRole('tab', { name: c.text, exact: true }).first());
    strategies.push(() => page.getByRole('button', { name: c.text, exact: true }).first());
    strategies.push(() => page.getByRole('menuitem', { name: c.text, exact: true }).first());
    strategies.push(() => page.getByRole('link', { name: c.text, exact: true }).first());
    strategies.push(() => page.getByText(c.text, { exact: true }).first());
  }
  for (const make of strategies) {
    try {
      const locator = make();
      await locator.waitFor({ state: 'visible', timeout: 1500 });
      await locator.click({ timeout: 1500 });
      return;
    } catch {
      // try next strategy
    }
  }
  throw new Error(`no strategy worked for ${c.label || c.text}`);
}

test('_EXPLORE discovery walker', async ({ page }) => {
  test.setTimeout(15 * 60_000);
  // Preserve click-to-api.jsonl across runs (cumulative correlation log).
  // Clear only the per-run artefacts: snapshots, run log, coverage report.
  await fs.rm(SNAPSHOT_DIR, { recursive: true, force: true });
  await fs.rm(LOG_PATH, { force: true });
  await fs.rm(COVERAGE_PATH, { force: true });
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(SNAPSHOT_DIR, { recursive: true });
  // Mark the start of a new run in the cumulative correlation log.
  await fs.appendFile(
    CORRELATION_PATH,
    JSON.stringify({ run: new Date().toISOString() }) + '\n',
    'utf8',
  );

  // Seed a rich part: assembly with a BOM line pointing at a component, parameter, and a test template.
  const api = await createAuthedContext();
  const seeded: CreatedPart[] = [];
  let richPk: number | undefined;
  try {
    const assembly = await createPart(api, { assembly: true, component: false, description: 'ui-explore rich assembly' });
    seeded.push(assembly);
    richPk = assembly.pk;
    const component = await createPart(api, { assembly: false, component: true, purchaseable: true, description: 'ui-explore rich component' });
    seeded.push(component);
    // BOM line linking assembly -> component
    const bomRes = await api.post('/api/bom/', {
      data: { part: assembly.pk, sub_part: component.pk, quantity: 2, reference: 'R1' },
    });
    if (!bomRes.ok()) console.error('bom seed failed:', bomRes.status(), await bomRes.text());
    // Stock item for the component so Stock tab has data
    const stockRes = await api.post('/api/stock/', {
      data: { part: component.pk, quantity: 5 },
    }).catch(() => null);
    if (stockRes && !stockRes.ok()) console.error('stock seed status:', stockRes.status());
    // Push a rich seed URL into SEED_ROUTES so the walker starts there.
    if (!SEED_ROUTES.includes(`/web/part/${assembly.pk}`)) {
      SEED_ROUTES.unshift(`/web/part/${assembly.pk}`);
    }
    console.log(`[explore] seeded assembly=${assembly.pk} component=${component.pk}`);
  } catch (e) {
    console.error('explore seed failed:', (e as Error).message);
  }

  await login(page);

  const visited = new Set<string>();
  const queued = new Set<string>();
  const discovered = new Map<string, Set<string>>();
  const inventory: InventoryEntry[] = [];
  const backlog: Candidate[] = [];
  let clicks = 0;

  const enqueue = (c: Candidate): void => {
    if (visited.has(c.key) || queued.has(c.key)) return;
    queued.add(c.key);
    backlog.push(c);
  };

  for (const seed of SEED_ROUTES) {
    await page.goto(seed);
    await page.waitForLoadState('networkidle');
    await waitLoadersGone(page);
    await snap(page, `seed-${slugify(seed)}`, inventory);
    const ck = contentKey(await page.content());
    const items = (await enumerate(page, ck)).map((i) => ({ ...i, depth: 0, ancestors: [] as Candidate['ancestors'] }));
    for (const i of items) enqueue(i);
    const route = new URL(page.url()).pathname;
    const labels = new Set(items.map((i) => i.label || i.text));
    discovered.set(route, labels);
  }

  while (clicks < MAX_CLICKS && backlog.length > 0) {
    // DFS: pop from the back so just-enqueued elements (menu items after a menu open) get
    // visited while the menu is still on screen.
    const c = backlog.pop()!;
    if (visited.has(c.key)) {
      await appendLog({
        t: new Date().toISOString(),
        route: c.route,
        candidate: c.label || c.text,
        effect: 'skipped-visited',
      });
      continue;
    }
    visited.add(c.key);

    if (isDestructive(c)) {
      await appendLog({
        t: new Date().toISOString(),
        route: c.route,
        candidate: c.label || c.text,
        effect: 'skipped-destructive',
      });
      continue;
    }

    // Make sure we're on the route where we discovered the candidate.
    if (new URL(page.url()).pathname !== c.route) {
      await page.goto(c.route).catch(() => {});
      await waitLoadersGone(page);
    }

    const beforeUrl = page.url();
    const beforeContent = await page.content();
    const beforeHash = md5(beforeContent);
    const beforeCk = contentKey(beforeContent);
    // Enumerate BEFORE the click so we can tell which children are newly visible.
    const beforeItems = await enumerate(page, beforeCk);
    const beforeVisibleKeys = new Set(beforeItems.map((i) => i.label || i.text));
    const start = Date.now();
    let effect: Effect = 'no-effect';
    let error: string | undefined;

    // Per-click API capture: attach a short-lived listener around the click window.
    const clickApis: Array<{ method: string; url: string }> = [];
    const apiListener = (req: import('@playwright/test').Request): void => {
      const url = req.url();
      if (!/\/api\//.test(url)) return;
      clickApis.push({ method: req.method(), url });
    };
    page.on('request', apiListener);

    try {
      await clickCandidate(page, c);
      await page.waitForTimeout(400);
      await waitLoadersGone(page, 5000);
    } catch (e) {
      effect = 'click-failed';
      error = (e as Error).message.slice(0, 200);
    }
    page.off('request', apiListener);
    const durationMs = Date.now() - start;

    // Persist the click→api correlation (one JSONL line per click).
    if (clickApis.length > 0) {
      await fs.appendFile(
        CORRELATION_PATH,
        JSON.stringify({
          t: new Date().toISOString(),
          route: c.route,
          candidate: c.label || c.text,
          tag: c.tag,
          depth: c.depth,
          ancestors: c.ancestors,
          apiCalls: Array.from(
            new Set(
              clickApis.map((r) => {
                try {
                  const u = new URL(r.url);
                  return `${r.method} ${u.pathname}`;
                } catch {
                  return `${r.method} ${r.url}`;
                }
              }),
            ),
          ),
        }) + '\n',
        'utf8',
      );
    }

    const afterUrl = page.url();
    const afterHash = md5(await page.content().catch(() => ''));
    const stateName = `${String(clicks + 1).padStart(2, '0')}-${slugify(c.label || c.text)}`;

    let newLabels = 0;
    if (effect !== 'click-failed') {
      await snap(page, stateName, inventory);
      const route = new URL(page.url()).pathname;
      const ck = contentKey(await page.content());
      const before = discovered.get(route) ?? new Set<string>();
      const after = await enumerate(page, ck);
      for (const i of after) {
        const key = i.label || i.text;
        if (!before.has(key)) {
          newLabels += 1;
          before.add(key);
        }
      }
      discovered.set(route, before);

      if (afterUrl !== beforeUrl) effect = 'route-change';
      else if (newLabels > 0) effect = 'new-labels';
      else if (afterHash !== beforeHash) effect = 'new-labels';
      else effect = 'no-effect';

      // Queue candidates that became visible because of this click. Precision matters —
      // only items NOT present before the click are true descendants; items that were
      // already visible should be enqueued independently (no ancestry).
      if ((effect === 'new-labels' || effect === 'route-change') && c.depth + 1 <= MAX_DEPTH) {
        const descendantAncestors: Candidate['ancestors'] =
          effect === 'new-labels'
            ? [...c.ancestors, { route: c.route, candidate: c.label || c.text, label: c.label, text: c.text }]
            : [];
        for (const i of after) {
          const elemKey = i.label || i.text;
          const wasVisibleBefore = beforeVisibleKeys.has(elemKey);
          const ancestors = wasVisibleBefore ? [] : descendantAncestors;
          enqueue({ ...i, depth: c.depth + 1, ancestors });
        }
      }

      // Try to close any modal we may have opened — but only if we didn't just open one
      // that our children still need to visit. Heuristic: if the click was an
      // `action-button-add-*` or `action-menu-*`, the children are most likely items
      // inside that menu/modal; leave it open so DFS can drill in.
      const keepOpen = /^action-(button-add|menu)-/.test(c.label);
      if (!keepOpen) {
        await page.keyboard.press('Escape').catch(() => {});
      }
    }

    clicks += 1;
    await appendLog({
      t: new Date().toISOString(),
      route: c.route,
      candidate: c.label || c.text,
      effect,
      newLabels,
      durationMs,
      newRoute: afterUrl !== beforeUrl ? new URL(afterUrl).pathname : undefined,
      error,
    });

    // Backtrack: if we drifted far from any seed, return to the first seed.
    if (c.depth >= MAX_DEPTH && SEED_ROUTES[0]) {
      await page.goto(SEED_ROUTES[0]).catch(() => {});
      await waitLoadersGone(page);
    }
  }

  await fs.writeFile(INVENTORY_PATH, JSON.stringify(inventory, null, 2), 'utf8');

  // Build coverage.md
  const lines: string[] = [];
  lines.push('# ui-explore coverage report');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Budget: ${MAX_CLICKS} clicks, max depth ${MAX_DEPTH}.`);
  lines.push(`Seeds: ${SEED_ROUTES.join(', ')}`);
  lines.push('');
  lines.push(`Clicks executed: **${clicks}**`);
  lines.push(`Snapshots captured: **${inventory.length}**`);
  lines.push(`Routes discovered: **${discovered.size}**`);
  lines.push(`Elements visited: **${visited.size}**`);
  lines.push(`Elements still in backlog: **${backlog.length}**`);
  lines.push('');
  lines.push('## Routes and their unique elements');
  lines.push('');
  for (const [route, labels] of discovered.entries()) {
    lines.push(`### ${route} (${labels.size} elements)`);
    lines.push('');
    const sorted = Array.from(labels).sort().slice(0, 40);
    for (const l of sorted) lines.push(`- ${l}`);
    if (labels.size > 40) lines.push(`- ... +${labels.size - 40} more`);
    lines.push('');
  }
  lines.push('## Unexplored backlog (top 25)');
  lines.push('');
  for (const c of backlog.slice(0, 25)) {
    lines.push(`- [${c.route}] ${c.label || c.text} (depth ${c.depth})`);
  }
  await fs.writeFile(COVERAGE_PATH, lines.join('\n'), 'utf8');

  console.log(`[explore] clicks=${clicks} snapshots=${inventory.length} routes=${discovered.size}`);

  // Teardown seeded parts.
  for (const part of seeded.reverse()) {
    try {
      await deletePart(api, part.pk);
    } catch (e) {
      console.error(`cleanup failed for part ${part.pk}:`, (e as Error).message);
    }
  }
  await api.dispose();

  expect(clicks).toBeGreaterThan(0);
});
