import { promises as fs } from 'node:fs';
import { resolve, relative, basename } from 'node:path';

const HERE = new URL('.', import.meta.url).pathname;
const PROJECT = resolve(HERE, '../../..');

const UI_TESTS_DIR = resolve(PROJECT, 'submission/automation/ui/tests');
const API_TESTS_DIR = resolve(PROJECT, 'submission/automation/api/tests');
const UI_CASES = resolve(PROJECT, 'submission/test-cases/ui-manual-tests.md');
const API_CASES = resolve(PROJECT, 'submission/test-cases/api-manual-tests.md');
const OPENAPI_PATH = resolve(PROJECT, 'submission/data/openapi-parts.filtered.json');
const RECORDER_PATH = resolve(PROJECT, 'submission/data/api-ui-gap/per-test-requests.json');
const BUGS_DIR = resolve(PROJECT, 'docs/qa/bugs');
const OUT_DIR = resolve(PROJECT, 'docs/qa/coverage');

/**
 * Feature-area map. Each spec file in UI_TESTS_DIR or API_TESTS_DIR is assigned to one
 * "area" — a human-meaningful bucket like "Part CRUD" or "BOM". Manual test case tags
 * are also mapped into the same areas via substring match.
 *
 * Editing this map is how we reorganise the docs without moving files on disk.
 */
type AreaDef = {
  slug: string;
  title: string;
  description: string;
  uiFiles: string[];
  apiFiles: string[];
  endpointPrefixes: string[];
  manualTagKeywords: string[];
  bugIds: string[];
};

