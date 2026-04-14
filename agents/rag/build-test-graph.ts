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

const OUT_DIR = resolve(PROJECT, 'docs/qa/graph');
const ENDPOINT_DIR = resolve(OUT_DIR, 'endpoints');
const UI_NOTE_DIR = resolve(OUT_DIR, 'ui-tests');
const API_NOTE_DIR = resolve(OUT_DIR, 'api-tests');
const MANUAL_UI_DIR = resolve(OUT_DIR, 'ui-manual');
const MANUAL_API_DIR = resolve(OUT_DIR, 'api-manual');
const INDEX_PATH = resolve(OUT_DIR, 'index.md');

type OpenAPIDoc = {
  paths: Record<string, Record<string, { summary?: string; tags?: string[] }>>;
};

type RecordedRequest = { method: string; url: string; status: number | null };
type TestLog = { test: string; requests: RecordedRequest[] };

type TestSpec = {
  file: string;           // file relative to project root
  side: 'ui' | 'api';
  spec: string;           // spec file basename without extension
  title: string;          // full test title
  caseIds: string[];      // case IDs extracted from the title
  describeParents: string[];
};

function sanitizeFileName(s: string): string {
  return s.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120);
}

function normalisePath(method: string, url: string): string {
  try {
    const u = new URL(url, 'http://x');
    let path = u.pathname;
    path = path.replace(/\/\d+(?=\/|$)/g, '/{id}');
    if (!path.endsWith('/')) path += '/';
    return `${method.toUpperCase()} ${path}`;
  } catch {
    return `${method.toUpperCase()} ${url}`;
  }
}