const AREAS: AreaDef[] = [
  {
    slug: 'smoke-and-nav',
    title: 'Smoke & navigation',
    description:
      'Login, authenticated shell, main navigation drawer, breadcrumbs, global search. Baseline that every other area depends on.',
    uiFiles: [
      'smoke.spec.ts',
      'parts-navigation.spec.ts',
      'parts-detail-actions.spec.ts',
      'parts-login-negative.spec.ts',
    ],
    apiFiles: ['smoke.spec.ts'],
    endpointPrefixes: ['/api/'],
    manualTagKeywords: ['smoke', 'navigation', 'nav', 'login'],
    bugIds: [],
  },
  {
    slug: 'part-crud',
    title: 'Part CRUD',
    description:
      'Create, read, update, delete a Part via both UI and API flows. Includes explicit edit (PATCH) and the active-toggle-before-delete workaround for INV-PARTS-001.',
    uiFiles: [
      'b-parts-create.spec.ts',
      'y-parts-ui-delete.spec.ts',
      'z-parts-cleanup.spec.ts',
      'g-parts-recipes.spec.ts',
    ],
    apiFiles: ['parts-crud.spec.ts', 'parts-puts.spec.ts'],
    endpointPrefixes: ['/api/part/', '/api/part/{id}/'],
    manualTagKeywords: ['create', 'crud', 'delete', 'duplicate', 'edit'],
    bugIds: ['INV-PARTS-001', 'INV-PARTS-003'],
  },
  {
    slug: 'category-crud',
    title: 'Part category CRUD',
    description:
      'Category create, hierarchy, rename, delete, tree fetch, bulk operations, and category parameter templates.',
    uiFiles: [
      'a-parts-category-create.spec.ts',
      'd-parts-extra-ui.spec.ts',
      'y-parts-ui-delete.spec.ts',
    ],
    apiFiles: [
      'parts-category.spec.ts',
      'parts-category-parameters.spec.ts',
    ],
    endpointPrefixes: ['/api/part/category/'],
    manualTagKeywords: ['category', 'tree', 'hierarchy', 'filter'],
    bugIds: [],
  },
  {
    slug: 'part-detail-tabs',
    title: 'Part detail tabs',
    description:
      'Navigation into each panel of the part detail page: BOM, Parameters, Stock, Suppliers, Pricing, Related Parts, Test Templates, Attachments, Notes, etc. Each test asserts the SPA fetched at least one `/api/` call when opening the tab.',
    uiFiles: ['cross-flow.spec.ts', 'e-parts-tabs.spec.ts'],
    apiFiles: ['parts-reads.spec.ts'],
    endpointPrefixes: [
      '/api/part/{id}/',
      '/api/part/{id}/requirements/',
      '/api/part/{id}/serial-numbers/',
      '/api/part/{id}/pricing/',
      '/api/part/{id}/bom-validate/',
    ],
    manualTagKeywords: ['detail', 'tabs', 'view'],
    bugIds: ['INV-PARTS-002'],
  },
  {
    slug: 'part-attributes',
    title: 'Part attributes (boolean toggles)',
    description:
      'Virtual, Template, Assembly, Component, Trackable, Testable, Purchaseable, Salable, Active/Inactive — one test per flag, each flipping the boolean via the Edit modal and asserting the PATCH landed.',
    uiFiles: ['f-parts-attributes.spec.ts'],
    apiFiles: [],
    endpointPrefixes: ['/api/part/{id}/'],
    manualTagKeywords: ['attribute', 'flag', 'toggle', 'virtual', 'trackable', 'assembly', 'purchaseable', 'salable'],
    bugIds: [],
  },
  {
    slug: 'part-query',
    title: 'Part list, filter, search, pagination',
    description:
      '`GET /api/part/` with various query parameters: limit, offset, category, active, assembly, search, ordering.',
    uiFiles: [],
    apiFiles: ['parts-query.spec.ts'],
    endpointPrefixes: ['/api/part/'],
    manualTagKeywords: ['list', 'query', 'filter', 'search', 'pagination', 'ordering'],
    bugIds: [],
  },
  {
    slug: 'bom',
    title: 'Bill of Materials (BOM)',
    description:
      'BOM line CRUD on assembly parts, BOM substitutes, BOM validation (per-row and per-assembly), BOM copy between assemblies.',
    uiFiles: [],
    apiFiles: [
      'parts-bom.spec.ts',
      'parts-bom-substitute.spec.ts',
      'parts-bom-validate.spec.ts',
    ],
    endpointPrefixes: ['/api/bom/', '/api/part/{id}/bom-validate/', '/api/part/{id}/bom-copy/'],
    manualTagKeywords: ['bom', 'assembly', 'substitute'],
    bugIds: [],
  },
  {
    slug: 'related-parts',
    title: 'Related parts',
    description:
      'CRUD on `/api/part/related/`. UI flow uses `action-button-add-related-part` on the Related Parts tab (draft parked as `_draft-c-parts-related.spec.ts.skip` due to Mantine combobox locator work).',
    uiFiles: ['d-parts-extra-ui.spec.ts', 'e-parts-tabs.spec.ts'],
    apiFiles: ['parts-related.spec.ts'],
    endpointPrefixes: ['/api/part/related/'],
    manualTagKeywords: ['related'],
    bugIds: [],
  },
  {
    slug: 'parameters',
    title: 'Parameters & parameter templates',
    description:
      'Part parameters and category parameter templates. UI flow available via `action-menu-add-parameters-create-parameter` → form → Submit; API covers category parameter templates (part-parameter endpoint is outside the filtered schema).',
    uiFiles: ['e-parts-tabs.spec.ts'],
    apiFiles: ['parts-category-parameters.spec.ts'],
    endpointPrefixes: ['/api/part/category/parameters/'],
    manualTagKeywords: ['parameter', 'template'],
    bugIds: [],
  },
  {
    slug: 'pricing',
    title: 'Pricing (internal + sale price)',
    description:
      'Internal price breaks, sale price breaks, per-part pricing recalculation. Full CRUD on `/api/part/internal-price/` and `/api/part/sale-price/`.',
    uiFiles: ['d-parts-extra-ui.spec.ts', 'e-parts-tabs.spec.ts'],
    apiFiles: ['parts-pricing.spec.ts'],
    endpointPrefixes: [
      '/api/part/internal-price/',
      '/api/part/sale-price/',
      '/api/part/{id}/pricing/',
    ],
    manualTagKeywords: ['pricing', 'price'],
    bugIds: [],
  },
  {
    slug: 'stocktake',
    title: 'Stocktake',
    description:
      'Part stocktake endpoints. Write path (POST /api/part/stocktake/) is **blocked by INV-PARTS-005** — the server raises a TypeError and returns 500 on the minimal payload. GET list is covered; generate endpoint is probed.',
    uiFiles: [],
    apiFiles: ['parts-stocktake.spec.ts', 'parts-stocktake-generate.spec.ts'],
    endpointPrefixes: ['/api/part/stocktake/'],
    manualTagKeywords: ['stocktake', 'stock take'],
    bugIds: ['INV-PARTS-005'],
  },
  {
    slug: 'test-templates',
    title: 'Test templates',
    description:
      'CRUD on `/api/part/test-template/`. Requires the seed part to be `testable=true`.',
    uiFiles: ['e-parts-tabs.spec.ts'],
    apiFiles: ['parts-test-template.spec.ts'],
    endpointPrefixes: ['/api/part/test-template/'],
    manualTagKeywords: ['test template', 'testable'],
    bugIds: [],
  },
  {
    slug: 'thumbs',
    title: 'Thumbnails',
    description:
      '`/api/part/thumbs/` read endpoints. PATCH / PUT paths are blocked on image file upload and remain unpaired.',
    uiFiles: [],
    apiFiles: ['parts-thumbs.spec.ts'],
    endpointPrefixes: ['/api/part/thumbs/'],
    manualTagKeywords: ['thumb', 'image'],
    bugIds: [],
  },
  {
    slug: 'negative',
    title: 'Negative / auth / bulk',
    description:
      'Auth errors (401/403), not-found (404), validation errors (400), bulk-operation endpoints that require a list payload, method-not-allowed checks. Multiple bugs were filed from this area.',
    uiFiles: ['parts-login-negative.spec.ts'],
    apiFiles: ['parts-negative.spec.ts', 'parts-bulk.spec.ts'],
    endpointPrefixes: ['/api/'],
    manualTagKeywords: ['negative', 'auth', 'validation', 'unauthorised', 'bulk'],
    bugIds: ['INV-PARTS-003', 'INV-PARTS-004'],
  },
  {
    slug: 'cross-flow',
    title: 'Cross-functional flow (PDF centrepiece)',
    description:
      'End-to-end flow that ties together creation, parameters, stock, and category views — the single required test per the hackathon PDF. Currently covered by API-seed + UI verify; a full click-chain version is on the expansion backlog.',
    uiFiles: ['cross-flow.spec.ts'],
    apiFiles: [],
    endpointPrefixes: [],
    manualTagKeywords: ['cross'],
    bugIds: [],
  },
  {
    slug: 'skill-infra',
    title: 'Agent skill infrastructure',
    description:
      'Not production tests — the discovery walker (`_explore.spec.ts`) and the DOM snapshot harness (`_snapshot.spec.ts`) that power the `ui-explore` and `api-ui-gap` Claude skills.',
    uiFiles: ['_explore.spec.ts', '_snapshot.spec.ts'],
    apiFiles: [],
    endpointPrefixes: [],
    manualTagKeywords: [],
    bugIds: [],
  },
];