function endpointSlug(key: string): string {
  return key
    .toLowerCase()
    .replace(/[{}]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Parse a .spec.ts file and return every `test(...)` call with its describe parents. */
async function parseSpecFile(filePath: string, side: 'ui' | 'api'): Promise<TestSpec[]> {
  const src = await fs.readFile(filePath, 'utf8');
  const out: TestSpec[] = [];
  const rel = relative(PROJECT, filePath);
  const spec = basename(filePath).replace(/\.spec\.ts$/, '');
  const describeRe = /test\.describe(?:\.serial)?\(\s*['"`]([^'"`]+)['"`]/g;
  const testRe = /\btest\(\s*['"`]([^'"`]+)['"`]/g;
  const describes: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = describeRe.exec(src)) !== null) describes.push(m[1] ?? '');
  while ((m = testRe.exec(src)) !== null) {
    const title = m[1] ?? '';
    // A test inside test.describe is parented — for simplicity, attribute every test to
    // every describe found in the file; the file scale is small enough.
    const caseIds = Array.from(title.matchAll(/\b([A-Z]+-[A-Z]+-[A-Z0-9]+-\d+|[A-Z]+-[A-Z]+-\d+)\b/g), (x) => x[1]!);
    out.push({
      file: rel,
      side,
      spec,
      title,
      caseIds,
      describeParents: describes,
    });
  }
  return out;
}

/** Parse a manual test case markdown file and return {id, title, tags, row}. */
type ManualCase = {
  id: string;
  row: Record<string, string>;
};

async function parseManualCases(filePath: string): Promise<ManualCase[]> {
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
      if (cells.length !== header.length) continue;
      const row: Record<string, string> = {};
      header.forEach((h, i) => (row[h] = cells[i] ?? ''));
      const id = row['ID'] ?? '';
      if (id) cases.push({ id, row });
    }
  }
  return cases;
}

async function main(): Promise<void> {
  // Prep dirs
  await fs.rm(OUT_DIR, { recursive: true, force: true });
  for (const d of [OUT_DIR, ENDPOINT_DIR, UI_NOTE_DIR, API_NOTE_DIR, MANUAL_UI_DIR, MANUAL_API_DIR]) {
    await fs.mkdir(d, { recursive: true });
  }

  // --- 1. Load OpenAPI endpoints ---
  const openapi = JSON.parse(await fs.readFile(OPENAPI_PATH, 'utf8')) as OpenAPIDoc;
  const METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const;
  type Endpoint = {
    method: string;
    path: string;
    key: string;
    slug: string;
    summary: string;
    tags: string[];
    uiTests: Set<string>; // test titles (with case IDs) that hit this endpoint
    apiTests: Set<string>;
    uiCases: Set<string>; // case IDs from the per-test map
    apiCases: Set<string>;
  };
  const endpoints = new Map<string, Endpoint>();
  for (const [p, ops] of Object.entries(openapi.paths)) {
    for (const method of METHODS) {
      const op = ops[method];
      if (!op) continue;
      const key = `${method.toUpperCase()} ${p}`;
      endpoints.set(key, {
        method: method.toUpperCase(),
        path: p,
        key,
        slug: endpointSlug(key),
        summary: op.summary ?? '',
        tags: op.tags ?? [],
        uiTests: new Set(),
        apiTests: new Set(),
        uiCases: new Set(),
        apiCases: new Set(),
      });
    }
  }

  // --- 2. Walk automated spec files ---
  const uiSpecs: TestSpec[] = [];
  const apiSpecs: TestSpec[] = [];
  for (const file of await fs.readdir(UI_TESTS_DIR)) {
    if (!file.endsWith('.spec.ts')) continue;
    if (file.startsWith('_')) continue; // skip probes, explore, snapshot
    uiSpecs.push(...(await parseSpecFile(resolve(UI_TESTS_DIR, file), 'ui')));
  }
  for (const file of await fs.readdir(API_TESTS_DIR)) {
    if (!file.endsWith('.spec.ts')) continue;
    if (file.startsWith('_')) continue;
    apiSpecs.push(...(await parseSpecFile(resolve(API_TESTS_DIR, file), 'api')));
  }

  // --- 3. Map automated test → endpoints via per-test-requests.json ---
  const testEndpoints = new Map<string, Set<string>>(); // test key → set of endpoint keys
  type CapturedTest = { file: string; title: string; endpoints: string[] };
  const capturedByTitle = new Map<string, CapturedTest>();
  let recorder: TestLog[] = [];
  try {
    recorder = JSON.parse(await fs.readFile(RECORDER_PATH, 'utf8'));
  } catch {
    /* ok, recorder file may be missing */
  }
  for (const log of recorder) {
    const [fileBase, title] = log.test.split('::', 2);
    if (!fileBase || !title) continue;
    const hits = new Set<string>();
    for (const req of log.requests) {
      if (req.method.toUpperCase() === 'OPTIONS') continue;
      const key = normalisePath(req.method, req.url);
      if (endpoints.has(key)) hits.add(key);
    }
    capturedByTitle.set(title, { file: fileBase, title, endpoints: Array.from(hits) });
    testEndpoints.set(title, hits);
  }

  // Attribute UI spec tests to endpoints via captured requests
  for (const t of uiSpecs) {
    const hits = testEndpoints.get(t.title) ?? new Set<string>();
    for (const key of hits) {
      const ep = endpoints.get(key)!;
      ep.uiTests.add(t.title);
      for (const cid of t.caseIds) ep.uiCases.add(cid);
    }
  }

  // For API specs, the recorder doesn't capture them (separate APIRequestContext).
  // Infer endpoint coverage by parsing the source file and extracting literal API calls
  // from within each test block. Precise attribution, no over-counting.
  async function inferApiTestEndpoints(t: TestSpec): Promise<string[]> {
    const src = await fs.readFile(resolve(PROJECT, t.file), 'utf8');
    const idx = src.indexOf(t.title);
    if (idx < 0) return [];
    const endIdx = src.indexOf("test('", idx + 10);
    const block = src.slice(idx, endIdx > 0 ? endIdx : src.length);
    const calls = new Set<string>();
    const callRe = /\b\w+\.(get|post|patch|put|delete|fetch)\s*\(\s*['"`](\/api\/[^'"`]*)/gi;
    let m: RegExpExecArray | null;
    while ((m = callRe.exec(block)) !== null) {
      let method = (m[1] ?? '').toUpperCase();
      const rawPath = m[2] ?? '';
      const cleanPath = rawPath
        .replace(/\$\{[^}]+\}/g, '{id}')
        .replace(/\?.*$/, '')
        .replace(/\/\d+(?=\/|$)/g, '/{id}');
      const path = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
      if (method === 'FETCH') {
        const slice = block.slice(callRe.lastIndex, callRe.lastIndex + 200);
        const mm = /method\s*:\s*['"`](\w+)['"`]/.exec(slice);
        method = mm ? (mm[1] ?? '').toUpperCase() : 'GET';
      }
      calls.add(`${method} ${path}`);
    }
    return Array.from(calls);
  }
  for (const t of apiSpecs) {
    const inferred = await inferApiTestEndpoints(t);
    const hits = new Set<string>();
    for (const key of inferred) {
      const ep = endpoints.get(key);
      if (!ep) continue;
      ep.apiTests.add(t.title);
      for (const cid of t.caseIds) ep.apiCases.add(cid);
      hits.add(key);
    }
    // Store the inferred set so emitTestNote can show endpoints for API tests too.
    testEndpoints.set(t.title, hits);
  }

  // --- 4. Load manual cases ---
  const manualUi = await parseManualCases(UI_CASES).catch(() => []);
  const manualApi = await parseManualCases(API_CASES).catch(() => []);

  // --- 5. Emit endpoint notes ---
  for (const ep of endpoints.values()) {
    const uiLinks = Array.from(ep.uiCases).sort().map((id) => `[[${id}]]`).join(', ') || '_(none)_';
    const apiLinks = Array.from(ep.apiCases).sort().map((id) => `[[${id}]]`).join(', ') || '_(none)_';
    const uiTestLinks = Array.from(ep.uiTests)
      .sort()
      .map((t) => `- ${t}`)
      .join('\n') || '_(none)_';
    const apiTestLinks = Array.from(ep.apiTests)
      .sort()
      .map((t) => `- ${t}`)
      .join('\n') || '_(none)_';
    const pairedState = ep.uiCases.size > 0 && ep.apiCases.size > 0
      ? 'paired'
      : ep.uiCases.size > 0
        ? 'ui-only'
        : ep.apiCases.size > 0
          ? 'api-only'
          : 'unpaired';
    const body = [
      '---',
      `title: "${ep.key}"`,
      `method: ${ep.method}`,
      `path: "${ep.path}"`,
      `paired: ${pairedState}`,
      `tags: [qa, endpoint, inventree, ${ep.method.toLowerCase()}, ${pairedState}]`,
      `generated: ${new Date().toISOString()}`,
      '---',
      '',
      `# ${ep.key}`,
      '',
      ep.summary ? `> ${ep.summary}` : '',
      '',
      `**Coverage status**: \`${pairedState}\``,
      '',
      '## UI test cases',
      '',
      uiLinks,
      '',
      '## API test cases',
      '',
      apiLinks,
      '',
      '## UI spec titles (automated, captured via `page.on("request")`)',
      '',
      uiTestLinks,
      '',
      '## API spec titles (automated, inferred from spec file scope)',
      '',
      apiTestLinks,
      '',
      '## Links',
      '',
      `- [[index|back to graph index]]`,
      '',
    ].join('\n');
    const file = resolve(ENDPOINT_DIR, `${ep.slug}.md`);
    await fs.writeFile(file, body);
  }

  // --- 6. Emit automated test notes ---
  async function emitTestNote(t: TestSpec, dir: string): Promise<void> {
    const hits = Array.from(testEndpoints.get(t.title) ?? []);
    const epLinks = hits.length
      ? hits.sort().map((k) => `- [[${endpoints.get(k)!.slug}|${k}]]`).join('\n')
      : '_(no /api/part or /api/bom calls captured — may be outside the filtered scope)_';
    const caseLinks = t.caseIds.length ? t.caseIds.map((c) => `[[${c}]]`).join(', ') : '_(no case IDs in title)_';
    const pairedSibs = new Set<string>();
    for (const k of hits) {
      const ep = endpoints.get(k)!;
      // On a UI test: sibling = API test titles that hit the same endpoint
      const others = t.side === 'ui' ? ep.apiTests : ep.uiTests;
      for (const sib of others) pairedSibs.add(sib);
    }
    const sibLinks = pairedSibs.size > 0
      ? Array.from(pairedSibs).sort().map((s) => `- ${s}`).join('\n')
      : '_(no paired test on the other side)_';
    const title = t.title.replace(/"/g, '\\"');
    const body = [
      '---',
      `title: "${title}"`,
      `side: ${t.side}`,
      `spec: ${t.spec}`,
      `file: ${t.file}`,
      `case-ids: [${t.caseIds.join(', ')}]`,
      `endpoints-hit: ${hits.length}`,
      `tags: [qa, test, automated, ${t.side}]`,
      `generated: ${new Date().toISOString()}`,
      '---',
      '',
      `# ${t.title}`,
      '',
      `- Side: **${t.side.toUpperCase()}**`,
      `- Spec file: \`${t.file}\``,
      `- Case IDs: ${caseLinks}`,
      '',
      '## Endpoints exercised',
      '',
      epLinks,
      '',
      '## Paired tests on the other side',
      '',
      sibLinks,
      '',
    ].join('\n');
    // Primary file: first case ID if present (so wikilinks [[UI-PART-002]] resolve).
    // Also write aliased stubs for any additional case IDs on the same test.
    const primary = t.caseIds[0] ?? sanitizeFileName(`${t.spec}__${t.title}`);
    await fs.writeFile(resolve(dir, `${primary}.md`), body);
    for (const extra of t.caseIds.slice(1)) {
      const stub = [
        '---',
        `title: "${extra} (alias)"`,
        `redirect-to: ${primary}`,
        'tags: [qa, test, alias]',
        '---',
        '',
        `Same test as [[${primary}]].`,
        '',
      ].join('\n');
      await fs.writeFile(resolve(dir, `${extra}.md`), stub);
    }
  }

  for (const t of uiSpecs) await emitTestNote(t, UI_NOTE_DIR);
  for (const t of apiSpecs) await emitTestNote(t, API_NOTE_DIR);

  // --- 7. Emit manual case notes with wikilinks to sibling automated tests by case ID ---
  async function emitManualNote(c: ManualCase, dir: string, side: 'ui' | 'api'): Promise<void> {
    const relatedAutomated: TestSpec[] = (side === 'ui' ? uiSpecs : apiSpecs).filter((t) =>
      t.caseIds.includes(c.id),
    );
    const automatedLinks = relatedAutomated.length
      ? relatedAutomated
          .map((t) => `- \`${t.file}\` — ${t.title}`)
          .join('\n')
      : '_(not automated)_';
    const endpointLinks = new Set<string>();
    for (const at of relatedAutomated) {
      const hits = testEndpoints.get(at.title) ?? new Set<string>();
      for (const k of hits) endpointLinks.add(k);
    }
    const epBlock = endpointLinks.size
      ? Array.from(endpointLinks).sort().map((k) => `- [[${endpoints.get(k)!.slug}|${k}]]`).join('\n')
      : '_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_';
    const row = c.row;
    const title = row['Title'] ?? c.id;
    const body = [
      '---',
      `title: "${title.replace(/"/g, '\\"')}"`,
      `id: ${c.id}`,
      `side: ${side}`,
      `priority: ${row['Priority'] ?? ''}`,
      `tags: [qa, test, manual, ${side}]`,
      `generated: ${new Date().toISOString()}`,
      '---',
      '',
      `# ${c.id} — ${title}`,
      '',
      '## Preconditions',
      '',
      row['Preconditions'] ?? '_(none)_',
      '',
      '## Steps',
      '',
      row['Steps'] ?? '_(none)_',
      '',
      '## Expected',
      '',
      row['Expected'] ?? '_(none)_',
      '',
      '## Tags',
      '',
      row['Tags'] ?? '_(none)_',
      '',
      '## Automated by',
      '',
      automatedLinks,
      '',
      '## Endpoints touched via the automated sibling(s)',
      '',
      epBlock,
      '',
    ].join('\n');
    const file = resolve(dir, `${c.id}.md`);
    await fs.writeFile(file, body);
  }
  for (const c of manualUi) await emitManualNote(c, MANUAL_UI_DIR, 'ui');
  for (const c of manualApi) await emitManualNote(c, MANUAL_API_DIR, 'api');

  // --- 8. Emit index ---
  const totalEndpoints = endpoints.size;
  const paired = Array.from(endpoints.values()).filter(
    (ep) => ep.uiCases.size > 0 && ep.apiCases.size > 0,
  );
  const uiOnly = Array.from(endpoints.values()).filter(
    (ep) => ep.uiCases.size > 0 && ep.apiCases.size === 0,
  );
  const apiOnly = Array.from(endpoints.values()).filter(
    (ep) => ep.uiCases.size === 0 && ep.apiCases.size > 0,
  );
  const unpaired = Array.from(endpoints.values()).filter(
    (ep) => ep.uiCases.size === 0 && ep.apiCases.size === 0,
  );

  const indexLines: string[] = [];
  indexLines.push('---');
  indexLines.push('title: "Test graph — UI ⇄ API endpoint coverage"');
  indexLines.push('tags: [qa, graph, coverage, index]');
  indexLines.push(`generated: ${new Date().toISOString()}`);
  indexLines.push('---');
  indexLines.push('');
  indexLines.push('# Test graph — UI ⇄ API coverage');
  indexLines.push('');
  indexLines.push(
    'Generated by `submission/agents/rag/build-test-graph.ts`. One note per OpenAPI endpoint plus one per automated / manual test. Every note cross-links to its peers so Obsidian graph view shows paired (both UI and API) and unpaired endpoints as distinct clusters.',
  );
  indexLines.push('');
  indexLines.push('## Summary');
  indexLines.push('');
  indexLines.push(`- Total endpoints (filtered OpenAPI): **${totalEndpoints}**`);
  indexLines.push(`- Paired (both UI and API tests exist): **${paired.length}**`);
  indexLines.push(`- UI-only: **${uiOnly.length}**`);
  indexLines.push(`- API-only: **${apiOnly.length}**`);
  indexLines.push(`- Unpaired (no tests at all): **${unpaired.length}**`);
  indexLines.push(
    `- UI automated specs parsed: **${uiSpecs.length}** (${new Set(uiSpecs.map((t) => t.spec)).size} files)`,
  );
  indexLines.push(
    `- API automated specs parsed: **${apiSpecs.length}** (${new Set(apiSpecs.map((t) => t.spec)).size} files)`,
  );
  indexLines.push(
    `- Manual UI cases: **${manualUi.length}**; Manual API cases: **${manualApi.length}**`,
  );
  indexLines.push('');
  const bucketSection = (title: string, list: typeof paired): void => {
    indexLines.push(`## ${title}`);
    indexLines.push('');
    if (list.length === 0) {
      indexLines.push('_(empty)_');
      indexLines.push('');
      return;
    }
    for (const ep of list.sort((a, b) => a.key.localeCompare(b.key))) {
      indexLines.push(`- [[endpoints/${ep.slug}|${ep.key}]]`);
    }
    indexLines.push('');
  };
  bucketSection('Paired — both sides cover this endpoint', paired);
  bucketSection('UI-only — API has no test for this', uiOnly);
  bucketSection('API-only — UI has no test for this', apiOnly);
  bucketSection('Unpaired — nothing covers this', unpaired);

  await fs.writeFile(INDEX_PATH, indexLines.join('\n'));

  console.log(
    `[test-graph] endpoints=${totalEndpoints} paired=${paired.length} ui-only=${uiOnly.length} api-only=${apiOnly.length} unpaired=${unpaired.length}`,
  );
  console.log(`[test-graph] ui-tests=${uiSpecs.length} api-tests=${apiSpecs.length}`);
  console.log(`[test-graph] manual-ui=${manualUi.length} manual-api=${manualApi.length}`);
  console.log(`[test-graph] wrote ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