type TestInfo = {
  file: string;
  title: string;
  caseIds: string[];
};

type ManualCase = {
  id: string;
  title: string;
  tags: string;
  priority: string;
};

async function parseSpecFile(filePath: string): Promise<TestInfo[]> {
  const src = await fs.readFile(filePath, 'utf8');
  const rel = basename(filePath);
  const out: TestInfo[] = [];
  const re = /\btest\(\s*['"`]([^'"`]+)['"`]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const title = m[1] ?? '';
    const caseIds = Array.from(
      title.matchAll(/\b([A-Z]+-[A-Z]+-[A-Z0-9]+-\d+|[A-Z]+-[A-Z]+-\d+)\b/g),
      (x) => x[1]!,
    );
    out.push({ file: rel, title, caseIds });
  }
  return out;
}

async function parseManualCases(filePath: string): Promise<ManualCase[]> {
  try {
    const src = await fs.readFile(filePath, 'utf8');
    const lines = src.split(/\r?\n/);
    const cases: ManualCase[] = [];
    let header: string[] | null = null;
    for (const line of lines) {
      if (/^\|\s*ID\s*\|/.test(line)) {
        header = line
          .split('|')
          .map((s) => s.trim())
          .filter(Boolean);
        continue;
      }
      if (header && /^\|\s*(UI-PARTS|API-PARTS)-\d{3}/.test(line)) {
        const cells = line
          .split('|')
          .slice(1, -1)
          .map((s) => s.trim());
        if (cells.length < 2) continue;
        const row: Record<string, string> = {};
        header.forEach((h, i) => (row[h] = cells[i] ?? ''));
        cases.push({
          id: row['ID'] ?? '',
          title: row['Title'] ?? '',
          tags: row['Tags'] ?? '',
          priority: row['Priority'] ?? '',
        });
      }
    }
    return cases;
  } catch {
    return [];
  }
}

function normalisePath(method: string, url: string): string {
  try {
    const u = new URL(url, 'http://x');
    let p = u.pathname.replace(/\/\d+(?=\/|$)/g, '/{id}');
    if (!p.endsWith('/')) p += '/';
    return `${method.toUpperCase()} ${p}`;
  } catch {
    return `${method.toUpperCase()} ${url}`;
  }
}

async function main(): Promise<void> {
  await fs.rm(OUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUT_DIR, { recursive: true });

  // Load schema
  const openapi = JSON.parse(await fs.readFile(OPENAPI_PATH, 'utf8')) as {
    paths: Record<string, Record<string, unknown>>;
  };
  const schemaEndpoints = new Set<string>();
  for (const [p, ops] of Object.entries(openapi.paths)) {
    for (const method of ['get', 'post', 'put', 'patch', 'delete']) {
      if (ops[method]) schemaEndpoints.add(`${method.toUpperCase()} ${p}/`.replace(/\/+/g, '/'));
    }
  }

  // Recorder for UI→API attribution
  let recorder: Array<{ test: string; requests: Array<{ method: string; url: string }> }> = [];
  try {
    recorder = JSON.parse(await fs.readFile(RECORDER_PATH, 'utf8'));
  } catch {
    /* ok */
  }
  const titleToEndpoints = new Map<string, Set<string>>();
  for (const log of recorder) {
    const [, title] = log.test.split('::', 2);
    if (!title) continue;
    const hits = new Set<string>();
    for (const r of log.requests) {
      if (r.method.toUpperCase() === 'OPTIONS') continue;
      const key = normalisePath(r.method, r.url);
      if (schemaEndpoints.has(key)) hits.add(key);
    }
    titleToEndpoints.set(title, hits);
  }

  // Parse all spec files
  const uiTests = new Map<string, TestInfo[]>();
  for (const file of await fs.readdir(UI_TESTS_DIR)) {
    if (!file.endsWith('.spec.ts')) continue;
    uiTests.set(file, await parseSpecFile(resolve(UI_TESTS_DIR, file)));
  }
  const apiTests = new Map<string, TestInfo[]>();
  for (const file of await fs.readdir(API_TESTS_DIR)) {
    if (!file.endsWith('.spec.ts')) continue;
    apiTests.set(file, await parseSpecFile(resolve(API_TESTS_DIR, file)));
  }

  // API spec endpoint inference (re-parse source to find literal ctx.method('/api/...'))
  async function inferApiEndpoints(file: string, title: string): Promise<Set<string>> {
    const src = await fs.readFile(resolve(API_TESTS_DIR, file), 'utf8');
    const idx = src.indexOf(title);
    if (idx < 0) return new Set();
    const next = src.indexOf("test('", idx + 10);
    const block = src.slice(idx, next > 0 ? next : src.length);
    const re = /\b\w+\.(get|post|patch|put|delete|fetch)\s*\(\s*['"`](\/api\/[^'"`]*)/gi;
    const out = new Set<string>();
    let mm: RegExpExecArray | null;
    while ((mm = re.exec(block)) !== null) {
      let method = (mm[1] ?? '').toUpperCase();
      const raw = mm[2] ?? '';
      const clean = raw
        .replace(/\$\{[^}]+\}/g, '{id}')
        .replace(/\?.*$/, '')
        .replace(/\/\d+(?=\/|$)/g, '/{id}');
      const path = clean.endsWith('/') ? clean : `${clean}/`;
      if (method === 'FETCH') {
        const slice = block.slice(re.lastIndex, re.lastIndex + 200);
        const mm2 = /method\s*:\s*['"`](\w+)['"`]/.exec(slice);
        method = mm2 ? (mm2[1] ?? '').toUpperCase() : 'GET';
      }
      const key = `${method} ${path}`;
      if (schemaEndpoints.has(key)) out.add(key);
    }
    return out;
  }

  // Manual cases
  const manualUi = await parseManualCases(UI_CASES);
  const manualApi = await parseManualCases(API_CASES);

  // Bugs
  const bugsByFile = new Map<string, string>();
  try {
    for (const f of await fs.readdir(BUGS_DIR)) {
      if (!f.endsWith('.md')) continue;
      const id = f.match(/^(INV-PARTS-\d+)/)?.[1];
      if (id) bugsByFile.set(id, f);
    }
  } catch {
    /* ok */
  }

  // Build per-area coverage
  type AreaReport = {
    def: AreaDef;
    uiSpecTests: Array<{ file: string; title: string; caseIds: string[]; endpoints: string[] }>;
    apiSpecTests: Array<{ file: string; title: string; caseIds: string[]; endpoints: string[] }>;
    manualUi: ManualCase[];
    manualApi: ManualCase[];
    endpointsHit: Set<string>;
    endpointsInScope: Set<string>;
    bugs: Array<{ id: string; file: string }>;
  };

  const reports: AreaReport[] = [];
  for (const def of AREAS) {
    const rep: AreaReport = {
      def,
      uiSpecTests: [],
      apiSpecTests: [],
      manualUi: [],
      manualApi: [],
      endpointsHit: new Set(),
      endpointsInScope: new Set(),
      bugs: [],
    };

    // Which OpenAPI endpoints belong to this area?
    for (const ep of schemaEndpoints) {
      for (const prefix of def.endpointPrefixes) {
        if (ep.includes(prefix)) {
          rep.endpointsInScope.add(ep);
          break;
        }
      }
    }

    // UI tests
    for (const file of def.uiFiles) {
      const tests = uiTests.get(file) ?? [];
      for (const t of tests) {
        const eps = Array.from(titleToEndpoints.get(t.title) ?? new Set<string>());
        rep.uiSpecTests.push({
          file,
          title: t.title,
          caseIds: t.caseIds,
          endpoints: eps,
        });
        for (const e of eps) rep.endpointsHit.add(e);
      }
    }

    // API tests
    for (const file of def.apiFiles) {
      const tests = apiTests.get(file) ?? [];
      for (const t of tests) {
        const eps = Array.from(await inferApiEndpoints(file, t.title));
        rep.apiSpecTests.push({
          file,
          title: t.title,
          caseIds: t.caseIds,
          endpoints: eps,
        });
        for (const e of eps) rep.endpointsHit.add(e);
      }
    }

    // Manual cases matching any keyword
    const matchesKeyword = (tags: string, title: string): boolean => {
      const hay = `${tags} ${title}`.toLowerCase();
      return def.manualTagKeywords.some((k) => hay.includes(k.toLowerCase()));
    };
    for (const c of manualUi) if (matchesKeyword(c.tags, c.title)) rep.manualUi.push(c);
    for (const c of manualApi) if (matchesKeyword(c.tags, c.title)) rep.manualApi.push(c);

    // Bugs
    for (const id of def.bugIds) {
      const file = bugsByFile.get(id);
      if (file) rep.bugs.push({ id, file });
    }

    reports.push(rep);
  }

  // Emit one note per area
  for (const rep of reports) {
    const lines: string[] = [];
    const paired = Array.from(rep.endpointsInScope).filter((e) => rep.endpointsHit.has(e));
    const missing = Array.from(rep.endpointsInScope).filter((e) => !rep.endpointsHit.has(e));
    const ratio = rep.endpointsInScope.size
      ? ((paired.length / rep.endpointsInScope.size) * 100).toFixed(1)
      : '—';

    lines.push('---');
    lines.push(`title: "Coverage — ${rep.def.title}"`);
    lines.push(`area: ${rep.def.slug}`);
    lines.push('tags: [qa, coverage, area]');
    lines.push(`generated: ${new Date().toISOString()}`);
    lines.push('---');
    lines.push('');
    lines.push(`# ${rep.def.title}`);
    lines.push('');
    lines.push(rep.def.description);
    lines.push('');
    lines.push('## Headline');
    lines.push('');
    lines.push(`- Endpoints in scope: **${rep.endpointsInScope.size}**`);
    lines.push(`- Endpoints hit by at least one automated test: **${paired.length}**`);
    lines.push(`- Coverage ratio: **${ratio}%**`);
    lines.push(`- Automated UI tests in this area: **${rep.uiSpecTests.length}**`);
    lines.push(`- Automated API tests in this area: **${rep.apiSpecTests.length}**`);
    lines.push(`- Manual UI test cases matched: **${rep.manualUi.length}**`);
    lines.push(`- Manual API test cases matched: **${rep.manualApi.length}**`);
    lines.push(`- Bugs filed in this area: **${rep.bugs.length}**`);
    lines.push('');

    if (rep.def.uiFiles.length > 0 || rep.def.apiFiles.length > 0) {
      lines.push('## Automated tests');
      lines.push('');
      if (rep.uiSpecTests.length > 0) {
        lines.push('### UI');
        lines.push('');
        for (const t of rep.uiSpecTests) {
          const caseTag = t.caseIds.length ? ` \`${t.caseIds.join(', ')}\`` : '';
          const epTag = t.endpoints.length ? ` → ${t.endpoints.map((e) => `\`${e}\``).join(', ')}` : '';
          lines.push(`- **${t.title}**${caseTag} — \`${t.file}\`${epTag}`);
        }
        lines.push('');
      }
      if (rep.apiSpecTests.length > 0) {
        lines.push('### API');
        lines.push('');
        for (const t of rep.apiSpecTests) {
          const caseTag = t.caseIds.length ? ` \`${t.caseIds.join(', ')}\`` : '';
          const epTag = t.endpoints.length ? ` → ${t.endpoints.map((e) => `\`${e}\``).join(', ')}` : '';
          lines.push(`- **${t.title}**${caseTag} — \`${t.file}\`${epTag}`);
        }
        lines.push('');
      }
    }

    if (rep.endpointsInScope.size > 0) {
      lines.push('## Endpoints in scope');
      lines.push('');
      lines.push('| endpoint | status |');
      lines.push('|---|---|');
      for (const e of Array.from(rep.endpointsInScope).sort()) {
        const status = rep.endpointsHit.has(e) ? '✅ covered' : '❌ missing';
        lines.push(`| \`${e}\` | ${status} |`);
      }
      lines.push('');
    }

    if (rep.bugs.length > 0) {
      lines.push('## Related bugs');
      lines.push('');
      for (const b of rep.bugs) lines.push(`- [[bugs/${b.file.replace(/\.md$/, '')}|${b.id}]]`);
      lines.push('');
    }

    if (rep.manualUi.length + rep.manualApi.length > 0) {
      lines.push('## Manual test cases');
      lines.push('');
      if (rep.manualUi.length > 0) {
        lines.push(`### UI (${rep.manualUi.length})`);
        lines.push('');
        for (const c of rep.manualUi.slice(0, 40)) {
          lines.push(`- \`${c.id}\` ${c.title} *(${c.priority})*`);
        }
        if (rep.manualUi.length > 40) lines.push(`- … +${rep.manualUi.length - 40} more`);
        lines.push('');
      }
      if (rep.manualApi.length > 0) {
        lines.push(`### API (${rep.manualApi.length})`);
        lines.push('');
        for (const c of rep.manualApi.slice(0, 40)) {
          lines.push(`- \`${c.id}\` ${c.title} *(${c.priority})*`);
        }
        if (rep.manualApi.length > 40) lines.push(`- … +${rep.manualApi.length - 40} more`);
        lines.push('');
      }
    }

    lines.push('## Links');
    lines.push('');
    lines.push('- [[coverage-index|Back to coverage index]]');
    lines.push('- [[whole-process|Whole-process narrative]]');
    lines.push('- [[graph/index|Endpoint graph]]');
    lines.push('');

    await fs.writeFile(resolve(OUT_DIR, `${rep.def.slug}.md`), lines.join('\n'));
  }

  // Emit the coverage index
  const indexLines: string[] = [];
  indexLines.push('---');
  indexLines.push('title: "Coverage index — test organisation by feature area"');
  indexLines.push('tags: [qa, coverage, index]');
  indexLines.push(`generated: ${new Date().toISOString()}`);
  indexLines.push('---');
  indexLines.push('');
  indexLines.push('# Coverage index');
  indexLines.push('');
  indexLines.push(
    'Generated by `submission/agents/rag/build-coverage-docs.ts`. Every test (automated + manual) is grouped into one of the feature areas below. Each area has its own page with endpoints in scope, automated tests, manual cases, and linked bug reports. Regenerate after any spec change.',
  );
  indexLines.push('');
  indexLines.push('## Headline');
  indexLines.push('');
  const allInScope = new Set<string>();
  const allHit = new Set<string>();
  for (const r of reports) {
    for (const e of r.endpointsInScope) allInScope.add(e);
    for (const e of r.endpointsHit) allHit.add(e);
  }
  const totalUi = reports.reduce((a, r) => a + r.uiSpecTests.length, 0);
  const totalApi = reports.reduce((a, r) => a + r.apiSpecTests.length, 0);
  indexLines.push(`- Total automated UI tests: **${totalUi}**`);
  indexLines.push(`- Total automated API tests: **${totalApi}**`);
  indexLines.push(`- Total automated tests: **${totalUi + totalApi}**`);
  indexLines.push(`- Endpoints in scope across all areas: **${allInScope.size}**`);
  indexLines.push(`- Endpoints covered: **${allHit.size}**`);
  indexLines.push(`- Coverage ratio: **${((allHit.size / schemaEndpoints.size) * 100).toFixed(1)}%** of the full filtered schema`);
  indexLines.push('');
  indexLines.push('## Feature areas');
  indexLines.push('');
  indexLines.push('| area | endpoints | ratio | UI | API | manual | bugs |');
  indexLines.push('|---|---:|---:|---:|---:|---:|---:|');
  for (const r of reports) {
    const paired = Array.from(r.endpointsInScope).filter((e) => r.endpointsHit.has(e)).length;
    const ratio = r.endpointsInScope.size
      ? `${((paired / r.endpointsInScope.size) * 100).toFixed(0)}%`
      : '—';
    indexLines.push(
      `| [[${r.def.slug}\\|${r.def.title}]] | ${paired}/${r.endpointsInScope.size} | ${ratio} | ${r.uiSpecTests.length} | ${r.apiSpecTests.length} | ${r.manualUi.length + r.manualApi.length} | ${r.bugs.length} |`,
    );
  }
  indexLines.push('');
  indexLines.push('## How to use this');
  indexLines.push('');
  indexLines.push('1. Open any area note. It shows the endpoints in scope, each marked covered/missing, plus the automated tests and manual cases attached to that area.');
  indexLines.push('2. Open [[graph/index|the endpoint graph]] to see the UI⇄API pairing for every endpoint individually.');
  indexLines.push('3. Open [[whole-process|whole-process]] for the full narrative across all 7+ phases.');
  indexLines.push('4. Open [[minimum-test-list-expanded]] for the PDF-minimum vs. current status breakdown.');
  indexLines.push('5. Regenerate this index after any test-file or recorder change:');
  indexLines.push('   ```bash');
  indexLines.push('   cd submission/agents/rag && npx tsx build-coverage-docs.ts');
  indexLines.push('   ```');
  indexLines.push('');
  await fs.writeFile(resolve(OUT_DIR, 'coverage-index.md'), indexLines.join('\n'));

  console.log(
    `[coverage] areas=${reports.length} ui-tests=${totalUi} api-tests=${totalApi} endpoints-in-scope=${allInScope.size} covered=${allHit.size}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
